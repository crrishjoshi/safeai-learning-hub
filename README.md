# SafeAI Learning Hub

SafeAI Learning Hub is a two-site educational prototype that helps young people aged 12–14 learn how to use generative AI thoughtfully, while giving a linked parent or guardian a clear, privacy-conscious way to understand safety decisions.

Source repository: [github.com/crrishjoshi/safeai-learning-hub](https://github.com/crrishjoshi/safeai-learning-hub)

It was built for the IST4000 Explore PORT2 “Technology of Tomorrow” case study. The focus is generative-AI literacy: prompting, checking information, protecting privacy, and knowing when to ask a trusted adult for help.

## Try the hosted prototype

- [Child learning space](https://safeai-learning-hub-child.vercel.app/)
- [Parent family space](https://safeai-learning-hub-parent.vercel.app/)

The parent site creates and manages linked child accounts. The child site is sign-in only. Demonstrations should use fictional accounts and fictional content.

## Why it is useful

SafeAI makes an important AI-safety idea visible: a helpful system should explain what it can do, where it draws a boundary, and what happens next. It combines short learning activities with a connected parent experience so a demonstrator can see the relationship between:

- useful AI learning;
- privacy and digital-footprint education;
- safe adult support;
- parent approval for selected sensitive topics;
- calm refusal of unsafe requests; and
- immediate-risk storyboard guidance that is separate from ordinary approval.

It is useful as an educational demonstration, a discussion aid for ethical product design, and a testable starting point for future user research. It is not a safeguarding service or a claim that automated classification is always correct.

## What is included

- React, TypeScript and Vite applications in `apps/child` and `apps/parent`.
- Supabase Auth with a parent-owned family and parent-created child accounts.
- Multiple linked child accounts with parent-selected account controls.
- Interactive lessons for writing useful prompts and privacy/digital footprints, plus five additional lesson cards.
- Allowed, safe adult-support, parent approval, blocked and immediate-risk states.
- Fixed safety precedence: **immediate-risk → blocked → approval → safe adult-support → allowed**.
- Parent dashboard, activity history, approval centre, alerts, settings, progress and provider-key controls.
- Redacted durable history for non-urgent outcomes; protected immediate-risk records are kept outside ordinary chat history.
- Child privacy notice and acknowledgement/assent demonstration.
- Guided walkthrough foundations for both experiences.
- Responsive layouts, keyboard focus, colour-plus-text status labels and reduced-motion support.
- Server-side provider boundary: provider credentials never enter the child bundle.

## Security boundary

The repository is intentionally safe to publish:

- `.env` files, Vercel metadata, dependencies, build outputs, logs and local agent settings are ignored.
- Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` may reach browser code.
- Service-role, encryption and provider credentials are server-only environment variables.
- Provider keys are encrypted server-side and exposed to the browser only as masked metadata.
- Roles are read from family membership, not editable user metadata.
- Supabase Row Level Security scopes parents to their family and children to their own records.
- Blocked and immediate-risk wording is not repeated in ordinary history or notification text.
- The repeatable secret scan must pass before publishing.

Never add a real key, password, bearer token, child record or private account data to this repository, an issue, a screenshot or a commit.

Read the detailed controls in [`docs/SECURITY.md`](docs/SECURITY.md) and the complete chronological engineering record in [`PROJECT_REPORT.md`](PROJECT_REPORT.md).

## Local development

```sh
npm install
npm run dev:child -- --host 127.0.0.1 --port 4173
npm run dev:parent -- --host 127.0.0.1 --port 4174
```

Set only the variable names documented in [`.env.example`](.env.example), using private local values. Without Supabase configuration, the apps intentionally show an honest disabled sign-in boundary rather than fictional accounts.

## Verification

```sh
npm run lint
npm test
npm run build
npm run scan
npm run evaluate:safety
```

The current gate is recorded in [`PROJECT_REPORT.md`](PROJECT_REPORT.md). The latest verified result is 63/63 tests, successful TypeScript checks and builds, a zero-finding secret scan, and successful protected safety evaluation.

## Prototype limits

This is a PORT2 prototype, not production family software. Real deployment would still need specialist safeguarding operations, independent safety evaluation, formal accessibility and usability testing, age-appropriate design and DPIA review, retention/deletion policy, rate limiting, monitored notifications, incident response and a decision about whether real child use is appropriate. The safeguarding queue is an operational foundation only; it is not an emergency service.

For the rationale, design decisions, acceptance evidence, security status, known limitations and future work, read [`docs/SAFEAI_PROJECT_REPORT.md`](docs/SAFEAI_PROJECT_REPORT.md). The [project card](docs/safeai-project-card.svg) is included for portfolio sharing.

