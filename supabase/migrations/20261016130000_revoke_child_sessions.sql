-- Signs a child out everywhere after a parent sets a new password.
-- auth.admin.signOut needs the child's own JWT, and Supabase Auth has no admin
-- "sign out user by id" endpoint, so the server deletes the child's sessions
-- directly. Deleting a session cascades to its refresh tokens; refresh tokens
-- issued before sessions existed are removed by user id as well. Access tokens
-- already issued stop working with Supabase Auth (getUser fails once their
-- session is gone) and expire on their own for direct Data API reads.
-- Executable by service_role only, and only for users who are child accounts.
create or replace function public.revoke_child_sessions(target_child_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if target_child_id is null
    or not exists (select 1 from public.child_profiles where user_id = target_child_id) then
    raise exception 'not_a_child_account' using errcode = '22023';
  end if;

  delete from auth.refresh_tokens where user_id = target_child_id::text;
  delete from auth.sessions where user_id = target_child_id;
end;
$$;

revoke all on function public.revoke_child_sessions(uuid) from public, anon, authenticated;
grant execute on function public.revoke_child_sessions(uuid) to service_role;
