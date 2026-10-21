# DECISIONS

Saare project ke faisle. **Append-only** — nayi entry sabse upar.

Kyun ye file: "ye kyun aise hai?" ka jawaab 5 second mein mil jaaye, aur ek
faisla dobara bahas na bane.

| Date | Project | Sawaal | Faisla | Kisne | Asar |
|---|---|---|---|---|---|
| 2026-10-21 | Brain system | Pending → Confirmed kab? | Sirf Pawan ke approve ya proof pe. Waqt se nahi | Claude (proposed) | `CLAUDE.md` — Pawan ki confirmation baaki |
| 2026-10-21 | Brain system | Update trigger kahan rakhna | `CLAUDE.md` mein, taaki har session mein lागू ho | Pawan | `CLAUDE.md` |
| 2026-10-21 | Brain system | Standard kya hoga | 6 status label + 5 core file per brain | Pawan | `brain/BRAIN-SYSTEM.md` |
| 2026-10-21 | Baroda Fresh | `PROJECT.md` ki spelling kaun theek karega | Pawan khud — replace karne se 27 KB spec ka risk tha | Pawan | `PROJECT.md` — **abhi pending** |
| 2026-10-21 | Khanderao Market | Spelling kaunsi sahi | **Khanderao** (Khandero nahi) | Pawan | folder naam; Baroda Fresh `PROJECT.md` sec 5 theek hona baaki |
| 2026-10-21 | Khanderao Market | Baroda Fresh se rishta | **Alag business.** Address shared hai, brand/content nahi | Pawan | Khanderao `brain/README.md`, `AGENTS.md` |
| 2026-10-21 | Accounts | brain docs mein asli data daalna? | Nahi. Pehle poora backup nikaalenge, phir tables bharenge | Pawan | 8 docs — tables khaali |
| 2026-10-21 | PRISM | Kya karna | Archive mein pada rahe. **Pawan ke kehne tak haath nahi lagana** | Pawan | `Archive/PRISM/` |
| 2026-10-20 | Connectors | Per-project connector kaise | `.mcp.json` + `enabledPlugins` per project. Cloud connectors account-level hi rahenge | Pawan | `mcp-configs/` |
| 2026-10-20 | Connectors | Isolation ka tareeqa | Tareeqa A — plugins per-project, cloud connectors account pe chhant ke | Pawan | `mcp-configs/README.md` |

## Likhne ka tareeqa

- Nayi entry **upar** jodo
- `Kisne` mein saaf likho — `Pawan` ya `Claude`. Mera faisla kabhi `Confirmed` nahi hota
- `Asar` mein wo file likho jo is faisle se badli. File na badli ho to `—`
- Faisla palat jaaye to **purani entry mitao nahi** — nayi entry banao aur purani ko
  `(superseded YYYY-MM-DD)` se mark karo
