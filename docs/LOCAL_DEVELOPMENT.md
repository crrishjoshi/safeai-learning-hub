# SafeAI Learning Hub local development

## Run both websites

From the repository root:

```sh
npm install
npm run dev:child -- --host 127.0.0.1 --port 4173
npm run dev:parent -- --host 127.0.0.1 --port 4174
```

Open the child site at `http://127.0.0.1:4173` and the parent site at `http://127.0.0.1:4174`.

With no `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY`, each site shows its real sign-in boundary but disables submission with an account-service notice. The parent page still exposes the parent-account creation option; the child page remains sign-in-only. No fictional parent or child account is substituted.

With those two values set, each site requires a real Supabase sign-in and admits only the matching role (parent or child, from `family_members`). The parent can create linked child accounts from Settings; children cannot create accounts. The session lives in `sessionStorage`. Family dashboards start empty until real account-scoped records exist. Only the parent provider-key controls are live, and they need the server variables in `.env.example`; provider testing and live AI calls remain disabled.

## Checks

```sh
npm run lint
npm test
npm run build
npm run scan
npm audit
```

## Deployment status and preparation

The two Vercel production projects are live:

- Child: `https://safeai-learning-hub-child.vercel.app`
- Parent: `https://safeai-learning-hub-parent.vercel.app`

Deploy each project from the repository root with its matching configuration so
the child cannot accidentally publish the parent build:

```sh
vercel deploy --prod --yes --scope team_8IFjLznPSnhrdoh5moAHdKTL \
  --project safeai-learning-hub-child --local-config vercel.child.json
vercel deploy --prod --yes --scope team_8IFjLznPSnhrdoh5moAHdKTL \
  --project safeai-learning-hub-parent --local-config vercel.parent.json
```

The Supabase project `safeai-learning-hub` is live in `eu-central-1`, with project ref `oxuacclbibgbggooqqfy`. The prepared migration has been applied and verified. The browser publishable URL/key and parent server-only credentials are configured through Vercel's encrypted environment settings. Add the public URL and publishable key only to the browser build environment, and keep `SUPABASE_SERVICE_ROLE_KEY`, `API_KEY_ENCRYPTION_SECRET` and `API_KEY_ENCRYPTION_KEY_VERSION` server-side. Both Vercel configs set security headers; if Supabase uses a custom domain, add it to the CSP `connect-src`.

The Supabase schema is the migration in `supabase/migrations/`. It has been applied to the live project and verified with migration, table/RLS and read-only SQL checks. `npm test` also runs it in PGlite (in-process Postgres) with negative-access tests. The Supabase security advisor reports one intentional private-schema RLS informational notice; the performance advisor reports foreign-key index and policy-shape improvements to review before real family data is enabled.
