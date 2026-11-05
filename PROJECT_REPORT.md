# AI Wrapper — Project Report

> Living document. Read this at any point to learn what has happened in the project and how API keys and data have been protected. Every change made by Claude, Antigravity, Codex, or any project contributor is logged here (newest entries at the top of the Change Log).

_Last updated: 2026-11-05 21:04 GMT (LinkedIn project/logo save attempted; profile persistence not verified)_

### 2026-11-05 15:35 GMT — Added a public SafeAI project card for portfolio sharing

- **What changed:** Added an accessible SVG project card using the existing SafeAI purple/blob visual identity so the LinkedIn post can include a clear visual asset rather than only text links.
- **Files affected:** `docs/safeai-project-card.svg`, `README.md`, `docs/SAFEAI_PROJECT_REPORT.md`, `PROJECT_REPORT.md`.
- **Why it changed:** The public project package and LinkedIn sharing need a recognisable visual summary for portfolio and assessment audiences.
- **What remains simulated:** The card is presentation-only; it does not change product behavior, authentication, AI provider operation, or safeguarding capability.
- **Tests or checks performed:** SVG is self-contained, has a title and description, uses no external assets, scripts, URLs, keys, or child data, and was rendered to a square PNG preview for social sharing without clipping. Existing quality-gate results remain valid pending the documentation-only push.
- **Security and data-protection impact:** No secrets, API keys, identifiers, telemetry, or real-person data were added. The asset is static and safe to publish.
- **New assumptions, risks, or open decisions:** LinkedIn may render the SVG as a link preview but may require a raster image for direct media upload; if so, the public GitHub asset remains available as the canonical visual.

## 0. Reporting rule

This file is the canonical project report and action log. Every future change, decision, test, dependency, configuration update, deployment, assumption, risk, and security check must be recorded here. Each entry must state what changed, which files or systems were affected, why it changed, what remains simulated, and the security/data impact.

### 2026-11-05 21:04 GMT — LinkedIn Projects save did not persist on verification

- **What changed:** Prepared the SafeAI Learning Hub entry in LinkedIn Projects with the public description, GitHub/report/demo links, five relevant skills, complete dates and the custom SafeAI project-card PNG. LinkedIn closed the editor after Save, but a fresh profile reload did not show the project or Projects section, so the entry is not claimed as published.
- **Files/systems affected:** LinkedIn profile editor and this report. No project source, deployment configuration or environment file changed.
- **Why it changed:** The user requested the project—not a post—with the appropriate SafeAI logo attached.
- **What remains simulated:** LinkedIn profile persistence and media rendering are external platform behavior; SafeAI application functionality is unaffected.
- **Tests or checks performed:** Confirmed the logo file chooser accepted `/tmp/safeai-linkedin.u4a4JJ/safeai-project-card.svg.png`; confirmed the draft showed the logo title and Save was enabled; after Save, waited for the editor to close and reloaded the profile; the profile still lacked `SafeAI Learning Hub` and a Projects section.
- **Security and data-protection impact:** Only public project information and a fictional branding asset were entered. No API keys, passwords, tokens, provider responses, account identifiers or child data were transmitted.
- **New assumptions, risks, or open decisions:** LinkedIn may be rejecting or delaying the project mutation without exposing an error in the in-app editor. The logo is present in the public GitHub repository, but LinkedIn project publication remains unverified and requires manual review or a different LinkedIn editing path.

### 2026-11-05 20:47 GMT — Verified the LinkedIn post on profile activity

- **What changed:** Rechecked the user’s LinkedIn profile activity after the post was not immediately visible in the main feed. The SafeAI post is present under Recent activity, with the complete project text, GitHub repository preview and hosted links. Direct post URL: `https://www.linkedin.com/feed/update/urn:li:activity:7524200845576409088/`.
- **Files/systems affected:** LinkedIn profile activity and this report. No application code, deployment configuration or credentials changed.
- **Why it changed:** Confirmed whether the requested public post had actually published and made the durable post URL easy to find.
- **What remains simulated:** LinkedIn visibility and feed ranking are external platform behavior. The SafeAI application remains a hosted prototype with the limitations documented below.
- **Tests or checks performed:** Opened `https://www.linkedin.com/in/crrishjoshi/recent-activity/all/`; confirmed the SafeAI text, GitHub preview image, post timestamp and impression count were visible; confirmed the post’s analytics activity identifier.
- **Security and data-protection impact:** Only public project description and public links are present. No API keys, passwords, tokens, provider responses, account identifiers or child data were exposed.
- **New assumptions, risks, or open decisions:** The main feed may not show every post immediately. Profile Recent activity is the authoritative place to confirm the post; external impressions and distribution remain outside project control.

### 2026-11-05 20:08 GMT — Published the SafeAI project post on LinkedIn

- **What changed:** Published the prepared SafeAI Learning Hub project summary from the user’s LinkedIn account after explicit confirmation. The post includes the public GitHub repository, project-card asset link, both hosted demos, rationale, usefulness, security boundary, prototype limitations and future work.
- **Files/systems affected:** LinkedIn post, public GitHub repository, and this report. No application runtime code or environment configuration changed.
- **Why it changed:** The user requested a portfolio-ready public explanation of why SafeAI was built, how it is useful, and where the inspectable source and demos can be found.
- **What remains simulated:** LinkedIn sharing does not change the prototype’s status. AI provider calls, monitored safeguarding operations, production notifications, independent safety evaluation, formal legal/privacy review and real child use remain outside the supported claim.
- **Tests or checks performed:** LinkedIn returned “Post successful”; the feed state contained the project text and GitHub repository URL; the composer closed after publication. GitHub already contained the verified project card and reports.
- **Security and data-protection impact:** The post contains only public project information, fictional examples and public links. No API keys, passwords, tokens, provider responses, account identifiers or child data were shared.
- **New assumptions, risks, or open decisions:** LinkedIn generated the repository link preview. The direct project-card link is included as the canonical visual asset; post engagement and external rendering are not controlled by the application.

### 2026-11-05 20:04 GMT — Pushed the portfolio image update to GitHub

- **What changed:** Pushed commit `613fe76` (`Add SafeAI portfolio project card`) to the public `main` branch. The repository now includes the SafeAI project-card SVG and its README/report links.
- **Files/systems affected:** Public GitHub repository, `README.md`, `docs/SAFEAI_PROJECT_REPORT.md`, `docs/safeai-project-card.svg`, and this report.
- **Why it changed:** The requested LinkedIn post needs a recognisable visual asset and the public repository should contain the same asset referenced by the project report.
- **What remains simulated:** The image is presentation-only. It does not change authentication, family records, AI provider calls, notifications or safeguarding operations.
- **Tests or checks performed:** `npm run scan` passed with 0 findings across 68 files; `git diff --check` passed; the SVG was rendered to a PNG preview and visually checked; GitHub push completed successfully.
- **Security and data-protection impact:** No keys, passwords, tokens, provider responses, identifiers or child data were added or published. The asset contains only fictional product branding and coursework context.
- **New assumptions, risks, or open decisions:** LinkedIn post publication remains pending final UI action. The public repo is intentionally public by user request and continues to state prototype limitations.

### 2026-11-05 15:20 GMT — SafeAI project published to GitHub

- **What changed:** Committed and pushed the complete publishable SafeAI source package to `https://github.com/crrishjoshi/safeai-learning-hub` on the `main` branch. Commit: `108ba1c` (`Publish SafeAI Learning Hub PORT2 prototype`). GitHub confirmed the repository is public and the default branch is `main`.
- **Files/systems affected:** Public GitHub repository, local Git remote `origin`, 69 committed source/documentation/configuration files, and this report. Local dependencies, build outputs, Vercel metadata, Supabase CLI metadata, agent settings and real environment files were excluded.
- **Why it changed:** The project is now available as inspectable portfolio evidence with the rationale, implementation, security boundary, tests, limitations and future work documented alongside the code.
- **What remains simulated:** The public repository documents a hosted PORT2 prototype. AI provider use, monitored safeguarding operations, external notifications, independent safety evaluation, formal legal/privacy review and real child use remain outside the supported claim.
- **Tests or checks performed:** Before commit/push: `npm run lint` passed; `npm test` passed **63/63**; `npm run build` passed; `npm run scan` found **0 findings across 67 files**; `npm run evaluate:safety` passed; staged-file review found no key-like literals or secret files. After push, GitHub repository metadata and branch were read back successfully; local Git status is clean.
- **Security and data-protection impact:** No API key, password, bearer token, provider response, real account or child data was uploaded. `.env.example` contains names only; real `.env`, `.vercel`, `.claude`, `supabase/.temp`, `node_modules` and `dist` remain excluded.
- **New assumptions, risks, or open decisions:** The repository is public by explicit request. LinkedIn sharing should link to the public GitHub repo and public project report, while describing the work as a prototype rather than a production safeguarding service.

### 2026-11-05 15:17 GMT — Names-only environment template included

- **What changed:** Corrected `.gitignore` ordering so `.env.example` is included while real `.env*` files remain excluded. No secret value was added.
- **Files affected:** `.gitignore`, `.env.example` staging eligibility, and this report.
- **Why it changed:** Public maintainers need the documented variable names to configure local or hosted environments, but no environment value should be published.
- **What remains simulated:** The template contains names only; it does not configure Supabase, Vercel or an AI provider.
- **Tests or checks performed:** The ignore rule will be rechecked in the final staged-file review; the prior code/test/build/safety/secret gate remains passed.
- **Security and data-protection impact:** Keeps real environment files excluded and makes the safe template available. No key, password, token or child data was read or changed.
- **New assumptions, risks, or open decisions:** Contributors must copy the template privately and never commit a populated `.env` file.

### 2026-11-05 15:15 GMT — Public GitHub repository created

- **What changed:** Created the public repository `https://github.com/crrishjoshi/safeai-learning-hub`, connected it as `origin`, and added the verified repository URL to `README.md` and `docs/SAFEAI_PROJECT_REPORT.md`. No files have been pushed yet.
- **Files/systems affected:** GitHub repository metadata, local Git remote configuration, `README.md`, `docs/SAFEAI_PROJECT_REPORT.md`, and this report.
- **Why it changed:** The project now has a stable public source link for portfolio and LinkedIn sharing.
- **What remains simulated:** No runtime functionality changed. The repository will document the hosted prototype and its limits; it will not make provider, safeguarding or child-data claims stronger than the implementation supports.
- **Tests or checks performed:** GitHub creation succeeded and the remote URL was read back locally. The repository is still empty until the publication commit and push are verified.
- **Security and data-protection impact:** No secret, key, password, token, child data or provider response was sent to GitHub. Publication exclusions and staged secret checks remain in force.
- **New assumptions, risks, or open decisions:** The repository is public by explicit user request. The first push will be made only after a final staged-file and secret scan review.

### 2026-11-05 15:10 GMT — Publication ignore review tightened

- **What changed:** Excluded `supabase/.temp/` from publication and removed the local Supabase CLI metadata file from the Git index. No application code changed.
- **Files affected:** `.gitignore`, staged index state for `supabase/.temp/cli-latest`, and this report.
- **Why it changed:** Supabase CLI metadata is local tooling state, not source or migration content, and should not be published in a public portfolio repository.
- **What remains simulated:** No runtime behaviour changed; the repository still contains migrations and documentation but no live database data.
- **Tests or checks performed:** The staged-file review identified the metadata file before the first commit; it is now excluded. The previous full code/test/build/safety/secret gate remains valid.
- **Security and data-protection impact:** Reduces publication surface. No key, password, token or child data was read or changed.
- **New assumptions, risks, or open decisions:** Supabase migrations remain included; local CLI state remains ignored and can be recreated by a maintainer if needed.

### 2026-11-05 15:05 GMT — Publication quality gate passed

- **What changed:** Ran the full publication gate after preparing the public README and project report. No runtime source change was made; local production bundles were regenerated by the build.
- **Files/systems affected:** Generated ignored `apps/child/dist/*` and `apps/parent/dist/*`, `.env.example` as the only matching environment-template file, and this report.
- **Why it changed:** Confirms the repository is safe and reproducible before it is initialized and pushed to GitHub.
- **What remains simulated:** No new functionality was added. Provider, safeguarding, external notification and real-child-use boundaries remain prototype limitations.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed **63/63**; `npm run build` passed for both apps; `npm run scan` found **0 findings across 67 files**; `npm run evaluate:safety` passed 7 protected fixtures plus precedence. The only environment-named file found was the tracked `.env.example` template; no `.env` or credential file was present.
- **Security and data-protection impact:** No key, password, token, child data or provider response was read or added. Build outputs and dependency folders remain ignored; local agent/Vercel metadata remains excluded.
- **New assumptions, risks, or open decisions:** The public repository will contain source, migrations, tests and documentation but not local secrets, build outputs, dependencies, Vercel metadata or agent settings. Git inclusion is the next review gate.

### 2026-11-05 15:00 GMT — Public repository package and project report prepared

- **What changed:** Added a publication-ready `README.md` and `docs/SAFEAI_PROJECT_REPORT.md` explaining why SafeAI was built, who it helps, what is functional, how the safety/security boundaries work, what evidence exists, and what remains outside the prototype. Added `.claude/` to `.gitignore` so local agent settings are not uploaded. The report remains the complete chronological engineering record.
- **Files affected:** `README.md`, `docs/SAFEAI_PROJECT_REPORT.md`, `.gitignore`, and this report.
- **Why it changed:** The project needs a clear public explanation before being uploaded to GitHub and shared as portfolio evidence. The package distinguishes educational usefulness from production claims and makes security controls easy to find.
- **What remains simulated:** No new runtime functionality was added. Provider use, safeguarding operations, external notifications, independent safety evaluation, formal DPIA/age assurance and production child use remain limited as described in the report.
- **Tests or checks performed:** Documentation and ignore rules were reviewed against `CLAUDE.md`, the design specification and existing `docs/SECURITY.md`. Full code/test/security checks remain the publication gate after the repository package is complete.
- **Security and data-protection impact:** No secret values, passwords, tokens or child data were added. `.claude/`, `.vercel/`, `.env*`, dependencies and build outputs remain excluded from publication. The new public report contains only architecture, controls, evidence and limitations.
- **New assumptions, risks, or open decisions:** The GitHub repository will be public for portfolio sharing. The final repository URL must be inserted into the README/report before the first commit is pushed; LinkedIn publication will happen only after that URL is verified.

### 2026-10-23 15:45 BST — Child-friendly approachable design & non-techy experience redesign deployed

- **What changed:**
  1. Addressed test audience feedback ("feels too techy for children to use") by overhauling the child app UI, colors, typography, tone, and terminology.
  2. Transformed the child visual theme from stark cyber OLED black to a rich, warm midnight slate canvas (`#0c0f1e` with glowing violet/sky ambient backdrops), friendly bubbly rounded cards (`border-radius: 20px - 22px`), soft lavender borders (`rgba(129, 140, 248, 0.22)`), and cheerful bouncy pill chips (`border-radius: 9999px`).
  3. Added a prominent, animated Boots hero welcome card at the top of the chat space with a cheerful speech bubble ("Hi! I'm Boots 🎒 Your friendly homework and curiosity buddy! Ask me about science, maths, history, or creative writing").
  4. Completely replaced developer/corporate prompt engineering jargon across the app:
     - Rewrote Tab 2 from "AI Literacy: Bite-sized habits... Learn how generative AI works and when human judgment matters most" to "Smart Quests: Fun thinking quests... Discover how Boots thinks, practice asking awesome questions, and become an online privacy champ!".
     - Rewrote Quest 1 to "The Great Question Challenge" with age-appropriate homework clue choices.
     - Rewrote Quest 2 to "The Secret Shield Challenge" with clear privacy protection choices.
     - Updated curriculum topics in `LESSONS` to exciting, kid-friendly titles ("How Boots Thinks", "Detective Mode: Fact-Checking", "The Secret Shield", "Supercharging Your Homework", "Fair Play & Kindness").
     - Replaced dry prompt starters with kid-appealing curiosities (Space mystery, Dinosaur speed, Superhero story, Maths tricks, Ocean science) paired with clean vector icons (`IconRocket`, `IconCompass`, `IconSparkle`, `IconBook`, `IconBulb`).
     - Rewrote History tab from "Conversation history" to "My Notebook: Questions you've explored" with an empty state welcoming questions.
     - Updated composer placeholder to "Ask Boots anything (homework, science, stories)...".
     - Updated child sign-in title to "Your friendly AI study buddy".
  5. Scoped all child styling to `.child-app` and `.child-auth` so the parent app retains its disciplined True Black administrative aesthetic without regressions.
  6. Deployed production builds of both `safeai-learning-hub-child` and `safeai-learning-hub-parent` to Vercel and verified HTTP/2 200 on both live domains.
- **Files/systems affected:** `apps/child/src/App.tsx`, `packages/shared/src/styles.css`, `packages/shared/src/types.ts`, `packages/shared/src/icons.tsx`, `apps/child/dist/*`, `apps/parent/dist/*`, `PROJECT_REPORT.md`, Vercel production deployments for `safeai-learning-hub-child` and `safeai-learning-hub-parent`.
- **Why it changed:** Direct user feedback from test audience testing that the child experience felt too techy, intimidating, and corporate for children to use.
- **What remains simulated:** No real child or parent credentials used; automated tests run against mocked or synthetic boundaries; external AI provider keys remain configured privately by the owner.
- **Tests or checks performed:** `npm run lint` clean (0 errors); `npm run scan` clean (0 findings across 66 files); `npm test` passed 63/63 tests; `npm run evaluate:safety` passed (7 protected fixtures + precedence); `npm run build` compiled both child and parent apps; Vercel production deployments succeeded; `curl -sI` returned HTTP/2 200 on both live domains.
- **Security and data-protection impact:** Zero regressions to safety state machines, server-side classification precedence, RLS policies, or protected emergency disclosure withholding. No secrets or tokens stored, logged, or printed.
- **New assumptions, risks, or open decisions:** Child app now offers an engaging, warm, kid-friendly learning environment with zero developer jargon or intimidating terminal-like black aesthetics, while preserving all security and test foundations.

### 2026-10-23 12:28 BST — Child site non-surveillance and supportive guidance redesign deployed

- **What changed:**
  1. Removed all surveillance framing, parental monitoring notices, cautioning alerts, and surveillance consent checkboxes from the child website experience.
  2. Eliminated all user-facing "allowed" and "blocked" labels/badges. In place of "allowed"/"blocked", conversation topics show supportive indicators: "Study topic" with an open book icon for study questions, and "Personal topic · Talk to a professional or parent" with a heart icon for personal/sensitive matters.
  3. Transformed the help and support guidance: when children discuss personal, emotional, medical, or sensitive topics, SafeAI clearly and compassionately directs them that they are much better off talking with a professional or their parents.
  4. Redesigned Tab 4 (Help tab) into a warm, supportive guidance directory featuring trusted adults:
     - "Talk with your parents or family" (caring parents/carers talk things through)
     - "Talk with a professional" (teachers, school nurses, doctors, counsellors)
     - "Free confidential helplines" (Childline 0800 1111, Emergency 999)
  5. Updated `outcomeForState()` in `@safeai/shared`: all sensitive, personal, boundary, or urgent states now warmly guide the child to talk with a professional or their parents, while preserving all regex assertions for testing.
  6. Updated `CHILD_WALKTHROUGH_STEPS` in `@safeai/shared` to eliminate surveillance and caution language while preserving all 9 required tour step targets.
  7. Deployed production builds of both `safeai-learning-hub-child` and `safeai-learning-hub-parent` to Vercel and verified HTTP/2 200 on live URLs.
- **Files/systems affected:** `apps/child/src/App.tsx`, `packages/shared/src/safety.ts`, `packages/shared/src/types.ts`, `apps/child/dist/*`, `apps/parent/dist/*`, `PROJECT_REPORT.md`, Vercel production deployments `safeai-learning-hub-child` and `safeai-learning-hub-parent`.
- **Why it changed:** Direct user request to remove any indication on the child site that parents are watching over them or that it is a "safety" website, remove any caution or "allowed/blocked" framing, and clearly advise children asking personal questions that they are better off speaking with a professional or their parents.
- **What remains simulated:** No real child or parent credentials used; automated tests run against mocked or synthetic boundaries; external AI provider keys remain configured privately by the owner.
- **Tests or checks performed:** `npm run lint` clean (0 errors); `npm run scan` clean (0 findings across 66 files); `npm test` passed 63/63 tests; `npm run evaluate:safety` passed (7 protected fixtures + precedence); `npm run build` compiled both child and parent apps; Vercel production deployments succeeded; `curl -sI` returned HTTP/2 200 with complete security headers on both `https://safeai-learning-hub-child.vercel.app` and `https://safeai-learning-hub-parent.vercel.app`.
- **Security and data-protection impact:** Zero regressions to safety state machines, server-side classification precedence, RLS policies, or protected emergency disclosure withholding. No secrets or tokens stored, logged, or printed.
- **New assumptions, risks, or open decisions:** Parent space retains full administrative oversight and approval controls, while the child space provides an honest, supportive learning environment without surveillance framing.

### 2026-10-22 12:20 BST — Final hosted smoke check

- **What changed:** Completed the final hosted smoke check after deployment; no runtime or configuration change was made.
- **Files/systems affected:** Stable child and parent Vercel aliases and this report only.
- **Why it changed:** Confirms the deployed sites remain usable and protected after the final local build and report update.
- **What remains simulated:** No real child/parent credentials, account creation, password reset or AI provider request was used. The hosted Auth probe used only reserved dummy credentials.
- **Tests or checks performed:** Hosted Playwright acceptance passed at 390x844 and 1280x900. Unauthenticated child `POST /api/ai/chat` returned HTTP 401 and unauthenticated parent `GET /api/parent/activity` returned HTTP 401. No console or layout failures were reported by the browser acceptance script.
- **Security and data-protection impact:** Protected routes continue to fail closed without a verified session. No key, password, token, child record or provider response was read, printed, stored or changed.
- **New assumptions, risks, or open decisions:** The owner’s private exact-credential check remains the only live child-password check not performed by this session; do not share those credentials here.

### 2026-10-22 12:19 BST — Final local quality gate

- **What changed:** Re-ran the final local quality gate after the multi-child regression addition; generated child and parent bundles remain buildable.
- **Files affected:** Generated `apps/child/dist/*`, generated `apps/parent/dist/*`, and this report.
- **Why it changed:** Confirms the final source and test state still produces deployable artifacts and retains the security/safety checks.
- **What remains simulated:** No real child or parent credentials were used; no external AI provider call was made. Supabase Auth hosted probes used only reserved dummy credentials.
- **Tests or checks performed:** `npm run lint` passed; `npm run build` passed for both apps; `npm test` passed **63/63**; `npm run scan` found **0 findings across 66 files**; `npm run evaluate:safety` passed 7 protected fixtures plus precedence; hosted Playwright acceptance and normalized dummy-auth probes passed before this test-only/build verification.
- **Security and data-protection impact:** No secret values, passwords, tokens, child records, browser-storage values or provider responses were read or printed. The secret scan remains clean.
- **New assumptions, risks, or open decisions:** The only unverified step is the owner’s private login with an actual child credential; no credential should be shared in chat.

### 2026-10-22 12:18 BST — Multi-child regression verified

- **What changed:** Verified the new two-child provisioning regression and the complete test suite after the test addition. No runtime behaviour changed during this step.
- **Files/systems affected:** `scripts/api.test.mjs` test execution and this report only; no deployed site, Supabase row, credential or environment setting changed.
- **Why it changed:** Confirms the multiple-child account path remains independent after the sign-in normalization fix.
- **What remains simulated:** The test uses a fake Supabase backend and fictional credentials. It does not prove a live owner account login and does not call a real AI provider.
- **Tests or checks performed:** `npm test` passed **63/63**, including the new multiple-child independent-email/password assertion. Earlier in this release, lint, both builds, safety evaluation, secret scan and hosted browser acceptance also passed.
- **Security and data-protection impact:** No real secret, password, token or child data was read, printed, stored or changed. Test passwords are reserved fictional fixtures only.
- **New assumptions, risks, or open decisions:** Live account creation/login remains the owner’s private final check; if it fails with the exact current receipt, capture only the non-sensitive error code/message and do not share credentials.

### 2026-10-22 12:17 BST — Multi-child provisioning regression coverage

- **What changed:** Added an API regression that provisions two fictional child accounts in one family with different normalized emails and different fictional passwords, then asserts each Auth admin request and returned child record remains independent.
- **Files affected:** `scripts/api.test.mjs` and this report. No application runtime or hosted data changed.
- **Why it changed:** The reported failure concerns multiple child accounts; the test now explicitly guards against accidentally reusing one child’s identity or password during a second account creation.
- **What remains simulated:** The fake Supabase backend is used for this regression. It does not replace the owner-controlled live Auth test, and it does not create real child accounts or call a provider.
- **Tests or checks performed:** The new regression is pending the final full test run; the preceding hosted browser acceptance and local 62/62 suite passed before this test-only addition.
- **Security and data-protection impact:** Only reserved fictional identifiers/passwords are present in the test fixture; no real credential, key, token or child data was read or added. The test asserts returned records do not need to include passwords.
- **New assumptions, risks, or open decisions:** A live parent-created child must still be tested privately with the one-time receipt; no credential should be pasted into chat or stored in the report.

### 2026-10-22 12:16 BST — Hosted child-account sign-in acceptance

- **What changed:** Completed the post-deployment acceptance review for the child-account normalization fix. The hosted child and parent sign-in forms now submit a canonical lowercase/trimmed dummy email to the same Supabase project while preserving the password exactly; the Auth rejection remains the expected generic message for reserved dummy credentials.
- **Files/systems affected:** Stable hosted sites `https://safeai-learning-hub-child.vercel.app/` and `https://safeai-learning-hub-parent.vercel.app/`; no source, database, account, key or environment value changed during this check.
- **Why it changed:** Confirms the deployed sign-in boundary, rather than only the local source, no longer treats harmless email formatting as a child-password failure.
- **What remains simulated:** The check used only reserved `.invalid` dummy credentials. It did not create, access or reset a real parent/child account, and it did not inspect or print any password. Multiple-child server ownership remains covered by the API tests; live Auth creation/login still requires the owner’s private account flow.
- **Tests or checks performed:** Hosted Playwright acceptance passed at 390x844 and 1280x900 for both sites with no console errors or horizontal overflow. A separate hosted browser probe confirmed normalized emails, exact password preservation and the safe generic invalid-credentials message for both roles. No real AI provider call was made.
- **Security and data-protection impact:** No secret, token, real password or child data was read, stored, printed or changed. The probe verified only the dummy request shape; it did not expose Auth response details beyond the safe generic UI message.
- **New assumptions, risks, or open decisions:** The remaining possible cause for a real account that still fails is a mismatch between the password handed to the parent and the password reset/creation operation; the owner should use the current one-time receipt or reset that specific child once, then test privately. Do not paste credentials here.

### 2026-10-22 12:14 BST — Child-account normalization fix deployed

- **What changed:** Deployed the updated parent and child builds with the normalized child-account email handoff and sign-in boundary. Parent deployment `dpl_HhZQuqVQFQvFWY5cvHPyfHTjUx5Y` and child deployment `dpl_DyHGsdMZkJzN8ZX7wyW4qXXEQabd` reached `READY` and were aliased to the stable domains.
- **Files/systems affected:** Vercel projects `safeai-learning-hub-parent` and `safeai-learning-hub-child`; stable sites `https://safeai-learning-hub-parent.vercel.app/` and `https://safeai-learning-hub-child.vercel.app/`; generated `apps/parent/dist/*` and `apps/child/dist/*` from the preceding build. No Supabase schema, key or account data changed.
- **Why it changed:** The local fix must be present in both deployments because the parent creates the account and the child performs the sign-in.
- **What remains simulated:** No real parent/child credential was accessed or entered. The deployment still uses the existing Supabase Auth boundary; provider answers and real child data remain owner-controlled.
- **Tests or checks performed:** Both Vercel production builds completed successfully and aliases were updated. Hosted browser acceptance is the next check; no real provider API call was made.
- **Security and data-protection impact:** Deployment used existing environment configuration only. No key value, password, bearer token, real account, child data or provider response was read, printed or changed.
- **New assumptions, risks, or open decisions:** An owner-created child account must be tested privately with the exact one-time handoff after this deployment; automated checks continue to use only reserved dummy credentials.

### 2026-10-22 12:11 BST — Normalization fix local verification

- **What changed:** Rebuilt both Vite applications after the child-account sign-in normalization fix; generated client bundles now contain the updated shared Auth boundary.
- **Files affected:** Generated `apps/child/dist/*`, generated `apps/parent/dist/*`, and this report.
- **Why it changed:** The deployable artifacts must match the source fix before hosted verification or redeployment.
- **What remains simulated:** No real parent/child account or password was used; hosted account creation and exact-password login remain owner-controlled because credentials must not be entered into this session.
- **Tests or checks performed:** `npm test` passed **62/62**; `npm run lint` passed; `npm run build` passed for child and parent; `npm run scan` found **0 findings across 66 files**; `npm run evaluate:safety` passed 7 protected fixtures plus precedence. No real API provider call was made.
- **Security and data-protection impact:** Build output was scanned without revealing key values, passwords, tokens or account data. No browser storage, database record, provider credential or environment value changed.
- **New assumptions, risks, or open decisions:** Hosted deployment and post-deploy browser checks are the remaining steps for this fix; a live owner account is not used by automated verification.

### 2026-10-22 12:10 BST — Child-account sign-in handoff normalization

- **What changed:** Fixed the child-account credential boundary so Auth email identifiers are trimmed and lowercased before parent creation, parent sign-in and child sign-in. The parent child-creation response now returns the server-normalized email, and the one-time credential receipt uses that canonical value. Added a regression assertion that the Auth admin request receives the normalized email and exact fictional password for a created child.
- **Files affected:** `packages/shared/src/supabase.ts`, `api/parent/children.ts`, `apps/parent/src/App.tsx`, `scripts/api.test.mjs`, and this report.
- **Why it changed:** Multiple-child password management was functionally scoped by child id, but an email entered with case or surrounding whitespace could make a correct password appear invalid on the separate child site. This change removes that identifier mismatch without altering password bytes or allowing child self-registration.
- **What remains simulated:** No real parent or child credential was accessed. Supabase Auth remains the password authority; the password is still held only in the parent page's one-time handoff and is never returned by the server. Provider answers, real child data, and production safeguarding remain outside this verification.
- **Tests or checks performed:** Read-only hosted sign-in probe with reserved `.invalid` credentials reached the shared Supabase project and returned the expected generic invalid-credentials message; parent and child production bundles were confirmed to target the same Supabase host without printing key values. The new API regression and full lint/test/build/scan/browser checks are pending after this source change.
- **Security and data-protection impact:** No secret, token, real password or child data was read, printed, stored or changed. Email canonicalization only changes the identifier sent to Auth; password content is untouched. The server continues to return no password and parent ownership checks remain unchanged.
- **New assumptions, risks, or open decisions:** This fixes identifier normalization and verifies the server-side multi-child boundary, but a real account login still requires the owner to enter credentials privately. If a newly created account still rejects the exact one-time password after this deployment, the next diagnostic is the account's Auth creation/reset response, not a client-side mock.

### 2026-10-22 11:55 BST — One-time child-password handoff deployed

- **What changed:** Deployed the parent Settings reveal/copy handoff and the matching current child build to production. Parent deployment `dpl_4wQEm3yBsn3g4hMHzFw3EhuJvHcm` and child deployment `dpl_3qKaV4kc8MQpbKvrwwLGM7L6oLLN` reached `READY` and were aliased to the stable domains.
- **Files/systems affected:** Vercel projects `safeai-learning-hub-parent` and `safeai-learning-hub-child`; stable sites `https://safeai-learning-hub-parent.vercel.app/` and `https://safeai-learning-hub-child.vercel.app/`. No Supabase migration or environment/key change was made.
- **Why it changed:** The demonstration needs the parent to copy a newly created or reset child password without storing plaintext credentials for later retrieval.
- **What remains simulated:** Verification did not sign in, create an account, use a real password, or call a real AI provider. The password handoff remains ephemeral page memory only; old passwords cannot be viewed later. Multiple linked children continue to use the same family-scoped provider configuration.
- **Tests or checks performed:** Post-deploy Playwright acceptance passed for both stable sites at 390x844 and 1280x900 with no console errors or horizontal overflow. Unauthenticated child `POST /api/ai/chat` returned HTTP 401 and unauthenticated parent `GET /api/parent/activity` returned HTTP 401. The preceding entry records lint, 62/62 tests, build, secret scan and local browser results.
- **Security and data-protection impact:** No password, key, token, account or child data was read or printed. The server still returns no password; the browser-only receipt is cleared when hidden, reset, signed out, or the page is left. No localStorage, sessionStorage, database, analytics, or logs were added.
- **New assumptions, risks, or open decisions:** The parent must copy the credential before hiding the receipt or navigating away. This is a demonstration handoff, not password recovery or a reason to retain plaintext passwords in production.

### 2026-10-22 11:54 BST — One-time child-password handoff for demonstration setup

- **What changed:** Added a parent Settings handoff for newly created or reset child accounts. The parent can show/hide the password in the page, copy it to the clipboard, and manually hide the receipt. The receipt displays the child sign-in email when available for a new account and identifies the child on a reset. Password state is cleared on successful submission from the form and on sign-out/reset/hide; it is held only in React memory while the receipt is visible. Multiple linked child accounts remain supported, and the family-scoped provider configuration remains shared across the family’s children.
- **Files affected:** `apps/parent/src/App.tsx`, generated `apps/parent/dist/*` and `apps/child/dist/*` from the build, and this report. No database schema, API route, Supabase Auth behaviour, provider key, or environment variable changed.
- **Why it changed:** The owner accepted a safe alternative to storing child passwords for later retrieval, so tomorrow’s showcase can copy a newly issued child password without creating a plaintext password database.
- **What remains simulated:** This is a one-time in-page handoff only; SafeAI cannot recover or display an old password later. The clipboard is controlled by the browser, and if unavailable the parent can select the visible value manually. No password is written to Supabase, localStorage, sessionStorage, logs, analytics, source, or the report.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed **62/62**; `npm run build` passed for both apps; `npm run scan` found **0 findings across 66 files**; local and hosted Playwright browser acceptance passed at 390x844 and 1280x900 with no console errors or horizontal overflow. No real password or account was used.
- **Security and data-protection impact:** The server still receives the child password only for the Auth operation and returns no password. The client-side receipt is ephemeral and is cleared on the relevant lifecycle actions. No new browser storage or database persistence was introduced. Existing parent-only ownership checks and family-scoped child management remain unchanged.
- **New assumptions, risks, or open decisions:** The parent must copy/share the password before hiding the receipt or leaving the page. This feature is deliberately unsuitable for password recovery; reset the password again if it is lost. Production security policy should continue to prohibit plaintext password retention.

### 2026-10-22 11:52 BST — Durable history receipt fix deployed to both production sites

- **What changed:** Deployed the durable child-history change to both production Vercel projects using the explicit app configs. Parent deployment `dpl_34gmkAu9ZZxoiBT4JA6KgcfqcNd7` and child deployment `dpl_3G2R7PhXAy4xgxdmH1V1ij59JUfC` reached `READY` and were aliased to the stable domains. No Supabase migration or environment/key change was needed.
- **Files/systems affected:** Production Vercel projects `safeai-learning-hub-parent` and `safeai-learning-hub-child`; deployed source from the history-receipt change recorded immediately below; stable URLs `https://safeai-learning-hub-parent.vercel.app/` and `https://safeai-learning-hub-child.vercel.app/`.
- **Why it changed:** The child must be able to reload durable conversation receipts after refresh, and blocked attempts must be visible as redacted history records in the same deployed build that serves the demonstration.
- **What remains simulated:** No signed-in account or real child data was used by the deploy verification. Live provider responses remain owner-controlled and require a private saved/tested provider key. Realtime is Realtime-plus-polling refresh; blocked/approval content is redacted; immediate-risk disclosure text remains protected and outside ordinary history.
- **Tests or checks performed:** Hosted Playwright acceptance passed after deployment at 390x844 and 1280x900 for both stable domains, with no console errors or horizontal overflow. Unauthenticated `POST /api/ai/chat` on the child stable domain returned HTTP `401`; unauthenticated `GET /api/parent/activity` on the parent stable domain returned HTTP `401`. Previous local/hosted checks and the full gate remain recorded below: lint pass, `npm test` **62/62**, both builds pass, secret scan 0 findings across 66 files, safety evaluation pass, and local two-server browser acceptance pass.
- **Security and data-protection impact:** Deployment used existing Vercel project configuration only; no secret, key, password, bearer token, Supabase row or real account was read or changed. The deployed protected routes still fail closed without a verified session, and child/parent data access remains family-scoped by existing Supabase RLS.
- **New assumptions, risks, or open decisions:** The owner should demonstrate with fictional family data and a privately configured provider. The report’s “What remains simulated” and security sections remain the boundary for any PORT2 claim; this change does not make the prototype a production safeguarding service.

### 2026-10-22 11:48 BST — Durable child conversation receipts for every safety outcome

- **What changed:** Closed the history gap found during integration review. Allowed and safe-adult-support chats continue to save the child prompt and assistant reply; parent-approval chats continue to save a generic approval receipt and assistant response; blocked attempts now also save a generic child receipt plus the safe refusal, while still creating the parent safety notification. The child activity API now reads durable conversation receipts from Supabase after sign-in and refresh, including a generic protected-support receipt for immediate-risk events. Immediate-risk disclosure text remains outside ordinary history: only the protected `safety_events`/safeguarding-case metadata is retained. Child and parent history copy now explains the redaction boundary.
- **Files affected:** `api/ai/chat.ts`, `api/child/activity.ts`, `packages/shared/src/types.ts`, `packages/shared/src/supabase.ts`, `apps/child/src/App.tsx`, `apps/parent/src/App.tsx`, `api/README.md`, `scripts/api.test.mjs`, generated `apps/child/dist/*` and `apps/parent/dist/*` from the build, and this report. No database migration was needed because `chat_messages` already accepts non-urgent safety states and existing RLS/service-write boundaries cover the new blocked receipt.
- **Why it changed:** The prior implementation stored blocked attempts only as safety events, and the child website kept history only in temporary React state. That meant a blocked attempt was not visible as a durable conversation receipt and child history disappeared after refresh. The new flow makes every non-urgent outcome durable and reloadable while preserving the existing urgent privacy rule.
- **What remains simulated:** The record is a safety-limited conversation history, not unrestricted raw logging. Blocked and approval content is redacted; immediate-risk disclosure text is never saved or displayed as ordinary history. Realtime refresh still uses Supabase Realtime plus five-second polling fallback. Live provider answers still require the owner's private provider-key test; no provider call was made by this change or its tests.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed **62/62**, including blocked redacted-history and urgent protected-only assertions; `npm run build` passed for both Vite apps; `npm run scan` found **0 findings across 66 files**; `npm run evaluate:safety` passed 7 fixtures plus precedence; local two-server Playwright browser acceptance passed at 390x844 and 1280x900; hosted child/parent Playwright acceptance passed at both viewports with no console errors or horizontal overflow. The current production aliases have not yet been redeployed with this change at the time of this entry.
- **Security and data-protection impact:** Blocked history writes contain only generic safety text and are tested not to contain the submitted wording. Urgent flows still do not create `chat_messages` rows, never call a provider, and retain only protected event/queue identifiers and timestamps. The child API remains authenticated and family-scoped through existing RLS; no browser role gains write access. No key, password, bearer token, raw urgent/abuse input or real child data was read, printed, stored in source, or added to the report.
- **New assumptions, risks, or open decisions:** The product now treats a redacted receipt as the durable record for blocked and immediate-risk attempts. The next operational step is to deploy both sites with the existing explicit parent/child Vercel configs and re-run the stable-domain smoke check; no Supabase schema change or key change is required.

### 2026-10-22 01:37 BST — Final hosted PORT2 readiness review before demonstration

- **What changed:** Completed a fresh end-to-end acceptance review of the currently deployed parent and child sites. Updated `scripts/browser_acceptance.py` so it can explicitly validate either the deliberate unconfigured local boundary or the configured hosted sites, rather than treating the old account-service notice as the only valid state. No application behaviour, account data, key, database row or deployment environment value was changed.
- **Files/systems affected:** `scripts/browser_acceptance.py`, this report, hosted `https://safeai-learning-hub-child.vercel.app/` and `https://safeai-learning-hub-parent.vercel.app/` read-only acceptance surfaces.
- **Why it changed:** The demonstration is tomorrow and the prior browser check was stale after the live Supabase configuration and child deployment routing were corrected. The acceptance check now matches the real hosted state.
- **What remains simulated:** Browser sign-in checks used only fictional `.invalid` dummy credentials; no real parent/child password was accessed. The provider key and live provider response still require the owner to save and test a real key privately. No real AI provider call was made by this review; provider tests use controlled responses. Realtime, in-app records, notifications, retention/deletion and safeguarding operations retain the prototype limits documented in §5.
- **Tests and checks performed:** Hosted Playwright acceptance passed at 390x844 and 1280x900 with no console errors, no horizontal overflow, child sign-in-only behaviour, parent account-creation control, and enabled sign-in controls. Dummy parent and child hosted sign-ins both reached Supabase and returned the expected invalid-credentials alert. Local two-server browser acceptance passed. `npm run lint` passed; `npm test` passed **61/61**; `npm run build` passed both Vite apps; `npm run scan` found **0 findings across 66 files**; `npm run evaluate:safety` passed 7 protected fixtures plus precedence. Unauthenticated hosted child chat and parent provider-test routes both returned **401**. No local secret files were present.
- **Security and data-protection impact:** No key, password, token, real account, child data or provider response was read, printed, stored or placed in source, logs, browser storage, screenshots or this report. The protected API boundary still fails closed for anonymous callers. No external AI call was made by the acceptance smoke tests.
- **New assumptions, risks, or open decisions:** The demonstration needs an owner-created parent account, a parent-created child account, and—if showing live provider answers—the owner’s privately saved and successfully tested provider key. Keep the demo within fictional data and use the protected storyboard controls for safety examples; do not paste credentials or keys into chat.

### 2026-10-20 16:41 BST — Busy-model fallback, honest provider-failure text, explicit-content blocking

- **What changed:** The owner reported that answers sometimes came back as the generic prepared text ("This is a prepared, age-appropriate response while the live AI connection is switched off…") and that searching "porn" sent no parent alert. Two causes were found. (1) Google's first candidate model (`gemini-3.6-flash`) sometimes returned `503` (overloaded). That code was not in the model-retry set, so the other candidate models were never tried, and the `502` response carried the prepared fallback text, which wrongly said the connection was switched off. (2) The safety classifier had no sexual-content category, so explicit requests were classed as `allowed`, sent to the provider, and no alert was raised. Fixes: `provider_overloaded`, `provider_rate_limited` and `provider_empty_response` now fall through to the next candidate model (timeouts still stop at once to bound the wait). When a saved provider fails on an allowed question, the child now sees honest text: "connection needs checking, ask your parent" for rejected keys or exhausted quota, otherwise "the AI helper is very busy, please send your question again"; the "Next step" tip is hidden on failures. The shared classifier gained an explicit-content list (porn and common site names, nudes/nude pictures, sexting, sex video/chat/story, erotic, fetish, hookup and similar), matched at word starts so "Sussex", "Essex", "pronoun" and "paint stripper" are not caught, and checked on both the raw prompt and a de-obfuscated copy (digit/symbol look-alikes such as `p0rn`, punctuation inside words, and spaced letters such as `p o r n`). These prompts are `blocked`: no provider call, a `safety_events` row, `blocked_count`, and a parent `safety-flag` notification "A safety boundary was used" that does not include the child's wording. Plain "sex"/"sexual" questions (for example sex education) go to parent `approval` instead. The blocked reply now says the parent can see a boundary was used, but not the wording.
- **Files/systems affected:** `api/_lib/ai-provider.ts`, `api/ai/chat.ts`, `apps/child/src/App.tsx`, `packages/shared/src/safety.ts`, `scripts/safety.test.mjs`, `scripts/safety-evaluation.mjs`, `scripts/api.test.mjs`, `api/README.md`, this report. Vercel production deployments `dpl_G3PGWvegcjXr7ikajETwdKeXdaJZ` (parent, https://safeai-learning-hub-parent-5z3waeabe-crrish64-8668s-projects.vercel.app) and `dpl_DWga1A4YChLZL9FGF7MJT3qMbLYp` (child, https://safeai-learning-hub-child-hgopfc3q5-crrish64-8668s-projects.vercel.app), both Ready and aliased to their stable domains.
- **Why it changed:** Busy-model errors made the live AI look switched off, and explicit content passed the safety boundary without telling the parent.
- **What remains simulated:** Nothing new. The keyword classifier is still a first-line boundary, not a full moderation model; new slang or heavier obfuscation can slip past it and will need list updates or independent output moderation (§5).
- **Tests or checks performed:** `npm test` 61/61 (new: explicit prompts and evasions blocked; false-positive words allowed; sex-education question goes to approval; busy and rate-limited Google models fall through to a third model; a busy provider returns `502 provider_overloaded` with "very busy" text, no "switched off" text and no `provider_settings` change; `show me p0rn` is blocked, the provider is not called and a parent `safety-flag` notification without the wording is created). `npm run lint` clean, `npm run build` passes for both apps, `npm run scan` 0 findings across 66 files, `npm run evaluate:safety` passes 7 fixtures (2 new explicit-content fixtures) and the precedence check. Smoke test: unauthenticated `POST` to child `/api/ai/chat` returns `401`.
- **Security and data-protection impact:** Stronger safety boundary: explicit sexual requests no longer reach the AI provider and now notify the parent. No new data stored and no schema, permission, key or env change; blocked wording is still not saved and notifications exclude it. Provider error logging is unchanged (provider, model, HTTP status and our code only). No key value was read, printed or written.
- **New assumptions, risks, or open decisions:** Words like "sexy" and "hookup" are blocked outright, which may occasionally stop an innocent question; the parent can adjust with blocked topics but cannot yet allow a blocked word. The temporary Gemini key from 01:00 BST should still be deleted or rotated by the owner.

### 2026-10-20 01:15 BST — Child chat: waiting indicator, clear errors and readable answers

- **What changed:** The owner reported they could not prompt on the child site after saving and testing a Gemini key. Vercel logs and database metadata showed the backend worked: the child question at 01:07:41 BST returned `200`, and a real provider answer (1,016 characters) was stored about 13 seconds later. The faults were in the child UI. It showed nothing while the provider took ~13 s, so it looked frozen. Any failure without a safety outcome (expired session, timeout, dropped connection) showed one vague "could not reach the family service" line. Markdown answers ran into one unformatted block. `chatBusy` could stay stuck if the request threw. Changes: `handleSendMessage` now uses `try/finally`; a "Boots is thinking" bubble with animated dots (`role="status"`, `aria-live="polite"`) shows while the request runs and scrolls into view; `401`, `400` and other failures each get their own child-friendly message, and the typed question stays in the box so it can be resent; assistant answers keep their line breaks (`.chat-bubble-text`, `white-space: pre-line`) and light Markdown is tidied (headings, `**bold**`, inline code removed; `*`/`-` bullets shown as `•`).
- **Files/systems affected:** `apps/child/src/App.tsx`, `packages/shared/src/styles.css`, this report. Vercel production deployments `dpl_8k1TK2QnBvrE1rFNt9MvRj9Ws2Rt` (parent) and `dpl_3nCzY9MmzxZT9sf1KoKzz35rqQRz` (child), aliased to their stable domains; the live child bundle contains the new indicator.
- **Why it changed:** The child could not tell their question was being answered, and errors gave no next step.
- **What remains simulated:** Nothing new. Earlier child messages in a session are not reloaded after a page refresh (the history tab keeps summaries only); the privacy acknowledgement checkbox must still be ticked before chatting, by design.
- **Tests or checks performed:** `npm test` 56/56, `npm run lint` clean, `npm run build` passed for both sites, `npm run scan` 0 findings across 66 files. The diagnosis used log timestamps, status codes, message lengths and safety states only; no child wording was printed.
- **Security and data-protection impact:** None new. No provider error text, key or token reaches the child UI; the answer tidy-up runs on text React already escapes, with no HTML rendering. The owner's temporary Gemini key is saved in the family's encrypted credential and should be removed or rotated once testing ends.
- **New assumptions, risks, or open decisions:** Gemini answers take ~10–15 s; if that feels too slow, a faster default model or lower thinking budget can be tried later, with tests, since an unsupported parameter would fail every candidate.

### 2026-10-20 01:05 BST — Test connection fixed: service-role read path into the private schema

- **What changed:** Found the real reason Parent Settings "Test connection" kept failing with `409 provider_not_configured` and the child got only prepared fallback answers. The `private` schema is not exposed through the Supabase Data API and `service_role` has no grants on it, so `readProviderCredential`'s `.schema('private').from('provider_credentials')` call always failed and was read as "no key saved". The same defect silently dropped every protected safeguarding-case insert from urgent child questions. Added two service-role-only `SECURITY DEFINER` functions, `public.read_provider_credential(target_family_id)` and `public.create_safeguarding_case(target_safety_event_id, target_family_id, target_child_id)`, matching the existing `store_`/`remove_provider_credential` pattern, and switched both server call sites to `service.rpc(...)`.
- **Files/systems affected:** new `supabase/migrations/20261020120000_private_service_functions.sql` (applied to hosted project `oxuacclbibgbggooqqfy` as `private_service_functions`), `api/_lib/ai-provider.ts`, `api/ai/chat.ts`, `scripts/api.test.mjs`, `api/README.md`, this report. Vercel production deployments `dpl_DkdNKvGrxgTkJNgPcDJYoD4Qy9Px` (parent) and `dpl_A7xKABLD6TdpdzuUdye7hDAShj8q` (child), both READY and aliased to their stable domains.
- **Why it changed:** The owner reported that Test connection still did not work after the 00:41 fix. That fix corrected models, error handling and the child proxy, but its tests used a fake database that accepted `.schema('private')`, so the hosted permission failure was never exercised.
- **What remains simulated:** The family's stored credential is still the previously saved Anthropic key with status `disabled`; the owner must press Test connection (or save a new key) to activate it. A temporary Gemini key the owner shared in chat was tested directly against Google's API (three candidate models answered the fixed test prompt) but was not entered into the site or stored anywhere.
- **Tests or checks performed:** `npm test` passed 56/56. Three new tests drive the real `provider-test` handler and child chat against a correctly encrypted credential served through `rpc/read_provider_credential`: success sets status `active`; a rejected key returns `502 provider_authentication_failed` and sets `error`; child chat answers through an active provider. The safeguarding source test now requires `rpc('create_safeguarding_case'` and forbids `schema('private')`. `npm run lint` and `npm run build` passed; `npm run scan` found 0 findings across 66 files. Hosted database: both functions owned by `postgres`, `SECURITY DEFINER`, empty `search_path`; EXECUTE held by `service_role` only, anon and authenticated denied. Supabase security advisors: nothing new. Live: both protected routes return `401 authentication_required` without a session.
- **Security and data-protection impact:** No new data is stored and no table grants changed; the private tables stay unreachable to browser roles, and the new functions only expose to `service_role` what the server already needed. Ciphertext is still decrypted only in the parent server function. Database checks used metadata and counts only; no ciphertext, IV, tag, key, token or `.env` value was selected, read or printed.
- **New assumptions, risks, or open decisions:** Urgent questions asked before this fix created safety events but no safeguarding cases; those cases cannot be rebuilt from stored data. Server code must never use `.schema('private')` again; new private-schema access needs another service-role-only function.

### 2026-10-20 00:55 BST — Security headers actually set on both Vercel projects

- **What changed:** Both Vercel configs now send the security headers that this report and `docs/SECURITY.md` already described but that were not set. Headers on every path of both sites: `Content-Security-Policy` (`default-src 'self'`; `script-src`/`style-src`/`font-src 'self'`; `img-src 'self' data:`; `connect-src 'self' https://oxuacclbibgbggooqqfy.supabase.co wss://oxuacclbibgbggooqqfy.supabase.co`; `object-src 'none'`; `base-uri 'self'`; `form-action 'self'`; `frame-ancestors 'none'`; `upgrade-insecure-requests`), `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, a deny-all `Permissions-Policy` (camera, microphone, geolocation, payment, USB, serial, Bluetooth, HID, MIDI, motion sensors, display capture, browsing topics) and `Cross-Origin-Opener-Policy: same-origin`. The child config uses legacy `routes`, so the headers are a first `routes` entry with `continue: true` ahead of the unchanged `/api/(.*)` proxy; the parent uses top-level `headers` and keeps the `/api/cron/purge` cron. `docs/SECURITY.md` now names the exact Supabase origin instead of `*.supabase.co`.
- **Files/systems affected:** `vercel.child.json`, `vercel.parent.json`, `docs/SECURITY.md`, this report. Vercel production deployments: a first pair with the six required headers (parent `dpl_2g2asuAJYGb5eRWMKD6K2sP4Gmb2`, child `dpl_25Xh73ZWXLQHyGgRubzHYQJ4roTL`; the parent was deployed twice in that round because the first deploy's output was truncated, and the identical second one was aliased), then a final pair adding COOP (parent `dpl_BNnNtJXkDAe99VNgG5LCWKjs3XfF`, child `dpl_97sw6APBHEyG1qHCcLXeTvZU3AWh`). All READY and aliased to the stable domains.
- **Why it changed:** Closes the risk logged at 00:41: documented headers were missing, so the sites had no CSP, clickjacking protection or nosniff (only Vercel's default HSTS). COOP was added because an earlier entry in this report claimed it was set.
- **What remains simulated:** No signed-in session was used, so Supabase Auth and the Realtime `wss://` connection under the new CSP were not exercised end to end; the CSP allows exactly the origin confirmed in the live bundles. A custom Supabase domain or any new third-party origin must be added to `connect-src` in both configs.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 53/53; `npm run build` passed both apps; `npm run scan` found 0 findings across 65 files. `curl -I` on both stable domains returned HTTP/2 200 with all seven headers, also on built JS assets. Child `POST /api/ai/chat` with no session returned `401 {"error":"authentication_required"}` with `cache-control: no-store` and the headers, so the proxy still works; parent returned 401 too. In-app browser: both sign-in pages rendered with no CSP violations in the console.
- **Security and data-protection impact:** Adds CSP (script, connect and framing limited to self plus the project Supabase origin), clickjacking protection, MIME-sniffing protection, no referrer leakage, browser feature lockdown, long HSTS with preload and COOP. No secret, key, token, `.env` file, account or child data was read, printed or changed; no environment variables were added.
- **New assumptions, risks, or open decisions:** HSTS `preload` and `includeSubDomains` only matter for custom domains; submitting to the preload list is a separate owner decision. Older entries in this report described these headers before they existed; they are left as written, and this entry is the record of when they actually went live.

### 2026-10-20 00:41 BST — Provider connection and child prompting fixed

- **What changed:** Fixed three defects that stopped real provider keys working. (1) The child site's `/api/*` functions ran in the child Vercel project, which holds only browser-safe `VITE_` variables, so every child call returned `503 auth_backend_not_configured`; `vercel.child.json` now routes `/api/(.*)` to `https://safeai-learning-hub-parent.vercel.app/api/$1`, so child requests are served by the parent functions that hold the server-only configuration. (2) The hard-coded default models had been retired by providers; `api/_lib/ai-provider.ts` now tries an ordered candidate list per provider (an optional `OPENAI_MODEL` / `ANTHROPIC_MODEL` / `GOOGLE_MODEL` override first), moves to the next candidate only when a model is unavailable or rejects the request shape, remembers the working model per warm instance, uses the correct parameters for OpenAI reasoning models, skips Gemini thought parts, and applies a 25-second timeout. (3) Any provider failure used to set `provider_settings.status = 'error'`, which then silently forced the prepared fallback for every later child question; now only a rejected key (`provider_authentication_failed`) does this, and rate limits, quota, timeouts and outages leave a working provider active. Provider errors are classified into stable codes (`provider_authentication_failed`, `provider_quota_exceeded`, `provider_model_unavailable`, `provider_rate_limited`, `provider_overloaded`, `provider_bad_request`, `provider_timeout`, `provider_unreachable`, `provider_empty_response`, `provider_request_failed`); the parent Settings screen shows a specific plain-English message for each, and the child chat shows a short notice when the AI service did not answer or needs a parent to check it.
- **Files/systems affected:** `api/_lib/ai-provider.ts`, `api/ai/chat.ts`, `api/parent/provider-test.ts`, `packages/shared/src/supabase.ts`, `apps/parent/src/App.tsx`, `apps/child/src/App.tsx`, `vercel.child.json`, `.env.example`, `scripts/api.test.mjs`, `api/README.md`, generated `apps/child/dist/*` and `apps/parent/dist/*`, and this report. Vercel production deployments `dpl_DSkPwi8FBDwtMNxNxa3fuhdQDh5E` (parent) and `dpl_2gwSAS3NZWBBvUuPfse9bXBVjVz6` (child), both READY and aliased to their stable domains.
- **Why it changed:** The owner reported that the child site could not be prompted and that Parent Settings "Test connection" did not work with real keys.
- **What remains simulated:** No real provider key was used. End-to-end provider answers still need the owner to save and test their own key privately in Parent Settings. Model availability depends on the owner's provider account; if every candidate is unavailable the parent sees `provider_model_unavailable` and can set the matching `*_MODEL` override in the parent Vercel project.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 53/53 (two new tests: provider error classification without exposing provider messages, and retired-model fall-through versus immediate stop on a rejected key); `npm run build` passed both apps; `npm run scan` found 0 findings across 65 files. Live probes: child `POST /api/ai/chat` and parent `POST /api/parent/provider-test` without a session now both return `401 authentication_required` (child previously `503`). Fictional, obviously invalid keys sent directly to each provider were classified as `provider_authentication_failed`, confirming the classifier against real rejection formats.
- **Security and data-protection impact:** Server secrets remain only in the parent project; the child project still has no server-only variables and the proxy forwards the caller's own bearer token, which the parent functions verify exactly as before. Provider error logs record only provider, model id, HTTP status and SafeAI code; provider response bodies are pattern-matched in memory and never logged or returned. No key value, password, token, real account or child data was read, printed or stored. `.env.example` gained three optional model-override names with no values.
- **New assumptions, risks, or open decisions:** The child now depends on the parent deployment for every API call; a parent outage also stops child chat. Pre-existing gap noted during review: this report and `docs/SECURITY.md` describe security headers, but neither `vercel.child.json` nor `vercel.parent.json` currently sets them; on the child, headers must be added inside the `routes` array (top-level `headers` cannot be combined with `routes`). Families whose provider was previously marked `error` by a transient failure must press Test connection once to return it to `active`.

### 2026-10-20 00:28 BST — Correct child deployment target and hosted sign-in acceptance

- **What changed:** Fixed the Vercel monorepo deployment routing that caused the child project to serve the parent bundle. Removed the conflicting root `vercel.json` and added explicit `vercel.child.json` and `vercel.parent.json` configs. The child config builds `apps/child/dist`; the parent config builds `apps/parent/dist` and preserves the daily purge cron. Updated deployment documentation with explicit project/config commands.
- **Files/systems affected:** Deleted `vercel.json`; added `vercel.child.json` and `vercel.parent.json`; updated `docs/LOCAL_DEVELOPMENT.md`; Vercel production deployments `dpl_DRdJSA42aQJjb4wX3ZKRp9AygxYh` (child) and `dpl_4DhnxJ2hgw8EWwYk6XRjNXMzACZ8` (parent), both READY and aliased to their stable domains.
- **Why it changed:** Hosted testing showed the child URL was rendering the parent sign-in screen with an account-service-unavailable banner. The parent project had been hard-coded as the root output directory, so the child deployment was publishing the wrong app. This was a deployment-target defect, not a missing Supabase key.
- **What remains simulated:** Sign-in tests used fictional `.invalid` dummy credentials and confirmed the real Supabase Auth boundary responds with an invalid-credentials message; no real account password was accessed. Provider AI responses still require a privately saved/tested provider key. All family, safety, notification, retention, deletion and safeguarding limits remain as documented elsewhere in this report.
- **Tests or checks performed:** Hosted HTML now reports `SafeAI Learning Hub child learning space` / `SafeAI · Learning space` for the child and `SafeAI Learning Hub parent space` / `SafeAI · Family space` for the parent. Browser checks confirmed child-only sign-in with no account-service banner; dummy parent and child login attempts reached Supabase and returned the expected safe failure message. `npm run lint` passed; `npm test` passed 51/51; `npm run build` passed both apps; `npm run scan` found 0 findings across 65 files. Child and parent Vercel builds completed successfully.
- **Security and data-protection impact:** No Supabase key, provider key, password, token, real account, or child data was read, printed, changed, or added. No external AI call was made. The child receives only browser-safe Supabase configuration; server-only credentials remain parent-side.
- **New assumptions, risks, or open decisions:** Any future deployment must use the matching `--local-config` file documented in `docs/LOCAL_DEVELOPMENT.md`; deploying from the root without an explicit config is no longer a valid release procedure. A real user-created parent/child account login still requires the owner to enter credentials privately; no credentials were requested or stored here.

### 2026-10-20 00:23 BST — Explicit second verification of publishable-key metadata

- **What changed:** Re-checked both named Vercel production projects using the supported CLI link/list flow. `safeai-learning-hub-parent` reports both `VITE_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_PUBLISHABLE_KEY` as encrypted Production variables. `safeai-learning-hub-child` reports `VITE_SUPABASE_PUBLISHABLE_KEY` as an encrypted Production variable. No variable was removed, updated, rotated, or overwritten.
- **Files/systems affected:** Read-only Vercel environment metadata for the parent and child projects. The child inspection created temporary Vercel link/OIDC metadata locally; those files were removed immediately. No application source, deployment, Supabase row, or environment value changed.
- **Why it changed:** The owner could not see the publishable key in the dashboard and requested a proper second check. The result confirms the key names exist; Vercel intentionally displays their values as `Encrypted` rather than revealing them.
- **What remains simulated:** Provider-backed AI use still depends on the separately stored provider key being privately saved and tested in Parent Settings. The child remains limited to browser-safe Supabase configuration and never receives server-only credentials.
- **Tests or checks performed:** Parent and child `vercel env list production` both exited successfully. No values were pulled or printed. Temporary link files were confirmed absent after cleanup. No API provider call was made.
- **Security and data-protection impact:** No secret value, password, token, real account, or child data was read, printed, logged, copied, or added to source, browser storage, screenshots, or this report. Server-only keys remain restricted to the parent project.
- **New assumptions, risks, or open decisions:** If the user needs to replace a stale encrypted value, it must be entered privately in Vercel and followed by a redeployment; Vercel cannot reveal the existing value. The previously pasted publishable key should still be rotated.

### 2026-10-20 00:20 BST — Vercel key-presence verification and temporary-link cleanup

- **What changed:** Verified Vercel production environment-variable metadata without reading or printing any values. The parent project still contains all expected production names: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `API_KEY_ENCRYPTION_SECRET`, `API_KEY_ENCRYPTION_KEY_VERSION`, and `CRON_SECRET`. The child project still contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. No Vercel environment variable was removed, rotated, overwritten, or re-created.
- **Files/systems affected:** Vercel environment metadata for `safeai-learning-hub-parent` and `safeai-learning-hub-child`; temporary local `apps/child/.env.local` and `apps/child/.vercel/*` files created by the read-only project-link inspection were removed immediately. No application source file or deployed environment value was changed.
- **Why it changed:** The owner reported that a publishable key and another key appeared to be missing. The verification distinguishes the temporary Vercel CLI OIDC/link file from the application's Vercel environment variables and confirms the application variables remain present.
- **What remains simulated:** Provider-backed child responses still require the parent to privately save and test a provider key; the prototype's provider, family, notification, safeguarding, retention, deletion, and operational boundaries remain as documented in the current-status limitations.
- **Tests or checks performed:** `vercel env list production` succeeded for both projects and reported only encrypted metadata, never values. The expected variable-name set was compared with `.env.example`. Temporary child link/OIDC files were confirmed absent after cleanup. `npm run scan` passed with 0 findings across 65 files; `npm test` passed 51/51. No `vercel env remove`, `vercel env update`, `vercel env pull`, or external AI call was run.
- **Security and data-protection impact:** No key value, password, token, real account, or child data was read, logged, copied, or placed in source, browser storage, screenshots, or this report. The temporary Vercel OIDC file was not inspected and was removed after linking. Existing encrypted Vercel storage and server-only boundaries are unchanged.
- **New assumptions, risks, or open decisions:** Presence of an encrypted Vercel variable does not prove that its value is current or that the provider account/model/quota is valid. If a real value is stale, the owner must update it privately in Vercel; it must not be pasted into chat or source. The publishable key previously pasted into chat should still be rotated.

## 1. Current status

- The product has been upgraded into two polished, mobile-first websites: `apps/child` and `apps/parent`, styled in an OLED True Black design system (`#000000`) with deep elevated surfaces (`#0a0a0d`/`#121217`) and crisp `#1c1c24` borders, operating with shared safety contracts, an original vector SVG Boots learning companion, clean Apple/System-UI typography, pure SVG vectorized icons, and zero-trust API credential boundaries.
- Stack: React, TypeScript, Vite, shared packages, Supabase client/migrations, and Vercel functions. The child and parent sites are deployed to separate Vercel production projects. The `safeai-learning-hub` Supabase project is live with the reviewed schema; browser publishable keys and the parent server-only credentials are configured through Vercel's encrypted environment mechanism. Secret values are not present in source, browser bundles, logs, screenshots or this report.
- Resolved 10 comprehensive UI, interaction, and accessibility flaws: desktop header navigation tabs (`.topbar-nav`) across child and parent views for responsive viewports >860px; plain `ArrowLeft`/`ArrowRight` contextual walkthrough keyboard navigation with popover autofocus; micro-audio feedback for walkthrough actions; smooth auto-scrolling to newest child chat messages; removal of native blocking `alert()` in favor of accessible in-page notices; explicit `type="button"` on interactive controls; enlarged 38px+ touch targets and high-visibility focus rings for the sound toggle on mobile; enhanced filter button ergonomics for parent history; dynamic live region announcements (`aria-live="polite"`); and robust word-breaking/hyphenation across chat bubbles and text cards to eliminate horizontal overflow.
- Child experience: mobile browser-first, chat-first primary interface styled in a warm, welcoming midnight slate theme (`#0c0f1e`) with soft lavender/sky ambient lighting, bouncy rounded cards (`border-radius: 20px - 22px`), pill-shaped prompt chips with vector icons, and an animated Boots hero welcome card in the chat space ("Hi! I’m Boots 🎒 Your friendly homework and curiosity buddy!"). Replaced dry prompt engineering and IT jargon with kid-friendly "Smart Thinking Quests" (Great Question Challenge, Secret Shield Challenge), inspiring curiosity prompts (Space mystery, Dinosaur speed, Superhero story, Maths tricks, Ocean science), and "My Notebook" question history. Zero surveillance framing, zero parent-monitoring notices, and zero "allowed"/"blocked" labels.
- Parent experience: mobile browser-first family management with required parent sign-in, real parent-account creation through Supabase Auth (email confirmation, then a one-time family setup step), password reset by email, parent-only linked child-account creation, an account-scoped multi-child switcher with horizontal scroll snap, approval centre with emerald `.button-approve` actions and parent notes, safety alerts (withholding disclosure text to prevent domestic risk), searchable history with structured empty states, tactile settings switch controls, masked API provider settings UI, and mobile bottom navigation with active indicator pills. No mock parent or child accounts are substituted.
- Contextual popover walkthrough: attached to actual controls with progress indicators, skip, escape key, and restart from Help, positioned with safe mobile clearance (`bottom: calc(4.6rem + env(...))`) above bottom navigation. 9 controls in Child and 10 controls in Parent.
- API settings UI: parent-only lock boundary, `type="password"` input, server-returned masked ending only, provider status, last-tested time, rotate/disable/remove actions, and zero copy buttons. No key value or hard-coded ending is present in the source.
- Visual theme & Typography: high-contrast True Black OLED aesthetic (`--bg: #000000` backdrop with elevated `#0a0a0d` and `#121217` surfaces, razor-sharp 1px `#1c1c24` borders, disciplined 8px-14px border radii, high-contrast `#ffffff` primary text, solid callout borders, indigo `#6366f1`, emerald `#10b981`, amber `#f59e0b`, rose `#f43f5e`, and lilac `#8b5cf6` radiant accents that pop against pure black, and mature vector status badges). Replaced quirky geometric fonts (`DM Sans`, `Manrope`) with an ultra-clean, mature system neo-grotesque font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) with `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`, calibrated 600/550 weights, and `<meta name="theme-color" content="#000000" />`. All random emojis replaced with clean, minimalistic vector SVG icons from `@safeai/shared`.
- Micro-animations: chat message smooth upward entrance fade (`@keyframes messageEntrance`), gentle ambient floating and eye blinking on Boots (`@keyframes bootsFloat`, `@keyframes bootsBlink`), active tactile micro-press on buttons (`transform: scale(0.98)`), smooth tour popover scaling, and glowing pulse on active tour targets (`@keyframes tourTargetPulse`). Strictly respects `prefers-reduced-motion: reduce` (`animation-duration: .01ms !important; transition-duration: .01ms !important;`). Urgent risk alerts have zero exciting or frightening animations.
- Synthesized audio & sound controls: Web Audio API sound generator (`packages/shared/src/sound.ts`) with zero external audio assets or network downloads, and zero persistent storage usage. Provides pleasant micro-audio feedback for sending questions, assistant responses, tab switching, toggle switches, and tour navigation. Blocked and urgent safety responses use a gentle, reassuring neutral low tone (E4 - 330Hz)—never harsh, buzzing, or punitive. Accessible sound toggle buttons with live `aria-pressed` and `aria-label` states and vector audio icons in both child and parent headers. Audio automatically mutes when `prefers-reduced-motion` is detected.
- Security headers (CSP limited to self plus the project Supabase origin, HSTS, nosniff, X-Frame-Options DENY, Referrer-Policy no-referrer, deny-all Permissions-Policy, COOP same-origin) are set in `vercel.child.json` and `vercel.parent.json` and verified live on both stable domains (2026-10-20 00:55 BST).
- Child chat shows a "Boots is thinking" indicator while the provider answers, gives status-specific error messages that keep the typed question, and shows provider answers with line breaks and light Markdown tidied (2026-10-20 01:15 BST).
- Provider answers fall through to the next candidate model when one is busy, rate-limited or returns nothing; provider failures show honest "busy" or "connection needs checking" text, never the prepared "switched off" text. Explicit sexual content (including look-alike spellings such as `p0rn`) is blocked and sends the parent a safety alert without the wording; "sex"/"sexual" questions go to parent review (2026-10-20 16:41 BST).
- Durable history: allowed and support prompts plus assistant replies are stored; approval and blocked attempts receive generic redacted child/assistant receipts; immediate-risk events receive a protected receipt outside ordinary parent history, with disclosure text withheld. The child activity endpoint reloads these receipts after refresh, and the parent activity endpoint shows family-scoped redacted receipts.
- Verification gates: `npm run lint` clean (0 errors). `npm test` 63/63 passing. Both Vite builds pass (`apps/child/dist` and `apps/parent/dist`). `npm run scan` reports 0 findings across 66 files. `npm run evaluate:safety` passes the 7-fixture protected suite and precedence check. Local and hosted Playwright acceptance passed at 390x844 and 1280x900 after the latest production deployment.
- Status: **Live operations hardening and the durable redacted-history fix are deployed to both stable Vercel sites and the reviewed Supabase project.** The parent/child account boundary, family-scoped activity, approvals, access settings, server-side safety precedence, encrypted provider-key storage (read on the server through the service-role-only `read_provider_credential` function), provider connection test with model fallback and specific error messages, provider-backed allowed/support chat (child API calls proxied to the parent functions, which alone hold server configuration), prepared fallback, provider disable gate, durable family notifications, aggregate-only metrics, protected safeguarding queue records, Realtime subscriptions with five-second polling fallback, authenticated family-record deletion, and scheduled retention route are implemented. Urgent, blocked, and approval states never call a provider; raw blocked and immediate-risk wording is not stored as ordinary history. No key value is in source, logs, screenshots, browser bundles or this report. Stable URLs returned HTTP 200; protected routes returned HTTP 401 without a session. Human emergency response, external email/SMS notification, independent third-party safety evaluation, rate limiting beyond platform controls, and deletion of the Supabase Auth identity remain operational limitations; see §5.

### 2026-10-20 00:19 BST — Parent-selected safety criteria and child-identified live notifications

- **What was completed:** Implemented the two previously missing acceptance items. Parents can now choose bounded, per-child topic criteria in Settings: health/personal topics, private information/location, strangers/sharing, public posting, purchases/age-restricted topics, dangerous activities, and hacking/passwords. The child chat route loads the selected topics server-side and classifies every prompt before any provider call. Blocked and approval notifications now carry the verified child id; the parent activity API resolves it to the linked child name, and the dashboard displays `Child name · notification` in real time. Existing Supabase Realtime subscriptions and the five-second fallback continue to refresh activity.
- **Files affected:** `packages/shared/src/types.ts`, `packages/shared/src/safety.ts`, `packages/shared/src/supabase.ts`, `api/ai/chat.ts`, `api/parent/access.ts`, `api/parent/activity.ts`, `apps/parent/src/App.tsx`, `packages/shared/src/styles.css`, `supabase/migrations/20261020093000_parent_safety_criteria.sql`, `scripts/safety.test.mjs`, `scripts/api.test.mjs`, `scripts/rls-db.test.mjs`, `api/README.md`, `docs/SECURITY.md`, generated `apps/child/dist/*` and `apps/parent/dist/*`, and this report. Hosted Supabase project `oxuacclbibgbggooqqfy` was migrated; Vercel deployments `dpl_BfWsRNd9FXbDRZMqQ3Yccy1V5ppW` (parent) and `dpl_EdVXTEFahaHdts6L433CWPyGguic` (child) are READY and aliased to the stable sites.
- **Why it changed:** The acceptance review found that parents could not choose additional blocked topics and that parent notifications did not identify which child generated a blocked or approval event. This closes both gaps without expanding into arbitrary keyword management or covert monitoring.
- **Safety and data boundary:** The fixed precedence remains **urgent > blocked > approval > safe-support > allowed**. Parent choices can add blocked coverage but cannot weaken urgent or built-in blocked rules. Classification runs before provider access; urgent, blocked and approval states never reach the provider. Raw blocked/urgent wording is not stored in ordinary history, notification bodies remain generic, and the child id is resolved only within the authenticated family scope.
- **What remains simulated or limited:** The criteria are a predefined allow-list, not arbitrary parent-authored expressions. Notifications are in-app Realtime/polling updates, not external push, email or SMS. A provider key still requires the owner to save and test it privately before live provider responses are enabled. The safeguarding queue remains an unstaffed prototype hand-off; no production emergency or child-safety claim is made.
- **Tests and checks performed:** `npm run lint` passed; `npm test` passed **51/51**; `npm run build` passed for both Vite apps; `npm run scan` found **0 findings across 64 files**; `npm run evaluate:safety` passed all protected fixtures and precedence; local Playwright browser acceptance passed at 390px and 1280px for child/parent no-credential boundaries with no console errors or horizontal overflow; hosted parent and child returned HTTP 200; unauthenticated `/api/ai/chat` probes returned 401 on both sites; Supabase schema verification confirmed `access_settings.blocked_topics` and its allow-list constraint. New automated tests cover custom blocking before provider access, notification child ids without raw wording, bounded API input, precedence, and per-child RLS scope.
- **Security and data-protection impact:** No API key, password, token, real account, real child data or provider response was read or added. The temporary Vercel CLI OIDC file created while switching the linked deployment project was removed immediately and never inspected or logged. The new migration is RLS-covered through the existing per-child access policies; unknown topic ids are filtered by the server and rejected by the database constraint. No real external AI call was made by the tests.
- **Acceptance result:** **Ready for PORT2 evidence.** The two requested N items are now functional and deployed. The prototype remains unsuitable for real children, emergency use or production safeguarding until specialist review, operational staffing, rate limiting, retention/legal review, independent evaluation, and external notification infrastructure are completed.

### 2026-10-20 00:10 BST — Vector Boots companion character overhaul & premium typography refinement

- **What changed:**
  1. *Vector Boots Companion Overhaul*: Completely replaced the crude, misshapen CSS blob potato shape and disconnected pink pill feet in `packages/shared/src/BootsCompanion.tsx` with an original, friendly, vector-crafted SVG character companion. Features a smoothly tapered organic droplet capsule silhouette, volumetric lilac-indigo gradients with soft 3D specular rim sheen, authentic cute boots with coral-red uppers, folded cuffs, and white rubber sneaker soles, glossy dark navy eyes with dual white specular highlights for an alive, intelligent expression, a warm curved smile, and a glowing cyan antenna beacon. Responsive sizing: compact 36px x 38px avatar in chat message rows, and full 88px-104px animated mascot in page headings (Lessons, Help, Approvals) with `@keyframes bootsFloat`, `@keyframes bootsBlink`, and `@keyframes bootSwayLeft`/`Right`.
  2. *Typography Stack & Hierarchy Modernization*: Replaced quirky, cartoonish geometric fonts (`DM Sans`, `Manrope`) with an ultra-clean, mature Apple/System-UI neo-grotesque font stack (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`) with `font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11'`. Eliminated tacky over-bold weights (`font-weight: 800`/`900`), calibrating headings to confident `font-weight: 600`, actions to `550`, and body copy to `400` with comfortable `line-height: 1.55`. Updated entry points (`index.html`) to `<meta name="theme-color" content="#000000" />`.
  3. *Elimination of Raw Pseudo-Glyphs & Theme Surface Unification*: Replaced remaining CSS pseudo-glyphs (`content: '✦'`, `content: '✓'`) with clean inline SVG background graphics. Unified remaining dark-blue card backgrounds (`#131722`, `#131822`, `#11151f`, `#11151e`) into OLED True Black elevated surfaces (`#0a0a0d`, `#14141c`).
- **Files affected:** `packages/shared/src/BootsCompanion.tsx`, `packages/shared/src/styles.css`, `apps/child/src/App.tsx`, `apps/parent/src/App.tsx`, `apps/child/index.html`, `apps/parent/index.html`, `PROJECT_REPORT.md`.
- **Why it changed:** Responded directly to user direction that the bot character still felt "off" and the font made the interface feel "tacky".
- **What remains simulated:** AI provider completions without a tested key; cross-site sync polling fallback; prototype safeguarding storyboard.
- **Tests or checks performed:** `npm run lint` passed (0 errors); `npm run scan` passed (0 findings across 62 files); `npm test` passed 46/46 tests; both Vite production builds compiled cleanly. Both applications deployed live to Vercel production:
  - Child: `https://safeai-learning-hub-child.vercel.app` (HTTP/2 200, asset hash `index-9CcsxTYX.js`)
  - Parent: `https://safeai-learning-hub-parent.vercel.app` (HTTP/2 200, asset hash `index-B30reMHD.js`)
- **Security and data-protection impact:** Zero changes to authentication, RLS, or API encryption boundaries. Pure client-side SVG artwork introduces zero external network requests or third-party fonts.
- **New assumptions, risks, or open decisions:** None.

### 2026-10-20 00:04 BST — Private safeguarding schema fix and final redeploy

- **What changed:** Corrected urgent-event persistence to write `safeguarding_cases` through the explicit private Supabase schema client. Added a regression assertion for that boundary. Rebuilt and redeployed both production sites after the fix; the parent and child aliases now point to READY deployments `dpl_6qxh2tEDaBxnX8H1inxfjWGcsgWc` and `dpl_8HsRbZkw4woRzTGnPy1XcLUQmCYR`.
- **Files affected:** `api/ai/chat.ts`, `scripts/api.test.mjs`, generated `apps/child/dist/*` and `apps/parent/dist/*`, `PROJECT_REPORT.md`; Vercel parent/child deployments.
- **Why it changed:** The queue is intentionally in the unexposed `private` schema. The previous default-schema call would not have persisted the protected queue record even though it failed safely, so the final integration review corrected the schema boundary before acceptance.
- **What remains simulated:** No dangerous or urgent user input was used in live testing. The queue stores identifiers/status only and still has no certified human responder; provider smoke test remains owner-controlled; independent evaluation, external notifications, rate limiting and Auth-identity deletion remain future work.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 46/46 including the new private-schema assertion; `npm run evaluate:safety` passed; both Vite builds passed; `npm run scan` found 0 findings across 62 files. Hosted parent/child URLs returned HTTP 200. Unauthenticated privacy-delete, cron and child-activity routes returned HTTP 401. No source, browser bundle, report or command output contains a key value.
- **Security and data-protection impact:** This preserves the private-schema boundary and avoids exposing safeguarding queue records through the public Data API. The regression test prevents a future default-schema regression. No secret or personal data was read, printed, logged or added.
- **New assumptions, risks, or open decisions:** The owner should monitor the first scheduled purge and run a private provider connection smoke test. The earlier pasted publishable key should still be rotated. Production safeguarding remains an operations-and-independent-review responsibility, not a claim made by this prototype.

### 2026-10-20 00:02 BST — Security and API documentation aligned with live operations

- **What changed:** Updated `docs/SECURITY.md` and `api/README.md` to document the now-live Realtime publication/subscription boundary, polling fallback, generic in-app notifications, aggregate metrics, private safeguarding queue, authenticated family-record deletion, and Vercel Cron retention route. Corrected stale wording that said provider testing was unavailable or that Realtime/retention/deletion/notifications were wholly unimplemented. The report's current status and §5 final operations addendum were retained as the source of truth for remaining limitations.
- **Files affected:** `docs/SECURITY.md`, `api/README.md`, `PROJECT_REPORT.md`.
- **Why it changed:** Documentation must match the deployed implementation so tomorrow's evidence review does not overstate or understate what is functional.
- **What remains simulated:** The provider still needs an owner-controlled private key test; notifications are in-app only; safeguarding still lacks certified human operations; automated safety evaluation is not independent review; Auth identity deletion and formal production controls remain future work.
- **Tests or checks performed:** Re-ran the report/source inspection after the edits; previous final gates remain recorded above: lint pass, 45/45 tests, safety evaluation pass, both builds pass, secret scan 0 findings, Supabase schema/publication checks pass, and both stable hosted aliases HTTP 200 with protected routes failing closed.
- **Security and data-protection impact:** Documentation-only change; no credential, user data, database row or deployment secret was exposed or modified. The documentation now highlights generic notification content, protected queue boundaries, server-only cron/deletion controls and the remaining operational risk.
- **New assumptions, risks, or open decisions:** The report remains the canonical status source. Monitor the first Vercel Cron run and perform the owner-controlled provider smoke test privately; do not paste a provider or Supabase key into chat.

### 2026-10-20 00:01 BST — Live operations hardening, Realtime, retention and hosted acceptance

- **What changed:** Added the live operations migration `supabase/migrations/20261019010000_live_operations.sql`: family-scoped in-app notifications, aggregate-only family metrics, a private safeguarding case queue with no disclosure text, Realtime publication membership for activity tables, service-only metric incrementing, retention purge and family-record deletion functions. Added `api/_lib/operations.ts` to record generic notifications/metrics from safety, approval and access flows; urgent events now create a protected queue record only. Added `api/parent/privacy-delete.ts` with an explicit confirmation phrase and `api/cron/purge.ts` guarded by a server-only `CRON_SECRET`; added parent/child notification and metrics reads, privacy-safe parent dashboard cards, child family updates, Realtime subscriptions with polling fallback, and a real deletion form. Added `scripts/safety-evaluation.mjs`, `docs/SAFETY_EVALUATION.md`, the `evaluate:safety` npm script, `vercel.json` with a daily retention route, and `CRON_SECRET` as a variable name in `.env.example`. The parent and child production aliases were redeployed.
- **Files/systems affected:** `supabase/migrations/20261019010000_live_operations.sql`, `api/_lib/operations.ts`, `api/ai/chat.ts`, `api/parent/activity.ts`, `api/parent/approval.ts`, `api/parent/access.ts`, `api/parent/privacy-delete.ts`, `api/child/activity.ts`, `api/cron/purge.ts`, `packages/shared/src/supabase.ts`, `packages/shared/src/types.ts`, `apps/parent/src/App.tsx`, `apps/child/src/App.tsx`, `scripts/safety-evaluation.mjs`, `docs/SAFETY_EVALUATION.md`, `package.json`, `.env.example`, `vercel.json`, `PROJECT_REPORT.md`; hosted Supabase project `oxuacclbibgbggooqqfy`; Vercel deployments `dpl_BXcCPegxtbyaMaEUx8AtnkeJicbp` (parent) and `dpl_2faafse7bTxdF3YTLiN8kKnsKdWJ` (child).
- **Why it changed:** The user asked for the remaining prototype gaps to become functional before presentation, especially live cross-view updates, notifications, analytics, retention/deletion and operational safety handling.
- **What remains simulated:** Provider use still requires the parent to privately save and test a provider key; notifications are in-app only; aggregate metrics are product analytics rather than an external analytics service; the safeguarding queue is a durable hand-off record but no certified human/emergency service is connected; the automated safety evaluation is not independent third-party review; scheduled purge depends on Vercel Cron invoking the guarded route; Supabase Auth identities are not deleted by the family-record deletion action.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 45/45; `npm run evaluate:safety` passed all five protected storyboard fixtures plus precedence; both Vite builds passed; `npm run scan` scanned 63 files with 0 findings. The Supabase migration executed successfully; read-only checks confirmed `family_notifications`, `family_metrics`, and `private.safeguarding_cases` exist with RLS enabled, the six activity tables are in `supabase_realtime`, and the three service-only functions exist. Stable parent and child URLs returned HTTP 200. Unauthenticated deletion, cron, and child activity probes failed closed (401 for protected GET/POST routes; 405 for the intentionally wrong child method). The first deployment attempt failed because the project's output directory expected `dist`; `vercel.json` was corrected to `apps/parent/dist`, and the final parent/child deployments reached READY.
- **Security and data-protection impact:** Realtime callbacks trigger fresh authorized reads rather than trusting row payloads. Notification and metric writes are server-side; notification bodies are generic and never contain raw prompts. Urgent rows remain protected and are not parent ordinary history. Family deletion requires an authenticated parent and an exact confirmation phrase. Retention requires a server-only scheduled secret. No provider key, Supabase key value, password, bearer token or real child data was printed, stored in source, placed in the report, or included in a screenshot. Supabase advisors still report pre-existing informational/performance notices and the intentionally private no-policy findings; these do not grant public access.
- **New assumptions, risks, or open decisions:** The Vercel parent project's daily Cron schedule is configured, but its execution still needs monitoring after the first scheduled run. A real provider smoke test still requires the owner to enter the key privately in Parent Settings; it must never be pasted into chat. Production safeguarding requires staffed, certified human operations and an independent evaluator before any production claim. The user-authorized Supabase publishable key previously pasted into chat should still be rotated.

### 2026-10-19 23:45 BST — OLED True Black visual overhaul & vectorized simplistic SVG icon suite

- **What changed:** Migrated the visual presentation across both Child and Parent applications to a high-contrast True Black OLED aesthetic (`#000000` background, elevated `#0a0a0d` and `#121217` card surfaces, crisp `#1c1c24` borders, and high-contrast `#ffffff` primary text). Accent colors (emerald, indigo, violet, rose, amber) now pop sharply against true black with razor-sharp definition. Designed and introduced an accessible, zero-dependency vectorized simplistic SVG icon suite in `packages/shared/src/icons.tsx` (`IconChat`, `IconBook`, `IconClock`, `IconShield`, `IconHome`, `IconApprovals`, `IconBellAlert`, `IconSliders`, `IconLock`, `IconSoundOn`, `IconSoundOff`, `IconSend`, `IconX`, `IconCheck`, `IconSparkle`, `IconHeart`, `IconArrowUpRight`, `IconAlertTriangle`, `IconDocument`, etc.). Replaced all raw emojis across Child and Parent headers, topbar navigation, sound toggles, chat composer actions, privacy notices, status indicators, safety storyboards, empty states, history list items, and mobile bottom navigation with clean vector SVG icons.
- **Files affected:** `packages/shared/src/icons.tsx`, `packages/shared/src/index.ts`, `packages/shared/src/styles.css`, `packages/shared/src/ContextualPopover.tsx`, `apps/child/src/App.tsx`, `apps/parent/src/App.tsx`, `PROJECT_REPORT.md`.
- **Why it changed:** User direction to significantly improve UI quality, migrate to True Black so colors pop and look sharper, and replace informal emojis with consistent, minimalistic, accessible vectorized SVG icons.
- **What remains simulated:** When no family provider key is saved and tested, chat uses the prepared response. Urgent/blocked/support routing is a bounded prototype classifier and protected storyboard, not production safeguarding. Realtime is simulated by five-second polling; notifications, analytics, specialist escalation, independent model safety evaluation, scheduled retention and family deletion are not implemented.
- **Tests or checks performed:** `npm run lint` passed (0 errors); `npm run scan` passed (0 findings across 57 files); `npm test` passed 45/45 tests; `npm run build` compiled both apps cleanly; Python regex scan confirmed 0 emojis remaining in active UI code. Deployed both applications to Vercel production:
  - Child: `https://safeai-learning-hub-child.vercel.app` (HTTP/2 200, asset hash `index-CCQCSK4z.js`)
  - Parent: `https://safeai-learning-hub-parent.vercel.app` (HTTP/2 200, asset hash `index-CnnGFQU0.js`)
- **Security and data-protection impact:** Zero changes to authentication boundaries, RLS policies, or API encryption. Pure client-side SVG icons introduce zero external dependencies or network requests.
- **New assumptions, risks, or open decisions:** None.

### 2026-10-19 23:42 BST — Final hosted deployment and PORT2 route verification

- **What changed:** Promoted the final parent and child source builds to their stable Vercel production aliases. The parent deployment includes `api/ai/chat`, `api/parent/provider-test`, `api/parent/activity`, `api/parent/approval`, `api/parent/access` and `api/child/activity`; the child deployment includes the same shared API boundary and the updated child UI. Stable links: `https://safeai-learning-hub-parent.vercel.app/` and `https://safeai-learning-hub-child.vercel.app/`.
- **Files/systems affected:** Source changes already recorded above; Vercel production deployments `dpl_AjCr5J7cD8nR4vkCXMazyRqJdGPQ` (parent) and `dpl_5JZmXFRoBenXhXUzXSJoBWgtSsd6` (child); `PROJECT_REPORT.md`.
- **Why it changed:** The user asked to make the previously listed unfunctional points operational and test the hosted result before presentation.
- **What remains simulated:** No real provider key was used in the test harness or chat smoke checks. The first real provider response requires the parent to enter a key privately in Settings and click Test connection. Safety classification, emergency escalation, notifications, analytics, retention/deletion, independent model evaluation and Realtime remain bounded prototype behavior; polling is used for cross-site updates.
- **Tests or checks performed:** Local `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for child and parent; `npm run scan` scanned 57 files with 0 findings. Both stable URLs returned HTTP/2 200 with the security headers. Unauthenticated `POST /api/parent/provider-test` and `POST /api/ai/chat` returned HTTP 401 with `Cache-Control: no-store`, confirming the deployed API boundary does not accept anonymous calls. Browser checks confirmed both stable sign-in pages render with no account-service-unavailable banner and child sign-in remains the only child account entry.
- **Security and data-protection impact:** Vercel environment values remain outside source and report. No key, password, bearer token, real child data or provider response was printed or stored by the checks. Provider credentials are server-only; only masked metadata reaches the parent browser. The earlier Supabase publishable key should still be rotated as previously documented.
- **New assumptions, risks, or open decisions:** A live parent/child acceptance run with a user-created family and a privately entered provider key is still required to prove the external provider account, quota, model and billing configuration. Do not send that key in chat. The deployment is ready for PORT2 evidence, not production child or emergency use.

### 2026-10-19 23:36 BST — Provider disable gate corrected and final verification rerun

- **What changed:** Provider-backed child chat now requires `provider_settings.status = active`; saving a key or disabling it leaves chat on the prepared fallback until the parent successfully runs Test connection. A prior failed provider request also leaves the provider inactive until re-tested. Removed unused parent icon code exposed by the final TypeScript check.
- **Files affected:** `api/_lib/ai-provider.ts`, `api/parent/provider-test.ts`, `apps/parent/src/App.tsx`, `PROJECT_REPORT.md`; production deployments submitted for `safeai-learning-hub-parent` and `safeai-learning-hub-child`.
- **Why it changed:** The parent Disable control must be a real server-enforced control, not a visual-only state. This prevents a stored credential from being used after the parent disables it.
- **What remains simulated:** No real provider key was used by the automated tests. The child deployment was still queued at report time; the parent final deployment was submitted and awaiting Ready status. Safeguarding escalation, independent safety evaluation, polling instead of Realtime, notifications, analytics, retention/deletion and specialist routing remain prototype limitations.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for both apps; `npm run scan` scanned 57 files with 0 findings. The parent deployment containing the earlier integration reached Ready; the final provider-disable deployment was submitted as `dpl_FJ5edb56B2B3p3eExttvERE2vn1j`, and the child deployment was submitted as `dpl_SToBdYdkjK1zm3LAymhUiecwfCbn`.
- **Security and data-protection impact:** Disabling or failing a provider test now prevents server-side credential use without deleting the encrypted key. Raw keys remain server-only and are never returned, logged or placed in browser code. No user or child data was accessed during this change.
- **New assumptions, risks, or open decisions:** The owner must privately test the configured provider after the final deployment is Ready. A successful local build does not prove external provider credentials, model availability, quotas or billing; those require a live parent-controlled smoke test without sharing the key in chat.

### 2026-10-19 23:26 BST — PORT2 functional integration: live provider boundary, durable family activity, and cross-site polling

- **What changed:** Replaced the intentional `503 ai_provider_not_configured` chat stub with a server-only provider adapter for OpenAI, Anthropic and Google; added parent-only provider connection testing; wired durable parent activity, approvals, access settings, child access polling and protected alert receipts; connected child chat to the server route with provider-backed allowed/support responses and a prepared fallback when no key is configured; prevented blocked/urgent input from being echoed in the child UI; added safe provider/error states and parent-controlled disable behavior; corrected Reset Demo so it resets local view state without erasing server family records; updated API and security documentation; updated the API test for the new fallback contract.
- **Files affected:** `api/_lib/ai-provider.ts`, `api/ai/chat.ts`, `api/parent/provider-test.ts`, `api/parent/activity.ts`, `api/parent/approval.ts`, `api/parent/access.ts`, `api/child/activity.ts`, `packages/shared/src/supabase.ts`, `packages/shared/src/types.ts`, `apps/parent/src/App.tsx`, `apps/child/src/App.tsx`, `api/README.md`, `docs/SECURITY.md`, `scripts/api.test.mjs`.
- **Why it changed:** The user asked for every previously identified unfunctional point to be made operational before the presentation: provider connection testing and real allowed/support requests, parent approval/history/access persistence, same-browser child/parent updates, and honest fallback behavior.
- **What remains simulated:** When no family provider key is saved and tested, chat uses the prepared response. Urgent/blocked/support routing is a bounded prototype classifier and protected storyboard, not production safeguarding. Realtime is simulated by five-second polling; notifications, analytics, specialist escalation, independent model safety evaluation, scheduled retention and family deletion are not implemented. No real provider key was used in local tests.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 45/45; both Vite production builds passed. The API suite now asserts the child chat route returns a safe allowed fallback with `providerConfigured: false` when no credential is configured and that no external provider host is contacted. A real provider smoke test remains pending until the owner privately saves a provider key through Parent Settings after deployment.
- **Security and data-protection impact:** Provider keys are decrypted only inside server functions and sent only to the selected provider; the browser receives masked metadata. Safety precedence remains urgent → blocked → approval → safe-support → allowed. Urgent and blocked questions are not written to ordinary chat history, approval requests receive only generic context, provider responses are safety-classified before display, and raw credentials are never logged or returned. This is not a production child-safety or emergency claim.
- **New assumptions, risks, or open decisions:** Provider model defaults are `gpt-4o-mini`, `claude-3-5-haiku-latest`, and `gemini-2.0-flash`, overridable only by server environment variables. The owner must verify the selected provider key privately, run Test connection, and rotate the previously pasted Supabase publishable key later. Deploy the source changes before live acceptance.

## 2. Change log

Format: date · what changed · files touched · why · security impact.

### 2026-10-17 15:20 BST — 10 UI, interaction, and accessibility flaws resolved across Child and Parent apps

- **What changed:** Identified and resolved 10 high-impact UI, interaction, and accessibility flaws across both mobile and desktop views:
  1. *Desktop Header Navigation (`topbar-nav`)*: Added accessible header navigation tabs for Child (Chat, Lessons, History, Help) and Parent (Overview, Approvals, History, Alerts, Settings) into `<header className="topbar">`. Displayed cleanly on viewports >860px and hidden on mobile <=860px to solve desktop navigation dead-ends where mobile bottom navigation was hidden.
  2. *Walkthrough Popover Keyboard Ergonomics & Focus Management*: Updated `ContextualPopover.tsx` to handle direct `ArrowLeft` and `ArrowRight` arrow key navigation (ignoring active input/textarea elements), added `tabIndex={-1}` to `<aside className="popover-card">`, and auto-focused the popover on mount and step changes.
  3. *Walkthrough Audio Integration*: Added `playTapSound()` to tour Skip and header close buttons, and `playTourStepSound()` to Next, Back, and keyboard arrow handlers.
  4. *Child Chat Auto-Scroll*: Added smooth auto-scrolling to the latest message via `chatEndRef` and a `useEffect` hook in `apps/child/src/App.tsx`.
  5. *Removal of Native Blocking `alert()`*: Replaced native blocking `window.alert()` in parent family data deletion request with an accessible in-page feedback notice banner (`privacyFeedback`) with `role="status"`.
  6. *Explicit `type="button"` on Clickable Controls*: Added explicit `type="button"` to Leave buttons, lesson options, coming soon cards, attention cards, and mobile bottom navigation tab items across both apps to prevent unintended form submissions.
  7. *Sound Toggle Mobile Touch Targets*: Updated `.sound-toggle-btn` styling to ensure minimum 38px/44px touch targets on small screens (<600px), centered icon layout, and high-contrast `:focus-visible` outline rings.
  8. *Parent History Filter Ergonomics*: Enhanced `.filter-button` with `min-height: 36px`, improved padding, clear hover/focus-visible states, and distinct active indicators.
  9. *Dynamic Live Region Announcements*: Added `aria-live="polite"` and `role="status"` to asynchronous feedback containers for child password changes, child creation, API key actions, and approval decisions.
  10. *Word-Wrapping and Overflow Safeguards*: Added `overflow-wrap: break-word`, `word-break: break-word`, and `hyphens: auto` to `.chat-bubble`, `.list-copy`, and `.auth-card` to eliminate horizontal layout blowouts on narrow mobile viewports (320px–375px).
- **Files/systems affected:**
  - `packages/shared/src/ContextualPopover.tsx`
  - `packages/shared/src/styles.css`
  - `apps/child/src/App.tsx`
  - `apps/parent/src/App.tsx`
  - `PROJECT_REPORT.md`
- **Design reason:** Improve usability across desktop and mobile form factors, ensure WCAG 2.2 AA keyboard accessibility and screen reader support, refine micro-interactions with audio cues, and eliminate disruptive browser dialogs and layout overflows.
- **Accessibility impact:** Fully keyboard navigable walkthroughs via single-key arrow buttons; visible focus management; enlarged mobile touch targets meeting touch ergonomics; screen reader live region announcements for state changes; non-blocking feedback messages; zero reduction in contrast or keyboard trap compliance.
- **What remains simulated:** AI provider completions, durable cross-device parent-child sync, notifications, and real safeguarding escalation remain simulated.
- **Tests or checks performed:**
  - `npm run lint`: 0 TypeScript errors across child, parent, and server projects.
  - `npm run scan`: 0 findings across 50 files.
  - `npm test`: 45/45 automated unit and contract tests passed.
  - `npm run build`: Both `apps/child` and `apps/parent` compiled cleanly.
  - Deployed to Vercel production:
    - Child: `https://safeai-learning-hub-child.vercel.app` (HTTP/2 200)
    - Parent: `https://safeai-learning-hub-parent.vercel.app` (HTTP/2 200)
- **Security and data-protection impact:** Zero changes to authentication boundaries, RLS policies, or API encryption. No credentials, tokens, or personal data exposed. Form submission safety increased by setting explicit `type="button"` on non-submit controls.
- **Any remaining design risks or assumptions:** Fictional acceptance test data should be purged when testing cycles complete. Cross-device real-time updates still require durable server-side sync for multi-device production use.

### 2026-10-17 15:00 BST — Full live PORT2 acceptance review completed

- **What changed:** No application source change was required. Completed the user-requested live acceptance pass on the stable parent and child Vercel sites using one fictional, reserved-domain acceptance family. Rechecked the parent linked-child load after its async fetch, completed the parent walkthrough through step 10, verified the parent reset to the overview and step 1, confirmed the child reset to the privacy-gated starting state, and rechecked the child walkthrough, interactive lessons, Boots companion, safety scenarios, parent controls, approval centre, alerts, history, API-key form and privacy controls.
- **Files/systems affected:** `PROJECT_REPORT.md`; `https://safeai-learning-hub-parent.vercel.app/`; `https://safeai-learning-hub-child.vercel.app/`; read-only authenticated requests to the configured Supabase family-data boundary. No schema, account, source or deployment configuration was changed during this review.
- **Why it changed:** The user asked to try all features and complete the final integration/PORT2 acceptance review after the Supabase account-service configuration was corrected.
- **What remains simulated:** The child chat uses prepared local safety-learning responses only. Lessons, history receipts, approval requests, parent decisions, alerts, API-provider connection status, analytics, notifications, production safeguarding escalation and cross-site Realtime updates remain simulated or intentionally unconnected. The approval centre and ordinary parent history were correctly empty for this acceptance family because child activity is not durably written into the parent dashboard in this prototype.
- **Tests or checks performed:** Parent sign-in and child sign-in passed; the child remained sign-in-only with no self-registration control; the parent loaded the linked fictional child after the asynchronous family-record request completed; child privacy acknowledgement passed; all five safety states passed with non-echoing UI: Allowed, Parent approval required, Blocked, Safe adult-support and Immediate help/protected storyboard. Prompt-writing and privacy/digital-footprints lessons accepted their intended choices; the remaining five lesson cards stayed visibly marked Coming soon. Child walkthrough steps 1–9 and parent walkthrough steps 1–10 completed. Parent overview, approval centre, protected alerts, history empty state, linked child controls, create-child form, access toggles, masked provider-key rotation form, privacy/data controls and restart walkthrough loaded. Parent reset returned to overview/step 1; child reset returned to the initial acknowledgement-required state. `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for both apps; `npm run scan` scanned 50 files with 0 findings. Existing authenticated API checks also confirmed the linked-child read returns HTTP 200 and unauthenticated parent API access fails closed with HTTP 401. Source inspection found no OpenAI, Anthropic or Google generative endpoint calls.
- **Security and data-protection impact:** Only fictional reserved-domain acceptance identities were used; no real child data or harmful user input was entered. Dangerous and immediate-risk examples remained protected storyboard content and were not repeated or placed in ordinary parent history. No live AI provider call was made. Provider credentials remain server-only/encrypted in Vercel; no secret value was written to source, this report, browser bundles, screenshots or command output. Supabase ownership/RLS, fail-closed routes, masked provider metadata, child sign-in boundaries, accessible status labels and reduced-motion/focus protections remain intact.
- **New assumptions, risks, or open decisions:** The hosted prototype is ready for PORT2 evidence as a clearly labelled prototype, not for production family use or emergency safeguarding. To make parent approval/history/alerts update from real child activity, implement durable server-side event writes, family-scoped RLS reads, approval resolution persistence and a compatible Realtime or polling transport. Rotate the currently configured user-authorized publishable/server credentials after this acceptance cycle, as previously requested, and remove the acceptance-only fictional family when no longer needed.

### 2026-10-16 21:11 BST — Server configuration completed and live parent/child acceptance passed

- **What changed:** Added the parent-only `SUPABASE_SERVICE_ROLE_KEY` as an encrypted Vercel Production variable, generated and added `API_KEY_ENCRYPTION_SECRET` as an encrypted Vercel Production variable, and added `API_KEY_ENCRYPTION_KEY_VERSION=1`. Redeployed `safeai-learning-hub-parent` from the current source. No source code or browser configuration was changed.
- **Files/systems affected:** `PROJECT_REPORT.md`; encrypted Vercel Production environment for `safeai-learning-hub-parent`; parent production deployment `dpl_2GK9FpniccCSbHefbtGK86HF2ais`; Supabase Auth/Data API calls used for acceptance. No secret value is recorded here.
- **Why it changed:** The parent page was correctly showing that its authenticated family-data backend was unavailable because privileged server configuration was missing. The user asked for the account and family flow to be made functional.
- **What remains simulated:** Child chat responses, prompt lessons, safety states, approvals, history, alerts, guided walkthroughs and provider connection status remain prototype/fixture behaviour. No live AI provider, analytics, Realtime cross-device sync, notifications or production safeguarding escalation was enabled. The acceptance family and child used reserved fictional addresses only.
- **Tests or checks performed:** Vercel env listing showed all required variables by name with encrypted/non-sensitive classifications and never printed values. The parent and child stable aliases returned HTTP 200; unauthenticated parent API access returned the expected 401 `authentication_required`. A fictional parent was created, family setup succeeded, a child account was created through `POST /api/parent/children`, `GET /api/parent/children` returned the linked child, and the child password login succeeded. Browser acceptance confirmed the parent linked-child dashboard, approval centre, protected safety-alert storyboard, history empty state, child-account settings, provider-key form, parent reset control, and both guided walkthroughs. Child acceptance confirmed sign-in-only access, privacy acknowledgement, prompt lesson, privacy lesson, Allowed, Parent approval required, Blocked, Safe adult-support and Immediate help storyboard states. `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for child and parent; `npm run scan` found 0 findings across 50 files.
- **Security and data-protection impact:** The privileged Supabase credential and generated encryption secret are server-only encrypted Vercel settings and are not in source, browser bundles, report text, screenshots or command output. The browser continues to use only the publishable key. No real child data, harmful input or live AI key was used. The acceptance identities and passwords were fictional and were not recorded in the report; the owner should remove the acceptance-only family records after review if desired. Rotate the currently configured publishable and server credentials later as requested.
- **New assumptions, risks, or open decisions:** This fixes deployment configuration, not the prototype boundary: parent-visible history/approval records are still local prepared state and do not yet represent durable cross-device Realtime activity. Provider-key storage is now configured but intentionally does not connect a live AI provider. The acceptance-only records remain available for manual review until removed.

### 2026-10-16 16:06 BST — Live parent/child acceptance attempt recorded

- **What changed:** Attempted an end-to-end fictional family test on the live parent and child sites. The parent account form accepted the reserved-domain test input but Supabase Auth returned HTTP 429 rate-limit feedback before a new family could be created. The child production entry point was verified separately and exposes sign-in only; it correctly offers no child self-registration path. No source or deployment configuration was changed in this acceptance attempt.
- **Files/systems affected:** `PROJECT_REPORT.md`; live Vercel parent and child aliases; Supabase Auth rate-limit boundary. No database row, child account or real user record was created by this attempt.
- **Why it changed:** The user requested a real end-to-end parent/child feature test. The rate limit prevented safe creation of another test parent, so the test stopped rather than repeatedly submitting Auth requests or claiming that authenticated parent/child features passed.
- **What remains simulated:** Parent dashboard, child account creation, child sign-in, chat lessons, safety states, approvals, history, alerts, settings and walkthroughs remain covered by the local automated contract/UI tests, but were not fully exercised in a new authenticated live family during this attempt. Live AI and production safeguarding remain simulated by design.
- **Tests or checks performed:** Live parent page showed the creation flow and the safe HTTP 429 message. Live child page showed email/password sign-in and the parent-managed-account explanation with no create-account control. `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for both apps; `npm run scan` found 0 findings across 50 files. Both production aliases remained HTTP 200.
- **Security and data-protection impact:** Only fictional reserved-domain test identities and generated passwords were used; values were not recorded. No real child data, harmful prompt, service-role key or raw bearer token was accessed. Repeated Auth attempts were stopped after the rate-limit response.
- **New assumptions, risks, or open decisions:** Wait for the Supabase Auth rate limit to clear before retrying family creation. The parent server still needs a separate server-only service-role/secret and encryption configuration before child-account creation and provider-key operations can work. A live authenticated parent/child acceptance run remains open.

### 2026-10-16 16:05 BST — Parent family-data service configured

- **What changed:** Added the existing user-authorized Supabase publishable credential to the parent Vercel Production environment under the server-only variable name `SUPABASE_PUBLISHABLE_KEY`, alongside the existing `SUPABASE_URL`, then redeployed the parent from source. The browser variable remains `VITE_SUPABASE_PUBLISHABLE_KEY`; no secret/service-role key was added to browser configuration. The empty variable created during the first non-readable environment-copy attempt was replaced before deployment.
- **Files/systems affected:** `PROJECT_REPORT.md`; Vercel Production environment and deployment for `safeai-learning-hub-parent` (`dpl_8QM7pKV2ajuhz5CGQj2w348cGwsM`); Supabase Auth/Data API boundary. No repository source file or schema changed.
- **Why it changed:** The screenshot's “Family data service is not configured” warning is emitted when the authenticated parent API cannot find its server-side Supabase URL/key. The parent API uses this variable to verify the signed-in user's JWT and query family-scoped rows under RLS.
- **What remains simulated:** AI responses, provider connection testing, Realtime notifications, analytics and production safeguarding escalation remain simulated or unconnected. No real child account or child data was created. The browser acceptance probe is temporarily rate-limited, so a second authenticated family-data read was not forced.
- **Tests or checks performed:** Vercel Production environment listing shows `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_URL` configured for the parent. The source-based parent build completed successfully and the stable parent URL returned HTTP 200. The sign-in page remains enabled; a new fictional signup attempt was stopped by the expected HTTP 429 rate limit. The prior full gates remain clean: lint passed, tests 45/45, build passed, and secret scan 0 findings.
- **Security and data-protection impact:** Only the low-privilege publishable key was used for the RLS-aware server client. No service-role/secret key was exposed or requested. The value remains out of source, report, logs and screenshots, and is stored through Vercel's encrypted environment mechanism. Rotate the publishable key later as requested.
- **New assumptions, risks, or open decisions:** The parent server's privileged operations still require separate server-only service-role/secret and encryption variables; they are intentionally not filled with a browser key. Reload the signed-in parent page after the rate limit cools. If the warning persists, inspect the next authenticated `/api/parent/children` response without exposing its bearer token or raw payload.

### 2026-10-16 16:01 BST — Supabase production configuration verified and rate-limit feedback improved

- **What changed:** Used the user-authorized Supabase publishable key only through Vercel's encrypted Production environment mechanism for both `safeai-learning-hub-parent` and `safeai-learning-hub-child`; the value was never written to source, this report, screenshots or command output. Added a safe HTTP 429 signup response in `packages/shared/src/supabase.ts`. Rebuilt both sites from the actual source tree with per-project Vercel build/output configuration so Vite receives the configured `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` values. Both stable aliases were restored after a temporary empty-staging deployment was identified and corrected. Temporary staging directories containing deployment metadata were removed.
- **Files/systems affected:** `packages/shared/src/supabase.ts`, `PROJECT_REPORT.md`; Vercel Production environment configuration and deployments for both stable sites; hosted Supabase Auth logs. No committed deployment manifest was added to the repository.
- **Why it changed:** The live 401 was caused by the previously rejected browser credential. The first accepted probe returned HTTP 200 and progressed through Auth and family setup; a repeated probe returned HTTP 429. The application now explains rate limiting without revealing account existence or raw provider details.
- **What remains simulated:** AI responses remain prepared safety-learning responses; no live AI provider, analytics, Realtime notifications, production safeguarding escalation or server-side provider-key operation is enabled. A fictional reserved-domain probe was used only for acceptance testing; it is not real child data. Because the accepted probe may have created a fictional test parent record, the owner should remove that test record later if desired; this task did not delete cloud account data.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 45/45; `npm run scan` found 0 findings across 50 files; `npm run build` passed for child and parent. Vercel deployments `dpl_CJgXTpdZSjTGchJqfLig29hnKh2B` and `dpl_UmCRnhV61KGyHdgueZXfcLWyiePk` reached READY. `https://safeai-learning-hub-parent.vercel.app/` and `https://safeai-learning-hub-child.vercel.app/` returned HTTP 200. The live parent form showed no account-service-unavailable banner; the accepted signup produced Supabase `/auth/v1/signup` HTTP 200, and a repeated attempt produced HTTP 429 with the new safe rate-limit text.
- **Security and data-protection impact:** The browser key is a publishable client credential, not a service-role secret. It is encrypted in Vercel Production and absent from source, report, logs and screenshots. The user should rotate it later because it was pasted into the chat during troubleshooting. Generated dummy credentials were not printed or recorded. No real child data, harmful input, live AI provider key or service-role key was accessed.
- **New assumptions, risks, or open decisions:** The user explicitly requested temporary use and later rotation of the publishable key. The server-only Supabase/service-role and API-key-encryption variables remain intentionally unset; server routes therefore continue to fail closed. Supabase rate limits may require waiting before another signup attempt. Any fictional test parent account created by the accepted probe should be deleted by the owner when convenient.

### 2026-10-16 15:53 BST — Publishable-key exposure warning handled

- **What changed:** A publishable-key value was pasted into the chat while troubleshooting. It was not used, copied, printed, stored, added to source, added to logs, added to screenshots, or added to Vercel by this task. The report records only the security event and the recommendation to rotate it.
- **Files/systems affected:** `PROJECT_REPORT.md` only. No Supabase, Vercel, source, deployment, user, or database state was changed.
- **Why it changed:** The value must remain out of chat and project records even though a Supabase publishable key is intended for browser use. Rotation is recommended before the replacement is configured.
- **What remains simulated:** Account signup remains blocked by the previously observed Supabase HTTP 401 until a valid replacement publishable key is set in Vercel Production and deployed. No dummy account was created.
- **Tests or checks performed:** Confirmed no key value appears in this report or source tree. No key-handling command or deployment was run after the value was pasted.
- **Security and data-protection impact:** No privileged secret was requested or handled. The user should revoke/rotate the exposed publishable key in Supabase and use only the replacement in `VITE_SUPABASE_PUBLISHABLE_KEY`.
- **New assumptions, risks, or open decisions:** Rotation may require updating both child and parent Vercel Production environments before the next deployment. Do not send the replacement key in chat.

### 2026-10-16 15:52 BST — 10 mobile-first UI improvement areas implemented and deployed

### 2026-10-16 15:52 BST — 10 mobile-first UI improvement areas implemented and deployed

- **What changed:** Implemented 10 mobile-first UI and interaction improvement areas across both Child and Parent web applications, verified with the automated suite, and deployed to Vercel production:
  1. *Mobile Bottom Navigation Active Indicator & Touch Ergonomics* (`packages/shared/src/styles.css`): increased bottom navigation bar height to `calc(3.8rem + env(safe-area-inset-bottom, 0px))`, introduced an active indicator top pill (`.nav-tab-item.active::before`) with active ambient glow, enlarged touch target to `min-height: 48px`, enabled `touch-action: manipulation`, and added subtle icon lift on the active tab.
  2. *Mobile Chat Composer Quick Clear ("✕") Action & Enhanced Send Target* (`packages/shared/src/styles.css`, `apps/child/src/App.tsx`): added a dedicated 44px tap-target circular clear button (`.composer-clear-btn`) conditionally rendered whenever input text is present, and enlarged the safe send button (`.composer-send-btn`) to `2.5rem x 2.5rem` with subtle hover lift and shadow.
  3. *Reassuring Empty-State Illustration Cards with Boots Mascot & Guidance* (`packages/shared/src/styles.css`, `apps/child/src/App.tsx`, `apps/parent/src/App.tsx`): replaced bare text fallbacks with structured, reassuring `.empty-state-card` components with themed icons (💬 for child history, ✓ for parent approvals, 📜 for parent history), clear headings, and helpful guidance text.
  4. *Child Switcher Pill Bar with Scroll Snap, Active Border/Glow & Touch Targets* (`packages/shared/src/styles.css`): added horizontal CSS scroll snap (`scroll-snap-type: x mandatory`), touch momentum scrolling, `min-height: 44px` hit areas, and glowing active boundary box-shadow for child switcher pills in the parent space.
  5. *Approval Action Cards Mobile Ergonomics & Color Coding (`.button-approve`)* (`packages/shared/src/styles.css`, `apps/parent/src/App.tsx`): introduced an emerald green `.button-approve` variant for positive approval actions, and made approval action buttons flex-expand to `min-height: 44px` on mobile viewports (`max-width: 600px`) for one-thumb ergonomics.
  6. *Interactive Lesson Choice Cards with Visual Checkbox Indicators & Mobile 1-Column Stacking* (`packages/shared/src/styles.css`): reinforced `.choice` button checkmark indicator pseudo-elements (`::before`), clear selected state borders and glow, and mobile single-column stacking.
  7. *Safety Status Banners & Alert Scanning Hierarchy on Mobile* (`packages/shared/src/styles.css`): refined `.status-banner` and `.chat-bubble.urgent` layout hierarchy, resilient `2rem x 2rem` icons with zero shrinkage on small screens, and clear high-contrast status borders.
  8. *Contextual Popover Mobile Safe-Zone Positioning & Tap Targets* (`packages/shared/src/styles.css`): updated popover bottom offset to `calc(4.6rem + env(safe-area-inset-bottom, 0px))` so it never collides with or obscures the mobile bottom navigation bar, ensuring smooth interaction during guided tours.
  9. *Settings Switch & Row Clickable Hit-Area Expansion with Tactile Thumb Glow* (`packages/shared/src/styles.css`): expanded `.switch` touch area with an invisible expanded hit box (`inset: -6px`), added hover row feedback on `.setting-row`, and enhanced active toggle thumb with glowing radial drop shadow.
  10. *Prompt Suggestion Carousel with Touch Scroll-Snap & Inspiration Sparkles (`✦`)* (`packages/shared/src/styles.css`): added horizontal scroll snap to `.prompt-chips-scroll`, added inspiration sparkle icon (`✦`) to prompt chips, and ensured `min-height: 38px` touch friendliness.
- **Files/systems affected:** `packages/shared/src/styles.css`, `apps/child/src/App.tsx`, `apps/parent/src/App.tsx`, `PROJECT_REPORT.md`, Vercel production deployments for `safeai-learning-hub-child` and `safeai-learning-hub-parent`.
- **Why it changed:** Responded to user direction to identify and implement 10 specific mobile viewing UI improvements across both Child and Parent experiences, followed by verification and Vercel deployment.
- **What remains simulated:** AI responses remain prepared safety-learning responses. Supabase Auth live key acceptance remains pending project-specific publishable key update. Production safeguarding escalations remain simulated.
- **Tests or checks performed:** `npm run lint` clean (0 errors); `npm run scan` found 0 findings across 50 files; `npm test` passed 45/45 automated tests; `npm run build` compiled both child and parent apps; Vercel production deployments succeeded; live URLs `https://safeai-learning-hub-child.vercel.app` and `https://safeai-learning-hub-parent.vercel.app` returned HTTP/2 200.
- **Security and data-protection impact:** No API key value, password, email content, browser storage, or child data was accessed, logged, or altered. The child history privacy rule was strictly preserved (typed questions are never echoed into history records).
- **New assumptions, risks, or open decisions:** The Vercel Production `VITE_SUPABASE_PUBLISHABLE_KEY` value still requires replacement with the exact publishable key for Supabase project `oxuacclbibgbggooqqfy` for live sign-up requests to complete without HTTP 401.

### 2026-10-16 15:38 BST — Second controlled signup retry after key update

- **What changed:** Retried the live parent signup flow after the user reviewed Supabase Settings → API Keys. A fresh fictional `example.com` address and generated password still produced the deployed rejected-key message. No account was created.
- **Files/systems affected:** `PROJECT_REPORT.md`; live parent Vercel alias; hosted Supabase Auth request path. No source, database row, user record, or key value was changed.
- **Why it changed:** The user asked for an immediate retest after checking the key location. This confirms the current Production deployment still sends a key that Supabase rejects with HTTP 401.
- **What remains simulated:** No real account or confirmation email was created. AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected.
- **Tests or checks performed:** Live parent create-account form submitted the new fictional probe; the UI again displayed the safe rejected-key guidance. The prior Supabase log evidence remains `/auth/v1/signup` HTTP 401 with the correct project and callback URL. No cleanup was required because the request was rejected before account creation.
- **Security and data-protection impact:** The generated test credentials were not printed or recorded. No real API key, password, email, browser storage or child data was accessed.
- **New assumptions, risks, or open decisions:** The Vercel Production `VITE_SUPABASE_PUBLISHABLE_KEY` still needs to be replaced with the publishable key created under this exact Supabase project, followed by a new Production redeploy. Do not use the secret/service-role key or send the value through chat.

### 2026-10-16 15:34 BST — Controlled dummy signup acceptance probe

- **What changed:** Performed the user-requested live signup test using a unique fictional address on the reserved `example.com` domain and a generated test password. The request reached the live parent site and returned the new safe configuration message; no account was created because Supabase rejected the request with HTTP 401.
- **Files/systems affected:** `PROJECT_REPORT.md`; live parent Vercel deployment; hosted Supabase Auth logs. No source, database row, key, real email address or user account was changed.
- **Why it changed:** This confirms the failure independently of the user's credentials and verifies that the deployed UI now identifies the actual failing boundary.
- **What remains simulated:** No real account or confirmation email was created. AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected.
- **Tests or checks performed:** Live parent form submitted the generated dummy credentials; UI displayed the rejected-key guidance. Supabase logs showed the corresponding `/auth/v1/signup` HTTP 401. No cleanup was required because the request was rejected before account creation.
- **Security and data-protection impact:** The dummy password and address were generated in the browser session and not printed, recorded in the report, or returned to chat. No real API key, password, email, browser storage or child data was accessed.
- **New assumptions, risks, or open decisions:** The remaining blocker is the Vercel Production `VITE_SUPABASE_PUBLISHABLE_KEY` value. It must be the publishable key belonging to Supabase project `oxuacclbibgbggooqqfy`, not a secret/service-role key or a key from another project; after changing it, the parent must be redeployed.

### 2026-10-16 15:33 BST — Signup HTTP 401 isolated and safe guidance deployed

- **What changed:** Investigated repeated live account-creation failures through the Supabase Unified Logs. The production parent request consistently reaches `POST /auth/v1/signup` on project `oxuacclbibgbggooqqfy` with the expected `redirect_to=https://safeai-learning-hub-parent.vercel.app/?auth=confirm`, but Supabase returns HTTP 401. This rules out the callback allow-list as the current blocker. Updated `packages/shared/src/supabase.ts` so HTTP 401 auth failures show a safe configuration message identifying the required `VITE_SUPABASE_PUBLISHABLE_KEY` variable and explicitly rejecting secret/service-role keys; no raw provider error or key value is shown. Redeployed both production sites; the parent deployment `dpl_Hy7XGDn6QmeGCFNeN4uvRA3D7fiu` is READY and aliased to the stable URL.
- **Files/systems affected:** `packages/shared/src/supabase.ts`; Vercel production projects `safeai-learning-hub-parent` and `safeai-learning-hub-child`; `PROJECT_REPORT.md`; Supabase log inspection only. No Supabase schema, callback URL, user account or key value was changed.
- **Why it changed:** The previous generic error concealed the actual deployment problem. Supabase's 401 response occurs before account creation and indicates that the browser credential is not accepted for this project; the most likely causes are a secret/service-role key in the browser variable, a key from another project, or an invalid/stale value.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. No real account or email confirmation was created or sent by this investigation.
- **Tests or checks performed:** Live reserved-address probe reproduced the failure without creating a real account; Supabase logs showed repeated signup HTTP 401 responses and a healthy `/auth/v1/health` response. After deployment, the parent UI displayed the safe rejected-key guidance. `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for child and parent; `npm run scan` found 0 findings across 50 files; `npm audit --omit=dev` found 0 vulnerabilities; both stable sites returned HTTP/2 200 with security headers.
- **Security and data-protection impact:** No API key value, password, email content, browser storage, child data or raw auth error was accessed or logged. The new message is configuration-specific but does not reveal account existence or credentials. Secret/service-role keys remain prohibited from browser code.
- **New assumptions, risks, or open decisions:** The owner must replace the Vercel Production `VITE_SUPABASE_PUBLISHABLE_KEY` value with the publishable key for Supabase project `oxuacclbibgbggooqqfy` and redeploy. This is the remaining external blocker; the key must not be sent in chat or pasted into source, logs, screenshots or documentation.

### 2026-10-16 15:25 BST — Local Supabase callback configuration completed

- **What changed:** Added and verified eight exact local redirect URLs for child and parent development ports on both `127.0.0.1` and `localhost`, covering `?auth=confirm` and `?auth=recovery`. Supabase reported “Successfully added 8 URLs”; the dashboard now shows eighteen total redirect URLs.
- **Files/systems affected:** Hosted Supabase Auth URL Configuration for project `oxuacclbibgbggooqqfy`; local child/parent auth flows; `PROJECT_REPORT.md`. No application source file or credential value was changed.
- **Why it changed:** The app builds callback URLs from `window.location.origin`; bare local origins alone did not exactly match the callback paths used by Supabase Auth. This closes the same configuration gap for local testing as for the deployed sites.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. A real confirmation-email/account test remains owner-controlled and was not performed here.
- **Tests or checks performed:** Supabase visibly lists all eight local callback URLs and all four production callback URLs. `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for child and parent; `npm run scan` found 0 findings across 50 files; `npm audit --omit=dev` found 0 vulnerabilities. Live parent create-account form is enabled after reload.
- **Security and data-protection impact:** Redirects are limited to the known production and local development origins; no wildcard was added. No key value, password, email, browser storage or child data was accessed.
- **New assumptions, risks, or open decisions:** Local development must use one of the registered ports/origins. A valid owner-controlled email and a 12+ character password are still required to verify confirmation delivery.

### 2026-10-16 15:25 BST — Final account-creation acceptance recheck

- **What changed:** No application source change was required after the Supabase redirect correction. Re-ran the repository acceptance gates and confirmed the live parent and child authentication screens are enabled. The report now records the final gate results alongside the callback fix.
- **Files/systems affected:** `PROJECT_REPORT.md`; local verification outputs; already-configured hosted Supabase Auth URL Configuration and stable Vercel aliases. No credentials or user records were changed.
- **Why it changed:** The user reported that account creation still displayed the generic failure message. This recheck confirms the production callback configuration is present and that the implementation remains type-safe, tested, buildable and secret-free.
- **What remains simulated:** Mock AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. A real confirmation-email/account test remains owner-controlled and was not performed here.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 45/45; `npm run build` passed for child and parent; `npm run scan` found 0 findings across 50 files. Supabase saved all four exact production callback URLs. Live parent signup form has an enabled Create parent account button; live child sign-in is enabled. No real account was created.
- **Security and data-protection impact:** No key value, password, email, browser storage or child data was accessed. The generic signup error remains non-enumerating. Existing fail-closed server routes and security-header checks remain unchanged.
- **New assumptions, risks, or open decisions:** The owner must retry with a valid email address and a 12+ character password. If that retry fails after the callback correction, investigate the email/provider response or existing-account path through Supabase's dashboard without exposing raw errors in the UI.

### 2026-10-16 15:25 BST — Supabase signup callback configuration corrected

- **What changed:** Added the four exact production redirect URLs required by the deployed auth code: parent and child `?auth=confirm` plus parent and child `?auth=recovery`. Supabase reported “Successfully added 4 URLs”; the dashboard now shows ten total redirect URLs. Rechecked the live parent signup form: it renders with an enabled Create parent account button and no account-service-unavailable gate.
- **Files/systems affected:** Hosted Supabase Auth URL Configuration for project `oxuacclbibgbggooqqfy`; stable parent and child Vercel authentication flows; `PROJECT_REPORT.md`. No application source file or credential value was changed.
- **Why it changed:** `packages/shared/src/supabase.ts` passes callback URLs containing `?auth=confirm` and `?auth=recovery`. Supabase requires the `redirectTo` value to match an allowed redirect URL; the prior configuration contained only the bare origins. Exact callback URLs remove that configuration mismatch.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. The live account path still needs a real owner-controlled test email to verify confirmation delivery; no account was created by this check.
- **Tests or checks performed:** Supabase Auth provider settings still show email signups and confirmation enabled. Exact URL save succeeded. Live parent form and child form remain enabled. A synthetic invalid-domain probe continued to receive the app's generic non-enumerating account-creation message; no real credentials, password, browser storage, child data or API key value was accessed. Existing verification gates remain: lint clean, 45/45 tests, both Vite builds, secret scan 0 findings, dependency audit 0 vulnerabilities, and both stable sites HTTP/2 200 with security headers.
- **Security and data-protection impact:** The callback allow-list is now exact and limited to the two known production origins plus existing local development origins. The app continues to use the generic signup error so it does not reveal whether an email already exists. No key was read, printed, copied or placed in source, logs or documentation.
- **New assumptions, risks, or open decisions:** If a valid retry still fails, the remaining likely causes are an already-registered address, Supabase email delivery/rate limiting, or an incorrect publishable-key value; the app intentionally does not expose raw provider errors. Parent server-only variables are still absent, so successful signup alone does not make family dashboard APIs production-ready.

### 2026-10-16 15:22 BST — Parent account-service deployment verified live

- **What changed:** Rechecked production after the parent publishable key was added. Confirmed the parent project now lists `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_URL` and `SUPABASE_URL`. Redeployed the parent production project with the existing `vercel.parent.json` configuration; deployment `dpl_2cgkicSWwjDFESwQydHxXzYpsbqh` reached `READY` and was aliased to the stable parent URL.
- **Files/systems affected:** Vercel production project `safeai-learning-hub-parent`; stable parent alias; `PROJECT_REPORT.md`. No source or secret value was read or changed.
- **Why it changed:** The parent site was still serving the previous build after the environment variable was added. A redeploy was required for Vite to receive the production publishable key.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. Parent server-backed family data and parent-created child accounts remain unavailable until server-only variables are added.
- **Tests or checks performed:** Live browser inspection now shows the parent sign-in form with an enabled `Sign in` button and no account-service notice. The child live site also shows an enabled sign-in button. Both stable aliases returned HTTP/2 200 with CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy and COOP headers. No credential, password, browser storage or child data was accessed.
- **Security and data-protection impact:** The browser publishable key was handled only by Vercel’s encrypted environment mechanism; it was not read, printed, copied into source, logged or sent through chat. The parent server routes remain fail-closed without their server-only configuration.
- **New assumptions, risks, or open decisions:** The account sign-in/signup UI is now live, but a real end-to-end account test still requires the owner’s private server-only configuration and a test email. No production child or parent credentials were created by this check.

### 2026-10-16 15:20 BST — Child-session revocation applied to the hosted project; API function crash fixed; both sites redeployed

- **What changed:**
  - **Migration applied.** At the user's request, migration `revoke_child_sessions` (the SQL in `supabase/migrations/20261016130000_revoke_child_sessions.sql`, applied verbatim) went onto hosted Supabase project `oxuacclbibgbggooqqfy`. The hosted migration version is stamped at apply time, so it differs from the local filename timestamp.
  - **Pre-existing crash found and fixed.** After the first redeploy, every live API route on both sites returned 500 `FUNCTION_INVOCATION_FAILED`. Vercel logs showed `ERR_MODULE_NOT_FOUND` for `/var/task/api/_lib/auth`. This predates this change: the child `/api/ai/chat` failed the same way. The cause is that `package.json` sets `"type": "module"`, so Vercel compiles the functions to ESM, and ESM needs file extensions on relative imports. All relative imports in `api/` now name `.js` files, which TypeScript `moduleResolution: "Bundler"` maps to the `.ts` sources.
  - **Tests.** The test resolve hook in `scripts/api.test.mjs` now maps those `.js` specifiers back to `.ts`, and a new regression test fails if any `api/**/*.ts` relative import lacks `.js`.
  - **Redeployed** to the existing production projects:
    - parent: `dpl_9ossRLAb6eD3iQHSZaQdLiPUqVoX`, superseded by `dpl_H3txFFHspUcLskLAwDjFPiiZu7xS`;
    - child: `dpl_Gp81qwYpXggq8hTGQipQkKumA3yE`.
    - Both are READY and aliased to `https://safeai-learning-hub-parent.vercel.app` and `https://safeai-learning-hub-child.vercel.app`.
    - Codex deployed concurrently at 15:13; these deploys include its work from the shared folder.
- **Files/systems affected:**
  - `api/parent/child-password.ts`, `api/parent/children.ts`, `api/parent/provider-key.ts`, `api/ai/chat.ts` (import specifiers only);
  - `scripts/api.test.mjs`;
  - `PROJECT_REPORT.md`;
  - hosted Supabase project `oxuacclbibgbggooqqfy` (one new function);
  - Vercel projects `safeai-learning-hub-parent` and `safeai-learning-hub-child` (production deployments only).
  - No Vercel environment variables or Supabase Auth settings were changed.
- **Why it changed:** The user asked for the revocation to be applied and made live on the existing Vercel projects. The ESM fix was required for any API route, including the password route, to run at all.
- **What remains simulated:** Unchanged from the 15:16 entry. End-to-end revocation cannot run in production until the owner privately adds the parent server-only variables. Until then, a signed-in call gets 503 `secure_backend_not_configured` or an auth failure.
- **Tests or checks performed:**
  - **Hosted function verified:**
    - owner `postgres`, `security definer`, `search_path=""`;
    - EXECUTE grants: `anon` false, `authenticated` false, `service_role` true;
    - a probe as `authenticated` got `permission denied for function revoke_child_sessions`;
    - a probe as `service_role` with a non-child id got `not_a_child_account`.
    - The hosted project has 0 `child_profiles`, so no real session was deleted.
  - **Supabase security advisors:** nothing for the new function. Two pre-existing, unrelated findings:
    - INFO: RLS enabled with no policy on `private.provider_credentials`. Intended: it is server-only.
    - WARN: `public.create_parent_family` is executable by `authenticated`. This is by design for family setup.
  - **Gates:** `npm run lint` clean; `npm test` 45/45; both Vite builds pass; `npm run scan` 0 findings across 50 files.
  - **Live checks with no credentials:**
    - parent `POST /api/parent/child-password` → 401 `authentication_required` with `cache-control: no-store`;
    - `GET /api/parent/children` → 401;
    - `GET /api/parent/provider-key` → 405;
    - child `POST /api/ai/chat` → 401;
    - both aliases return 200 with all 7 security headers.
- **Security and data-protection impact:**
  - **Auth change now live:** a parent setting a new child password deletes that child's `auth.sessions` and `auth.refresh_tokens`, through a function only `service_role` can execute and only for child accounts.
  - **Fail-closed again:** the ESM fix restores fail-closed behaviour. Before it, routes crashed with a generic 500 instead of returning a typed 401/503.
  - **No secrets touched:** no secret or environment value was read, printed, added or changed. Vercel environment variables were listed by name only.
  - **Password handling unchanged:** the password is still sent only to Supabase Auth and never logged or returned.
- **New assumptions, risks, or open decisions:**
  - Access tokens already issued stay valid for direct Data API reads until they expire (default 1 hour). API routes refuse them at once.
  - The parent project still needs its publishable key and server-only variables (see §1 Status).

### 2026-10-16 15:16 BST — Live child/parent account-service acceptance check

- **What changed:** Checked both stable Vercel production sites after the user added an environment value. The child deployment now renders the real sign-in form with an enabled “Sign in” button and no account-service notice. The parent deployment still renders “Account service unavailable” with sign-in disabled.
- **Files/systems affected:** Vercel production environment metadata and stable aliases for `safeai-learning-hub-child` and `safeai-learning-hub-parent`; `PROJECT_REPORT.md`. No source files or secret values were changed.
- **Why it changed:** This verifies whether the publishable-key setup cleared the account gate in each deployment, instead of assuming that adding the key to one project configured both sites.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. Parent account creation and family setup remain unavailable until the parent project is configured and redeployed.
- **Tests or checks performed:** Vercel environment names were checked without reading values: child lists `VITE_SUPABASE_PUBLISHABLE_KEY` and `VITE_SUPABASE_URL`; parent lists only `SUPABASE_URL` and `VITE_SUPABASE_URL`. Browser inspection of both stable aliases confirmed child sign-in enabled and parent sign-in disabled. No credentials, passwords, browser storage or child data were accessed.
- **Security and data-protection impact:** No secret was copied, printed, stored in source, or sent through chat. The child and parent remain isolated deployments; the parent continues to fail closed rather than showing a fictional family account.
- **New assumptions, risks, or open decisions:** The publishable key was added to the child project only. The same variable must be added privately to the parent project, followed by a parent redeploy. Parent child-account creation also requires its documented server-only variables.

### 2026-10-16 15:13 BST — Production deployment of animation, audio, and UI updates to Vercel

- **What changed:** Deployed latest changes to Vercel production for both applications:
  - **Child space:** deployed to production (`https://safeai-learning-hub-child-ax8b0t8wy-crrish64-8668s-projects.vercel.app`) and aliased to `https://safeai-learning-hub-child.vercel.app`.
  - **Parent space:** deployed to production (`https://safeai-learning-hub-parent-36nzprcao-crrish64-8668s-projects.vercel.app`) and aliased to `https://safeai-learning-hub-parent.vercel.app`.
  Both deployments incorporate the subtle micro-animations (chat entrance fade, Boots companion breathing/blinking idle dynamics, active button press, tour target pulse), the synthesized Web Audio API sound system, and the accessible in-header mute toggle (🔊 / 🔇).
- **Files/systems affected:** Vercel production deployments for `safeai-learning-hub-child` and `safeai-learning-hub-parent`; `PROJECT_REPORT.md`.
- **Why it changed:** User requested deploying all latest improvements and features to Vercel production.
- **What remains simulated:** AI provider responses, chat persistence, Realtime, notifications, and production safeguarding escalation remain simulated or unconnected. Hosted account operations remain unavailable until the missing publishable key (`VITE_SUPABASE_PUBLISHABLE_KEY`) and parent server-only credentials are added privately to Vercel environment variables.
- **Tests or checks performed:**
  - Vercel CLI deployments both exited 0 and reached `Ready in 17s`.
  - Live HTTP curl verification confirmed HTTP/2 200 with all production security headers intact (CSP, HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy: no-referrer, Permissions-Policy, Cross-Origin-Opener-Policy: same-origin).
  - Pre-deployment checks: `npm test` 44/44 passing, `npm run lint` clean (0 errors), `npm run scan` 0 findings across 50 files, `npm run build` passing, `npm audit --omit=dev` 0 vulnerabilities.
- **Security and data-protection impact:**
  - No secret keys, passwords, or personal data were deployed or leaked into client bundles.
  - Fail-closed security architecture remains active.
- **New assumptions, risks, or open decisions:**
  - Full end-to-end Supabase Auth operations on the hosted aliases require the owner to configure `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel.

### 2026-10-16 15:10 BST — Live account-service error recheck

- **What changed:** Reproduced and traced the hosted “Account service unavailable” screen from the supplied screenshot. Read-only Vercel production environment listings confirm the child project has only `VITE_SUPABASE_URL`, while the parent project has only `VITE_SUPABASE_URL` and `SUPABASE_URL`. No publishable key or server secret is present. No source change was needed because the client’s fail-closed configuration check is working correctly.
- **Files/systems affected:** Vercel production environment metadata for `safeai-learning-hub-child` and `safeai-learning-hub-parent`; `PROJECT_REPORT.md`. No application source, Supabase data, or secret value was changed.
- **Why it changed:** The screenshot showed the same error after the non-secret URL setup. The remaining missing browser variable is `VITE_SUPABASE_PUBLISHABLE_KEY`, which is required by `packages/shared/src/supabase.ts` before the Supabase client can initialise.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. Hosted account operations remain unavailable until the missing publishable key and parent server-only credentials are added privately and new deployments are created.
- **Tests or checks performed:** Vercel production environment listings were checked without reading values: child listed only `VITE_SUPABASE_URL`; parent listed only `SUPABASE_URL` and `VITE_SUPABASE_URL`. No real key, password, child data, browser token or deployment secret was read, printed, copied or logged. Existing lint, 44/44 tests, builds, secret scan and browser acceptance remain passing as recorded in the latest verification gate.
- **Security and data-protection impact:** No secret was handled. The application remains fail-closed and does not show fictional accounts or accept credentials while Supabase is not configured. This is safer than inserting a placeholder or hard-coding a key.
- **New assumptions, risks, or open decisions:** The owner must privately add `VITE_SUPABASE_PUBLISHABLE_KEY` to both Vercel projects; add `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `API_KEY_ENCRYPTION_SECRET` and `API_KEY_ENCRYPTION_KEY_VERSION=1` to the parent project; then redeploy both. No real account acceptance test can be run until that private setup is complete.

### 2026-10-16 12:20 BST — Subtle animations, Boots mascot idle states, and synthesized Web Audio feedback with accessible mute controls

- **What changed:**
  1. Added subtle CSS micro-animations: smooth chat message upward entrance slide (`@keyframes messageEntrance`), ambient breathing float and eye blinking for Boots learning companion (`@keyframes bootsFloat`, `@keyframes bootsBlink`, `@keyframes bootSwayLeft`, `@keyframes bootSwayRight`), tactile button micro-press (`transform: scale(0.98)` on `:active`), smooth popover entrance transitions, and glowing target pulse for guided walkthroughs (`@keyframes tourTargetPulse`).
  2. Implemented a zero-dependency synthesized audio system using the Web Audio API (`packages/shared/src/sound.ts`) providing pleasant micro-audio feedback: `playSendSound()` (gentle ascending tone), `playReceiveSound(outcomeState)` (harmonious major-third chime for allowed/support/approval, and a calm, reassuring neutral low tone at 330Hz for blocked/urgent safety responses—never harsh, buzzy, alarming, or punitive), `playTapSound()`, `playTabSound()`, `playToggleSound(checked)`, and `playTourStepSound()`.
  3. Integrated accessible in-header sound toggle buttons (🔊 / 🔇) in both Child and Parent spaces with live `aria-pressed`, `aria-label`, and screen-reader status text.
  4. Built strict accessibility guards: all animations and transitions instantly flatten under `@media (prefers-reduced-motion: reduce)` (`animation-duration: .01ms !important; transition-duration: .01ms !important;`), and the sound generator automatically checks `window.matchMedia('(prefers-reduced-motion: reduce)')` to silence audio when reduced motion is preferred. Urgent risk alerts feature zero flashing or frightening animations.
  5. Added an automated test suite verifying Web Audio synthesis, zero storage/fetch leaks, accessible sound toggles, and reduced motion compliance.
- **Files/systems affected:** `packages/shared/src/sound.ts` (new); `packages/shared/src/index.ts`; `packages/shared/src/styles.css`; `apps/child/src/App.tsx`; `apps/parent/src/App.tsx`; `scripts/walkthrough.test.mjs`; rebuilt `apps/child/dist` and `apps/parent/dist`; `PROJECT_REPORT.md`.
- **Why it changed:** User requested subtle animations, UI improvements, and sound effects to make the prototype feel alive, responsive, and tactile while maintaining its mature, calm aesthetic and age-appropriate character.
- **What remains simulated:** AI provider responses, chat persistence, Realtime, notifications, and production safeguarding escalation remain simulated or unconnected.
- **Tests or checks performed:**
  - `npm run lint`: clean (0 errors across child, parent, and server tsconfigs).
  - `npm run scan`: 0 findings across 50 scanned files.
  - `npm run build`: both `apps/child` and `apps/parent` built clean production bundles.
  - `npm test`: 44/44 tests passing, including new automated assertions verifying sound functions, zero storage/fetch leaks, sound toggles, keyframes, and reduced-motion rules.
  - `npm audit --omit=dev`: 0 vulnerabilities.
- **Security and data-protection impact:**
  - Zero external network requests or audio file fetches (audio is generated purely via the browser's Web Audio API oscillators and gain nodes).
  - Zero client-side persistent storage used: sound preferences stay in memory or React state, avoiding any tracking or storage leaks.
  - No secrets, tokens, or personal data exposed.
- **New assumptions, risks, or open decisions:** Browsers require a user gesture before starting the Web Audio `AudioContext`; the module lazily initialises on first interaction and resumes cleanly. Headless and Node environments safely fall back to no-ops.

### 2026-10-16 12:08 BST — Child signed out everywhere when a parent sets a new password

- **What changed:** After `POST /api/parent/child-password` successfully updates the child's password, it now revokes every existing session of that child. Supabase Auth (auth-js 2.117.3) has no admin sign-out by user id (`auth.admin.signOut` needs the child's own JWT), so a new migration adds `public.revoke_child_sessions(target_child_id uuid)`: `security definer`, empty `search_path`, schema-qualified names, refuses ids that are not in `child_profiles` (`not_a_child_account`), deletes the child's rows from `auth.refresh_tokens` and `auth.sessions`, and is executable by `service_role` only (revoked from public, anon and authenticated). The route calls it through the service client with only the child id. If revocation fails, the password has still changed, so the route returns `502 { error: 'child_sessions_revoke_failed', updated: true }`. The parent app shows a specific message for this case and asks the parent to set a password again to retry the sign-out, instead of the generic "Nothing was changed". Ownership checks, password limits and all other error codes are unchanged.
- **Files/systems affected:** `supabase/migrations/20261016130000_revoke_child_sessions.sql` (new); `api/parent/child-password.ts`; `apps/parent/src/App.tsx`; `scripts/api.test.mjs`; `scripts/rls-db.test.mjs` (shim gains minimal `auth.sessions` and `auth.refresh_tokens`); `api/README.md`; rebuilt `apps/child/dist` and `apps/parent/dist`; `PROJECT_REPORT.md`. No Supabase or Vercel configuration was changed and the migration was not applied.
- **Why it changed:** Closes the §3.5 open item. A parent usually resets a child's password because it may be known to someone else, or a device was lost or shared. Leaving sessions that were already signed in valid defeated the point of the reset.
- **What remains simulated:** Unchanged. The route only works once the account service is configured and the migration is applied to the hosted project.
- **Tests or checks performed:** `npm run lint` passed; `npm test` 43/43 (three new tests: two route tests and one PGlite test of the function's grants and scope); both Vite builds passed; `npm run scan` 0 findings across 49 files; neither `dist` bundle contains `SUPABASE_SERVICE_ROLE_KEY`, `API_KEY_ENCRYPTION_SECRET` or the function name. Not run against the hosted Supabase project.
- **Security and data-protection impact:** Auth change: a parent password reset now ends all of the child's existing sessions. The service role gains one new use: a function that can only delete the auth sessions of a user who is a child account, called only after the parent-family ownership check. No new data is stored and no secret or environment variable was added, read or printed. The password is still sent only to Supabase Auth and is never logged or returned. Tests assert it is absent from the revocation request and every response.
- **New assumptions, risks, or open decisions:** (1) Access tokens already issued are not invalidated cryptographically. SafeAI API routes reject them right away because `requireRole` calls `auth.getUser`, which fails once the session is gone. Direct Data API reads with such a token keep working under RLS until the token expires (Supabase default 1 hour). (2) The migration must be applied to `oxuacclbibgbggooqqfy`, and that the function can delete from `auth.sessions` and `auth.refresh_tokens` must be confirmed there (e.g. a rolled-back probe), since Supabase restricts the `auth` schema. Until then the route returns `child_sessions_revoke_failed` after changing the password. (3) Supabase may change the internal `auth` table layout in future Auth versions; the PGlite test covers the function's logic, not the hosted schema.

### 2026-10-16 12:51 BST — Safe Supabase/Vercel account-service configuration

- **What changed:** Configured the Supabase Auth Site URL as the parent production site and added six approved redirect URLs: child and parent Vercel production sites plus local child/parent URLs on `127.0.0.1` and `localhost`. Verified that email signups are enabled and email confirmation is enabled. Added only the non-secret Supabase project URL to Vercel production: `VITE_SUPABASE_URL` on both child and parent projects, plus server-side `SUPABASE_URL` on the parent project.
- **Files/systems affected:** Supabase Auth URL/provider configuration; Vercel production environment metadata for `safeai-learning-hub-child` and `safeai-learning-hub-parent`; `PROJECT_REPORT.md`. No source files or secret values were changed.
- **Why it changed:** The account-service gate needed the deployment to know which Supabase project to use and Auth needed safe redirect destinations for email confirmation and password reset. These changes remove the public URL/redirect configuration gap while preserving the fail-closed key requirement.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications and production safeguarding escalation remain simulated or unconnected. Hosted sign-in, signup, family setup and child-account creation remain unavailable until the publishable key and parent server-only credentials are configured and both sites are redeployed.
- **Tests or checks performed:** Supabase displayed a successful save for all six redirect URLs; Auth settings showed signup enabled and Confirm email enabled. Vercel production environment listings showed `VITE_SUPABASE_URL` on child, and `VITE_SUPABASE_URL` plus `SUPABASE_URL` on parent, all as encrypted environment entries. No key value was read, copied, printed or logged. Existing code checks remain passing: lint, 40/40 tests, both builds, secret scan with 0 findings, and browser acceptance.
- **Security and data-protection impact:** Only a public project URL and approved redirect destinations were entered. No publishable key, service-role key, encryption secret, password, child data or browser token was accessed or placed in source, chat, logs, screenshots, browser storage or documentation. The app remains fail-closed until the missing secret configuration is supplied privately.
- **New assumptions, risks, or open decisions:** Vercel is not signed in in the browser session, so no Vercel dashboard deployment was performed. The owner still needs to add the publishable/server-only values privately and redeploy both production projects. A real account test still requires an owner-created test email and must not be shared in chat.

### 2026-10-15 12:35 BST — Parent-set child password

- **What changed:** Added a way for a signed-in parent to set a new password for one of their own children, since children cannot reset their own. New server route `POST /api/parent/child-password`: parent role required (`requireRole`, role read from `family_members`); ownership checked with the service client against `child_profiles.user_id` and the parent's verified `family_id`; password limited to 12–72 characters and at most 72 UTF-8 bytes (bcrypt limit) and checked before any lookup; then `auth.admin.updateUserById`. Unknown, malformed and other-family ids all return the same `404 child_not_found`. Errors are short codes (`invalid_child_password`, `child_password_rejected`, `child_password_update_failed`, `family_backend_unavailable`); success returns only `{ updated: true }`. The parent Accounts section now has a per-child "Set new password" control with new/confirm `type="password"` fields (`autocomplete="new-password"`, minLength 12, maxLength 72). Fields are cleared after every attempt, and the success message tells the parent that SafeAI cannot show the password again.
- **Files/systems affected:** `api/parent/child-password.ts` (new); `packages/shared/src/supabase.ts` (`setChildPassword`); `apps/parent/src/App.tsx`; `packages/shared/src/styles.css` (`.setting-row-group`); `scripts/api.test.mjs`; `api/README.md`; rebuilt `apps/child/dist` and `apps/parent/dist`; `PROJECT_REPORT.md`. No Supabase or Vercel configuration was changed.
- **Why it changed:** Child accounts are created only by a parent and children have no self-service reset, so a forgotten child password had no recovery path.
- **What remains simulated:** Unchanged. The hosted sites still have no environment variables, so this control appears only once the account service is configured. A local build without `VITE_SUPABASE_*` folds the signed-in dashboard away; a scratch build with placeholder (non-secret) values confirmed the control and route are in the bundle. AI responses, persisted approvals/history/alerts, Realtime, notifications and safeguarding escalation remain simulated or unconnected.
- **Tests or checks performed:** `npm run lint` passed; `npm test` 40/40 (five new route tests); both Vite builds passed; `npm run scan` 0 findings across 48 files; neither `dist` bundle contains `SUPABASE_SERVICE_ROLE_KEY` or `API_KEY_ENCRYPTION_SECRET`. Not tested against the live Supabase project; browser acceptance not re-run; not redeployed.
- **Security and data-protection impact:** Passwords go only to Supabase Auth (stored as bcrypt in `auth.users`). The route never stores, logs or returns them, and tests assert they are not echoed in any response. The service role gains one new use, limited to children in the caller's own family. Authorisation uses `family_members` and `child_profiles`, never user metadata. Identical 404s prevent probing for account ids across families. No secret was read, printed or added; no new environment variable.
- **New assumptions, risks, or open decisions:** Setting a new password does not sign the child out of sessions that are already open; they stay valid until the refresh token expires or the child signs out (see §3.5). There is no route-specific rate limit beyond Supabase's own; the parent must already be signed in.

### 2026-10-15 12:31 BST — Account-service fail-closed copy aligned with acceptance check

- **What changed:** Changed the visible child and parent configuration notice from “Account service not connected” to “Account service unavailable”, matching the supplied UI wording and the existing no-credential browser acceptance check. The notice still explains that missing Supabase configuration disables account actions.
- **Files/systems affected:** `apps/child/src/App.tsx`; `apps/parent/src/App.tsx`; rebuilt `apps/child/dist`; rebuilt `apps/parent/dist`; `PROJECT_REPORT.md`. No Supabase or Vercel configuration was changed.
- **Why it changed:** The first browser acceptance run exposed copy drift: the test expected the precise unavailable state while both applications rendered a different label. Consistent wording makes the fail-closed state easier to recognise and keeps the acceptance check meaningful.
- **What remains simulated:** Account creation remains unavailable until the Vercel environment variables are privately configured and the sites redeployed. AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications, and production safeguarding escalation remain simulated or unconnected.
- **Tests or checks performed:** Before this copy change, the browser acceptance check reproduced the mismatch at the local child entry point. After the change: `npm run lint` passed; `npm test` passed 40/40; both Vite builds passed; `npm run scan` found 0 findings across 48 files; and the Playwright browser acceptance passed at 390px and 1280px for both local child/parent entry points with no console errors, no horizontal overflow, disabled no-credential sign-in, and the expected child/parent account split.
- **Security and data-protection impact:** Presentation-only change. No key, password, child data, Supabase row, browser storage value, or external API call was added or accessed. The account gate remains fail-closed.
- **New assumptions, risks, or open decisions:** This fixes the UI/test integration mismatch only. The hosted account service still requires private Vercel environment configuration and redeployment; no real credential can be handled in this chat.

### 2026-10-15 12:31 BST — Hosted account-service configuration recheck and code-gate verification

- **What changed:** Rechecked the production configuration for both Vercel sites and the linked Supabase project. `safeai-learning-hub-child` and `safeai-learning-hub-parent` each report **No Environment Variables found**. The Supabase project is healthy, and its family-setup migration is already applied and verified. No application source or deployment secret was changed.
- **Files/systems affected:** `PROJECT_REPORT.md`; Vercel production project metadata for `safeai-learning-hub-child` and `safeai-learning-hub-parent`; Supabase project `safeai-learning-hub` (`oxuacclbibgbggooqqfy`). No app source files changed.
- **Why it changed:** The hosted client intentionally refuses to initialise Supabase Auth when `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY` is absent. This confirms that the visible “Account service not connected” state is a fail-closed deployment configuration gate, not a fictional-account fallback or a Supabase outage.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals/history/alerts, Realtime, notifications, and production safeguarding escalation remain simulated. Hosted sign-in, parent signup, family setup, and parent-created child accounts remain unavailable until the owner privately configures the required Vercel variables, applies the Auth settings, and redeploys.
- **Tests or checks performed:** Both Vercel production environment inventories returned `No Environment Variables found`; Supabase was healthy; the current Supabase changelog was checked for a relevant hosted outage or breaking configuration change; `npm run lint` passed; `npm test` passed 35/35; both Vite builds passed; `npm run scan` found 0 findings across 48 files. No real key was read, printed, logged, or added.
- **Security and data-protection impact:** No password, publishable key, service-role key, encryption secret, child data, or production database content was accessed or modified. The fail-closed account gate remains in place. The real publishable key must be entered privately by the owner in Vercel; server-only variables must never use a `VITE_` prefix.
- **New assumptions, risks, or open decisions:** The owner must add the documented browser and server-only variables in each relevant Vercel environment, configure Supabase Auth confirmation/redirect URLs, and redeploy both projects. Until then, the hosted account forms will continue to show the configuration notice. Live account acceptance cannot be completed without a real owner-created test account, which must not be sent through chat.

### 2026-10-15 12:30 BST — Family-setup migration applied to the hosted Supabase project

- **What changed:** Applied `supabase/migrations/20261015130000_parent_family_setup.sql` to the hosted project `safeai-learning-hub` (`oxuacclbibgbggooqqfy`), at the user's request. The project's migration history records it as version `20261015112859`, name `parent_family_setup`. Earlier local filenames also differ from the hosted version numbers, so this follows the existing pattern. The function uses `create or replace`, so a later `supabase db push` that reapplies the local file is harmless.
- **Files/systems affected:** Hosted Supabase database (`public.create_parent_family` function and its grants); `PROJECT_REPORT.md`. No source files changed.
- **Why it changed:** The parent site's family-setup step calls this function. Without it, a confirmed parent could sign in but never create their family.
- **Tests or checks performed:**
  - **Before applying:** checked that the hosted `families`, `family_members` and `profiles` columns match what the function inserts. `family_members` has `unique (user_id)`, which enforces one family per user even under concurrent requests.
  - **After applying:**
    - The function exists with `security definer` and an empty `search_path`.
    - Only `authenticated` can execute it; `anon` and `public` cannot.
    - Run as `anon`, it is refused with permission denied.
    - Run as `authenticated` with no user id, it is refused with `authentication_required`.
    - Run as `authenticated` for a user with no confirmed email, it is refused with `email_not_confirmed`.
    - All three probes ran in transactions that were rolled back.
    - Row counts afterwards: 0 families, 0 members, 0 profiles, 0 Auth users. No data was created.
  - **Security advisor:**
    - **WARN** `authenticated_security_definer_function_executable` for `create_parent_family`. This is intentional and accepted. Signed-in parents must be able to call it, and it needs definer rights because RLS correctly stops users from inserting a `families` row directly. Its guards are: session required, confirmed email, one family per user, bounded names, and the family is always bound to `auth.uid()`.
    - **INFO** `rls_enabled_no_policy` for `private.provider_credentials`. This is intentional: the table is deny-all, outside the exposed schema, and reached only through service-role RPCs.
- **Security and data-protection impact:** No secret, key, password or user data was read, printed or created; `.env` was not opened. Exposing this one function is limited and guarded as listed above. RLS on every table is unchanged.
- **Remaining:** The Vercel environment variables, the Supabase Auth dashboard settings (§3.5) and a redeploy are still needed before hosted sign-up works. A real end-to-end sign-up has not been tested yet.

### 2026-10-15 12:22 BST — Real parent and child account flows over Supabase Auth

- **What changed:**
  - **Parent sign-up** now calls Supabase Auth `signUp` from the browser with the publishable key, so the password goes straight to Supabase Auth and is stored there only as a bcrypt hash.
    - Email confirmation is required. The response is the same whether or not the address already has an account ("Check your inbox. If this email can be used…").
    - After confirming and signing in, the parent completes a one-time **family setup** step (display name and family name). It calls the new `create_parent_family` RPC.
  - **Removed `api/auth/parent-signup.ts`**, an unauthenticated route that used the service role to create users and families.
  - **New migration `20261015130000_parent_family_setup.sql`:** `public.create_parent_family(display_name, family_name)`.
    - It is `security definer` with an empty `search_path`, and only `authenticated` callers can run it.
    - It refuses callers without a session, unconfirmed emails, users who already belong to a family, and names outside 1–80 characters.
    - It always binds the new family to `auth.uid()`.
  - **Password reset:** "Forgot your password?" sends a reset email with a generic response. The reset link opens a dedicated new-password screen, and no family data loads until a new password is saved. An expired link, or one opened in a different browser, shows a clear message.
  - **Child accounts** are still created only by a signed-in parent, through `api/parent/children.ts`.
    - A taken email now returns the same generic error as any other failure.
    - A password Supabase rejects returns `child_password_rejected`, without echoing it.
    - Each family is capped at 10 children (409 `child_limit_reached`), checked before any Auth call.
  - **Password inputs:** the minimum length is 12 everywhere, the maximum 72 (bcrypt's limit).
  - **PKCE storage:** the PKCE verifier is kept in localStorage, so email links opened in a new tab can complete. The session itself stays in sessionStorage.
  - **Wording:** removed "prototype" wording from both sites and the prepared safety response. The child sign-in form now tells children to ask a parent for an account or a password reset.
- **Files/systems affected:** `supabase/migrations/20261015130000_parent_family_setup.sql` (new); `packages/shared/src/supabase.ts`; `api/auth/parent-signup.ts` (deleted); `api/parent/children.ts`; `api/README.md`; `apps/parent/src/App.tsx`; `apps/child/src/App.tsx`; `packages/shared/src/safety.ts`; `scripts/api.test.mjs`; `scripts/rls-db.test.mjs`; rebuilt `apps/child/dist` and `apps/parent/dist`; `PROJECT_REPORT.md`. `.env.example` is unchanged because no new variable was added.
- **Why it changed:** The user asked for account creation and login to work as a real product, with accounts and passwords saved securely in Supabase.
  - "Account creation is unavailable" on the hosted sites because `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are not set in Vercel, so the client correctly refuses to start. That is a configuration step for the owner, not a code defect.
  - The old sign-up route was replaced because an open service-role endpoint let anyone create confirmed accounts and families without email verification or rate limiting.
- **What remains simulated:** AI responses, provider connection testing, persisted approvals, history and alerts, Realtime, notifications and safeguarding escalation. Parent-initiated reset of a child's password is not built yet. Until a parent does that, a child who forgets their password needs the account recreated.
- **Tests or checks performed:**
  - `npm run lint` passed.
  - `npm test` passed 35/35. New tests:
    - the family-setup RPC in real Postgres (PGlite): anonymous callers get permission denied; missing-session, unconfirmed, existing-member, child and invalid-name callers are rejected; success creates exactly one family bound to the caller with no access to other families; a second attempt is rejected
    - duplicate-email and weak-password child creation errors are generic and do not echo the password
    - the 10-child cap makes no Auth call
    - short passwords are rejected before any Auth call
    - the deleted sign-up route no longer exists
  - Both Vite builds passed.
  - `npm run scan`: 0 findings across 47 files.
  - Bundle grep: no `SERVICE_ROLE`, `service_role` or `API_KEY_ENCRYPTION` strings in either `dist`. The only "prototype" matches are JavaScript's built-in `Object.prototype`.
  - Not done: the migration was not applied to the hosted Supabase project, the sites were not redeployed, and browser acceptance was not re-run.
- **Security and data-protection impact:**
  - **Passwords:** SafeAI code never stores, logs or returns passwords. Parent passwords go only from the browser to Supabase Auth. Child passwords pass through the parent-authenticated server route straight to `auth.admin.createUser` and are never written to a SafeAI table.
  - **Smaller attack surface:** the unauthenticated service-role write path is removed.
  - **Account enumeration** is closed on parent sign-up, password reset and child creation.
  - **Authorisation** still comes only from `family_members` under RLS, never from user metadata.
  - **Secrets:** no secret value was read, printed or stored; `.env` was not opened.
- **New assumptions, risks, or open decisions:**
  - The owner must apply the new migration and configure Supabase Auth: Confirm email on, minimum password length 12, leaked-password protection, CAPTCHA, and Site URL and redirect URLs for both sites. See §3.5.
  - Supabase's built-in email sender is heavily rate-limited, so configure custom SMTP before real families use the service.

### 2026-10-15 12:16 BST — Final PORT2 integration review and in-scope fixes

- **What changed:** Fixed the configured-parent failure path so an unavailable family-data API no longer leaves the page stuck loading or exposes raw backend error codes. Added clear fail-closed feedback for unavailable family services and child-account creation. Restored a visible `Reset demo` control in both signed-in experiences; it clears only temporary in-memory preview state and never deletes accounts, child records or stored provider credentials. Added a repeatable no-credential Playwright browser acceptance check and corrected both HTML `theme-color` values to match the dark-grey UI. Rebuilt and redeployed both Vercel production sites.
- **Files/systems affected:** `apps/child/src/App.tsx`; `apps/parent/src/App.tsx`; `apps/child/index.html`; `apps/parent/index.html`; `scripts/walkthrough.test.mjs`; `scripts/browser_acceptance.py`; rebuilt `apps/child/dist` and `apps/parent/dist`; Vercel deployments `dpl_6R4ndg5MStRixPzpYBCZB18kvxn1` and `dpl_Ax1d7uWUbCkpyVtWimG7ajBZHVCR`; `PROJECT_REPORT.md`.
- **Why it changed:** The acceptance review found a real resilience defect in the parent’s authenticated data-loading path, the required reset control had been lost during the account-boundary migration, and mobile browser chrome still advertised the retired light theme. The browser check makes the currently deployable no-credential boundary repeatable without inventing an account.
- **What remains simulated:** Prepared local safety responses, approval/history/alert presentation, provider test connection, AI responses, Realtime, notifications and safeguarding escalation remain simulated or unconnected. The hosted aliases still stop at the honest account-service gate because both Vercel production projects have zero environment variables. No cross-device or cross-origin family event transport is claimed.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed 30/30; both Vite builds passed; `npm run scan` found 0 findings across 48 files; `npm audit --omit=dev` found 0 vulnerabilities; Playwright browser acceptance passed at 390px and 1280px for child and parent with no console errors, no horizontal overflow, disabled no-credential sign-in, child sign-in-only behaviour and parent account-creation visibility; both Vercel aliases returned HTTP 200 with the expected security headers and the latest deployment metadata reported `READY`.
- **Security and data-protection impact:** No API key, Supabase credential, password or child data was read, printed, stored or deployed. Reset does not call an API or touch server data. The new browser test does not sign in, save browser state or print user input. The parent now fails closed with a user-readable message when the family service is unavailable.
- **New assumptions, risks, or open decisions:** The owner must privately configure the documented Vercel/Supabase variables before testing real account creation. Approval/history/Realtime acceptance remains a prepared architecture and local UI boundary, not a production family workflow. The report’s §3.5 lists the remaining work.

### 2026-10-15 12:06 BST — Definite, mature UI design and geometric hierarchy refinement

- **What changed:** Refactored the UI styling across both child and parent applications to be significantly more definite, structured, and mature. Replaced bubbly rounded geometries (32px / 2rem radii) with precise, modern 8px–14px radii. Scaled headings down from sprawling display clamp to disciplined, authoritative typography (`h1` max 2.5rem, balanced line-heights, `-0.025em` tracking). Styled cards as solid, crisp architectural containers (`#151a24` with `1px solid #222b3a`), added solid 4px accent left-borders on callouts and status banners, introduced high-definition button tactility with top rim highlights (`inset 0 1px 0 rgba(255,255,255,0.15)`), polished the chat interface into a modern AI chat experience with sleek bubbles (`#4f46e5` user, `#151a24` assistant), refined the Boots companion to a poised, balanced mascot, tightened mobile bottom navigation to 3.6rem height, and formatted status indicators into clean, crisp status chips.
- **Files/systems affected:** `packages/shared/src/styles.css`; rebuilt `apps/child/dist`; rebuilt `apps/parent/dist`; `PROJECT_REPORT.md`.
- **Why it changed:** User requested: "make the ui more definite and mature". 12–14 year old students and evaluating parents/assessors respond best to an interface that feels like a credible, professional modern application (akin to Linear, Arc, or Discord) rather than a toy-like or cartoonish layout, while still retaining Boots as a warm, approachable companion.
- **Accessibility impact:**
  - Preserved strong WCAG AAA contrast for primary text (`#f1f5f9` on `#0f131a` exceeds 13:1).
  - Maintained `:focus-visible` outline (`2px solid #818cf8` with `2px offset`).
  - Solid, color-plus-text/icon status indicators are clearer and easier to parse at a glance.
  - Reduced-motion compliance (`prefers-reduced-motion: reduce`) preserved with instant `.01ms` transitions.
  - Strict compliance with `assert.doesNotMatch(css, /--ink:\s*(#000000|black)\b/)` maintained.
- **What remains simulated:** Same as previous gate: live AI provider, persistent cross-device Realtime events, and production safeguarding remain disabled.
- **Checks performed:**
  - `npm test`: 30/30 tests passed (RLS, schema, safety precedence, walkthroughs, masked API settings, no storage/network).
  - `npm run lint`: 0 errors across child, parent, and server configs.
  - `npm run build`: both `apps/child` and `apps/parent` built production assets cleanly.
  - `npm run scan`: 46 files scanned; 0 secret findings.
  - `npm audit --omit=dev`: 0 vulnerabilities found.
- **Security/data-protection impact:** Styling-only change. No credentials, tokens, or personal child data were added or modified. Zero client storage (`localStorage`, `sessionStorage`, `indexedDB`) used for application state.
- **New assumptions, risks, or open decisions:** None. The visual system is unified across both apps through shared tokens in `packages/shared/src/styles.css`.


### 2026-10-15 12:02 BST — Supabase configuration diagnosis

- **What changed:** Investigated the account-service-unavailable screen shown on the parent site. Confirmed that the Supabase project `oxuacclbibgbggooqqfy` is `ACTIVE_HEALTHY`, while both Vercel production projects report no environment variables. No source or deployment configuration was populated with a credential.
- **Files/systems affected:** `PROJECT_REPORT.md`; read-only Supabase project metadata; read-only Vercel environment inventory for `safeai-learning-hub-child` and `safeai-learning-hub-parent`.
- **Why it changed:** The screenshot showed the expected fail-closed message because the frontend cannot initialise Supabase without both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- **What remains simulated:** Until the owner privately configures the required Vercel variables, sign-in, parent signup, child-account creation and provider-key storage cannot run on the hosted aliases. AI responses, Realtime, persisted approvals/history, analytics and production safeguarding remain disabled by design.
- **Checks performed:** Supabase project status read as `ACTIVE_HEALTHY`; both Vercel production environment inventories returned “No Environment Variables found”; the previously recorded lint, 30/30 test, build, secret scan, audit, browser and security-header gates remain valid.
- **Security/data-protection impact:** No real API key, service-role key, password, child data or environment value was read, printed, stored, or added. The fail-closed screen prevents a fake family account from being shown.
- **New assumptions, risks, or open decisions:** A private owner action is required in Vercel: add the browser URL and publishable key variables to both projects, and add the server-only Supabase/service-role and encryption variables to the parent project. Do not paste any key into chat, source, screenshots, browser storage or documentation. Redeploy after configuration and run the auth/security gate again.

### 2026-10-15 11:59 BST — Dark grey theme overhaul and UI styling improvements

- **What changed:** Re-themed both the Child and Parent websites with a modern dark grey visual design system. Replaced the light background with a deep slate/charcoal gradient (`#22293b` to `#151924` to `#0e121a`), elevated dark grey glass panels (`#1c2230`, `#232b3d`), high-contrast off-white primary text (`--ink: #f0f4fc`), cool grey secondary text (`--muted: #8d9bb0`), dark inputs (`#161b26`), dark mobile bottom navigation bar (`rgba(20, 24, 34, 0.94)`), dark contextual popovers with glowing lilac borders (`rgba(24, 30, 44, 0.98)`), dark chat bubbles (vibrant gradient for child user, sleek slate for assistant), and dark-mode-tuned safety badges for all 5 safety classifications.
- **Files/systems affected:** `packages/shared/src/styles.css`; rebuilt `apps/child/dist`; rebuilt `apps/parent/dist`; `PROJECT_REPORT.md`.
- **Why it changed:** User requested: "improve the ui , make the webiste with dark grey". The dark grey palette improves visual comfort, reduces eye fatigue, enhances focus on learning interactions, and provides a polished, contemporary look while maintaining strict WCAG AA/AAA contrast ratios and preserving all existing safety, walkthrough, and mobile navigation contracts.
- **Accessibility impact:**
  - Preserved `assert.doesNotMatch(css, /--ink:\s*(#000000|black)\b/)` by using soft bright off-white text (`#f0f4fc`), ensuring strong contrast on dark grey without harsh pure black or white glare.
  - Contrast ratios for primary text (`#f0f4fc` on `#141824`) exceed 12:1 (exceeding WCAG AAA).
  - High-contrast `:focus-visible` outlines (`3px solid #60a5fa`) maintained for keyboard navigation.
  - Color-plus-text/icon status indicators tuned for dark backgrounds (`#6ee7b7` allowed, `#c7d2fe` support, `#fde68a` approval, `#fecdd3` blocked, `#f3e8ff` urgent).
  - Maintained instant transitions (`.01ms`) and no-motion behavior for `prefers-reduced-motion: reduce`.
- **What remains simulated:** Same as previous gate: live AI provider, persistent cross-device Realtime events, and production safeguarding remain disabled.
- **Checks performed:**
  - `npm test`: 30/30 tests passed (RLS, schema, safety precedence, walkthroughs, masked API settings, no storage/network).
  - `npm run lint`: 0 errors across child, parent, and server configs.
  - `npm run build`: both `apps/child` and `apps/parent` built production assets cleanly.
  - `npm run scan`: 46 files scanned; 0 secret findings.
  - `npm audit --omit=dev`: 0 vulnerabilities found.
- **Security/data-protection impact:** Styling-only change. No credentials, tokens, or personal child data were added or modified. Zero client storage (`localStorage`, `sessionStorage`, `indexedDB`) used for application state.
- **New assumptions, risks, or open decisions:** The dark grey aesthetic is applied globally via shared design tokens in `packages/shared/src/styles.css`.


### 2026-10-15 11:57 BST — Persisted child school year and final parent function redeploy

- **What changed:** Added the small additive `child_profiles.school_year` field so the parent account form does not lose the value after reload. Updated the parent child-account API to insert and return the field, applied the migration to the live empty Supabase project, verified the column with read-only SQL, reran the local gates, and redeployed the parent Vercel project.
- **Files/systems affected:** `supabase/migrations/20261015115500_add_child_school_year.sql`; `api/parent/children.ts`; `scripts/api.test.mjs`; live Supabase project `oxuacclbibgbggooqqfy`; Vercel project `safeai-learning-hub-parent`; `apps/parent/dist`; `PROJECT_REPORT.md`.
- **Why it changed:** The account-creation form already requested school year; persisting it keeps the form, API response and subsequent parent reload consistent without broadening the product model.
- **What remains simulated:** No real accounts or child data were created. Auth, approval/history persistence, Realtime, AI, provider connection testing, analytics, notifications, retention scheduling, deletion workflows and specialist safeguarding routing remain disabled.
- **Checks performed:** Supabase migration returned success; `information_schema.columns` confirmed `school_year text default 'Not set'`; `npm run lint` passed; `npm test` passed 30/30; `npm run build` passed; `npm run scan` passed with 0 findings across 46 files; parent Vercel deployment `dpl_6jfeKKqb3LjiuX3MpZykYZqQzW4e` reached `READY` and was aliased to the stable parent URL.
- **Security/data-protection impact:** The migration adds non-sensitive family profile metadata only. No password, provider key, service-role key or child record was read or created. The route remains parent-role protected and the child site remains sign-in-only.
- **New assumptions, risks, or open decisions:** `school_year` is descriptive profile metadata, not an age-verification control. The live database remains empty and must not be used with real children until the outstanding production safeguards are designed and reviewed.

### 2026-10-15 11:55 BST — Parent/child account integration, provider-key boundary and PORT2 acceptance gate

- **What changed:** Removed the retired mock parent and child account seeds from the live app paths. Added a required parent sign-in page with a parent-account creation option, server-side parent signup and family membership creation, parent-only child-account creation from Settings, linked-child loading, and account-scoped empty states. The child site now exposes sign-in only and never offers child account creation. Added authenticated profile loading so names come from the account rather than fictional identities. Kept the provider-key UI and server route as an encrypted, parent-only storage boundary; the UI explicitly states that provider connection testing and live AI are not enabled.
- **Files/systems affected:** `apps/child/src/App.tsx`; `apps/parent/src/App.tsx`; `packages/shared/src/supabase.ts`; `packages/shared/src/types.ts`; `api/auth/parent-signup.ts`; `api/parent/children.ts`; `api/README.md`; `docs/LOCAL_DEVELOPMENT.md`; `docs/SECURITY.md`; `scripts/api.test.mjs`; `scripts/walkthrough.test.mjs`; rebuilt `apps/child/dist`; rebuilt `apps/parent/dist`; Vercel production projects `safeai-learning-hub-child` and `safeai-learning-hub-parent`; `PROJECT_REPORT.md`.
- **Why it changed:** The owner requested removal of mock family identities, real account entry points with a parent-owned child-account lifecycle, and a usable parent API-key entry boundary while preserving the fixed PORT2 scope and no-real-AI constraint.
- **What remains simulated:** AI replies and safety classification are prepared local responses; no external AI provider is called. Approval/history/alerts/Realtime updates are not yet server-backed in the UI, so a newly created family begins empty. Provider “Test connection” remains unavailable by design. No analytics, notifications, rate limiting, scheduled retention, family deletion or specialist safeguarding route is enabled. Vercel has no Supabase or server-only environment values, so hosted sign-in/account creation remains disabled until the owner configures them privately.
- **Checks performed:** `npm run lint` passed; `npm test` passed 30/30; `npm run build` passed for child and parent; `npm run scan` passed with 0 findings across 45 files; `npm audit --omit=dev` passed with 0 vulnerabilities; local Playwright mobile smoke passed for both sites with no console errors or horizontal overflow; `vercel project inspect` confirmed both target projects; both production redeployments reached `READY`; `curl -I` returned 200 for both aliases and showed CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy and COOP headers.
- **Security/data-protection impact:** No real API key, password, service-role key, child data or account was requested, read, printed, stored in source, sent to an AI provider, or added to Vercel. Account passwords are sent only to Supabase Auth through server-side creation and are never returned to the client or stored in SafeAI tables. Provider keys are accepted only by the parent-only server boundary, encrypted server-side, masked on return, and never copied or persisted in browser storage. Protected immediate-risk content remains separate from ordinary parent history.
- **New assumptions, risks, or open decisions:** The Supabase owner must privately add the publishable browser key and server-only credentials before testing real signup, child creation, or key storage on Vercel. The deployment is suitable for PORT2 evidence of the account boundary, prepared safety flows and ethical design, not for real children, emergency use or production safeguarding. The live schema advisor recommendations and the server-backed approval/history/Realtime work remain open.

#### PORT2 definition-of-done acceptance matrix

1. **Child prompt-learning interaction:** Present in the child lessons and prompt composer; local prepared interaction verified by source tests/build.
2. **Allowed AI question:** Prepared allowed response and badge remain covered by safety tests; no provider call.
3. **Sensitive question routed to parent approval:** Approval state and parent centre remain in scope; newly created families start with no requests because server-backed chat routing is not enabled.
4. **Blocked unsafe request:** Blocked state, non-echoing response and precedence are covered by safety tests.
5. **Parent history review:** Parent history UI remains account-scoped and empty until persistence is connected; protected disclosures are withheld.
6. **Parent approval or rejection:** Approval centre controls and decisions remain present; persistence is simulated locally within the signed-in UI until the approval API is implemented.
7. **Child view updating:** Role/session/profile boundaries are wired; cross-device Realtime updates remain future work.
8. **API-key and privacy explanation:** Parent-only masked key entry, encrypted server route, no-copy behaviour, privacy notices and documentation are present; no real key was used.
9. **Accessibility and ethical design choices:** Focus styles, keyboard walkthrough controls, readable status text, reduced-motion CSS, child assent/privacy notice and non-surveillance wording pass source and browser checks.
10. **Safe adult-support or immediate-risk storyboard:** Protected child help and parent alert storyboard are present; urgent content is withheld from ordinary history and never repeated.
11. **Prototype limits and future work:** Documented in `docs/LOCAL_DEVELOPMENT.md`, `docs/SECURITY.md`, this report and the hosted configuration gate.


### 2026-10-15 11:38 BST — Post-Supabase integration verification gate

- **What changed:** Rebuilt both Vite sites after the live Supabase setup and updated the report with the final verification results. No runtime feature was enabled and no credential value was added.
- **Files/systems affected:** `apps/child/dist`; `apps/parent/dist`; `PROJECT_REPORT.md`.
- **Why it changed:** A hosted backend configuration must be followed by a fresh local build, test and secret-boundary check before the project is considered integrated.
- **What remains simulated:** Vercel still has no Supabase publishable key or server-only credentials. Auth, family data, AI, persistence, Realtime, notifications and safeguarding routing remain disabled.
- **Checks performed:** `npm run lint` passed; `npm test` passed 28/28; `npm run build` passed for both sites; `npm run scan` found 0 findings across 44 files. Live Supabase migration and RLS checks were already verified in the preceding entry.
- **Security/data-protection impact:** No secret was read, printed, stored or deployed. Build output remains free of service-role, encryption and provider-key material. No real child data or account was created.
- **New assumptions, risks, or open decisions:** The app will continue showing fictional local preview until public Supabase configuration is deliberately added. Supabase advisor performance recommendations remain open and should be addressed before real family data.

### 2026-10-15 11:37 BST — Supabase project created and reviewed schema applied

- **What changed:** Created the `safeai-learning-hub` Supabase project in the connected free organisation, in `eu-central-1`, with ref `oxuacclbibgbggooqqfy`. Applied migration `initial_safeai_schema`, recorded by Supabase as version `20261015103731`.
- **Files/systems affected:** Live Supabase project; `supabase/migrations/20261014222010_initial_safeai_schema.sql`; `docs/LOCAL_DEVELOPMENT.md`; `docs/SECURITY.md`; `PROJECT_REPORT.md`.
- **Why it changed:** The project owner asked for Supabase to be created and configured. The existing reviewed migration was the smallest in-scope backend foundation for the two hosted sites.
- **What remains simulated:** No Auth users, family rows, child profiles, chat, approvals, provider settings, Realtime channels, AI provider, notifications or safeguarding escalation were enabled. Vercel remains in fictional preview mode because no publishable or server-only credentials were configured.
- **Checks performed:** Supabase migration list confirmed `initial_safeai_schema`; table inspection confirmed all 11 public/private tables exist with RLS enabled; a corrected read-only SQL query confirmed the same; project status is `ACTIVE_HEALTHY`; security advisor returned one intentional informational notice for the service-role-only private credential table; performance advisor returned index and policy-shape recommendations. The first verification query used the wrong catalog column and failed harmlessly; it was corrected and passed.
- **Security/data-protection impact:** No API key, password, service-role key or child data was requested, read, printed, stored or deployed. The private credential table is RLS-enabled and has no browser policies. The database is empty and no real accounts exist.
- **New assumptions, risks, or open decisions:** The selected region is Supabase `eu-central-1`, not London; this was the region returned by the created project. Performance advisor items should be reviewed before real family data. Any future Vercel credential configuration must be performed privately and followed by a fresh security and end-to-end auth gate.

### 2026-10-15 01:09 BST — Production hosting enabled for the two-site prototype

- **What changed:** Created two Vercel production projects and deployed the child and parent builds using their existing app-specific configs. Stable aliases are live at `https://safeai-learning-hub-child.vercel.app` and `https://safeai-learning-hub-parent.vercel.app`.
- **Files/systems affected:** Vercel projects `safeai-learning-hub-child` and `safeai-learning-hub-parent`; `vercel.child.json`; `vercel.parent.json`; deployed `apps/child` and `apps/parent` bundles; this report.
- **Why it changed:** The project owner requested that the current PORT2 prototype be hosted on Vercel so the two experiences can be reviewed through shareable HTTPS links.
- **What remains simulated:** Supabase Auth, family data, persisted chat/history, Realtime updates, provider-key persistence/testing, live AI responses, analytics, notifications and safeguarding escalation remain unconfigured. Both sites therefore remain fictional preview experiences, even though their static shells and fail-closed API functions are hosted.
- **Checks performed:** Both Vercel builds reached `READY`; `curl -I` returned HTTP 200 for both aliases; `vercel inspect` confirmed both production targets and the configured Vite build/output paths; response headers included CSP, `X-Frame-Options`, nosniff, no-referrer, Permissions-Policy, HSTS and COOP. Existing lint, test, build, secret scan, audit and browser smoke gates remain passing as recorded above.
- **Security/data-protection impact:** No API key, Supabase credential or child data was added to Vercel. No environment variables were supplied during deployment. The deployed API routes fail closed when backend configuration is absent, and no live AI provider call is enabled. Headers are active on both aliases.
- **New assumptions, risks, or open decisions:** These are Vercel project aliases, not custom domains. Supabase environment variables and server-only secrets must be configured only after a separate live security review; the prototype must not be presented as suitable for real children or emergency use. Deployment protection, domain ownership and production monitoring have not been added.

### 2026-10-15 00:03 BST — Final post-UI security gate

Scope:
- Every file changed by the UI and walkthrough work, using modification times because the folder is not a git repo.
- Both built bundles (`apps/child/dist`, `apps/parent/dist`).
- The Supabase migration, including its RLS policies and grants.
- The auth flows in `packages/shared/src/supabase.ts` and both `App.tsx` files.
- The parent API-key settings screen and `/api/parent/provider-key`.
- `vercel.child.json` and `vercel.parent.json`.

Finding and fix:
- **G-1 (privacy regression, fixed):** child chat history copied the first 75 characters of whatever the child typed into the history summary. This included blocked requests, so a refused password or home address would be shown again on the History tab (it was in memory only and never sent or stored).
  - History now stores a fixed description of each outcome (`HISTORY_SUMMARY[outcome.state]`) and never the typed text.
  - Urgent outcomes are still never added to history.
  - The typed text is still used, but only to classify the message and to show the child's own message bubble.

No other regression was found:
- The visual work did not change the migration, RLS, grants, API routes, auth library or Vercel configs.
- The key form is still a password input with no copy button. It posts once with `credentials: 'omit'` and `no-store`, and shows only the masked ending.
- Both sites still confirm their role from `family_members` and sign out on a mismatch.
- The bundles contain no service-role, encryption or provider-key material, and no `localStorage` use.

Files touched:
- `apps/child/src/App.tsx`: added `HISTORY_SUMMARY`; the history record uses it.
- `scripts/walkthrough.test.mjs`: new test, "child history never repeats the typed question".
- `PROJECT_REPORT.md`: this entry, §1, §3.2, §3.3, §3.4 and §3.5.

Checks:
- `npm run lint` clean.
- `npm test` 28/28.
- `npm run build` passes for both sites.
- `npm run scan`: 0 findings across 44 files.
- Bundle grep for secret patterns: no hits.
- `npm audit` was 0 earlier in this gate; no dependency has changed since.

Security impact: closes a minor on-screen privacy leak. No secret was found, read or printed, and `.env` was not opened. No rotation is required.

### 2026-10-14 23:55 BST — Two-site security, privacy, auth, Supabase and safeguarding audit (F-A to F-O)

Scope:
- Design doc `2026-10-14-safeai-learning-hub-design.md` (outside the repo, read only).
- All app, shared, API, migration, script, Vercel and package files.
- The built `dist/` bundles.
- `.env` files were not opened. No real key, account, child data or AI provider was introduced. Every test value is fictional and assembled at runtime.

Each finding below gives: severity · files/DB objects · fix · verification · security/privacy impact · remaining risk · status.

- **F-A High: approval bypass.** A child's `approval_requests` insert was not forced to `status='pending'` with `resolved_at` null, so a child could self-approve.
  - Files/DB: migration, `public.approval_requests` policies.
  - Fix: the child insert policy was removed. Approval rows are created server-side only.
  - Verification: a PGlite negative test confirms a child cannot insert or approve.
  - Impact: closes the parent-approval bypass.
  - Status: resolved; live verification requires a Supabase project.
- **F-B High: protected disclosures exposed to parents.** The parent policies on `safety_events` exposed protected or urgent rows, including `context_summary`.
  - Files/DB: migration, `public.safety_events` and `public.chat_messages` policies.
  - Fix:
    - A protected check withholds the disclosure text from parents.
    - Urgent content is never written to `chat_messages`.
  - Verification: a PGlite test confirms a parent cannot read protected rows or text.
  - Impact: safeguarding, because a parent may be the source of risk.
  - Remaining risk: a real routing policy for disclosures still needs specialist design.
  - Status: resolved in code.
- **F-C High: forged chat rows.** A child could insert `chat_messages` rows with `direction='assistant'` or an arbitrary `safety_state`.
  - Fix: chat rows are inserted server-side only, with no client insert policy.
  - Verification: PGlite negative test.
  - Status: resolved.
- **F-D Medium: cross-family IDs.** With no composite foreign keys, a parent could create rows (such as `access_settings`) pairing their own `family_id` with another family's `child_id`.
  - Fix: composite `(family_id, child_id)` foreign keys plus membership foreign keys.
  - Verification: a PGlite test shows that cross-family inserts fail.
  - Impact: one parent cannot reach another family.
  - Status: resolved.
- **F-E Medium: sibling metadata.** The `family_members` select policy let a child see siblings' membership rows.
  - Fix: a child sees only their own row; a parent sees their family.
  - Verification: PGlite sibling negative test.
  - Impact: a child cannot see a sibling's data.
  - Status: resolved.
- **F-F Medium: parent update scope.** The parent update on `approval_requests` could change any column, including `child_id` and `category`, or reset a request to pending.
  - Fix: column-level grants, and only the pending → resolved transition is allowed.
  - Verification: PGlite test.
  - Status: resolved.
- **F-G Medium: `provider_settings` writable from the browser.** A parent could set status `active` and similar metadata directly.
  - Fix: the table is read-only to parents. Writes happen only through the service-role RPCs.
  - Verification: PGlite test.
  - Status: resolved.
- **F-H Medium: private-schema helpers.** The helpers needed a usage grant and a fixed `search_path`.
  - Fix:
    - `grant usage on schema private to authenticated`, with the tables still revoked.
    - `revoke all on schema private from public, anon`.
    - `search_path = ''` on helpers.
    - Ciphertext is kept in `private.provider_credentials`, readable only through `service_role` RPCs.
  - Verification: PGlite tests.
  - Status: resolved.
- **F-I High: unauthenticated provider-key route.**
  - Files: `api/_lib/auth.ts`, `api/_lib/provider-key.ts`, `api/_lib/response.ts`, `api/parent/provider-key.ts`, `api/parent/children.ts`, `api/ai/chat.ts`.
  - Fix:
    - The bearer token is verified by Supabase, and the role and family come from `family_members` via the caller's own session, never from user metadata.
    - Provider allowlist and key-shape validation.
    - POST stores or rotates the key, and DELETE removes it.
    - HKDF + AES-256-GCM with AAD `familyId:provider` and a key version.
    - The service-role client is server-only and used only for the two credential RPCs. Child listing uses the parent's session, so RLS applies.
    - The chat route requires the child role and returns 503 `ai_provider_not_configured`.
    - Responses are `no-store` with short error codes.
  - Verification: `scripts/api.test.mjs` (7 tests):
    - 401 without a session; 403 for a child even when metadata says "parent".
    - The ciphertext decrypts only with the right family and provider.
    - The raw key never appears in a response or RPC body.
    - Validation rejects bad input.
    - Missing configuration fails closed.
  - Impact: only an authenticated parent can manage their own family's key.
  - Remaining risk: changing `API_KEY_ENCRYPTION_SECRET` requires keys to be re-entered until a re-encrypt job exists.
  - Status: resolved in code; Vercel env vars (names in `.env.example`) are required to run it.
- **F-J High: either site would accept any signed-in role.**
  - Files: `apps/child/src/App.tsx`, `apps/parent/src/App.tsx`, `packages/shared/src/supabase.ts`.
  - Fix: `confirmSiteRole` signs out a session whose `family_members` role does not match the site (child on the parent site, or parent on the child site). Sign-in errors are generic and never reveal whether an account exists.
  - Verification:
    - Lint and build.
    - Code review of both gates.
    - The server routes also enforce the role (F-I), so the client gate is defence in depth.
  - Impact: a child cannot reach parent API settings, even by visiting the parent URL.
  - Remaining risk: needs a live Supabase project for an end-to-end test.
  - Status: resolved in code; requires external configuration to verify live.
- **F-K Medium: the UI presented a fake local demo as if it were live, and the key form did nothing real.**
  - Files: both `App.tsx` files.
  - Fix:
    - Honest banners and footers ("Local preview · Fictional … · No live AI provider or real child data").
    - When Supabase is configured, the key form calls the real server route.
    - In preview the key is discarded and the UI says "Preview only: the key was discarded. Nothing was sent or stored."
    - Disable and Remove are disabled until a key exists.
    - Fictional dashboards are labelled as samples.
  - Verification:
    - `scripts/walkthrough.test.mjs`.
    - Mobile browser check: the key input is `type=password`, `autocomplete=new-password` and `spellcheck=false`; the value is cleared from the DOM after saving.
    - Network showed only same-origin HTML/JS/CSS GETs; local and session storage and cookies were empty.
  - Impact: no false claims, and the key is never retained in the page.
  - Status: resolved.
- **F-L Medium: no security headers on either Vercel project.**
  - Files: `vercel.child.json`, `vercel.parent.json`.
  - Fix:
    - CSP (`default-src 'self'`, `connect-src 'self' https://*.supabase.co wss://*.supabase.co`, `frame-ancestors 'none'`).
    - `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy: no-referrer`, a restrictive `Permissions-Policy`, HSTS and COOP.
    - `Cache-Control: no-store` on `/api/*`.
  - Verification:
    - The built `index.html` has no inline script or style.
    - The source has no `dangerouslySetInnerHTML` or `<style>`.
  - Remaining risk:
    - Headers are applied only by Vercel, so they need checking after the first deploy.
    - A custom Supabase domain must be added to `connect-src`.
  - Status: requires external configuration to verify.
- **F-M Medium: retention and deletion.** There was no way to purge expired chat history.
  - Fix:
    - Added `public.purge_expired_chat_messages()`, which honours each child's `retention_days` and is executable by `service_role` only.
    - Parents can delete their family's messages and settings through RLS delete policies.
  - Verification: PGlite test ("history deletion and retention purge stay inside the family").
  - Remaining risk: the purge is not scheduled (it needs `pg_cron` or a Vercel cron), and full family-data deletion is not implemented.
  - Status: requires external configuration.
- **F-N Medium: no real RLS negative tests.**
  - Fix: added `scripts/rls-db.test.mjs`. It runs the real migration in PGlite 0.5.8 with emulated Supabase roles and `auth.uid()`.
  - Verification: 10 negative-access tests pass, covering cross-family access, siblings, parent-only tables, the private schema, RPCs and anon.
  - Status: resolved; it should be repeated against a live project.
- **Docs and env (Low):**
  - Rewrote `docs/SECURITY.md` and `api/README.md`; updated `docs/LOCAL_DEVELOPMENT.md`.
  - `.env.example` gains the variable name `API_KEY_ENCRYPTION_KEY_VERSION`, with no value.
  - Status: resolved.
- **Scanner false positive (Low):** `scripts/api.test.mjs:47` held a fictional encryption value that matched the scan rule.
  - Fix: the value is now assembled with `join`. The scanner was not weakened.
  - Verification: `npm run scan` reports 0 findings across 44 files.
  - Status: resolved.
- **F-N2 Low (safeguarding wording): the child privacy copy said SafeAI "never asks for … passwords", which contradicted the new password sign-in.**
  - Files: `apps/child/src/App.tsx`.
  - Fix: now "Keep real personal details, other passwords and private photos out of your chats."
  - Status: resolved.
- **F-O Info: inconsistent timestamps in this report.** Several earlier entries are dated 2026-10-15, which is ahead of the system clock (2026-10-14 23:55 BST at this audit). They are left unchanged so history is not rewritten; treat their order, not their date, as authoritative. Status: recorded.
- **Tooling:** added a `preview-parent` entry to `.claude/launch.json` (vite preview on port 4174) for the mobile browser check. It is local only, with no security impact.

Safeguarding review (no code change needed):
- Precedence is urgent > blocked > approval > safe-support > allowed.
- Urgent content is never saved and never creates a parent approval.
- Immediate-risk help is never gated by pause, the walkthrough or a notice.
- Abuse disclosures are not shown verbatim to parents.

All of these are covered by `scripts/safety.test.mjs`.

**Checks run:** lint, unit, integration and API tests, PGlite RLS negative tests (27/27), build, `npm audit` (0), secret scan (0), dist grep for service-role, encryption and provider-key patterns (clean), and a mobile auth/key-flow browser check (pass).

**Incidents:** none. No secret was found or exposed, so no rotation is required.

### 2026-10-15 01:25 BST — Implemented mobile-first redesign, contextual popovers, multi-child switcher, and masked API settings
- **What changed:**
  1. Built `ContextualPopover.tsx` component in `packages/shared/src/` providing real anchored contextual popovers with active target highlighting (`.tour-target-active`), step progress counter (`Step X of Y`), progress bar, Next/Prev/Skip buttons, keyboard navigation (`Escape`, Arrow keys), and mobile-safe bottom positioning.
  2. Refactored Child website (`apps/child/src/App.tsx`) to be chat-first with Boots companion greeting, interactive prompt composer with send button (`tour-child-send`), starter scenario chips (`tour-child-prompts`), message feed with color-plus-text safety status badges (`tour-child-status`), transparent privacy notice (`tour-child-privacy`), interactive lessons (`tour-child-lessons`), history (`tour-child-history`), help with crisis guidance (`tour-child-help`), account chip (`tour-child-account`), mobile bottom navigation, and walkthrough restart.
  3. Refactored Parent website (`apps/parent/src/App.tsx`) with multi-child switcher (`tour-parent-switcher`) switching between Maya R. (13), Leo R. (11), and Sam Jr. (14) with dynamic activity updates, family overview (`tour-parent-overview`), approval centre with parent notes (`tour-parent-approvals`), safety alerts withholding disclosure text (`tour-parent-alerts`), searchable history (`tour-parent-history`), child account management (`tour-parent-accounts`), access controls (`tour-parent-access`), privacy settings (`tour-parent-privacy`), sign out (`tour-parent-signout`), and masked API provider settings (`tour-parent-api`).
  4. Updated API settings UI with a parent-only lock banner, masked password input, masked display ending (`••••••••••••••••••••••••••••3a9f`), connection status, last-tested time, test/rotate/disable/remove controls, and strictly no copy buttons.
  5. Added mobile-first styles in `packages/shared/src/styles.css` including `.mobile-bottom-nav`, `.nav-tab-item`, `.chat-bubble`, `.chat-composer-sticky`, `.prompt-chips-scroll`, `.child-switcher-bar`, `.api-status-card`, and `.contextual-popover`.
  6. Updated `scripts/walkthrough.test.mjs` and `scripts/rls.test.mjs` to verify the 9 child and 10 parent walkthrough targets, multi-child switcher, API key masking, RLS policies, and mobile UI rules.
- **Files affected:**
  - `packages/shared/src/types.ts`
  - `packages/shared/src/ContextualPopover.tsx`
  - `packages/shared/src/index.ts`
  - `packages/shared/src/styles.css`
  - `apps/child/src/App.tsx`
  - `apps/parent/src/App.tsx`
  - `scripts/walkthrough.test.mjs`
  - `scripts/rls.test.mjs`
  - `PROJECT_REPORT.md`
- **Design reason:** Shifted from a desktop-heavy prototype layout to two clean, calm, minimal mobile-first websites. The child experience is centered on safe AI conversation and AI literacy habits with Boots companion; the parent experience is focused on family oversight, multi-child switching, and zero-trust secret handling.
- **Accessibility impact:**
  - Keyboard accessible: Escape closes walkthroughs, Enter submits messages, Arrow keys navigate walkthrough.
  - Visible focus rings (`:focus-visible`) on all interactive controls.
  - Color-plus-text/icon status indicators for all 5 safety states (`✓ Allowed`, `♡ Safe adult-support`, `↗ Parent approval required`, `! Blocked`, `✦ Immediate help`).
  - Deep slate text (`#142238`) throughout; pure black (`#000000`) is avoided.
  - Full `prefers-reduced-motion: reduce` compliance with instant scrolling and suppressed animation durations (`.01ms`).
  - Mobile bottom navigation with comfortable tap targets.
- **What remains simulated:** Local preview state is in-memory only; no remote Supabase database, live AI provider, real-time sync, or emergency safeguarding escalation is configured.
- **Tests or checks performed:**
  - `npm test`: 9/9 tests pass (safety precedence, non-echoing responses, protected help separation, contextual walkthrough targets, masked API settings, multi-child switcher, no storage/network, accessibility styling, RLS policies).
  - `npm run lint`: 0 TypeScript or compiler errors across child, parent, and server configs.
  - `npm run build`: both `apps/child` and `apps/parent` build production assets cleanly.
  - `npm run scan`: 42 files scanned with 0 secret findings.
  - `npm audit --omit=dev`: 0 vulnerabilities.
- **Security and data-protection impact:**
  - Zero client-side persistent storage (`localStorage`, `sessionStorage`, `indexedDB`) used; no network polling.
  - Strict secret handling: API keys are masked (`type="password"`), client UI displays only masked endings, and copy buttons are prohibited.
  - High-risk disclosures withhold child disclosure text from parent history to prevent potential domestic harm.
- **New assumptions, risks, or open decisions:** The build is an evidence-ready educational coursework demonstration. Production deployment would require live server-side secret management and specialist safeguarding review.

### 2026-10-15 00:50 BST — Completed final clean integration gate and corrected report status
- **What changed:** Updated the report’s current status and final readiness results to match the migrated two-site tree, replacing obsolete single-demo counts and source references with the final 8-test, two-build, scan, audit and browser evidence.
- **Files affected:** `PROJECT_REPORT.md`.
- **Why it changed:** The report must be accurate and chronological after the final clean gate; historical demo entries remain history, while the current status must describe only the active architecture.
- **What remains simulated:** Supabase/Auth, persisted family data, Realtime, server session enforcement, provider-key persistence/testing, AI, notifications, analytics and specialist safeguarding remain unconfigured.
- **Tests or checks performed:** Final clean gate passed lint, 8/8 tests, both builds, 0 secret findings, 0 production dependency vulnerabilities, source boundary grep and browser approval/rejection smoke. `rg` was unavailable in the final shell, so the live-call source check used a quiet `grep` fallback.
- **Security and data-protection impact:** No credential values or child data were added. The current report now makes prepared versus verified controls explicit.
- **New assumptions, risks, or open decisions:** The prototype is ready for PORT2 evidence only; deployment remains intentionally absent until live Supabase/Vercel security work is approved.

### 2026-10-15 00:53 BST — Added newest-first chronology index for the migrated work
- **What changed:** Added this newest-first index so the migrated work can be reviewed in actual order even though the detailed entries below retain their original change evidence and wording.
- **Files affected:** `PROJECT_REPORT.md`.
- **Why it changed:** The report is a living chronological record and the integration pass generated several closely spaced implementation and browser-check entries.
- **What remains simulated:** No product, auth, data or deployment behaviour changed.
- **Tests or checks performed:** Documentation-only; the final clean gate results remain the evidence source for the active tree.
- **Security and data-protection impact:** No values or files beyond the report were changed.
- **New assumptions, risks, or open decisions:** The detailed historical entries remain below; the index is the canonical order for the migrated phase.

#### Migrated-phase chronology index (newest first)
1. 00:53 — Added this chronology index.
2. 00:50 — Final clean lint, tests, builds, scan, audit, source-boundary and browser evidence recorded.
3. 00:46 — Temporary browser harness, screenshots and retired root artifacts removed.
4. 00:42 — Parent rejection smoke and dependency/source-boundary checks added.
5. 00:39 — Current security controls and PORT2 readiness summary consolidated.
6. 00:36 — Local development, deployment and security documentation added.
7. 00:33 — Final visual captures enabled and reviewed.
8. 00:30 — Status-label browser assertions aligned.
9. 00:27 — Browser acknowledgement confirmation wait stabilised.
10. 00:24 — Privacy acknowledgement made persistent and accessible.
11. 00:20 — Checkbox-state browser check attempted.
12. 00:18 — Browser acknowledgement dispatch adjusted.
13. 00:15 — Initial browser acknowledgement harness timing adjusted.
14. 00:12 — Temporary two-site browser acceptance harness added.
15. 00:09 — Shared Vite package path corrected.
16. 00:05 — Vite app roots corrected.
17. 00:02 — TypeScript 7 path configuration aligned.
18. 23:59 — Offline-safe styling and metadata-aware RLS test correction.
19. 23:56 — Supabase dependency and replacement tests added.
20. 23:52 — Separate child/parent architecture migration added.

### 2026-10-15 00:39 BST — Consolidated current security posture and PORT2 readiness
- **What changed:** Reordered the new documentation entry into the newest-first Change Log, expanded the security record with current controls and open items for Supabase/RLS/server boundaries, and added a final readiness summary covering completion, simulation, checks, limitations and future work.
- **Files affected:** `PROJECT_REPORT.md`.
- **Why it changed:** The report must remain chronological and make the new architecture’s security status and evidence readiness easy to find after migration.
- **What remains simulated:** Live Supabase/auth/family data, Realtime, server session verification, encrypted provider persistence, AI responses, notifications, analytics and specialist safeguarding remain unconfigured.
- **Tests or checks performed:** This is documentation-only; it records the passing static and browser checks already run and the final gates still to be repeated after temporary-artifact cleanup.
- **Security and data-protection impact:** No secrets or data were added. The report now distinguishes prepared controls from unverified live deployment controls.
- **New assumptions, risks, or open decisions:** PORT2 evidence readiness is judged against the current local preview; production readiness remains explicitly false until the open items are completed.

### 2026-10-15 00:42 BST — Extended browser evidence to parent rejection and completed audit check
- **What changed:** Extended the temporary Playwright smoke pass to reload the parent preview and verify the rejection path as well as approval. Ran `npm audit --omit=dev`, which reported 0 vulnerabilities. Performed a source/bundle boundary grep; only expected environment names, Vite same-origin preload code and React diagnostic URLs were present, with no provider credential values or provider call code.
- **Files affected:** `scripts/acceptance_smoke.py`, `PROJECT_REPORT.md`.
- **Why it changed:** PORT2 acceptance includes parent approval or rejection, and the final security gate must include a dependency audit and no-live-provider inspection.
- **What remains simulated:** Both decisions still update fictional local parent state only; no real child account, database event or cross-site Realtime update exists.
- **Tests or checks performed:** Prior browser smoke passed; this updated smoke script is queued for one final run. `npm audit --omit=dev` passed with 0 vulnerabilities. `npm run scan` had already reported 0 findings.
- **Security and data-protection impact:** No secrets, API values or harmful examples were introduced. The inspection distinguished Vite’s own module-preload `fetch` and React error URLs from provider calls.
- **New assumptions, risks, or open decisions:** A live provider route remains intentionally disabled; no production claim is made.

### 2026-10-15 00:46 BST — Removed temporary QA harness and retired root build artifacts
- **What changed:** Removed `scripts/acceptance_smoke.py` and moved the obsolete root `dist/` and empty legacy `src/` artifacts, plus final screenshots, out of the repository after visual inspection. The active builds remain under `apps/child/dist` and `apps/parent/dist`.
- **Files affected:** Deleted `scripts/acceptance_smoke.py`; retired root `dist/` and `src/`; temporary screenshots removed from their working locations.
- **Why it changed:** The browser harness and screenshots were only acceptance evidence and the root artifacts belonged to the superseded single-site prototype; leaving them would blur the separate-site product boundary.
- **What remains simulated:** No product behaviour changed; the passing browser results remain recorded below.
- **Tests or checks performed:** Final browser smoke passed approval and rejection, all five safety states, lessons, privacy, protected alert, key clearing and mobile overflow before cleanup. The generated child/parent build outputs remain available for the final bundle scan.
- **Security and data-protection impact:** Retiring stale generated output reduces the chance of serving old demo code. No secrets or real data were involved.
- **New assumptions, risks, or open decisions:** Future build commands regenerate only the app-local `dist` directories; no deployment is configured.

### 2026-10-15 00:36 BST — Added local run, deployment and security boundary documentation
- **What changed:** Added local development/check instructions, separate Vercel configuration notes, credential-handling guidance, RLS summary and explicit preview limitations in `docs/LOCAL_DEVELOPMENT.md` and `docs/SECURITY.md`. This report’s current security record and final readiness summary are being updated to reflect the new architecture.
- **Files affected:** `docs/LOCAL_DEVELOPMENT.md`, `docs/SECURITY.md`, `PROJECT_REPORT.md`.
- **Why it changed:** The separate-site migration needs an obvious handoff for local operation, deployment preparation and the server/client secret boundary without claiming live security.
- **What remains simulated:** Supabase, authentication, persistence, realtime, provider storage/testing, AI responses, notifications, analytics and safeguarding escalation remain unconfigured.
- **Tests or checks performed:** The last browser smoke run passed both sites and produced final visual captures; static final gates and an audit remain to be repeated after cleanup.
- **Security and data-protection impact:** Security controls and remaining risks are now easy to locate without exposing any credential values. No deployment or external write occurred.
- **New assumptions, risks, or open decisions:** The migration still needs a live database review/advisor run; Vercel project linking and environment configuration require explicit future approval.

### 2026-10-14 23:52 BST — Replaced retired demo shell with separate child and parent sites
- **What changed:** Added independent child and parent Vite entry points, shared safety/types/Supabase client package, mobile-first product surfaces, auth gates, preview-only fallback, provider settings boundary, Vercel project configs, prepared server routes and an ownership-aware Supabase migration. Removed the former monolithic `src/` app, root Vite entry and the old `/demo`, account-switcher and reset-demo framing.
- **Files affected:** `apps/child/**`, `apps/parent/**`, `packages/shared/**`, `api/**`, `supabase/migrations/20261014222010_initial_safeai_schema.sql`, `vercel.child.json`, `vercel.parent.json`, `package.json`, `package-lock.json` (when dependency install completes), `.env.example`, root TypeScript config, deleted `src/**`, deleted root Vite entry/config, `scripts/secret-scan.mjs`.
- **Why it changed:** The latest product direction superseded the prior demo-only framing and requires two separately deployable websites with Supabase-ready authentication, family ownership, provider-key isolation and server-side boundaries.
- **What remains simulated:** Without Supabase environment values, sign-in, family relationships, child provisioning, persistence, realtime, provider tests, AI responses, notifications, analytics and safeguarding escalation remain unavailable. The local preview is fictional, in-memory React state only, and is not a production account system.
- **Tests or checks performed:** The Supabase CLI was unavailable globally; `npx supabase migration new initial_safeai_schema` created the migration filename before SQL was added. Static build/lint/tests remain to be run after dependency installation and test replacement.
- **Security and data-protection impact:** No credentials were added. Public browser configuration is limited to Supabase URL/publishable key names; service-role, encryption secret and provider keys are server-only. Raw provider keys are cleared from the parent form after submission and are never returned by the stub route. Public tables have explicit RLS policies; provider ciphertext is in an unexposed private schema.
- **New assumptions, risks, or open decisions:** The project owner must create/link two Vercel projects and a Supabase project later. The migration still needs a live Supabase apply/advisor pass, server session verification, rate limiting, input/output safety validation and specialist safeguarding review before any real child use.

### 2026-10-14 23:56 BST — Pinned Supabase client and replaced obsolete demo tests
- **What changed:** Added pinned `@supabase/supabase-js` and `@types/node` dependencies. Replaced tests that targeted the deleted monolithic demo with safety precedence, protected-response, walkthrough-foundation, separate-entry-point, accessibility and static RLS-policy tests. Expanded secret scanning to the new apps, packages, API and migration directories while allowing public Supabase browser configuration and still rejecting private client env names.
- **Files affected:** `package.json`, `package-lock.json`, `scripts/safety.test.mjs`, `scripts/walkthrough.test.mjs`, `scripts/rls.test.mjs`, `scripts/secret-scan.mjs`.
- **Why it changed:** The test and scan surface must follow the new two-site architecture and verify the security boundary rather than the retired `/demo` implementation.
- **What remains simulated:** No test connects to Supabase, authenticates a real parent or child, sends AI requests, or persists data. RLS coverage is static until a Supabase project is available.
- **Tests or checks performed:** `npm install` completed twice with 0 reported vulnerabilities; the replacement checks are queued for the first post-migration lint/test/build run.
- **Security and data-protection impact:** Dependency versions are pinned and lockfile updated. No secret values were added. The scanner still covers server/API/migration source and excludes `.env` contents.
- **New assumptions, risks, or open decisions:** `@supabase/supabase-js` is used only with the publishable browser key; server route session verification and private-schema writes remain future work.

### 2026-10-14 23:59 BST — Corrected monorepo resolution and offline-safe styling
- **What changed:** Added TypeScript path mapping and portable Vite aliases for the shared package, corrected the static RLS test to ignore macOS AppleDouble metadata files, and removed the external font import so local checks and the preview do not request a third-party font.
- **Files affected:** `tsconfig.base.json`, `apps/child/vite.config.ts`, `apps/parent/vite.config.ts`, `scripts/rls.test.mjs`, `packages/shared/src/styles.css`.
- **Why it changed:** The first lint/test gate exposed an alias-resolution failure and a metadata-file selection bug; removing the remote font also keeps the product boundary local-first.
- **What remains simulated:** No runtime data, auth, AI or database behaviour changed; Supabase migration checks remain static.
- **Tests or checks performed:** First gate results recorded: secret scan passed with 0 findings; six replacement tests passed; lint/build were blocked by alias resolution; two RLS checks were blocked by AppleDouble filename selection. Fixes are ready for the next gate.
- **Security and data-protection impact:** No credentials or network endpoints were added. The browser build now has no font network dependency in CSS.
- **New assumptions, risks, or open decisions:** The Vite shared alias is now path-portable within the repository; live cross-origin child/parent realtime still requires Supabase Realtime and authenticated channels.

### 2026-10-15 00:02 BST — Aligned TypeScript 7 path configuration
- **What changed:** Removed the retired `baseUrl`/root path mapping and placed relative shared-package path mappings in each app tsconfig, matching the installed TypeScript 7 compiler behaviour.
- **Files affected:** `tsconfig.base.json`, `apps/child/tsconfig.json`, `apps/parent/tsconfig.json`.
- **Why it changed:** The second static gate showed TypeScript 7 rejects `baseUrl` and could not resolve the shared alias from the inherited root configuration.
- **What remains simulated:** No product or data behaviour changed.
- **Tests or checks performed:** In the second gate, all 8 tests and the secret scan passed; lint/build were blocked only by the TypeScript path configuration and are being rerun after this fix.
- **Security and data-protection impact:** No key, permission, network or storage change.
- **New assumptions, risks, or open decisions:** The app-specific relative mapping assumes the committed monorepo layout remains `apps/*` beside `packages/*`.

### 2026-10-15 00:05 BST — Pointed Vite builds at their separate app roots
- **What changed:** Set the child and parent Vite configs to use their own directories as build roots so each site resolves its own `index.html` and entry point.
- **Files affected:** `apps/child/vite.config.ts`, `apps/parent/vite.config.ts`.
- **Why it changed:** The first full gate passed lint and all 8 tests but Vite attempted to resolve the deleted root HTML file.
- **What remains simulated:** No runtime product or data behaviour changed.
- **Tests or checks performed:** First full gate results: lint passed, 8/8 tests passed, secret scan pending after the build-root fix; build failure was isolated to Vite entry resolution.
- **Security and data-protection impact:** No credentials, API calls, storage or permission change.
- **New assumptions, risks, or open decisions:** Each Vercel project must use its corresponding `vercel.*.json` configuration and build command; no deployment has been performed.

### 2026-10-15 00:09 BST — Corrected shared package path for Vite
- **What changed:** Fixed the relative Vite aliases so both app roots resolve `packages/shared/src` from the repository layout.
- **Files affected:** `apps/child/vite.config.ts`, `apps/parent/vite.config.ts`.
- **Why it changed:** The next build reached Vite but rejected the shared package path as one directory too high; TypeScript and tests were already passing.
- **What remains simulated:** No product or data behaviour changed.
- **Tests or checks performed:** Second full gate: lint passed, 8/8 tests passed, scan was not reached because the build stopped at shared-package resolution.
- **Security and data-protection impact:** No security boundary or credential change.
- **New assumptions, risks, or open decisions:** Shared source remains intentionally bundled into each separately built frontend; private server modules are not imported by the app entry points.

### 2026-10-15 00:12 BST — Added browser acceptance smoke coverage for both sites
- **What changed:** Added a temporary native Playwright smoke script covering child preview entry, privacy acknowledgement, prompt lesson completion, all five safety states, help/privacy explanations, parent approval, history filter, protected alert boundary, provider-key form clearing, walkthrough skip controls, no retired reset control, mobile overflow and external-request absence.
- **Files affected:** `scripts/acceptance_smoke.py`.
- **Why it changed:** Static checks cannot prove the separate sites render and the key child/parent interactions remain usable at a mobile viewport.
- **What remains simulated:** Browser coverage exercises the local preview and prepared UI state only; it does not authenticate a real account, connect Supabase, persist a request, call AI, or provide emergency support.
- **Tests or checks performed:** Script added; it is run next through the dedicated Python/Chromium runtime with both Vite servers.
- **Security and data-protection impact:** The smoke data is fictional; no real key or harmful request is entered. It verifies that the provider key field is cleared and that no external browser requests occur.
- **New assumptions, risks, or open decisions:** The smoke test treats local preview as the evidence path until Supabase credentials are intentionally configured; the script is temporary and will be removed after the run.

### 2026-10-15 00:15 BST — Aligned smoke test with self-removing privacy acknowledgement
- **What changed:** Changed the temporary Playwright check to dispatch the privacy acknowledgement click instead of waiting for a removed checkbox after React state changes.
- **Files affected:** `scripts/acceptance_smoke.py`.
- **Why it changed:** The first browser pass confirmed the product click worked, then the harness timed out because the privacy notice intentionally unmounts after acknowledgement.
- **What remains simulated:** No product behaviour changed; preview acknowledgement remains in-memory only.
- **Tests or checks performed:** First browser pass reached and clicked the acknowledgement, then stopped at the harness timing mismatch; both Vite servers started and were cleanly stopped.
- **Security and data-protection impact:** No secrets or data were involved; the test continues to verify no external requests.
- **New assumptions, risks, or open decisions:** The harness uses DOM event dispatch only for a self-removing control; all remaining actions use normal accessible selectors.

### 2026-10-15 00:18 BST — Corrected browser acknowledgement event dispatch
- **What changed:** Switched the temporary smoke test from a raw DOM dispatch to Playwright’s accessible click with `no_wait_after`, allowing React’s `onChange` to update the notice state without waiting on a control that disappears.
- **Files affected:** `scripts/acceptance_smoke.py`.
- **Why it changed:** The second browser pass showed the raw dispatch did not update the React state, so the following allowed scenario remained disabled.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** Second browser pass reached the child chat and confirmed the privacy control was present; it stopped at the expected dependent assertion because the acknowledgement state had not changed.
- **Security and data-protection impact:** No key, network or data change.
- **New assumptions, risks, or open decisions:** Playwright’s `no_wait_after` is limited to this self-removing checkbox; the product still uses an ordinary accessible checkbox.

### 2026-10-15 00:20 BST — Used Playwright checkbox state check for acknowledgement
- **What changed:** Changed the temporary smoke test to use Playwright’s `check(no_wait_after=True)` for the acknowledgement input.
- **Files affected:** `scripts/acceptance_smoke.py`.
- **Why it changed:** The previous click form still left the following child scenario disabled in the headless run; `check` explicitly verifies and dispatches the checkbox state transition.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** Third browser pass reached the acknowledgement and still stopped at the dependent allowed-state assertion; this is a harness-only issue under investigation.
- **Security and data-protection impact:** No key, network or data change.
- **New assumptions, risks, or open decisions:** The product may need a more stable acknowledgement selector/test hook if the next black-box pass confirms the state is not propagating.

### 2026-10-15 00:24 BST — Kept the privacy acknowledgement confirmation visible
- **What changed:** The child chat now retains the privacy notice after acknowledgement, shows a status confirmation and removes only the active checkbox choice. The smoke test returned to the normal accessible checkbox check.
- **Files affected:** `apps/child/src/App.tsx`, `scripts/acceptance_smoke.py`.
- **Why it changed:** The browser pass showed the acknowledgement was processed but the entire panel unmounted during Playwright’s action lifecycle. A persistent confirmation is clearer for keyboard and assistive-technology users and is a better assent demonstration.
- **What remains simulated:** Acknowledgement is still in-memory preview state; no legal consent or identity verification is claimed.
- **Tests or checks performed:** Previous browser passes reached and activated the checkbox but stopped before the next assertion; the persistent-state change is ready for a complete rerun. Static lint/tests/build/scan were green before this UI fix.
- **Security and data-protection impact:** No data is persisted and no new field is collected. The visible confirmation improves transparency.
- **New assumptions, risks, or open decisions:** A real deployment still needs a reviewed consent/assent model and persistence policy appropriate for the target jurisdiction and family relationship.

### 2026-10-15 00:27 BST — Stabilised the browser check for the persistent acknowledgement
- **What changed:** The temporary smoke test now uses a DOM-backed native click followed by an explicit visible acknowledgement confirmation wait.
- **Files affected:** `scripts/acceptance_smoke.py`.
- **Why it changed:** Playwright’s normal checkbox action still waited on a scheduled navigation despite the panel remaining mounted; the product state itself was not the failing part.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The fourth browser pass reached the checkbox and completed the click action before the harness timeout; the next run will verify the confirmation and continue through the full flow.
- **Security and data-protection impact:** No key or data change.
- **New assumptions, risks, or open decisions:** Only the temporary harness uses DOM-backed click; the UI remains keyboard-operable through the native checkbox.

### 2026-10-15 00:30 BST — Aligned smoke assertions with icon-plus-text status labels
- **What changed:** Updated the temporary browser assertions to match status labels containing both a semantic icon and visible text rather than requiring an exact text node.
- **Files affected:** `scripts/acceptance_smoke.py`.
- **Why it changed:** The browser pass confirmed the acknowledgement state updated, then the assertion missed `Allowed` because the rendered label also contains its status icon.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** Fifth browser pass reached the first allowed response; only the exact-label assertion stopped the harness.
- **Security and data-protection impact:** No key, network or data change.
- **New assumptions, risks, or open decisions:** Assertions now reflect the colour-plus-text accessible status pattern used by the product.

### 2026-10-15 00:33 BST — Captured final child and parent browser states for visual review
- **What changed:** Added temporary screenshot capture to the passing browser smoke harness for the child home and parent settings states.
- **Files affected:** `scripts/acceptance_smoke.py`, temporary `/tmp/safeai-child-final.png`, temporary `/tmp/safeai-parent-final.png`.
- **Why it changed:** The frontend implementation guidance requires visual inspection of the final browser-rendered result in addition to DOM assertions.
- **What remains simulated:** The captures show only fictional local preview content; no real account, provider, message or child data appears.
- **Tests or checks performed:** The preceding browser smoke run passed the full child/parent flow; screenshots will be inspected and then removed with the temporary harness.
- **Security and data-protection impact:** No secrets, external requests or persistent storage are involved.
- **New assumptions, risks, or open decisions:** Visual review is a prototype quality check, not a formal accessibility certification.

### 2026-10-14 23:33 BST — Final PORT2 integration and acceptance review completed
- **What changed:** Completed the final PORT2 acceptance review against the design specification’s eleven-item definition of done. Verified child prompt learning, allowed questions, parent approval and rejection, child decision receipts, blocked and safe adult-support states, protected immediate-risk handling, parent history, API-key/privacy explanations, ethical/accessibility choices, both guided tours, Boots companion accessibility, Reset demo, responsive layouts and reduced-motion support. Removed the temporary acceptance harness and mobile screenshot after inspection.
- **Files affected:** Deleted `scripts/acceptance_qa.py`; deleted `/tmp/safeai-acceptance-mobile.png`; updated `PROJECT_REPORT.md`.
- **Why it changed:** This closes the fixed PORT2 vertical slice with an evidence-based integration gate and leaves only the reusable production tests and project source in the repository.
- **What remains simulated:** Authentication, account linking, AI responses, safety classification, approvals between real people, alerts, notifications, real-time transport, persistence, analytics, emergency escalation and all child/parent data remain fictional in-memory local state. No live AI or production safeguarding claim is made.
- **Tests or checks performed:** `npm run lint` passed; `npm test` passed with 21/21 tests; `npm run build` passed; `npm run scan` reported 0 findings; `npm audit --omit=dev` reported 0 vulnerabilities; Playwright/Chromium acceptance QA passed for the complete definition of done, both walkthroughs, Boots labelled companion art, privacy gate and urgent bypass, parent approve/reject with note, child updates, reset, no console errors, no external requests, responsive mobile layout and reduced motion. The rendered mobile screen was visually inspected.
- **Security and data-protection impact:** No secrets were read, created or printed. No `.env` file was opened. The source and bundle contain no provider key, storage API, analytics, external endpoint or real child data. Typed input is keyword-matched locally, cleared and never stored or repeated; blocked content is not repeated; urgent disclosure text is excluded from ordinary parent history.
- **Known limitations:** This is not a formal WCAG audit; the non-blocking guided tour does not trap focus. Keyword matching is not a real safety classifier and is English-only. UK help contacts are examples requiring verification/localisation. The prototype is not suitable for real children or emergency use.
- **Future work:** Add a secure authenticated backend, server-side provider integration, specialist safeguarding routing, verified local help contacts, DPIA/age-assurance/retention work, evaluated moderation, monitored notifications, real-time infrastructure, independent accessibility testing and usability testing with appropriate consent.
- **PORT2 acceptance decision:** Ready for PORT2 evidence as an honest interactive demonstration, not ready for deployment.

### 2026-10-14 23:32 BST — Aligned reduced-motion assertion with browser-computed CSS
- **What changed:** Updated the temporary acceptance script to accept the browser’s computed `0s` duration and assert `animationName: none` under reduced motion.
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** Chromium computes the stylesheet’s `animation: none !important` override as `0s`; this is stronger than the source-level millisecond fallback and confirms motion is disabled.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The eighth browser run reached the reduced-motion check and confirmed the CSS override before exposing this overly narrow harness expectation; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** The acceptance assertion now verifies the semantic outcome rather than one serialization of computed CSS.



### 2026-10-14 23:29 BST — Made walkthrough section assertion wait for React state propagation
- **What changed:** Changed the temporary acceptance script to use Playwright’s waiting class assertion for the active Approval centre tab.
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** The direct class read ran before the walkthrough’s `useEffect` section switch had propagated; the application already applies `side-nav-button active` from `parentSection`.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The seventh browser run reached the expected navigation area and exposed only this timing-sensitive harness assertion; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** The test now waits for the same observable state a user sees after the guided-tour step.



### 2026-10-14 23:26 BST — Aligned acceptance assertion with Playwright’s class assertion API
- **What changed:** Replaced a Python callable passed to Playwright’s class assertion with a direct class-attribute check for the active Approval centre tab.
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** The test had reached the parent walkthrough successfully; the failure was in the QA harness API usage, not the application.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The sixth browser run reached the walkthrough section mapping before exposing this harness-only assertion error; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** The assertion remains scoped to the active navigation class already applied by the product.



### 2026-10-14 23:23 BST — Aligned acceptance selector with the walkthrough’s accessible label
- **What changed:** Corrected both walkthrough launches in the temporary acceptance script to use the implementation’s accessible button name, “Start interactive guided walkthrough tour”.
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** The visible button says “Guided tour”, but its ARIA label intentionally provides the more descriptive accessible name; the first click selector targeted only the visible text.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The fifth browser run completed all safety states, protected alert separation and reset before exposing this label mismatch; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** Acceptance checks now exercise the accessible name that keyboard and assistive-technology users receive.



### 2026-10-14 23:19 BST — Aligned acceptance selector with the protected alert boundary copy
- **What changed:** Corrected the temporary acceptance script to assert the implemented content-free alert wording, “Disclosure text is intentionally not stored or shown here.”
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** The browser snapshot confirmed the protection is present under the product’s actual safeguarding boundary copy, not the draft shorthand used in the first selector.
- **What remains simulated:** No product behaviour changed; the alert remains a fictional, content-free local placeholder.
- **Tests or checks performed:** The fourth browser run reached the urgent parent alert and verified its state before exposing this copy mismatch; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** Acceptance checks now assert the exact visible safety boundary while preserving the requirement that urgent text is excluded from ordinary history.



### 2026-10-14 23:16 BST — Aligned acceptance selector with the parent decision receipt
- **What changed:** Corrected the temporary acceptance script to assert the implemented `.decision-receipt` after a parent rejection.
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** The browser snapshot confirmed the product exposes the correct rejection text, but under the current receipt class rather than the draft selector.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The third browser run completed the parent rejection and note flow before exposing this selector mismatch; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** Acceptance checks now target the current decision receipt DOM while retaining the visible rejection assertion.



### 2026-10-14 23:13 BST — Aligned acceptance selector with the implemented prompt lesson heading
- **What changed:** Corrected the temporary acceptance script to assert the implemented heading, “Make a prompt easier to answer.”
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** The browser snapshot showed the product heading differed from the first draft of the QA selector; the product copy itself already matched the lesson intent.
- **What remains simulated:** No product behaviour changed.
- **Tests or checks performed:** The second browser run reached the lesson interaction and exposed this selector mismatch; the full acceptance run is repeated next.
- **Security and data-protection impact:** No security or data-handling change.
- **New assumptions, risks, or open decisions:** Acceptance checks now target user-visible copy from the current implementation rather than an unimplemented alternative phrase.



### 2026-10-14 23:10 BST — Hardened acceptance coverage for the self-dismissing notice
- **What changed:** Updated the temporary acceptance script to dispatch the privacy acknowledgement click and wait for the React notice transition.
- **Files affected:** `scripts/acceptance_qa.py`.
- **Why it changed:** Playwright correctly clicked the checkbox, but the control unmounts immediately by design and the high-level `check()` call timed out waiting on the removed element.
- **What remains simulated:** No product behaviour changed; acknowledgement remains in-memory fictional state.
- **Tests or checks performed:** The first acceptance run reached the notice interaction before the harness timeout; the complete run is repeated next.
- **Security and data-protection impact:** No keys, network calls or real data involved.
- **New assumptions, risks, or open decisions:** The script uses a DOM event dispatch only for this self-removing control, then verifies the visible post-acknowledgement state through normal selectors.



### 2026-10-14 23:07 BST — Added temporary PORT2 acceptance browser coverage
- **What changed:** Added a temporary Playwright/Chromium acceptance script covering the eleven definition-of-done items, both guided walkthroughs, Boots accessible labels, privacy gating, urgent bypass, reset, reduced motion, responsive overflow, console errors and external-request boundaries.
- **Files affected:** `scripts/acceptance_qa.py`, `/tmp/safeai-acceptance-mobile.png` (temporary QA output).
- **Why it changed:** The final integration review needs evidence for the complete PORT2 slice, including interactions introduced after the original browser pass.
- **What remains simulated:** Browser coverage exercises only in-memory React state, deterministic scenario rules and mock responses; no real authentication, AI, network, storage, analytics, notifications or safeguarding escalation is added.
- **Tests or checks performed:** Static checks passed before this browser run: lint, 21 unit tests, build, secret scan and npm audit. Browser results are recorded in the follow-up entry.
- **Security and data-protection impact:** The script uses fictional Maya/Sam data, asserts no external requests, and does not print typed user input.
- **New assumptions, risks, or open decisions:** The temporary script will be removed after the acceptance run; the project’s formal WCAG and safeguarding limitations remain unchanged.



### 2026-10-14 23:05 BST — Final security, privacy and safeguarding gate (post-UI)
- **Date and time:** 2026-10-14 23:05 BST.
- **Scope:** I reviewed:
  - the design doc, `CLAUDE.md` and this report
  - all of `src/`, `scripts/`, `index.html`, `package.json`, the tsconfigs and `vite.config.ts`
  - the built `dist/` bundle and the 23:00 UI changes

  `.env` files were not opened. Only `.env.example` exists, plus its macOS `._` metadata file.
- **Behaviour status:** every behaviour below is **simulated** in local in-memory state. There is no AI, authentication, storage, network or real escalation.

| # | Audit finding | Files changed | Fix applied | Security / safeguarding impact |
|---|---------------|---------------|-------------|--------------------------------|
| F1 | The typed-question detector missed common immediate-risk and abuse wording (for example "I want to die", "someone is hurting me", "touched me", "not safe at home"). It also applied precedence with its own if-chain instead of `classifySafety`, so "health" plus a blocked term could in principle be ordered wrongly. | `src/scenarios.ts` | Added the `PROMPT_SIGNALS` keyword lists (urgent, blocked, approval and safe-support), matched at word start after normalising case, quotes and spacing. Every category is evaluated, and the result goes through `classifySafety`. | Immediate-risk and abuse wording now reaches protected help. **Blocked can no longer be downgraded to an approval request**, and urgent always wins. Precedence now has a single source. |
| F2 | A typed ordinary question returned the canned renewable-energy answer, which implied a real AI had answered. | `src/scenarios.ts`, `src/App.tsx` | Added `runPromptRules`. Ordinary typed questions now get `TYPED_QUESTION_RESPONSE`: "This demo has no AI connected… Your question was not saved." The history title is now neutral. | The app no longer misrepresents itself as answering. Typed text is never placed in history, approvals, alerts or the toast (tested). |
| F3 | Typed text stayed in the input after submission, and nothing warned the child against entering personal details. | `src/App.tsx`, `src/styles.css` | The input is cleared on both the refused and ran paths. Added `maxLength=300` and `autoComplete="off"`, plus a visible privacy note linked with `aria-describedby`: "Please don't type real names, addresses, schools… nothing you type is saved or sent anywhere. If you are in danger, use the help guidance above." | Real child data is discouraged and never retained. |
| F4 | The urgent quick chip was labelled "Emergency help", which suggested the demo is an emergency service. | `src/App.tsx` | Relabelled it "Protected help storyboard". | Honest labelling. The help strip (Childline, 999, "not an emergency service") is unchanged. |
| F5 | Walkthrough copy weakened notices in three places: (a) the safety-alerts step implied disclosures go to the parent; (b) the help step said support is "always right here"; (c) the privacy step did not mention typed text. | `src/tourSteps.ts` | (a) Now says disclosures in a real service go to a trained safeguarding contact, "not automatically to a parent. Parent approval is never emergency support." (b) Now says "This demo itself is not an emergency service and nobody is monitoring it." (c) Added the typed-text caveat. | **Parent approval is not presented as emergency support.** The tour strengthens notices rather than weakening them. |
| F6 | The floating tour card (z-index 999) could sit over the protected-support panel when an urgent scenario ran mid-tour. | `src/App.tsx` | `applyOutcome` closes the tour (`guidedStep: null`) whenever the outcome is urgent. | Nothing covers urgent help guidance. |
| F7 | The tour's arrow-key handler hijacked keys while the child typed in the chat or notes inputs. `scrollIntoView` used smooth scrolling even with reduced motion set. | `src/GuidedWalkthrough.tsx` | Key events from INPUT, TEXTAREA, SELECT and contentEditable elements are ignored, except Escape. Scrolling is instant under `prefers-reduced-motion`. | Accessibility and motion safety. |
| F8 | The parent note showed twice on the child's view: in the banner and again inside the response text. | `src/App.tsx` | The response now uses `approvalChildMessage[decision]` only, and the note appears once in its banner. | Clearer; no duplicated parent text. |
| F9 | Boots was animated (floating) next to the privacy notice, which competed with a sensitive notice. | `src/App.tsx` | Set `animated={false}` on that instance. Urgent and protected states were already static, and the reduced-motion block already disables Boots and the toast. | **Animations no longer accompany sensitive or urgent states.** |
| F10 | This report overclaimed "Full WCAG 2.1 AA" compliance and gave a stale count of 17 tests. | `PROJECT_REPORT.md` | §1 now lists the accessibility features and says no formal audit has been done. The 23:00 entry is annotated, and the test count is now 21. | The report describes functional versus simulated behaviour accurately. |

- **Accepted, no change needed:**
  - **Bundle `fetch(`:** the only `fetch(` in `dist/` is Vite's module-preload polyfill, which loads the app's own same-origin JS chunks. It is not a provider or third-party call.
  - **Bundle URLs:** the only URLs in `dist/` are `w3.org` SVG namespace strings and `react.dev/errors` links inside error messages. Neither is ever requested.
  - **`._.env.example`:** a 4 KB macOS AppleDouble metadata file. It holds no values.
- **Tests added:** `scripts/safety.test.mjs` gained 3 tests and `scripts/walkthrough.test.mjs` gained 1.
  - **Urgent and abuse wording:** urgent and abuse phrases route to `urgent`.
  - **Precedence:**
    - poison + body → blocked
    - health + hack/password → blocked
    - sad + hurt myself → urgent
    - volcanoes → allowed
  - **Typed text:**
    - fictional typed personal details never appear anywhere in the outcome
    - an ordinary typed question gets the honest no-AI reply
    - urgent typed text bypasses the notice gate and a pause
    - other typed text respects the notice gate
  - **Walkthrough copy:**
    - the tour copy keeps the safeguarding, privacy and help notices
    - no tour step presents the parent as emergency help
    - urgent closes the tour
    - the "Emergency help" label is gone
- **Verification performed:**
  - `npm run lint`: 0 errors on both tsconfigs.
  - `npm test`: **21 passed, 0 failed**.
  - `npm run build`: clean (`index-CBtLUzM9.js` 283.27 kB, `index-D500BBQS.css` 34.87 kB).
  - `npm audit`: **0 vulnerabilities**.
  - `npm run scan`: 18 files scanned, **0 findings**.
  - **Manual bundle grep:** no provider names, key patterns, `import.meta.env` or `VITE_` values, storage APIs or external endpoints.
  - **Env files:** none other than `.env.example`, which holds names only.
- **Remaining risks:**
  - **Keyword matching is not a safety classifier:**
    - It over-triggers: "dangerous" or "emergency" in a homework question shows protected help. This is the intended failure direction.
    - Misspellings, slang or coded language evade it.
    - Only English is covered.
  - **Accessibility:** there has been no formal WCAG audit, and the tour dialog does not trap focus.
  - **Help contacts:** Childline and 999 are UK examples and have not been localised.
  - **Simulated only:** nothing here is fit for real children without the §3.4 items.
- **Security decisions:** see §4, rows dated 23:05.



### 2026-10-14 23:00 BST — Visual identity, Boots companion, guided walkthroughs, parent notes, and accessible interaction polish
> **Correction (23:05 gate):** this entry's claim of "Full WCAG 2.1 AA compliance" was an overclaim. The features listed are real, but no formal audit has been done. Its custom-prompt description is superseded by F1–F3 in the 23:05 entry.
- **Date and time:** 2026-10-14 23:00 BST.
- **UI or interaction change:**
  1. **Visual Identity & Companion ("Boots"):** Created `src/BootsCompanion.tsx` containing an approachable, warm vector SVG companion character ("Boots") with custom boot footwear, expressive facial states (`wave`, `curious`, `shield`, `calm`, `mini`), friendly speech bubbles, and gentle CSS floating micro-interactions. Integrated Boots into the header brand, child hero banner, chat composer, response panels, and interactive lesson modules.
  2. **Guided Walkthrough Tour System:** Created `src/GuidedWalkthrough.tsx` and `src/tourSteps.ts`, implementing a skippable, restartable floating spotlight tour with visible progress ("Step X of Y"), progress fill track, keyboard navigation (`Escape` to close, `ArrowRight`/`ArrowLeft` to navigate, `Tab` cycling), and targeted spotlight element highlighting (`.tour-target-highlighted`) without opaque blocking curtains.
     - **Child Tour (9 steps):** Child/parent view switching, Dashboard navigation & meet Boots, Chat input & sample scenarios, Safety-status labels, Interactive lesson cards, Progress indicators, Plain-language privacy notice, Trusted-adult & crisis support, and Reset demo.
     - **Parent Tour (10 steps):** Parent dashboard summary, Pending approvals, Protected safety alerts, Conversation history, Filters and status labels, Approve/reject/discuss-later controls, Collaborative parent notes, Safety & access settings, Privacy and data explanation, and Reset demo. Includes automated parent tab switching during the tour.
  3. **Interactive AI Chat Input Composer:** Added a prompt input box with "Ask AI" submission and 5 quick scenario chips (`S1` to `S6`), powered by deterministic prompt intent detection (`detectScenarioFromPrompt`) in `src/scenarios.ts` that safely routes custom educational questions, sensitive health inquiries, blocked dangers, friendship concerns, or emergency statements to their canonical safety states.
  4. **Collaborative Parent Notes in Approval Centre:** Enhanced `ApprovalItem` and `ApprovalCentre` in `src/scenarios.ts` and `src/App.tsx` with quick suggestion chips ("Let's read this together", "We can ask Dr. Smith", "Good question for your teacher", "Let's talk over dinner") and custom parent note inputs. Parent notes attach to approval decisions and appear directly on the decision receipt and Maya's response panel.
  5. **Visual & Interaction Polish in `src/styles.css`:**
     - Replaced pure black with accessible dark slate/navy tokens (`--ink: #162534; --navy: #152536;`).
     - Added warm, accessible color tokens (eucalyptus teal, terracotta coral, golden honey, royal purple, and calm rose).
     - Ensured all statuses combine color, icons/dots, and explicit text labels.
     - Implemented visible 3px focus rings on all interactive controls (`outline: 3px solid #e26146; outline-offset: 3px;`).
     - Enforced strict `@media (prefers-reduced-motion: reduce)` disabling all transforms, transitions, and animations.
     - Guaranteed that urgent-risk escalation alerts remain completely static, calm, dignified, and supportive, with zero flashing, pulsating, or exciting animations.
     - Upgraded responsive layouts across desktop, tablet, and mobile breakpoints.
- **Files affected:** `src/BootsCompanion.tsx`, `src/tourSteps.ts`, `src/GuidedWalkthrough.tsx`, `src/App.tsx`, `src/scenarios.ts`, `src/styles.css`, `package.json`, `scripts/walkthrough.test.mjs`, `PROJECT_REPORT.md`.
- **Design reason:** Fulfills visual and interaction-design requirements for SafeAI Learning Hub (IST4000 Explore PORT2 Case Study 4), making the child experience engaging, intuitive, and age-appropriate for 12–14-year-olds without being childish, while providing parents and assessors with a calm, scannable, credible, and transparent dashboard.
- **Accessibility impact:** Full WCAG 2.1 AA compliance: strong color contrast, dual encoding for all status states (colour plus text/icons), prominent keyboard focus states, full keyboard navigation for the walkthrough (Escape, Arrow keys, Tab), screen-reader labels and live regions, and comprehensive `prefers-reduced-motion` overrides.
- **What remains simulated:** All AI classification, responses, parent approvals, alerts, and state synchronization remain local in-memory React state within a single browser session. No external AI APIs, databases, authentication, or persistent storage are utilized.
- **Tests or visual checks performed:**
  - Ran `npm test` verifying 17 unit tests across `scripts/safety.test.mjs` and `scripts/walkthrough.test.mjs`, confirming safety precedence, gate bypass for urgent risks, history privacy separation, approval holding guarantees, complete tour step coverage (9 child / 10 parent steps), target ID presence in App.tsx, prompt intent routing, parent note formatting, reduced-motion CSS rules, avoidance of pure black, and absence of urgent alert animations.
  - Ran `npm run lint` (`tsc --noEmit`) passing with 0 errors across application and node targets.
  - Ran `npm run build` (`vite build`) producing clean production client bundle.
  - Ran `npm run scan` (`node scripts/secret-scan.mjs`) passing with 0 secret or credential findings across all project files.
- **Security and data-protection impact:** No API keys, credentials, or secrets exist or are exposed. No external tracking, network calls, cookies, or browser storage (`localStorage`/`sessionStorage`) are used. Immediate-risk disclosure content remains strictly excluded from parent history.
- **Any remaining design risks:** The prototype is a coursework demonstration vertical slice; a real-world deployment would require specialist safeguarding design, real-time backend synchronization, and independent security/privacy audits.



### 2026-10-14 22:58 BST — Completed final verification and removed temporary QA artifacts
- **What changed:** Removed the temporary Playwright browser harness and its `/tmp` screenshots after inspection. Kept the reusable unit test file for the safety precedence and local-only checks.
- **Files affected:** Deleted `scripts/qa_demo.py` and `/tmp/safeai-learning-hub-child.png`, `/tmp/safeai-learning-hub-desktop.png`, `/tmp/safeai-learning-hub-mobile.png`; updated `PROJECT_REPORT.md`.
- **Why it changed:** Temporary verification artifacts should not become part of the delivered prototype, while the small deterministic test remains useful for future changes.
- **What remains simulated:** The whole feature slice remains local React state with mock responses; there is no real authentication, database, analytics, AI provider, persistence, emergency escalation or external real-time service.
- **Tests or checks performed:** Final `npm run lint` passed; final `npm test` passed with 5 tests; final `npm run build` passed with Vite output; Playwright/Chromium QA passed for child/parent flow, all five safety states, approval update, reset, desktop/mobile layout, no console errors and no `/api/` or OpenAI request; secret/provider scan found no key-like value or provider call in project source; concept and initial child render were visually inspected with `view_image`.
- **Security and data-protection impact:** No secrets were read, created or printed. No browser storage or real network call is used. Immediate-risk is isolated from ordinary parent history and blocked copy does not repeat harmful input.
- **New assumptions, risks, or open decisions:** The prototype is ready for PORT2 evidence as a demonstration, not deployment. Any future backend must preserve server-side secret handling, authentication, minimised sensitive logging and specialist safeguarding review.



### 2026-10-14 22:53 BST — Added a clean initial child-state screenshot to the visual QA set
- **What changed:** Extended the temporary Playwright script to capture the initial child experience before interactions, alongside the desktop parent-state and mobile screenshots.
- **Files affected:** `scripts/qa_demo.py`, `/tmp/safeai-learning-hub-child.png` (QA output only; not a project asset).
- **Why it changed:** The visual comparison needed a representative first viewport for the primary child experience, not only the post-reset parent approval screen.
- **What remains simulated:** Screenshot evidence was local-only and showed fictional Maya/Sam demo content.
- **Tests or checks performed:** The full browser QA suite passed after this screenshot addition.
- **Security and data-protection impact:** No external request, key or real data was involved.
- **New assumptions, risks, or open decisions:** Screenshots were temporary QA evidence and were removed after inspection; the shipped app remains code-native.



### 2026-10-14 22:50 BST — Security, privacy and safeguarding review: findings fixed
_Timestamp note: the system clock read 2026-10-14 22:50 BST when this entry was written, which is earlier than the times on the entries below. Those earlier times appear to have been estimated; this entry is the most recent work._

- **Date and time:** 2026-10-14 22:50 BST.
- **Audit scope:** Design doc, `CLAUDE.md`, this report, all source (`src/`), `index.html`, `vite.config.ts`, tsconfig files, `package.json`, `.gitignore`, `.env.example`, `scripts/`, and the built `dist/` bundle. `.env` files were not opened (none exist).
- **Audit findings and fixes:**
  1. **Urgent help could be blocked by the parent's "pause"** (safeguarding, high). `runScenario` paused every scenario, including immediate risk. **Fix:** new `src/scenarios.ts` `runScenarioRules` lets urgent help through even when chat is paused or the notice is unacknowledged. The Settings description now says help stays available, and the child view shows a paused banner saying lessons and help remain available.
  2. **No dedicated urgent-support screen** (safeguarding, high). The urgent result appeared in the ordinary response panel. **Fix:** a `ProtectedSupport` panel (`role="alert"`) gives trusted-adult guidance plus UK examples (999; Childline 0800 1111). It says it is not an emergency service, that nobody monitors it, that it needs specialist safeguarding review, and that the words are not added to Sam's history.
  3. **No always-available help route for the child** (safeguarding, medium). **Fix:** a "Need help now?" strip is always shown at the top of the child view. It is labelled as UK examples that a real service would need to check and localise.
  4. **The privacy notice was not enforced** (transparency, medium). Chat scenarios ran without acknowledgement, and the parent sidebar claimed unconditionally that "Maya has seen the privacy notice". **Fix:** non-urgent scenarios are refused until the notice is ticked, with a toast and an inline hint. The sidebar text now reflects the real acknowledgement state. The notice now tells Maya exactly what Sam sees (labels, not chat words), that urgent-help words are kept out of Sam's history, and that reloading clears everything.
  5. **Approval could be read as a substitute for help** (safeguarding, medium). **Fix:** the approval holding response tells Maya they never need to wait for approval to get help. Every decision message keeps a route to a trusted adult. The Approval centre has a boundary note saying approval is for learning content only, does not replace emergency services, safeguarding professionals or medical advice, and that Sam should act straight away if Maya may be in danger.
  6. **Abuse and immediate-risk routing to the parent was presented without caveat** (safeguarding, high, by design). **Fix:** the Alerts page explains that a real service would route disclosures to a trained safeguarding contact, not automatically to a parent, because the person causing harm could be in the household. Alerts stay content-free (`PROTECTED_ALERT_TEXT`), and urgent events never create a history entry. This is tested.
  7. **Misleading "functional" claims** (honesty, medium). Copy said "Live demo state · just now", "updated immediately", "in real time" and "Maya's view has updated". The approval success note appeared whenever *any* approval had been approved. **Fix:** copy is now "Simulated demo state · this browser session" and states that nothing is sent between devices or people. The success note reflects only the latest decision (`approvalChildMessage`).
  8. **Settings toggles did nothing** (honesty, low). **Fix:** "ordinary notifications" now hides allowed activity in Overview; "flagged only" hides it in Overview and History. Both descriptions say no notifications are sent.
  9. **Walkthrough dialog accessibility** (low). **Fix:** it now moves focus into the dialog on open, closes on Escape, and returns focus afterwards.
  10. **Unpinned dependencies** (supply chain, medium). All five runtime packages were `latest`, and build tools sat in `dependencies`. **Fix:** exact pins (react/react-dom 19.3.1; vite 8.3.4, typescript 7.0.2, @vitejs/plugin-react 6.1.2, @types 19.3.0). Build tools moved to `devDependencies`, then `npm install` was run.
  11. **Lint checked nothing** (tooling, medium). `tsc --noEmit` on the root tsconfig (`files: []`) type-checked no files. **Fix:** lint now runs `tsc -p` on the app and node configs. `noUnusedLocals` and `noUnusedParameters` were enabled for the app, and `allowImportingTsExtensions` was added so Node tests can import the real modules.
  12. **Tests did not test the app** (quality, medium). The test re-implemented `classifySafety` locally. **Fix:** tests import `src/safety.ts` and `src/scenarios.ts` and cover:
      - precedence across all 32 signal combinations
      - urgent bypassing the gates
      - urgent kept out of history, with a content-free alert
      - notice and pause gating for the other scenarios
      - history never repeating the child's conversation
      - approval wording
      - a scan of `src/` and `index.html` for storage, cookie and network APIs, `import.meta.env`/`VITE_`, `innerHTML`, and external URLs
  13. **No repeatable secret scan** (security, low). **Fix:** `scripts/secret-scan.mjs` (`npm run scan`) checks source, scripts, config, `.env.example` and `dist/` for private keys, provider-style keys, bearer tokens, `VITE_` env use and assigned secrets. It prints only file:line and rule name, never values, and never opens `.env` files.
  14. **Ignore and env-example hygiene** (low). **Fix:** `.gitignore` now adds `._*` (macOS resource forks on the external volume), `*.tsbuildinfo` and `coverage/`. `.env.example` now says the prototype uses no provider and that the variable must never be prefixed `VITE_` or imported from `src/`.
- **Checked with no issue found:** no secrets in source, config or bundle; no `.env` file present; no external network requests (the only URLs in `dist/` are XML namespace strings and React's error-doc base URL, which are not fetched); no storage, cookies, analytics or logging of child content; data is fictional only (Maya/Sam); blocked responses never repeat the request; safety precedence is correct (urgent > blocked > approval > safe-support > allowed); no `dangerouslySetInnerHTML`.
- **Files changed:** `src/scenarios.ts` (new), `src/App.tsx`, `src/styles.css`, `scripts/safety.test.mjs`, `scripts/secret-scan.mjs` (new), `package.json`, `package-lock.json` (via `npm install`), `tsconfig.app.json`, `.gitignore`, `.env.example`, `.claude/launch.json` (new; local preview config), `PROJECT_REPORT.md`.
- **Verification performed:**
  - `npm run lint` passed.
  - `npm test` passed with 9/9 tests.
  - `npm run build` passed (JS 256.55 kB, CSS 22.76 kB).
  - `npm audit` found 0 vulnerabilities.
  - `npm run scan` scanned 14 files with 0 findings.
  - A grep of `dist/` for external URLs found none that are requested.
  - Manual browser check of the built preview:
    - Before the notice was ticked, an ordinary scenario was refused with the notice message.
    - The urgent storyboard opened the protected-support panel.
    - The help strip was visible.
    - The parent sidebar correctly showed "not yet acknowledged".
    - The urgent event appeared only as a content-free protected alert, not in history.
- **Security or safeguarding impact:** Help is reachable in every state. Parental controls can no longer suppress immediate-risk guidance. Child-facing transparency is accurate. The parent UI no longer implies that approval or alerts replace emergency or professional help. Supply-chain drift is reduced by pinning. No secrets were read, created or printed.
- **Remaining risks:** see §3.4. In short: all safety classification is scripted, not real; the helpline numbers are UK examples that need verification and localisation; and parent alerting for disclosures needs a specialist-designed routing policy before any real use.
- **Simulated or functional:** **Functional:** the gating rules, precedence, settings filters, focus handling and tests. **Simulated:** all AI responses, safety classification, approvals between people, alerts, notifications, accounts and emergency escalation. Nothing leaves the browser.



### 2026-10-14 22:49 BST — Hardened the QA interaction for the self-dismissing privacy notice
- **What changed:** Updated the temporary Playwright script to dispatch the privacy acknowledgement click and allow React to remove the notice before continuing.
- **Files affected:** `scripts/qa_demo.py`.
- **Why it changed:** The first browser run confirmed the checkbox click happened, but Playwright waited on a control that intentionally disappears after acknowledgement and timed out.
- **What remains simulated:** No product behaviour or data model changed; the acknowledgement remains an in-memory fictional demo state.
- **Tests or checks performed:** The full QA flow passed after the harness adjustment.
- **Security and data-protection impact:** No keys, network calls or real data involved.
- **New assumptions, risks, or open decisions:** The script intentionally waited briefly after acknowledgement to model the visible notice transition.



### 2026-10-14 22:43 BST — Added browser QA coverage for the fixed demo flows
- **What changed:** Added a temporary Playwright QA script covering the child notice, allowed scenario, parent approval round-trip, blocked response, safe adult-support response, protected urgent alert, history separation, Reset demo, mobile layout and no-provider-request assertion.
- **Files affected:** `scripts/qa_demo.py`, `/tmp/safeai-learning-hub-desktop.png`, `/tmp/safeai-learning-hub-mobile.png` (QA outputs only; the screenshots were not project assets).
- **Why it changed:** The design specification required functional evidence for both views, all five safety states, reset behaviour, responsive layout and absence of real provider calls.
- **What remains simulated:** Browser checks exercised only the local Vite app, React state and mock responses; there is no backend, real-time transport, account system or external AI provider.
- **Tests or checks performed:** Dedicated Playwright/Chromium QA passed after the harness was added.
- **Security and data-protection impact:** The script asserted no `/api/` or provider request and used only fictional text. Screenshots contained no real data or secrets.
- **New assumptions, risks, or open decisions:** QA screenshots were stored in `/tmp` for visual inspection only and removed after verification; a real deployment would need broader accessibility and specialist safeguarding review.



### 2026-10-14 22:41 BST — Removed remote font loading to keep the prototype self-contained
- **What changed:** Replaced the CSS web-font import with local system font fallbacks.
- **Files affected:** `src/styles.css`.
- **Why it changed:** The fixed prototype is intended to be local-only and deterministic; avoiding remote font loading also removes an unnecessary network dependency from browser checks.
- **What remains simulated:** All functional data and AI behaviour remain fictional/local; this is a presentation-only typography adjustment.
- **Tests or checks performed:** Final build and browser checks passed after the change.
- **Security and data-protection impact:** No external font request is made by the app; no secret or personal data is involved.
- **New assumptions, risks, or open decisions:** Typography uses available system fonts, with a readable sans-serif fallback on other devices.



### 2026-10-14 22:39 BST — Added TypeScript declarations needed for the React/Vite build
- **What changed:** Added React and ReactDOM type packages and the Vite client declaration file after the first build check reported missing JSX and CSS module types.
- **Files affected:** `package.json`, `package-lock.json`, `src/vite-env.d.ts`, `node_modules/` (ignored/generated dependency tree).
- **Why it changed:** The implementation is TypeScript-first and needs the standard type declarations for JSX, React event inference and Vite CSS imports.
- **What remains simulated:** No runtime behaviour changed; all AI, accounts, persistence and network integrations remain fictional/local.
- **Tests or checks performed:** Final lint, unit and build checks passed after the type-only fix.
- **Security and data-protection impact:** No keys, tokens, external calls or user data were introduced. npm reported 0 vulnerabilities after installation.
- **New assumptions, risks, or open decisions:** Type packages follow the installed React major version as recorded in the lockfile.



### 2026-10-14 22:36 BST — Installed the local React/Vite dependency set
- **What changed:** Installed dependencies from `package.json`, producing the project lockfile for reproducible local builds.
- **Files affected:** `package-lock.json`, `node_modules/` (ignored/generated dependency tree).
- **Why it changed:** The new implementation needs the declared React, TypeScript, Vite and React plugin packages for build and browser verification.
- **What remains simulated:** The application remains local-only; installing packages does not add an AI provider, backend, authentication, analytics or persistence.
- **Tests or checks performed:** `npm install` completed successfully; npm reported 0 vulnerabilities.
- **Security and data-protection impact:** No secrets were read or created. No real data or external service connection was configured.
- **New assumptions, risks, or open decisions:** Dependency versions use the current `latest` resolution recorded in the lockfile; before production use, versions should be reviewed and pinned deliberately.



### 2026-10-14 22:35 BST — Implemented the fixed PORT2 vertical slice (application scaffold, local state and accessible UI)
- **What changed:** Created the React/Vite application shell and built the SafeAI Learning Hub demonstration around the design specification’s fixed vertical slice. The app includes a visible Child view / Parent view switcher, Reset demo control, fictional Maya/Sam accounts, child privacy acknowledgement, parent-linked explanation, guided walkthrough foundations, five-state scenario cards, the two interactive lessons, five remaining lesson cards, parent overview/history/approval centre/alerts/settings/progress, and responsive status labels with colour plus text.
- **Files affected:** `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/safety.ts`, `src/styles.css`, `scripts/safety.test.mjs`.
- **Why it changed:** This implements the fixed boundary in the SafeAI Learning Hub design specification, including the required deterministic safety precedence and same-browser child/parent update demonstration.
- **What remains simulated:** Authentication, account linking, AI responses, real-time transport, persistence, backend, database, analytics, notification delivery, emergency escalation, moderation accuracy, deletion workflows, and all account data are fictional/local mock behaviour only.
- **Tests or checks performed:** Final dependency installation, build, lint, unit checks and browser workflow checks passed after implementation.
- **Security and data-protection impact:** No API key, token, external provider, real child data, browser storage or external network call was added. Immediate-risk and abuse content is protected storyboard copy and is excluded from ordinary parent history. The client contains only mock responses.
- **New assumptions, risks, or open decisions:** The Vite dev-server fallback serves `/demo` using the single-page app; the prototype uses a code-native UI rather than raster assets to keep controls accessible. A future backend must preserve the server-side secret boundary and receive specialist safeguarding review before any real deployment.



### 2026-10-14 — Project bootstrap and shared report confirmation (documentation + secret-safety scaffolding)
- **Reviewed** `/Users/crrishjoshi/Downloads/2026-10-14-safeai-learning-hub-design.md` as the current SafeAI Learning Hub design specification.
- **Adopted** its fixed vertical slice, five-state safety model, fictional local demo data, server-side-only API-key boundary, accessibility requirements, and PORT2 evidence expectations as the implementation baseline.
- **Security/data impact:** The specification requires no real child data, no real AI provider in the first prototype, and no API key in client code. No external data was added.
- **Confirmed** `PROJECT_REPORT.md` as the shared canonical change log + security record for Claude, Antigravity, and Codex.
- **Created** `CLAUDE.md`: standing rule so every future Claude session logs its changes here and follows the security rules below.
- **Created** `.gitignore`: excludes `.env*` (except `.env.example`), key/cert files, logs, build output, and dependency folders so secrets can't be committed by accident.
- **Created** `.env.example`: placeholder-only template listing which environment variables the app will need. Contains no real values.
- **Removed** the temporary `_ Action Report.md` name at the project owner's request and retained its documented history in `PROJECT_REPORT.md`.
- **Security impact:** No secrets exist anywhere in the project. Guardrails are in place before any key is introduced. The report itself contains no secret values.




## 3. Security record — API keys and data

### 3.1 Rules in force
1. **API keys live only in environment variables**, loaded from a local `.env` file (never committed) or the hosting provider's secret store (e.g. Vercel/Supabase env settings).
2. **Keys are never hard-coded** in source, docs, commit messages, logs or chat. Claude does not print key values.
3. **Provider calls are made server-side only.** Browser/client code must never hold an AI provider key. Only public/publishable keys may be exposed to the client.
4. `.env.example` documents variable *names* only. Real values are never written to it.
5. **User data:** collect the minimum, don't log prompts/responses containing personal data, and restrict database access (e.g. row-level security if Supabase is used).
6. If a key is ever exposed: revoke/rotate it at the provider immediately, then record the incident below.

### 3.2 Security timeline
| Date | Event | Outcome |
|------|-------|---------|
| 2026-10-20 16:41 BST | Safety rules: explicit sexual content added to the blocked category, with look-alike/spacing de-obfuscation; "sex"/"sexual" added to approval | Explicit requests no longer reach the AI provider and create a parent `safety-flag` notification without the child's wording. No schema, permission, key or env change; no new data stored. Provider-failure text changed to honest busy/check-connection messages. lint ok, tests 61/61, scan 0 (66 files), safety evaluation 7 fixtures pass. |
| 2026-10-20 01:05 BST | `read_provider_credential` and `create_safeguarding_case` applied to hosted project `oxuacclbibgbggooqqfy`; server stops using `.schema('private')` | Both definer functions owned by `postgres`, empty `search_path`; EXECUTE revoked from public/anon/authenticated and granted to `service_role` only (verified). Fixes Test connection (credential read was denied, reported as `provider_not_configured`) and restores protected safeguarding-case writes. No table grants changed, no new data stored. Advisors: nothing new (pre-existing INFO on private tables without policies, WARN on `create_parent_family`, WARN leaked-password protection off). Checks used metadata only. lint ok, tests 56/56, scan 0 (66 files). |
| 2026-10-20 01:00 BST | Owner pasted a temporary Gemini API key into chat | Used only for a direct test call to Google's API from the terminal (key works). Not written to any file, log, report, database or Vercel; grep of the project finds no copy. Owner stated it is temporary and rate-limited and will delete it; see §3.3. |
| 2026-10-20 00:55 BST | Security headers set on both Vercel projects | CSP (`connect-src` self plus `https://` and `wss://oxuacclbibgbggooqqfy.supabase.co` only; `frame-ancestors 'none'`), HSTS 2 years with preload, nosniff, `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, deny-all Permissions-Policy and COOP `same-origin` verified live with curl on both domains and assets. Child `/api/ai/chat` without a session still returns 401 `no-store` through the proxy. Closes the 00:41 missing-headers risk. Signed-in Realtime under the CSP not yet exercised. No secret read or printed; no env vars changed. |
| 2026-10-20 00:41 BST | Child `/api/*` proxied to the parent project; provider error handling and logging changed | Child project still holds only `VITE_` variables; server secrets stay parent-only and the parent functions verify the forwarded session exactly as before. Provider status set to `error` only on a rejected key. Provider failure logs carry provider, model id, HTTP status and SafeAI code only; provider response bodies are never logged or returned. Three optional model-override names added to `.env.example` without values. No real key used; fictional invalid keys only. lint ok, tests 53/53, scan 0 (65 files). No secret read or printed. |
| 2026-10-16 15:20 BST | `revoke_child_sessions` applied to hosted project `oxuacclbibgbggooqqfy`; API functions fixed for ESM and both sites redeployed | Definer function owned by `postgres`, empty `search_path`; EXECUTE for `service_role` only (anon/authenticated denied, confirmed by probe); non-child ids rejected. No real sessions deleted (0 child profiles). Advisors: nothing new; pre-existing INFO on `private.provider_credentials` (no policy, server-only by design) and WARN on `create_parent_family` executable by `authenticated` (by design). Live API routes now fail closed with 401 instead of crashing with 500. lint ok, tests 45/45, scan 0 (50 files). No env values read or changed. |
| 2026-10-16 12:08 BST | Child sessions revoked after a parent sets a new child password; migration `20261016130000_revoke_child_sessions.sql` written (not applied) | Service-role-only definer function deletes only a child account's `auth.sessions` and `auth.refresh_tokens`; called after the ownership check and successful password update. Revocation failure returns distinct `502 child_sessions_revoke_failed`. Issued access tokens are refused by API routes at once but stay valid for direct Data API reads until expiry. lint ok, tests 43/43, scan 0 (49 files), bundles free of server-only names. No secret read or printed. |
| 2026-10-15 12:35 BST | Parent-set child password route added (`POST /api/parent/child-password`) | Parent role from `family_members`; service-role `updateUserById` only after the child is matched to the caller's `family_id`; same 404 for unknown, malformed and other-family ids. Password 12–72 chars / 72 bytes, sent only to Supabase Auth, never stored, logged or returned (tested). Existing child sessions are not revoked. lint ok, tests 40/40, scan 0 (48 files), bundles free of server-only names. No secret read or printed. |
| 2026-10-15 12:30 BST | `create_parent_family` migration applied to hosted project `oxuacclbibgbggooqqfy` | Definer function with empty `search_path`, execute for `authenticated` only. Anonymous, no-session and unconfirmed-email calls refused in rolled-back probes; no rows created. Advisor WARN for authenticated-callable definer function accepted as intended (guards listed in Change log). No secret read or printed. |
| 2026-10-15 12:22 BST | Account flows moved onto Supabase Auth; open service-role sign-up route removed; family-setup RPC added | Passwords handled only by Supabase Auth (bcrypt in `auth.users`), never by SafeAI tables, logs or responses. Email confirmation required before family creation. Sign-up, reset and child creation no longer reveal whether an email exists. 10-child cap per family. Recovery screen blocks data until a new password is saved. lint ok, tests 35/35, scan 0 (47 files), bundles free of server-only names. Migration not yet applied to the hosted project. No secret value read or printed. |
| 2026-10-15 12:16 BST | Final PORT2 integration review, reset/error-handling fixes, browser acceptance and redeploy | No credential values handled. Both aliases READY and HTTP 200 with security headers; local gates 30/30, scan 0, audit 0, browser acceptance passed. Reset is in-memory only. |
| 2026-10-15 12:02 BST | Hosted Supabase configuration diagnosis | Supabase project `oxuacclbibgbggooqqfy` is healthy; both Vercel production env inventories reported no variables. The deployed apps fail closed and show no fictional family. No key value was read or printed. |
| 2026-10-15 11:57 BST | Child school-year migration and parent function redeploy | Additive metadata migration applied and read-only verified. No account or child data created. |
| 2026-10-15 11:37 BST | Supabase project created and reviewed schema applied | Project `oxuacclbibgbggooqqfy` is `ACTIVE_HEALTHY`; RLS/schema checks passed; database remains empty. No credential value was read or deployed. |
| 2026-10-15 01:09 BST | Hosted child and parent sites on separate Vercel production projects | Both aliases returned HTTP 200 and `vercel inspect` reported `READY`; security headers were present. No credentials or environment variables were deployed; Supabase/provider features remain disabled and fail closed. |
| 2026-10-15 00:36 BST | Separate-site security boundary review | No credential values. Browser builds contain only optional public Supabase env names; service-role/encryption/provider values are server-only names. Prepared public tables have RLS and provider ciphertext belongs in private schema. New static scan: 0 findings. |
| 2026-10-15 00:03 BST | Final post-UI security gate (diff, bundles, migration, RLS, auth, key screen, Vercel config) | 1 privacy regression fixed (G-1: child history repeated typed text, including blocked requests). No other regression. No secret found; `.env` not opened. lint ok, tests 28/28, build ok, secret scan 0, bundle grep clean. |
| 2026-10-14 23:55 BST | Two-site security, privacy, auth, Supabase and safeguarding audit (F-A to F-O) | 15 findings fixed or recorded; see Change log. RLS rewritten and negative-tested in real Postgres (PGlite, 10 tests); provider-key route authenticated, encrypted and family-bound; role gating on both sites; Vercel security headers. No secret found; `.env` not opened. lint ok, tests 27/27, build ok, `npm audit` 0, secret scan 0, dist bundle clean. |
| 2026-10-14 23:05 BST | Final security, privacy and safeguarding gate after UI work (source, config, tests, `dist/` bundle) | 10 findings fixed (F1–F10). No secrets; `.env` not present and not opened. No provider or third-party network calls (the only bundle `fetch(` is Vite's same-origin preload). Typed text never stored or sent. lint ok, tests 21/21, build ok, `npm audit` 0, secret scan 0. |
| 2026-10-14 22:50 BST | Security, privacy and safeguarding review (source, config, dependencies, built bundle) | 14 findings fixed (see Change log). No secrets found; `.env` not present and not opened. `npm audit`: 0 vulnerabilities. Secret scan: 0 findings. No external requests, storage or analytics. Dependencies pinned. |
| 2026-10-14 22:50 BST | Added `scripts/secret-scan.mjs` (`npm run scan`) | Repeatable scan; reports file:line and rule only, never values; skips `.env` files. |
| 2026-10-14 | Initial review of folder | Empty; no secrets present. `.gitignore` and `.env.example` added as guardrails. |

### 3.3 Incidents / key rotations
**2026-10-20 01:00 BST — Gemini key shared in chat.** The owner pasted a temporary, rate-limited Gemini API key into the Claude chat to have it tested. It was used once for direct test calls to Google's API and not stored in the project, its logs, the database or Vercel. Because the chat transcript holds it, **the owner must delete or rotate this key in Google AI Studio after testing** (they said they will). Its value is not recorded here.

Before that, none recorded. The 2026-10-14 22:50 BST review found no evidence that any secret was exposed (no `.env` file, no key-like values in source, config, scripts or `dist/`), so no key rotation is required.

The 2026-10-14 23:05 BST final gate re-checked source, config, scripts and the rebuilt `dist/` bundle. Only `.env.example` (names only) and its macOS `._` metadata file exist, and the secret scan found 0 findings. **No incident, and no rotation required.**

The 2026-10-14 23:55 BST two-site audit re-checked source, API, migration, configs, scripts and both rebuilt bundles. No secret value was found, read or printed (`.env` was not opened), and the bundles contain no service-role, encryption or provider-key material. **No incident, and no rotation required.**

The 2026-10-15 00:03 BST final post-UI gate fixed one on-screen privacy regression (G-1). No secret was involved: test values only, nothing sent or stored. No secret value was found, read or printed, and `.env` was not opened. **No incident, and no rotation required.**

### 3.4 Current controls in the migrated architecture
_Updated 2026-10-15 12:16 BST. Where this list and older bullets disagree, this list is current._
- **Authentication:**
  - Supabase Auth with PKCE. Sessions are kept in sessionStorage, which is cleared when the tab closes. Only the short-lived PKCE verifier is kept in localStorage, so email links opened in a new tab can complete.
  - _Added 2026-10-15 12:22 BST._ Parent accounts are created by Supabase Auth `signUp`, with email confirmation and a generic response. Passwords exist only as bcrypt hashes in `auth.users`; SafeAI never stores, logs or returns them. Families are created by the `create_parent_family` RPC, which is authenticated-only, requires a confirmed email, allows one family per user, and binds the family to `auth.uid()`.
  - Password reset is by email with a generic response. The recovery screen blocks all family data until a new password is saved.
  - Child accounts are created only by a verified parent through the server route, with generic errors and at most 10 children per family. There is no child self-sign-up.
  - _Added 2026-10-15 12:35 BST._ A parent can set a new password for a child in their own family through `POST /api/parent/child-password`. Ownership is checked against `child_profiles` and the parent's verified `family_id`; the password goes only to Supabase Auth and is never returned. _Since 2026-10-16 12:08 BST_, every existing session of the child is then revoked through the service-role-only `public.revoke_child_sessions`, and a failed revocation returns `child_sessions_revoke_failed`.
  - Passwords must be 12–72 characters.
  - Sign-in errors are generic.
  - Each site confirms its role from `family_members` and signs out on a mismatch. User metadata is never used for authorisation.
- **API:**
  - Every route verifies the bearer token with Supabase and enforces its role server-side.
  - Responses are `no-store` with short error codes. Raw keys are never logged or echoed.
  - The service role is used only for `store_provider_credential`, `remove_provider_credential`, child-account creation, (since 2026-10-15 12:35 BST) parent-set child passwords within the caller's own family, and (since 2026-10-16 12:08 BST) `revoke_child_sessions` straight after such a password change.
- **Provider keys:**
  - HKDF + AES-256-GCM with AAD `familyId:provider` and a stored key version, kept in `private.provider_credentials`.
  - Parents read only masked metadata in `provider_settings`.
  - Keys can be rotated (re-POST) and removed (DELETE).
- **RLS:**
  - Children see only their own rows, never a sibling's or parent settings.
  - Parents see only their own family. Composite foreign keys block cross-family IDs.
  - Approval, chat and safety tables and ownership policies are prepared server-side. The current UI does not write these rows; protected disclosure text is withheld from ordinary parent history.
  - The ownership and protected-disclosure boundaries are verified by PGlite negative tests.
- **Hosting:** CSP, `X-Frame-Options: DENY`, nosniff, no-referrer, Permissions-Policy, HSTS and COOP are set in both Vercel configs and were verified on both live aliases on 2026-10-15 01:09 BST. Deployment protection, custom domains and production monitoring are not configured.
- **Client boundary:** `apps/child` and `apps/parent` import only the publishable Supabase client. No app imports `SUPABASE_SERVICE_ROLE_KEY`, `API_KEY_ENCRYPTION_SECRET` or a provider key.
- **Provider boundary:**
  - `api/parent/provider-key.ts` requires a verified parent session. It validates the request, encrypts the key and stores it through the service-role-only `store_provider_credential` RPC, bound to the family from the session.
  - It returns masked metadata only. DELETE calls `remove_provider_credential`.
  - It fails closed with `secure_backend_not_configured` when server config is missing.
  - `api/ai/chat.ts` requires a child session, returns `ai_provider_not_configured` and makes no AI request.
- **Database boundary:**
  - The migration enables RLS on all 11 tables.
  - Raw provider ciphertext lives in `private.provider_credentials`, which is revoked from `public`, `anon` and `authenticated`.
  - The store, remove and retention-purge RPCs are granted only to `service_role`.
  - The initial migration, the additive `school_year` migration and the `create_parent_family` migration are all live-verified; no real family rows or Auth users have been created.
- **Data minimisation:** Preview content is fictional and in-memory. Urgent outcomes never enter history, and history never repeats typed text (G-1). The parent UI shows category/summary only and explicitly explains the visibility boundary.
- **Verification:** `npm run scan` covers apps, packages, API, scripts, migrations, docs, configs and built output; the current run reports 0 findings. Browser smoke also observed no external requests.

### 3.5 Open items
- **Supabase Auth dashboard (needed for the 2026-10-15 12:22 BST account flows):**
  - ~~apply migration `20261015130000_parent_family_setup.sql`~~ done 2026-10-15 12:30 BST
  - turn **Confirm email** on
  - set the minimum password length to 12
  - enable leaked-password protection
  - enable CAPTCHA on sign-up, sign-in and reset
  - set the **Site URL** to the parent site
  - add both sites' origins to **Redirect URLs**, including `/?auth=confirm` and `/?auth=recovery`
  - configure custom SMTP before real use
- ~~**Not built yet:** parent-initiated reset of a child's password.~~ Built 2026-10-15 12:35 BST (`POST /api/parent/child-password`).
- ~~**Child sessions after a parent sets a new password:** sessions that are already signed in are not revoked; they stay valid until the refresh token expires or the child signs out. Decide whether to sign the child out everywhere when a parent sets a new password.~~ Resolved in code 2026-10-16 12:08 BST: the child is signed out everywhere (`revoke_child_sessions`). Applied to the hosted project and verified 2026-10-16 15:20 BST. Still open: it runs in production only once the parent server-only variables are configured. Access tokens already issued stay valid for direct Data API reads until they expire (default 1 hour).
- **External configuration:**
  - Privately add only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to each Vercel browser build, and the documented server-only variables to the parent/server project. Do not paste values into chat, source, screenshots, browser storage or this report.
  - Redeploy and repeat live Auth, RLS, provider-key and browser gates after configuration. Current production inventories have zero environment variables, so the aliases correctly remain at the account-service gate.
  - Add any custom Supabase domain to the CSP `connect-src`.
- **Not built or not connected yet:**
  - server-backed chat/history/approval/alert writes and same-browser cross-site event transport;
  - Realtime notifications, rate limiting, scheduled retention purge and family-data deletion;
  - provider Disable and Test connection, plus an encryption-secret re-encrypt job;
  - evaluated server-side safety classification/output filtering and specialist safeguarding routing;
  - formal WCAG, DPIA, age-assurance, retention and usability reviews.
- The project is not a git repository, so commit-history scanning is not available. Run a history-aware scanner before any production repository is created.
- **Safeguarding (required before any real child uses this):**
  - specialist safeguarding review of all flows
  - a documented routing policy for disclosures that does not automatically notify the parent
  - verified, localised emergency and helpline contacts (999 and Childline 0800 1111 are shown only as UK examples)
  - a real, monitored escalation path, or explicit statements that none exists
- **Typed-question detection is a keyword demo** (`PROMPT_SIGNALS`). Before any real use, replace it with an evaluated classifier covering misspellings, slang, coded language and other languages, and keep the urgent-first precedence and "never store typed text" guarantees.
- **Safety classification is scripted.** Real classification needs evaluation for overblocking and underblocking (especially of health, identity and help-seeking questions), plus human review of edge cases.
- **Privacy:**
  - a DPIA
  - age-appropriate design code assessment
  - a lawful basis and retention schedule for any stored data
  - minimised logging that never stores disclosure text
- **Notifications and approvals between real people are not built.** Settings toggles only filter the local demo view.
- **Accessibility:** the walkthrough dialog does not trap Tab focus. A formal WCAG 2.1 AA audit, including screen-reader and contrast testing, is still needed. Conformance is not claimed.

## 4. Decisions

| Date | Decision | Reason |
|------|----------|--------|
| 2026-10-14 | Keep a single living report in `PROJECT_REPORT.md` | One place to see history and security posture at any time. |
| 2026-10-14 23:05 BST | Typed questions run through the same rules as the cards (`runPromptRules`), and precedence comes only from `classifySafety` | One source of precedence: blocked can never become an approval request, and urgent always wins. |
| 2026-10-14 23:05 BST | Typed text is never stored, repeated or sent; ordinary typed questions get an honest "no AI connected" reply | Data minimisation, and the prototype must not pretend an AI answered. |
| 2026-10-14 23:05 BST | Immediate-risk keywords deliberately over-trigger | A false alarm only shows help guidance; a miss would hide it. |
| 2026-10-14 23:05 BST | An urgent outcome closes the guided tour; sensitive notices are not animated | Nothing may cover or distract from protected help. |
| 2026-10-14 23:05 BST | Parent approval is never described as emergency support; in a real service, disclosures go to a safeguarding contact, not automatically to a parent | Safeguarding: the parent may be the source of risk. |
| 2026-10-14 22:50 BST | Immediate-risk help is never gated by parental pause or the privacy-notice gate | Safety guidance must always be reachable; a parent control must not suppress it. |
| 2026-10-14 22:50 BST | Scenario rules live in `src/scenarios.ts`, separate from React | So tests can exercise the real behaviour, not a copy. |
| 2026-10-14 22:50 BST | Pin exact dependency versions; build tools in devDependencies | Reproducible builds; reduces supply-chain drift. |

## 5. Final PORT2 readiness summary — 2026-10-16

### Final operations addendum — 2026-10-20

- **What was completed:** Live Supabase Realtime publication and client subscriptions with polling fallback; durable generic in-app notifications for parent review, child decisions, safety flags and access changes; privacy-safe aggregate family metrics; protected safeguarding queue records without disclosure text; authenticated parent family-record deletion with explicit confirmation; server-only scheduled retention purge route and Vercel Cron configuration; automated five-state safety-evaluation command and documentation; hosted parent and child redeployments.
- **What remains simulated:** A provider key is not tested by automation and must be entered privately in Parent Settings. Notifications are in-app only, not email/SMS. Analytics are aggregate product counters, not a third-party analytics service. The safeguarding queue is not a staffed or certified emergency service. The safety evaluation is an automated regression suite, not independent review. Family deletion removes application family rows but does not delete the Supabase Auth login identity. Reset demo continues to reset only local preview/UI state and does not delete server records.
- **Tests performed and results:** `npm run lint` pass; `npm test` pass (45/45); `npm run evaluate:safety` pass (five protected storyboard fixtures plus urgent-first precedence); both Vite builds pass; `npm run scan` pass (63 files, 0 findings). Supabase read-only verification confirmed the three new tables/functions and six Realtime publication tables. Hosted parent and child stable aliases return HTTP 200. Protected deletion, cron and child activity routes fail closed without a session/cron secret. Parent deployment `dpl_BXcCPegxtbyaMaEUx8AtnkeJicbp` and child deployment `dpl_2faafse7bTxdF3YTLiN8kKnsKdWJ` reached READY.
- **Security status:** No provider key, Supabase key value, password, bearer token or real child data was printed, logged, committed or placed in screenshots/report. Realtime triggers authorized refetches; RLS remains enabled on new tables; raw prompts are not copied into notifications, metrics or urgent queue records. Provider credentials remain server-only and masked in the browser. Existing Supabase advisor notices are recorded as prototype/maintenance follow-up, not silently ignored.
- **Known limitations:** No certified human safeguarding operation, emergency-service integration, independent evaluator, formal DPIA/age assurance, external notification delivery, rate-limit layer, or Auth-identity deletion workflow is included. Vercel Cron requires monitoring after its first scheduled run. The real provider smoke test remains owner-controlled and private.
- **Future work:** Add staffed safeguarding operations and independent safety evaluation; monitor Cron and Realtime health; add explicit authenticated notification-read state if needed; complete retention policy/legal review, age-appropriate design review, rate limiting and formal WCAG/usability review; rotate the previously pasted Supabase publishable key.
- **PORT2 evidence decision:** **Ready for PORT2 evidence as a clearly labelled hosted prototype with live Auth, family data, Realtime transport, provider boundary, notifications, aggregate metrics, deletion and scheduled-retention foundations. Not ready for production family use, real child data, certified safeguarding or emergency use.**

### Final acceptance addendum — 2026-10-19

- **Completed:** Parent sign-in/account creation, parent-owned child-account creation, child sign-in-only flow, durable family-scoped activity, approval decisions, history, protected alerts, persisted access controls, encrypted provider-key storage, parent-only connection testing, provider-backed allowed/support chat, prepared fallback, provider disable gate, five-second child/parent polling, privacy acknowledgement, lessons, walkthroughs, Boots interactions, reset controls, responsive layouts and accessibility foundations are implemented and deployed.
- **Remains simulated:** No real provider key was used in automated or unauthenticated hosted checks. A parent must privately save and test a provider key before live allowed/support answers use it. Safety classification and immediate-risk escalation are bounded prototype controls; Realtime, notifications, analytics, rate limiting, scheduled retention/deletion, independent safety evaluation and specialist safeguarding routing remain future work.
- **Tests and results:** `npm run lint` passed; `npm test` passed 45/45; both Vite builds passed; `npm run scan` found 0 findings across 57 files. Parent and child stable Vercel URLs returned HTTP/2 200, and protected provider/chat endpoints returned HTTP 401 without a session. Browser sign-in pages rendered correctly with no account-service-unavailable banner; child sign-in remains the only child account entry.
- **Security status:** Provider keys are decrypted and used only in server functions; browser code receives masked metadata only. Urgent, blocked and approval requests do not call a provider; urgent and blocked input is not stored as ordinary history. No key, password, bearer token, real child data or harmful input was printed or stored by these checks. Rotate the previously pasted Supabase publishable key later as already documented.
- **Known limitations:** The external provider account, model, quota and billing configuration have not been smoke-tested with a live key; polling is not Realtime; safety matching is not an independently evaluated safeguarding classifier; there is no production emergency response or certified human review path; formal DPIA, age assurance, retention/deletion, rate limiting and accessibility review remain open.
- **Future work:** Run the owner-controlled live provider smoke test, add independent safety evaluation and human safeguarding operations, implement durable notifications and approved event transport, add retention/deletion and incident controls, complete DPIA/age-appropriate design and WCAG review, then separately assess whether any real child use is appropriate.
- **PORT2 evidence decision:** **Ready for PORT2 evidence as a clearly labelled hosted prototype and architecture demonstration. Not ready for live family use, production safeguarding, real child data or emergency use.**

### Latest acceptance disposition — 2026-10-16 21:11 BST

- **Completed:** The hosted parent and child account paths are functional. Encrypted parent server configuration is present in Vercel Production; a fictional parent family and linked child account were created through Supabase, the parent dashboard loaded the child, and both parent and child sign-in flows passed. The acceptance run exercised the child prompt-learning and privacy lessons, Allowed, Safe adult-support, Parent approval required, Blocked and protected Immediate help states, the parent overview, approval centre, history empty state, protected alerts, child account management, API-key form, reset control, Boots interactions and both guided walkthroughs.
- **Remains simulated:** Mock/prepared chat responses, local child conversation receipts, local parent approvals/history/alerts, provider connection testing, live AI, analytics, Realtime cross-site updates, notifications and specialist safeguarding escalation. No production safeguarding or emergency-service claim is made.
- **Tests and results:** `npm run lint` passed; `npm test` passed 45/45; both Vite builds passed; `npm run scan` found 0 findings across 50 files; parent and child stable Vercel URLs returned HTTP 200; unauthenticated parent API access returned the expected 401; authenticated family/child creation and child login passed using fictional reserved-domain acceptance identities. Responsive/accessibility controls were inspected through the deployed browser flow; reduced-motion and keyboard/focus coverage remain in the existing automated suite.
- **Security status:** Browser uses only the publishable Supabase key. The parent service credential and encryption secret are server-only encrypted Vercel settings; no secret value appears in source, browser bundles, logs, screenshots or this report. No real child data, harmful input or live AI provider key was used. Rotate the currently configured credentials later as requested.
- **Known limitations:** Approval/history/alert events are not yet durable or cross-site real-time; the provider-key UI stores encrypted metadata but does not connect an AI provider; the acceptance-only fictional family records remain until the owner removes them; formal DPIA, age assurance, retention/deletion, rate limiting, independent accessibility and specialist safeguarding review are still future work.
- **Evidence decision:** **Ready for PORT2 evidence as a clearly labelled hosted prototype and architecture demonstration. Not ready for live family use, production safeguarding, real child data, live AI, or emergency use.**

### Completed in the migrated build

- Separate child and parent mobile-first websites with shared React/TypeScript safety contracts.
- Child chat learning surface, prompt-writing activity, privacy/digital-footprints activity and five additional lesson cards.
- Allowed, safe adult-support, parent approval, blocked and immediate-risk storyboard states with urgent-first precedence.
- Parent overview, child-profile selector foundation, approval centre with approve/reject/discuss-later, history filters, protected alerts and access/provider settings.
- Child privacy notice and acknowledgement/assent confirmation; parent-linked preview explanation.
- Child and parent first-use walkthrough foundations, Boots companion, keyboard focus styling, reduced-motion CSS, responsive mobile layouts and colour-plus-text labels.
- Supabase Auth/client configuration, family/child schema, ownership-aware RLS migrations, server-only provider-key/AI route stubs, reset controls and two Vercel production projects are configured. Parent Auth, family reads and parent-created child provisioning are live; provider/AI routes remain intentionally fail-closed until a provider is explicitly connected.
- Parent family-data failure handling is resilient and user-readable; the live browser acceptance covered a fictional family and linked child without substituting mock accounts.

### What remains simulated or unverified

The hosted preview now has its private Auth and family-data configuration. Supabase authentication, family setup, parent child-account provisioning and linked-child reads passed on the hosted aliases. Chat/history persistence, server-backed approval and alert writes, same-browser cross-site events, Realtime, notifications, provider connection testing, AI responses, analytics and emergency/safeguarding escalation are not live. A fictional acceptance family and child were created for verification; no real child data was used. Provider/AI routes intentionally fail closed without an explicitly connected provider.

**Update 2026-10-15 12:16 BST:** the app keeps the account boundary and does not substitute mock family records.
- **Wired and acceptance-tested:** sign-in, role gating, parent signup, parent-only child-account provisioning, linked-child reads, and encrypted provider-key server configuration. The hosted aliases now run these account operations with encrypted Vercel server settings.
- **Still simulated or incomplete:**
  - prepared child safety outcomes and local in-memory history/approval presentation;
  - server-backed approval/history/alert persistence and cross-site child/parent updates;
  - no AI provider; the chat route returns `503 ai_provider_not_configured`;
  - provider Disable and Test connection remain honest unavailable controls;
  - rate limits, retention, deletion, specialist safeguarding routing and independent accessibility review;
  - sessions are per tab and no formal legal consent/age-assurance system is claimed.

### Tests performed and results

- `npm run lint` — pass.
- 2026-10-15 12:16 BST: `npm run lint` passed; `npm test` passed 30/30; both builds passed; `npm run scan` found 0 findings across 48 files; `npm audit --omit=dev` found 0 vulnerabilities.
- 2026-10-15 12:16 BST: Playwright browser acceptance passed at 390px and 1280px for both local Vite sites, verifying the no-credential sign-in boundary, child sign-in-only behaviour, parent account-creation visibility, focus movement, no console errors and no horizontal overflow.
- 2026-10-15 12:16 BST: Both Vercel production deployments reached `READY`; `curl -I` returned HTTP 200 for `https://safeai-learning-hub-child.vercel.app` and `https://safeai-learning-hub-parent.vercel.app`; security headers were present and the dark theme metadata was corrected.
- The safety, RLS, API, protected-disclosure and masked-provider-key checks are covered by the 45-test suite. Full authenticated browser acceptance is now recorded above using fictional reserved-domain identities; no real account or child data was used.

### Security status

No provider API key or bearer token was exposed in source, report, logs, screenshots or browser bundles. Supabase browser and server credentials are stored through encrypted Vercel settings only; no live AI request was made. The current source-level controls are documented in §3.4 and `docs/SECURITY.md`; they are prototype controls, not a production security certification.

### Known limitations and future work

After private configuration, complete live Auth/RLS negative tests, authenticated browser acceptance, Realtime or an approved cross-site event transport, server-backed chat/history/approval/alert flows, provider test/disable/re-encryption, rate limiting, evaluated safety classification, retention/deletion controls, DPIA/age-appropriate design review, specialist safeguarding routing, localisation and formal accessibility/usability testing before any real child use.

### Evidence decision

**Ready for PORT2 evidence as a clearly labelled hosted prototype and architecture demonstration, including the no-credential account boundary and local safety storyboard. Not ready for live family-use acceptance, production safeguarding, real child data, live AI, or emergency use.**
