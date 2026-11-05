-- Parent-selected safety criteria for each linked child.
-- These are bounded topic choices, not arbitrary expressions. The server-side
-- classifier still applies urgent and built-in blocked precedence first.

alter table public.access_settings
  add column if not exists blocked_topics text[] not null default '{}';

alter table public.access_settings
  drop constraint if exists access_settings_blocked_topics_allowed;

alter table public.access_settings
  add constraint access_settings_blocked_topics_allowed
  check (blocked_topics <@ array[
    'personal-health',
    'private-information',
    'strangers-and-sharing',
    'public-posting',
    'purchases-and-age-restricted',
    'dangerous-activities',
    'hacking-and-passwords'
  ]::text[]);
