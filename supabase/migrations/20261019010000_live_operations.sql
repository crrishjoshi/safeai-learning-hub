-- SafeAI live operations hardening.
-- Adds privacy-safe notifications/metrics, a protected safeguarding queue,
-- realtime publication membership, and service-only retention/deletion hooks.
-- No table stores raw prompts from blocked or urgent flows.

create table if not exists public.family_notifications (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid references public.child_profiles(user_id) on delete cascade,
  recipient_role public.family_role not null,
  kind text not null check (kind in ('approval-created', 'approval-resolved', 'safety-flag', 'access-change')),
  title text not null check (char_length(title) between 1 and 120),
  body text not null check (char_length(body) between 1 and 500),
  read_at timestamptz,
  created_at timestamptz not null default now(),
  check ((recipient_role = 'child') = (child_id is not null)),
  foreign key (family_id, child_id) references public.child_profiles(family_id, user_id) on delete cascade
);

create index if not exists family_notifications_family_created_idx
  on public.family_notifications (family_id, created_at desc);
create index if not exists family_notifications_child_created_idx
  on public.family_notifications (child_id, created_at desc);

create table if not exists public.family_metrics (
  family_id uuid primary key references public.families(id) on delete cascade,
  allowed_count integer not null default 0 check (allowed_count >= 0),
  support_count integer not null default 0 check (support_count >= 0),
  approval_count integer not null default 0 check (approval_count >= 0),
  blocked_count integer not null default 0 check (blocked_count >= 0),
  urgent_count integer not null default 0 check (urgent_count >= 0),
  lessons_started integer not null default 0 check (lessons_started >= 0),
  updated_at timestamptz not null default now()
);

-- This queue intentionally contains no disclosure text. It is an operational
-- hand-off record, not a claim that a certified human safeguarding service is
-- connected to this coursework deployment.
create table if not exists private.safeguarding_cases (
  id uuid primary key default gen_random_uuid(),
  safety_event_id uuid not null references public.safety_events(id) on delete cascade,
  family_id uuid not null references public.families(id) on delete cascade,
  child_id uuid not null references public.child_profiles(user_id) on delete cascade,
  status text not null default 'queued' check (status in ('queued', 'assigned', 'resolved')),
  created_at timestamptz not null default now(),
  assigned_at timestamptz,
  resolved_at timestamptz
);

revoke all on table private.safeguarding_cases from public, anon, authenticated;
alter table public.family_notifications enable row level security;
alter table public.family_metrics enable row level security;
alter table private.safeguarding_cases enable row level security;

revoke all on table public.family_notifications from anon;
revoke all on table public.family_metrics from anon;
revoke insert, update, delete, truncate, references, trigger on table public.family_notifications from authenticated;
revoke insert, update, delete, truncate, references, trigger on table public.family_metrics from authenticated;
grant select on public.family_notifications to authenticated;
grant select on public.family_metrics to authenticated;

drop policy if exists "parents can read family notifications" on public.family_notifications;
create policy "parents can read family notifications" on public.family_notifications
  for select to authenticated using (private.is_family_parent(family_id));
drop policy if exists "children can read own notifications" on public.family_notifications;
create policy "children can read own notifications" on public.family_notifications
  for select to authenticated using (recipient_role = 'child' and private.is_child(child_id));
drop policy if exists "parents can read family metrics" on public.family_metrics;
create policy "parents can read family metrics" on public.family_metrics
  for select to authenticated using (private.is_family_parent(family_id));

create or replace function public.increment_family_metric(
  target_family_id uuid,
  metric_name text,
  amount integer default 1
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if amount < 1 or metric_name not in ('allowed_count', 'support_count', 'approval_count', 'blocked_count', 'urgent_count', 'lessons_started') then
    raise exception 'invalid_metric';
  end if;
  insert into public.family_metrics (family_id, updated_at)
  values (target_family_id, now())
  on conflict (family_id) do nothing;
  execute format(
    'update public.family_metrics set %I = %I + $1, updated_at = now() where family_id = $2',
    metric_name, metric_name
  ) using amount, target_family_id;
end;
$$;

create or replace function public.purge_expired_family_data()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  removed_messages integer := 0;
  removed_notifications integer := 0;
begin
  delete from public.chat_messages message
  where message.created_at < now() - make_interval(days => coalesce((
    select setting.retention_days from public.access_settings setting
    where setting.family_id = message.family_id and setting.child_id = message.child_id
  ), 30));
  get diagnostics removed_messages = row_count;

  delete from public.family_notifications notification
  where notification.read_at is not null
    and notification.read_at < now() - interval '90 days';
  get diagnostics removed_notifications = row_count;

  return jsonb_build_object('chat_messages', removed_messages, 'notifications', removed_notifications);
end;
$$;

create or replace function public.delete_family_data(target_family_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  removed boolean;
begin
  delete from public.families where id = target_family_id;
  get diagnostics removed = row_count;
  return coalesce(removed, false);
end;
$$;

revoke all on function public.increment_family_metric(uuid, text, integer) from public, anon, authenticated;
revoke all on function public.purge_expired_family_data() from public, anon, authenticated;
revoke all on function public.delete_family_data(uuid) from public, anon, authenticated;
grant execute on function public.increment_family_metric(uuid, text, integer) to service_role;
grant execute on function public.purge_expired_family_data() to service_role;
grant execute on function public.delete_family_data(uuid) to service_role;

do $$
begin
  if exists (select 1 from pg_catalog.pg_publication where pubname = 'supabase_realtime') then
    if not exists (select 1 from pg_catalog.pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'chat_messages') then
      alter publication supabase_realtime add table public.chat_messages;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'approval_requests') then
      alter publication supabase_realtime add table public.approval_requests;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'parent_decisions') then
      alter publication supabase_realtime add table public.parent_decisions;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'safety_events') then
      alter publication supabase_realtime add table public.safety_events;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'access_settings') then
      alter publication supabase_realtime add table public.access_settings;
    end if;
    if not exists (select 1 from pg_catalog.pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'family_notifications') then
      alter publication supabase_realtime add table public.family_notifications;
    end if;
  end if;
end;
$$;

