-- Parent self-service family setup.
--
-- Parent accounts are created by Supabase Auth itself (auth.signUp), so the
-- password is hashed and stored only in auth.users and never passes through
-- SafeAI code or tables. Once the parent has confirmed their email and signed
-- in, this function creates their family, parent membership and profile in one
-- transaction. It replaces an earlier unauthenticated service-role sign-up
-- route.
--
-- Guards: a signed-in caller only; email must be confirmed; the caller must not
-- already belong to any family (unique(user_id) on family_members backs this up
-- under concurrency). The family is always bound to auth.uid(), never to an
-- argument, so a caller cannot create or join another account's family.

create or replace function public.create_parent_family(display_name text, family_name text)
returns uuid
language plpgsql
volatile
security definer
set search_path = ''
as $$
declare
  caller uuid := auth.uid();
  clean_display_name text := btrim(coalesce(display_name, ''));
  clean_family_name text := btrim(coalesce(family_name, ''));
  new_family_id uuid;
begin
  if caller is null then
    raise exception 'authentication_required' using errcode = '42501';
  end if;
  if not exists (select 1 from auth.users where id = caller and email_confirmed_at is not null) then
    raise exception 'email_not_confirmed' using errcode = '42501';
  end if;
  if exists (select 1 from public.family_members where user_id = caller) then
    raise exception 'family_already_exists' using errcode = '23505';
  end if;
  if char_length(clean_display_name) not between 1 and 80 or char_length(clean_family_name) not between 1 and 80 then
    raise exception 'invalid_family_setup' using errcode = '22023';
  end if;

  insert into public.families (name) values (clean_family_name) returning id into new_family_id;
  insert into public.family_members (family_id, user_id, role) values (new_family_id, caller, 'parent');
  insert into public.profiles (user_id, family_id, role, display_name) values (caller, new_family_id, 'parent', clean_display_name);
  return new_family_id;
end;
$$;

revoke all on function public.create_parent_family(text, text) from public, anon, authenticated;
grant execute on function public.create_parent_family(text, text) to authenticated;
