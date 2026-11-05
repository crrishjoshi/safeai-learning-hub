# SafeAI Learning Hub — Public Project Report

## Executive summary

SafeAI Learning Hub is a hosted educational prototype about using generative AI safely and productively. It gives a young person a friendly learning space and gives a linked parent or guardian a separate family space for accountable, privacy-conscious oversight.

The project was built for the IST4000 Explore PORT2 “Technology of Tomorrow” case study. Its purpose is not to claim that an automated filter can guarantee safety. Its purpose is to make the design choices visible and demonstrable: teach useful prompting, explain privacy, classify a question before provider access, provide a calm next step, and show how a parent workflow could respond to selected risk.

The prototype is ready to present as hosted PORT2 evidence. It is not ready for real children, production safeguarding, emergency use or unrestricted personal data.

## 1. Why it was built

Young people can use AI for revision, explanations, creativity, planning and accessibility support. The same systems can produce inaccurate, unsuitable or unsafe results, and a child may not know what information should remain private.

Parents need meaningful visibility and a way to respond to selected safety situations, but covert surveillance can damage trust. SafeAI explores a middle path for a coursework demonstration:

1. teach the child how to use AI well;
2. explain the privacy and visibility arrangement before chat;
3. make safety decisions understandable rather than invisible;
4. route selected sensitive topics to an adult workflow;
5. block clearly unsafe requests without repeating harmful wording; and
6. keep immediate-risk support separate from ordinary parent approval.

## 2. Who it is for

- **Child learner:** a 12–14-year-old using AI for study, creativity or curiosity.
- **Parent or guardian:** an authorised adult who creates linked child accounts and reviews family-scoped activity.
- **Demonstrator or teacher:** someone assessing the interaction design, ethics, implementation and evidence.

The product uses fictional demonstration accounts and avoids claiming legal consent, age verification or production safeguarding.

## 3. What was built

### Child experience

- Child-account sign-in only; no child self-registration.
- Chat-style learning space with Boots, a friendly companion character.
- Prompt-learning activity and privacy/digital-footprint activity.
- Five additional lesson cards covering AI literacy and safe use.
- Privacy acknowledgement/assent demonstration before chat.
- Plain-language status and next-step messages.
- History view with redacted receipts where the safety boundary requires it.
- Help, walkthrough, sound control, keyboard focus and reduced-motion support.

### Parent experience

- Parent account creation and sign-in through Supabase Auth.
- Family setup and parent-owned child-account creation.
- Multiple child accounts with a per-child switcher.
- One-time password handoff for a newly created or reset child account; passwords are not stored by the application.
- Overview, progress, history, approval centre, alerts and settings.
- Parent-selected bounded safety criteria for each linked child.
- Provider-key entry and connection testing through a server-only boundary.
- Child access pause/resume, notification choices and privacy/deletion controls.

### Safety and data flows

The fixed precedence is:

**Immediate-risk escalation → Blocked → Parent approval → Safe adult-support → Allowed**

The main demonstrable journeys are:

- an ordinary learning question is allowed;
- a sensitive question is held for parent approval;
- an unsafe request is refused without harmful instructions or echoed wording;
- a personal or difficult topic receives a limited adult-support response;
- an immediate-risk storyboard gives urgent supportive guidance and is not treated as ordinary parent chat history;
- parent decisions and access settings refresh across the connected experience using Supabase Realtime with polling fallback.

## 4. How useful it is

### Educational usefulness

The child learns transferable AI literacy rather than only seeing a block screen. The prompt lesson encourages clear goals, context and checking. The privacy lesson shows why passwords, API keys, addresses, school details and private images should not be entered into a chatbot.

### Family usefulness

The parent experience gives a demonstrator a concrete way to discuss approval, boundaries, notification choices and account management. Per-child controls and child-labelled events make the family relationship explicit without pretending that every message should become unrestricted surveillance.

### Product-design usefulness

The prototype turns ethical requirements into visible interface behaviour. It shows how safety precedence, redacted history, consent/assent language, status labels and protected escalation can be tested before a production service exists.

### Assessment usefulness

It creates a clear PORT2 evidence sequence: open the two sites, use the walkthroughs, complete a prompt lesson, exercise allowed/approval/blocked/support/urgent scenarios, inspect the parent dashboard, explain the API-key boundary, and discuss limitations and future work.

## 5. Security and privacy design

- Browser code uses only public Supabase configuration.
- Service-role, encryption and provider credentials remain server-side.
- Provider keys are encrypted at rest and returned to the browser only as masked metadata.
- Parent and child roles are checked from family membership.
- Every public data table is protected by Row Level Security.
- Children can access only their own family-scoped records; parents can access only their own family.
- Child passwords are handled by Supabase Auth and are never stored in SafeAI application tables, logs or reports.
- The one-time parent password receipt exists only in page memory and is cleared when hidden, reset, signed out or left.
- Allowed/support history may contain the submitted wording; approval and blocked history uses generic redacted receipts; immediate-risk disclosure wording is protected outside ordinary history.
- Notifications identify the linked child where needed but do not contain raw blocked or urgent wording.
- Security headers include CSP, HSTS, clickjacking protection, `nosniff`, restrictive permissions and no-referrer policy.
- `npm run scan` is a repeatable zero-finding gate before publication.

No API key, password, token, real child data or provider response belongs in this repository.

## 6. Evidence and verification

The current verification gate includes:

- `npm run lint` — passed;
- `npm test` — 63/63 passed;
- `npm run build` — child and parent production builds passed;
- `npm run scan` — 0 findings across 66 files;
- `npm run evaluate:safety` — 7 protected fixtures plus precedence passed;
- Playwright hosted acceptance — passed at 390×844 and 1280×900;
- no console errors or horizontal overflow in hosted acceptance;
- unauthenticated protected child and parent routes — failed closed with HTTP 401;
- hosted dummy-auth probes — reached the correct shared Supabase project and returned only generic invalid-credential UI;
- multi-child regression — confirmed independent normalized child identifiers and passwords in the parent provisioning boundary.

The complete chronological record, including deployments and prior findings, is [`PROJECT_REPORT.md`](../PROJECT_REPORT.md).

## 7. Known limitations

This is not a production safeguarding product. Remaining limitations include:

- the safety classifier is a bounded prototype and requires independent evaluation;
- immediate-risk handling is an unstaffed operational hand-off, not emergency response;
- notifications are in-app rather than monitored email/SMS/push;
- provider availability, model choice, quota and billing require owner-controlled private testing;
- rate limiting, formal retention/legal review, DPIA and age-assurance work remain;
- formal WCAG and usability evaluation remains;
- deleting application family records does not automatically delete the Supabase Auth identity;
- no claim is made that the design is suitable for real child data.

## 8. Future work

1. Run structured usability testing with appropriate consent and safeguarding oversight.
2. Evaluate the classifier for false positives, false negatives, languages, slang and coded language.
3. Define a lawful retention and deletion policy with a formal DPIA and age-appropriate design review.
4. Add staffed safeguarding operations, monitored alert delivery and incident response.
5. Add rate limiting, abuse monitoring and independent security review.
6. Complete formal accessibility and screen-reader testing.
7. Decide whether any real-world pilot is appropriate only after the above work.

## 9. Public links

- Child site: https://safeai-learning-hub-child.vercel.app/
- Parent site: https://safeai-learning-hub-parent.vercel.app/
- Source repository: https://github.com/crrishjoshi/safeai-learning-hub
- Engineering report: [`PROJECT_REPORT.md`](../PROJECT_REPORT.md)

