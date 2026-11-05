-- The private schema is not exposed through the Data API and service_role has
-- no grants on it, so server routes cannot use .schema('private') directly.
-- These service-role-only functions are the single read path for encrypted
-- provider credentials and the single write path for the protected
-- safeguarding queue, matching store_/remove_provider_credential.

create or replace function public.read_provider_credential(target_family_id uuid)
returns table (provider text, ciphertext text, iv text, auth_tag text, key_version integer)
language sql
stable
security definer
set search_path = ''
as $$
  select c.provider, c.ciphertext, c.iv, c.auth_tag, c.key_version
  from private.provider_credentials c
  where c.family_id = target_family_id;
$$;

create or replace function public.create_safeguarding_case(target_safety_event_id uuid, target_family_id uuid, target_child_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into private.safeguarding_cases (safety_event_id, family_id, child_id)
  values (target_safety_event_id, target_family_id, target_child_id);
end;
$$;

revoke all on function public.read_provider_credential(uuid) from public, anon, authenticated;
revoke all on function public.create_safeguarding_case(uuid, uuid, uuid) from public, anon, authenticated;
grant execute on function public.read_provider_credential(uuid) to service_role;
grant execute on function public.create_safeguarding_case(uuid, uuid, uuid) to service_role;
