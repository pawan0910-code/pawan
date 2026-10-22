# PROJECT — Accounts

Status: Confirmed (scope aur setup) | Last verified: 2026-10-21 | Owner: Pawan

Status label ka matlab `../BRAIN-SYSTEM.md` mein hai.

## 1. Ye kya hai

**Pawan ka khud ka CRM aur central hisaab-kitaab.** Apne account se sab kuch
manage karne ke liye. — `Confirmed` (21 Oct 2026)

App: `ownaccounts`, version 5.10. Pawan ne khud banayi hai. Browser mein chalti
hai, data localStorage mein, backup JSON export se. Currency INR. — `Verified`

## 2. Setup — teen hisse, ye samajhna zaroori hai

| Hissa | Kahan | Kaun chalata hai | Status |
|---|---|---|---|
| App ka source folder | **PC pe, local** — GitHub pe nahi | PC ka Claude Code | Confirmed |
| Live app | **Netlify** pe deployed | — | Confirmed |
| App ka istemaal | **phone ka browser** | Pawan | Confirmed |
| Data | browser localStorage | app khud | Verified |
| Backup | JSON export → Drive `Accounts/backups/` | manual | Verified |
| Context aur rules | yahi folder (repo) | — | Confirmed |

### Kaam ka tareeqa

```
Pawan entries deta hai
   ↓
PC ka Claude Code  (software folder mein)  →  app mein data fill karta hai
   ↓
Netlify pe deploy
   ↓
Pawan phone browser se use karta hai
```

**Cloud session se wo PC folder dikhai nahi deta.** Yahan se sirf ye brain docs
aur Drive ke backup files par kaam ho sakta hai. Code ka kaam PC wale Claude
Code pe hota hai.

## 3. Tools aur settings

Is project ke plugin settings — `../../mcp-configs/accounts-app/`.

Wo folder **PC ke software folder mein** copy karna hai, is repo mein nahi.
Sirf `engineering` plugin on, baaki off.

**Koi MCP server nahi chahiye** — GitHub nahi (folder GitHub pe nahi hai),
Supabase nahi (localStorage pe chalti hai), Linear/Figma nahi. Bas Drive,
jo account-level hai.

## 4. Scope — kya iske andar aayega

Jo bhi accounts se juda hai, **sab isi ke andar.** — `Confirmed`

- Saare business ka hisaab-kitaab, ek jagah
- Project-wise accounts
- Party ledger — customer aur supplier
- Stock aur purchase/sale
- Kharche aur expense category
- Investment, loan, trade

Ye alag-alag jagah nahi baantna. **Ek hi app, ek hi jagah** — yahi iska poora
maqsad hai.

## 5. Abhi app kya kar sakti hai — `Verified` (21 Oct audit se)

| Hissa | Kaam |
|---|---|
| Multi-business | ek se zyada business, `activeBiz` se switch |
| Parties | customer / supplier, per-business balance, opening balance |
| Products | item master, unit, purchase/selling rate, stock |
| Transactions | sale aur purchase, line items, paid/pending, bill number |
| Numbering | `billSeq` sale ke liye, `purSeq` purchase ke liye |
| Stock | lots, manual adjustment (`stockAdj`) |
| Kharche | expense categories |
| Day close | din band karne ka record |
| Audit log | har create/delete ka record |
| Voice notes | audio ke saath |
| Finance | investments, loans, trades |
| Net worth | history, date-wise |
| Budget | per category |
| Recurring | repeat entries, subscriptions |
| GST | rate aur GSTIN ke field maujood |

Ye saare field app mein **maujood** hain. Iska matlab ye nahi ki sab configure ya
test ho chuke hain — dekho section 7.

## 6. Aage kya aayega — `Future`

| Cheez | Kya |
|---|---|
| Updates | accounts ka updates feed |
| Calendar | calendar ke saath jodna |
| Reports | accounts ki poori reporting isi ke andar |

**`Future` matlab aaj ki capability nahi.** Inhe "ho jaata hai" mat kehna.
Banane se pehle scope, format aur data source decide karna padega.

## 7. Abhi ki haalat — dhyaan se

| Cheez | Haalat |
|---|---|
| Business ka data | brain docs mein **nahi bhara** — pehle poora backup nikalna hai |
| Auto backup | **band** — `endpoint` khaali, `lastFileBackup: 0` |
| Apps Script backup | exist karta hai par app usse **juda nahi** |
| GST | configure nahi — `gstRate: 0`, `gstin` khaali |
| PIN / lock | **off** — phone pe khulti hai, bina lock |
| Source ka backup | **koi nahi** — folder sirf PC pe hai |
| Khule issue | **10** — dekho `ISSUES.md` |

"CRM" Pawan ka shabd hai. App ka asli dhancha party-aur-ledger wala bookkeeping
hai; customer relationship wale feature (follow-up, pipeline, reminder) abhi nahi
hain. — `Assumed`, Pawan confirm kare.

## 8. Baaki docs

| File | Kya hai |
|---|---|
| `README.md` | entry point, kaunsa backup latest hai |
| `AGENTS.md` | AI ke liye rules |
| `DATA-SCHEMA.md` | JSON ka poora dhancha, field by field |
| `BUSINESS.md` | business ka master record |
| `BACKUP.md` | backup / restore + verification commands |
| `ISSUES.md` | 10 khule masle |
| `PARTIES.md` | customer / supplier master |
| `PRODUCTS.md` | item master |

Faisle aur history — `../DECISIONS.md`, `../CHANGELOG.md`.

## 9. Open items

| # | Item | Kaun | Blocker? |
|---|---|---|---|
| 1 | Poora backup nikaal ke `BUSINESS`, `PARTIES`, `PRODUCTS` bharna | Pawan + Claude | **haan** |
| 2 | **App ke source ka backup** — folder sirf PC pe hai | Pawan | nahi, par risk hai |
| 3 | "CRM" se kya expect karte ho — follow-up, reminder, pipeline? | Pawan | nahi |
| 4 | Updates feed ka scope | Pawan | nahi |
| 5 | Calendar integration ka scope | Pawan | nahi |
| 6 | Reports — kaunsi, kis format mein | Pawan | nahi |
| 7 | Auto backup wire karna | Pawan | nahi |
| 8 | GST shuru karna hai ya nahi | Pawan | nahi |
| 9 | PIN / lock on karna — phone pe khulti hai | Pawan | nahi |
| 10 | `ISSUES.md` ke 10 issue | Pawan + Claude | nahi |
