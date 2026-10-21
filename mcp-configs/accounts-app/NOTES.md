# accounts-app

Status: Confirmed | Last verified: 2026-10-21 | Owner: Pawan

`ownaccounts` software ka folder — **PC pe local hai, GitHub pe nahi.**

## ⚠️ Ye folder is repo ke liye nahi hai

`.claude/settings.json` **PC ke software folder mein** copy karni hai, jahan Claude
Code kaam karta hai. Is repo mein nahi.

## Accounts ka poora setup

| Hissa | Kahan | Kaun |
|---|---|---|
| App ka source | PC pe, local folder | PC ka Claude Code |
| Live app | Netlify | Pawan, phone browser se |
| Data | browser localStorage | app khud |
| Backup | JSON export → Drive | manual, abhi |
| Context aur rules | Drive `Accounts/brain/` | — |

Kaam ka tareeqa: Pawan entries deta hai → **PC ka Claude Code** app mein data fill
karta hai → app Netlify pe deploy hoti hai → phone se use hoti hai.

## Is folder mein kya hai

`.claude/settings.json` — sirf `engineering` plugin on, baaki off. App ka code
yahan hai, marketing/sales/finance ka kuch kaam nahi.

## Koi MCP server nahi chahiye

- **GitHub nahi** — ye folder GitHub pe nahi hai
- **Supabase nahi** — app localStorage pe chalti hai, koi database nahi
- **Linear / Figma nahi** — zarurat nahi

Bas **Drive** chahiye (account-level), backup ke liye.

## Pehle ye padho

Drive ka `Accounts/brain/` — khaas kar:

| File | Kyun |
|---|---|
| `AGENTS.md` | `bal` / `stock` / `billSeq` ke niyam. **Ye galat karne se hisaab galat hota hai** |
| `DATA-SCHEMA.md` | JSON ka poora dhancha |
| `BACKUP.md` | restore se pehle ke 3 verification command |
| `ISSUES.md` | 10 khule masle |

## 🔴 Khula risk

Is folder ki **ek hi copy hai — PC pe.** GitHub pe backup nahi hai. App ka data
already ek baar save-fail ho chuka hai (20 Oct). Code ka backup bhi hona chahiye.
