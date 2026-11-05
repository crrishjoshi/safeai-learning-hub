-- Keep the account-management form honest: school year is family-scoped
-- profile metadata, not a child-auth credential or chat record.
alter table public.child_profiles
  add column school_year text not null default 'Not set'
  check (char_length(school_year) between 1 and 80);
