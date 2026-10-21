# DECISIONS

Saare project ke faisle. **Append-only** — nayi entry sabse upar.

Kyun ye file: "ye kyun aise hai?" ka jawaab 5 second mein mil jaaye, aur ek
faisla dobara bahas na bane.

| Date | Project | Sawaal | Faisla | Kisne | Asar |
|---|---|---|---|---|---|
| 2026-10-21 | Brain system | Drive doc badalne ka tareeqa | **Trash aur recreate band.** Sirf line badlo. Par Drive mein line badalne ka tool nahi hai — to Drive docs ab read-only. Badalna ho to Pawan khud kare ya doc repo mein shift ho | Pawan | `CLAUDE.md`, `drive-brain-docs` skill |
| 2026-10-21 | Khanderao | Page kiska hai | **Poore market ka** — kisi ek shop ka nahi, Pawan ki business ka nahi. (Isne pehle ke "dono — market + meri business" ko supersede kiya) | Pawan | `PROJECT.md` sec 1 |
| 2026-10-21 | Khanderao | Online order lega? | **Nahi.** Saara order Baroda Fresh pe. Khanderao sirf content, knowledge aur pehchaan ke liye | Pawan | `PROJECT.md` sec 2 |
| 2026-10-21 | Khanderao | Content kya banega | Knowledge videos (fruits, vegetables, flowers) · quality kaise pehchane · hidden things · market ka mahaul reel · festival/seasonal | Pawan | `CONTENT-PLAN.md` |
| 2026-10-21 | Khanderao | Platform | Instagram · Facebook · Google Business Profile. WhatsApp aur YouTube nahi | Pawan | `PROJECT.md` sec 4 |
| 2026-10-21 | Khanderao | Bhasha | Mix — Hindi + Gujarati + English jaisa natural chale | Pawan | `BRAND.md` |
| 2026-10-21 | Khanderao | Frequency | Hafte mein 5–7 post. Claude ne flag kiya: knowledge video ke saath ye batch shoot aur script support ke bina nahi chalega | Pawan | `CONTENT-PLAN.md` |
| 2026-10-21 | Accounts | App ka setup kya hai | Source PC pe local (GitHub pe nahi) · live app Netlify pe · phone browser se use · PC ka Claude Code data fill karta hai | Pawan | Accounts `PROJECT.md` sec 2 |
| 2026-10-21 | Accounts | Koi MCP server chahiye? | Nahi. GitHub nahi (folder GitHub pe nahi), Supabase nahi (localStorage), Linear/Figma nahi. Sirf Drive (account-level) | Pawan | `mcp-configs/accounts-app/` |
| 2026-10-21 | Tool configs | Folder naam galat the | `shopify-store`/`youtube-content`/`webapp-dev` → `baroda-fresh`/`khanderao-social`/`accounts-app`. Purane naam tab bane jab asli projects pata nahi the | Pawan | `mcp-configs/` |
| 2026-10-21 | Tool configs | Jhoothi `.mcp.json` ka kya karein | Hata di. Usme `notion`, `slack`, `canva` the jo Pawan ne kabhi connect nahi kiye — Claude ne suggestion ko config mein likh diya tha. Jab asli server connect ho, tab banegi | Pawan | 3 `.mcp.json` delete |
| 2026-10-21 | Brain system | Header block Drive mein rakhna theek hai? | Pawan ne aage badhne ko kaha. Claude ne flag kiya: `Last verified` update karne ko har baar poori file recreate karni padegi, isliye date baasi hone ka khatra | Pawan (Claude ne risk flag kiya) | 14 docs recreate hue |
| 2026-10-21 | Accounts | Project ka scope kya hai | Pawan ka khud ka CRM aur central hisaab-kitaab. Jo bhi accounts, project ya hisaab se juda hai — sab isi ke andar. Aage updates, calendar, reports bhi | Pawan | Accounts `PROJECT.md` |
| 2026-10-21 | Accounts | Drive ka `CHANGELOG.md` rakhein? | Nahi — trash. Repo wala `brain/CHANGELOG.md` hi single source | Pawan | Drive file trash |
| 2026-10-21 | Brain system | Skills user-level pe copy karein? | Nahi — repo mein hi rahengi. Repo har session clone hota hai; user-level git mein nahi jaata aur copy se do ghar ban jaate | Claude (proposed) | koi change nahi — **Pawan ki confirmation baaki** |
| 2026-10-21 | Brain system | Skill har task par banegi? | Nahi — teeno test (non-obvious, dobara aayega, bhool jaayega) paas hone par. Pawan ne "every time" kaha tha | Claude (proposed) | `skill-capture` — **Pawan ki confirmation baaki** |
| 2026-10-21 | Brain system | Skills kahan rahengi | Sirf repo `.claude/skills/`. Drive mein rakhi file skill ki tarah load nahi hoti | Claude | `skill-capture` |
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
