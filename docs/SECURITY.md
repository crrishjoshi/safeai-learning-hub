# SafeAI security boundary

## Secrets and keys
- The browser may use only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- `SUPABASE_SERVICE_ROLE_KEY`, `API_KEY_ENCRYPTION_SECRET` and `API_KEY_ENCRYPTION_KEY_VERSION` are server-only. Neither app imports them; `npm run scan` checks the source and the built bundles.
- A parent's provider key is sent once, over HTTPS, to `POST /api/parent/provider-key`. The server checks the caller is a parent in `family_members`, encrypts the key with AES-256-GCM (a key derived from `API_KEY_ENCRYPTION_SECRET`, bound to the family and provider), and stores it in `private.provider_credentials` through a service-role-only function. The response holds only the provider, the last four characters and the status.
- The browser can read only `public.provider_settings` (masked metadata), and only for the parent's own family. Children, other families and anonymous users get no rows. The ciphertext table is in an unexposed schema with no grants to `anon` or `authenticated`.
- Keys can be rotated (save a new one), tested through a fixed server-side prompt, disabled and removed (`DELETE /api/parent/provider-key`). A saved key stays `disabled` until the parent passes the connection test.
- Changing `API_KEY_ENCRYPTION_SECRET` makes stored keys unreadable. Parents must re-enter them until a re-encrypt job exists.

## Accounts and access
- Roles come from `public.family_members`, never from editable user metadata. Each website checks the role after sign-in and signs out an account of the wrong role.
- Sessions use PKCE and `sessionStorage`, so closing the tab signs the account out on a shared family device. Sign-in errors are generic and do not reveal whether an email exists.
- Every public table has RLS. Policies use family membership and child ownership: a child sees only their own rows, a parent sees only their own family, and siblings cannot see each other. `scripts/rls-db.test.mjs` runs these policies in a real Postgres (PGlite) with negative-access tests.
- Parent account creation is handled by a server route that creates the first family membership. Child account creation is handled by a parent-only server route; the child site exposes sign-in only. Passwords are passed to Supabase Auth and are never returned or stored by SafeAI application tables.

## Safeguarding
- Safety precedence is urgent > blocked > approval > safe support > allowed. Urgent content is never saved to history and never becomes an approval request. Parent approval is never emergency support.
- Protected disclosures are not shown in ordinary parent history.
- Urgent events create a private safeguarding queue record containing only family/child/event identifiers and lifecycle status; no disclosure wording is stored in that queue. This is an operational hand-off foundation, not a staffed emergency service.

## Live operations
- Family-scoped activity tables are in the `supabase_realtime` publication. Realtime events trigger a fresh authorized API read in each app; five-second polling remains as a fallback for disconnected tabs.
- Parent and child notifications are in-app records. Blocked and approval notifications include the linked child id so the parent can identify which child triggered the event, but never contain raw prompts or urgent disclosure text. Metrics are aggregate counters only and do not send data to a third-party analytics service.
- Parent-selected safety criteria are a bounded allow-list of topic ids stored per child in `access_settings`. They can add blocked coverage but cannot weaken the fixed urgent > blocked > approval > safe-support > allowed precedence.
- `POST /api/parent/privacy-delete` deletes application family records after an authenticated parent enters `DELETE MY FAMILY DATA`. The Supabase Auth login identity is intentionally not deleted by that route.
- `POST /api/cron/purge` is server-only and guarded by `CRON_SECRET`; the parent Vercel deployment schedules it daily through `vercel.json`.

## Hosting
- Both Vercel configs send a strict Content-Security-Policy (self plus the project Supabase origin `https://oxuacclbibgbggooqqfy.supabase.co` and `wss://oxuacclbibgbggooqqfy.supabase.co` for Realtime; `frame-ancestors 'none'`), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy: no-referrer`, a restrictive `Permissions-Policy`, `Cross-Origin-Opener-Policy: same-origin` and HSTS. The child sets them as the first `routes` entry (`continue: true`); the parent uses top-level `headers`. API responses are `no-store`. A custom Supabase domain must be added to `connect-src`.

## Current live boundary
The Supabase project contains the reviewed schema with RLS enabled. Hosted sign-in, parent/child account creation, family-scoped activity, approvals, per-child parent safety criteria, child-labelled in-app notifications and server-side provider calls are wired. No raw provider key enters browser bundles or logs. The hosted two-site sync uses Supabase Realtime with a short-polling fallback. Rate limiting, independent safety evaluation and specialist safeguarding routing remain outside the prototype boundary. Dashboards use account-scoped empty states rather than fictional family records.

The Supabase security advisor currently reports intentional private-schema no-policy items for service-role-only tables, plus existing Auth/performance review items. The performance advisor reports unindexed foreign keys, auth-policy init-plan opportunities and multiple permissive read policies; these are recorded for review before real data is enabled.

See `PROJECT_REPORT.md` for the change log, scan results and open risks.
