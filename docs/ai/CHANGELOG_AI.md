# AI Changelog (newest first)
Every agent appends here after each work session.

## Template
```
## YYYY-MM-DD — <Claude|Codex> — <branch>
**Task:** what was asked
**Changed:** files + 1-line why each
**Tests:** what was run, result
**Open / unfinished:** anything left
**Next agent should:** concrete next step
```

## Entries
## 2026-10-13 — Claude — claude/team-setup-guide-33obi2
**Task:** Full two-agent workflow setup (local Windows PC, semi-auto, file-based chat).
**Changed:** docs/ai/WORKFLOW.md, PROMPTS.md; template/ (new-project starter); scripts/*.ps1 (setup, new-project, show-chat, status-all); .claude/commands (start, handoff, review); .gitignore.
**Tests:** PowerShell scripts NOT run (no pwsh in cloud container) - Pawan must test on Windows.
**Open / unfinished:** Codex install + ACK test; scripts untested.
**Next agent should:** if scripts fail on Pawan's PC, fix them from the error text in MESSAGES.md.

## 2026-10-12 — Claude — claude/team-setup-guide-33obi2
**Task:** Set up shared Claude + Codex workflow.
**Changed:** AGENTS.md, CLAUDE.md, docs/ai/* (handoff scaffolding).
**Tests:** n/a (docs only)
**Open / unfinished:** PROJECT_STATE.md still needs real project details.
**Next agent should:** fill PROJECT_STATE.md once the first project is defined.
