# Accounts — brain

Status: Confirmed | Last verified: 2026-10-21 | Owner: Pawan

`ownaccounts` app ka saara context. Kaam shuru karne se pehle ye folder padho.

## App

| | |
|---|---|
| Naam | ownaccounts |
| Version (last dekha) | 5.10 |
| Chalti hai | browser mein, data localStorage mein |
| Backup | JSON export / import |
| Currency | INR |

## File naming

`ownaccounts-<email>.json`

Behtar: `ownaccounts-<email>-YYYY-MM-DD.json` — date se duplicate naam nahi banenge.

## ⚠️ Sabse important rule

Ek jaise naam ki do file ho sakti hai. **Filename pe bharosa mat karo.**
Jiska `rev` sabse bada ho, wahi latest hai:

```bash
for f in *.json; do echo "$f $(jq -r '.rev' "$f")"; done | sort -k2 -n
```

## Kaam shuru karne se pehle — 3 step

1. Drive ke `Accounts/backups/` ki saari file ka `rev` nikalo, sabse bada chuno
2. Khaali nahi hai confirm karo:
   `jq '.data | {parties:(.parties|length), txns:(.txns|length)}' <file>`
3. `ISSUES.md` padho — koi khula masla hai kya

## Docs

| File | Kya hai |
|---|---|
| `PROJECT.md` | scope, abhi ki capability, future, open items |
| `AGENTS.md` | AI ke liye rules |
| `DATA-SCHEMA.md` | JSON ka poora dhancha, field by field |
| `BUSINESS.md` | business ka master record |
| `BACKUP.md` | backup / restore ka tareeqa + verification commands |
| `ISSUES.md` | khule masle aur unka check command |
| `PARTIES.md` | customer / supplier master |
| `PRODUCTS.md` | item master |

Faisle aur history — `../DECISIONS.md`, `../CHANGELOG.md`.

## Niyam

- Restore karne se **pehle** `BACKUP.md` padhna zaroori hai
- Koi bhi API key, PIN ya secret in files mein **nahi** likhna — sirf placeholder
- Har restore / bulk delete / schema change `../CHANGELOG.md` mein likhna
- Tables abhi khaali hain. Data wapas nikalne ke baad bharna hai
