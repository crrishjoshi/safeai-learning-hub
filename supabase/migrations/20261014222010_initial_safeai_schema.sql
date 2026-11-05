-- SafeAI Learning Hub foundation.
-- This migration is prepared for review; it has not been applied to a live project.
-- It was hardened in place on 2026-10-14 (security review) because it had never
-- been applied anywhere. Once applied, later changes must be new migrations.
--
-- Authorization is based on database rows (family_members), never on editable
-- user metadata. Writes that carry safety meaning (chat history, safety events,
-- approval requests, provider metadata, family membership) are server-only: the
-- browser roles receive read access plus a small set of parent actions.

create schema if not exists private;
revoke all on schema private from public;
revoke all on schema private from anon;
-- Policies call helper functions in private, so signed-in users need USAGE on the
-- schema. Every private table remains revoked below.
grant usage on schema private to authenticated;

create type public.family_role as enum ('parent', 'child');
create type public.safety_state as enum ('allowed', 'safe-support', 'approval', 'blocked', 'urgent');
create type public.approval_status as enum ('pending', 'approved', 'rejected', 'discuss-later');

create table public.families (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  created_at timestamptz not null default now()
);

-- One family and one role per account keeps site routing and authorization
-- unambiguous. Membership rows are created only by trusted server code.
create table public.family_members (
  family_id uuid not null references public.families(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.family_role not null,
  created_at timestamptz not null default now(),
  primary key (family_id, user_id),
  unique (user_id),
  unique (family_id, user_id, role)
);

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  role public.family_role not null,
  display_name text not null check (char_length(display_name) between 1 and 80),
  created_at timestamptz not null default now(),
  foreign key (family_id, user_id, role) references public.family_members(family_id, user_id, role) on delete cascade
);

create table public.child_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  role public.family_role not null default 'child' check (role = 'child'),
  display_name text not null check (char_length(display_name) between 1 and 80),
  disabled_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, family_id),
  foreign key (family_id, user_id, role) references public.family_members(family_id, user_id, role) on delete cascade
);

-- Immediate-risk (urgent) content is never stored as ordinary history.
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null,
  direction text not null check (direction in ('child', 'assistant')),
  safety_state public.safety_state not null check (safety_state <> 'urgent'),
  content text not null check (char_length(content) <= 4000),
  created_at timestamptz not null default now(),
  foreign key (child_id, family_id) references public.child_profiles(user_id, family_id) on delete cascade
);

-- Protected (urgent/abuse) events carry no disclosure text or detailed
-- category: a parent may see that a protected escalation happened, but never
-- what was said, because the alleged harm could involve a parent or guardian.
create table public.safety_events (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null,
  state public.safety_state not null,
  category text not null check (char_length(category) between 1 and 120),
  context_summary text not null check (char_length(context_summary) <= 500),
  protected boolean not null default false,
  created_at timestamptz not null default now(),
  check ((state = 'urgent') = protected),
  check (not protected or (category = 'protected-escalation' and context_summary = '')),
  foreign key (child_id, family_id) references public.child_profiles(user_id, family_id) on delete cascade
);

create table public.approval_requests (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null,
  category text not null check (char_length(category) between 1 and 120),
  context_summary text not null check (char_length(context_summary) <= 500),
  status public.approval_status not null default 'pending',
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  check ((status = 'pending') = (resolved_at is null)),
  foreign key (child_id, family_id) references public.child_profiles(user_id, family_id) on delete cascade
);

create table public.parent_decisions (
  id uuid primary key default gen_random_uuid(),
  approval_request_id uuid not null references public.approval_requests(id) on delete cascade,
  parent_id uuid not null references auth.users(id) on delete cascade,
  decision public.approval_status not null check (decision <> 'pending'),
  note text check (note is null or char_length(note) <= 500),
  created_at timestamptz not null default now()
);

create table public.access_settings (
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null,
  chatbot_paused boolean not null default false,
  ordinary_notifications boolean not null default false,
  flagged_notifications boolean not null default true,
  retention_days integer not null default 30 check (retention_days between 1 and 365),
  primary key (family_id, child_id),
  foreign key (child_id, family_id) references public.child_profiles(user_id, family_id) on delete cascade
);

-- Browser-visible provider metadata only. No key material, ciphertext or IV.
create table public.provider_settings (
  family_id uuid primary key references public.families(id) on delete cascade,
  provider text not null check (provider in ('openai', 'anthropic', 'google')),
  masked_ending text check (masked_ending is null or masked_ending ~ '^[0-9A-Za-z*]{4}$'),
  status text not null check (status in ('disabled', 'active', 'error')) default 'disabled',
  last_tested_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Raw provider ciphertext lives in an unexposed schema with no browser grants.
-- Only the service-role functions below read or write it.
create table private.provider_credentials (
  family_id uuid primary key references public.families(id) on delete cascade,
  provider text not null check (provider in ('openai', 'anthropic', 'google')),
  ciphertext text not null,
  iv text not null,
  auth_tag text not null,
  key_version integer not null check (key_version >= 1),
  updated_at timestamptz not null default now()
);

revoke all on table private.provider_credentials from public, anon, authenticated;

-- Helper functions: security definer so policies can consult family_members
-- without recursive RLS; empty search_path so every name is schema-qualified.
create or replace function private.is_family_parent(target_family_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from public.family_members
    where family_id = target_family_id and user_id = auth.uid() and role = 'parent'
  );
$$;

create or replace function private.is_family_member(target_family_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and exists (
    select 1 from public.family_members
    where family_id = target_family_id and user_id = auth.uid()
  );
$$;

create or replace function private.is_child(target_child_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null and auth.uid() = target_child_id and exists (
    select 1 from public.child_profiles where user_id = target_child_id
  );
$$;

revoke all on function private.is_family_parent(uuid) from public, anon, authenticated;
revoke all on function private.is_family_member(uuid) from public, anon, authenticated;
revoke all on function private.is_child(uuid) from public, anon, authenticated;
grant execute on function private.is_family_parent(uuid) to authenticated;
grant execute on function private.is_family_member(uuid) to authenticated;
grant execute on function private.is_child(uuid) to authenticated;

alter table public.families enable row level security;
alter table public.family_members enable row level security;
alter table public.profiles enable row level security;
alter table public.child_profiles enable row level security;
alter table public.chat_messages enable row level security;
alter table public.safety_events enable row level security;
alter table public.approval_requests enable row level security;
alter table public.parent_decisions enable row level security;
alter table public.access_settings enable row level security;
alter table public.provider_settings enable row level security;
alter table private.provider_credentials enable row level security;

-- Least-privilege table grants. RLS still applies to everything granted here.
revoke all on all tables in schema public from anon;
revoke insert, update, delete, truncate, references, trigger on all tables in schema public from authenticated;
grant update (status, resolved_at) on public.approval_requests to authenticated;
grant insert on public.parent_decisions to authenticated;
grant insert, update, delete on public.access_settings to authenticated;
grant delete on public.chat_messages to authenticated;

create policy "parents can read their family" on public.families for select to authenticated using (private.is_family_parent(id));
create policy "members can read their own membership" on public.family_members for select to authenticated using (user_id = auth.uid());
create policy "parents can read family membership" on public.family_members for select to authenticated using (private.is_family_parent(family_id));
create policy "users can read their profile" on public.profiles for select to authenticated using (user_id = auth.uid() or private.is_family_parent(family_id));
create policy "children can read their own profile" on public.child_profiles for select to authenticated using (private.is_child(user_id));
create policy "parents can read child profiles" on public.child_profiles for select to authenticated using (private.is_family_parent(family_id));

-- Chat history is written by the server after server-side classification.
create policy "children can read their own messages" on public.chat_messages for select to authenticated using (private.is_child(child_id));
create policy "parents can read family messages" on public.chat_messages for select to authenticated using (private.is_family_parent(family_id));
create policy "parents can delete family messages" on public.chat_messages for delete to authenticated using (private.is_family_parent(family_id));

-- Safety events are written by the server only.
create policy "children can read their own safety events" on public.safety_events for select to authenticated using (private.is_child(child_id));
create policy "parents can read family safety events" on public.safety_events for select to authenticated using (private.is_family_parent(family_id));

-- Approval requests are created by the server after classification, so a child
-- cannot create, approve or alter one. Parents may only move pending to resolved.
create policy "children can read their approval requests" on public.approval_requests for select to authenticated using (private.is_child(child_id));
create policy "parents can read approval requests" on public.approval_requests for select to authenticated using (private.is_family_parent(family_id));
create policy "parents can resolve approval requests" on public.approval_requests for update to authenticated
  using (private.is_family_parent(family_id) and status = 'pending')
  with check (private.is_family_parent(family_id) and status <> 'pending' and resolved_at is not null);

create policy "parents can read decisions" on public.parent_decisions for select to authenticated using (exists (select 1 from public.approval_requests request where request.id = approval_request_id and private.is_family_parent(request.family_id)));
create policy "parents can create decisions" on public.parent_decisions for insert to authenticated with check (parent_id = auth.uid() and exists (select 1 from public.approval_requests request where request.id = approval_request_id and private.is_family_parent(request.family_id)));

create policy "children can read own access setting" on public.access_settings for select to authenticated using (private.is_child(child_id));
create policy "parents can read access settings" on public.access_settings for select to authenticated using (private.is_family_parent(family_id));
create policy "parents can create access settings" on public.access_settings for insert to authenticated with check (private.is_family_parent(family_id));
create policy "parents can update access settings" on public.access_settings for update to authenticated using (private.is_family_parent(family_id)) with check (private.is_family_parent(family_id));
create policy "parents can delete access settings" on public.access_settings for delete to authenticated using (private.is_family_parent(family_id));

-- Parents can read provider metadata; only the server changes it.
create policy "parents can read provider metadata" on public.provider_settings for select to authenticated using (private.is_family_parent(family_id));

-- Server-only credential operations. Executable by service_role only; never by
-- anon or authenticated. They accept ciphertext, never a raw key.
create or replace function public.store_provider_credential(
  target_family_id uuid,
  target_provider text,
  target_masked_ending text,
  encrypted_ciphertext text,
  encrypted_iv text,
  encrypted_auth_tag text,
  encryption_key_version integer
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into private.provider_credentials (family_id, provider, ciphertext, iv, auth_tag, key_version, updated_at)
  values (target_family_id, target_provider, encrypted_ciphertext, encrypted_iv, encrypted_auth_tag, encryption_key_version, now())
  on conflict (family_id) do update
    set provider = excluded.provider, ciphertext = excluded.ciphertext, iv = excluded.iv,
        auth_tag = excluded.auth_tag, key_version = excluded.key_version, updated_at = now();

  insert into public.provider_settings (family_id, provider, masked_ending, status, updated_at)
  values (target_family_id, target_provider, target_masked_ending, 'disabled', now())
  on conflict (family_id) do update
    set provider = excluded.provider, masked_ending = excluded.masked_ending,
        status = 'disabled', last_tested_at = null, updated_at = now();
end;
$$;

create or replace function public.remove_provider_credential(target_family_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  delete from private.provider_credentials where family_id = target_family_id;
  delete from public.provider_settings where family_id = target_family_id;
end;
$$;

-- Retention: delete ordinary chat history older than each child's retention
-- period (30 days when no setting exists). Scheduling (for example pg_cron) is
-- deployment configuration and is not enabled by this migration.
create or replace function public.purge_expired_chat_messages()
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  removed integer;
begin
  delete from public.chat_messages message
  where message.created_at < now() - make_interval(days => coalesce((
    select setting.retention_days from public.access_settings setting
    where setting.family_id = message.family_id and setting.child_id = message.child_id
  ), 30));
  get diagnostics removed = row_count;
  return removed;
end;
$$;

revoke all on function public.store_provider_credential(uuid, text, text, text, text, text, integer) from public, anon, authenticated;
revoke all on function public.remove_provider_credential(uuid) from public, anon, authenticated;
revoke all on function public.purge_expired_chat_messages() from public, anon, authenticated;
grant execute on function public.store_provider_credential(uuid, text, text, text, text, text, integer) to service_role;
grant execute on function public.remove_provider_credential(uuid) to service_role;
grant execute on function public.purge_expired_chat_messages() to service_role;
