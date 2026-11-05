# Project rules for Claude

## Documentation (mandatory)
- After **every** change (files created/edited/deleted, dependencies, config, deployments, decisions), add an entry to the Change Log in `PROJECT_REPORT.md`: date, what changed, files touched, why, security impact. Newest first. Update "Last updated" and "Current status".
- Any security-relevant event (new key or secret, rotation, permission change, new data stored, auth change, scan results) must also go in section 3 "Security record".

## Security
- Never hard-code, print, log or commit API keys or tokens. Use environment variables; add new variable names (no values) to `.env.example`.
- AI provider calls happen server-side only; never expose provider keys to client code.
- Never read or display the contents of `.env` files unless the user asks.
- If a secret may have leaked, tell the user to rotate it and log the incident.
