# Pawan's Two-Agent Workflow (Claude Code + Codex)

## Roles
| Kaam | Agent |
|---|---|
| Plan, architecture, multi-file changes, docs, code review | **Claude Code** |
| Chhote clear tasks, bug fix, tests likhna, repetitive edits | **Codex** |
| Final decision, merge, approve | **Pawan (you)** |

Rule: jo banaye, uska review dusra kare.

## Folder layout (PC par)
```
C:\Work\
  Projects\        <- har project ka apna folder + apna git repo
    BarodaFresh\
    PrismResearch\
  _Archive\        <- purane/ruke hue ideas (Fruit App Idea). Delete nahi.
  _Personal\       <- accounts.md (NO passwords), kabhi GitHub par nahi
  _Template\       <- naye project ka starter (AGENTS.md + docs/ai/)
```

## Roz ka loop (semi-auto)
1. `scripts\show-chat.ps1` chalao (alag terminal me): dono agents ki chat live dikhegi.
2. Project folder me jao. Task do (PROMPTS.md se copy-paste).
3. Agent kaam karta hai: branch -> code -> tests -> docs/ai update -> commit.
4. Dusra agent review karta hai (REVIEW prompt).
5. Aap diff dekh ke merge karte ho. `git push`.

## Sync rule
Har session ke end me commit + push. Naya session shuru karne se pehle `git pull`.
Dono agents ek time par ek hi branch par kaam NAHI karte.

## Naya project shuru karna
`scripts\new-project.ps1 -Name BarodaFresh`
