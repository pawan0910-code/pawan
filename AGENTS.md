# AGENTS.md — Shared rules for all AI agents (Claude Code, Codex, others)

This file is the single source of truth. `CLAUDE.md` imports it.

## Before you start ANY work (mandatory)
1. Read `docs/ai/PROJECT_STATE.md` (current status, architecture, how to run/test).
2. Read the latest entries in `docs/ai/CHANGELOG_AI.md` (what the other agent changed).
3. Read `docs/ai/TASKS.md` (what is in progress / next) and `docs/ai/DECISIONS.md` (don't re-litigate decisions).
4. Run `git status` and `git log --oneline -10`. If the tree has uncommitted changes you did not make, stop and ask.

## While working
- One task = one branch (`claude/<topic>` or `codex/<topic>`). Never work on the same branch at the same time as the other agent.
- Mark the task `IN PROGRESS (agent name)` in `docs/ai/TASKS.md` before editing code.
- Small, focused commits. Run the project's tests/lint before committing.
- Follow existing code style; don't refactor unrelated code.

## Before you finish (mandatory)
1. Append an entry to `docs/ai/CHANGELOG_AI.md` (template inside the file).
2. Update `docs/ai/PROJECT_STATE.md` if architecture, commands, or status changed.
3. Record any non-trivial choice in `docs/ai/DECISIONS.md`.
4. Move the task in `docs/ai/TASKS.md` to Done / update Next steps.
5. Commit everything (code + docs) together.

## Never
- Never commit secrets (.env, keys, tokens).
- Never rewrite or force-push shared history.
- Never delete the other agent's notes; add a correction entry instead.
