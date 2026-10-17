# Decisions Log
Short ADRs. Format: date — decision — why — alternatives rejected.

- 2026-10-12 — `AGENTS.md` is the single rules file; `CLAUDE.md` imports it — both tools read the same rules, no drift.

- 2026-10-17 — Data split: code=GitHub, personal files=Google Drive, secrets=password manager; git repo never inside Drive — PC+phone same data, no .git corruption. Alternatives rejected: everything in Drive (corrupts .git), everything in GitHub (personal files/secrets don't belong).
