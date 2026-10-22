# ISSUES

Status: Verified | Last verified: 2026-10-21 | Owner: Pawan

Khule masle. Har ek ke saath check karne ka command hai.

> Yahan koi asli amount, naam ya number nahi likha hai — sirf pattern aur command.

| # | Issue | Check command | Status |
|---|---|---|---|
| 1 | Txn delete hone par `billSeq` / `purSeq` peeche nahi aate → bill numbering mein gap | `jq '{billSeq:.data.businesses[0].billSeq, purSeq:.data.businesses[0].purSeq, txns:(.data.txns\|length)}'` | open |
| 2 | Party ka opening balance hai par peeche koi txn nahi — ledger mein entry nahi milegi | `jq '.data.parties[] \| select(.openingOrig != 0) \| {name, openingOrig}'` | open |
| 3 | Do backup file ka naam bilkul ek jaisa | Drive mein naam search karo, ya `README.md` ka rev command | open |
| 4 | Khaali state dump ko backup samajh lena | `BACKUP.md` ke red flags | open |
| 5 | Auto backup band, `endpoint` khaali — crash pe data bachane ka intezaam nahi | `jq '{endpoint:.backup.endpoint, auto:.backup.auto, lastFileBackup}'` | open |
| 6 | GST configure nahi — bill pe GST nahi aayega | `jq '{gstRate:.data.businesses[0].gstRate, gstin:.data.businesses[0].gstin}'` | open |
| 7 | PIN / lock off — financial data bina lock khula hai | `jq '{requireLock, pin, security}'` | open |
| 8 | Product ka `sellingRate` 0 hai → profit report galat aayegi | `jq '.data.products[] \| select(.sellingRate == 0) \| .name'` | open |
| 9 | Purani schema file naye app mein import karne se party balance galat baith sakta hai | `DATA-SCHEMA.md` ka "do schema generation" section | open |
| 10 | Apps Script backup exist karta hai par app usse juda nahi hai | Script editor mein kholo, phir `jq '.backup.endpoint'` se milao | open |

## Issue #1 ko kaise handle karna

`billSeq` haath se peeche karna theek nahi — purane bill number dobara ban sakte hain. Do raaste:

- Gap rehne do, aur `../CHANGELOG.md` mein likh do kaunse number skip hue
- Ya dobara wahi entry banao taaki number use ho jaaye

Faisla tumhara. Jo karo, changelog mein likho.

## Naya issue milne pe

1. Table mein row add karo
2. Check command likho — bina command ke issue dobara dhoondhna mushkil hota hai
3. Status: `open` / `fixed` / `wontfix`
4. `fixed` karo to date ke saath `../CHANGELOG.md` mein bhi likho

## Status ka matlab

| Status | Matlab |
|---|---|
| `open` | theek nahi hua |
| `fixed` | theek ho gaya — changelog mein date hai |
| `wontfix` | jaanbujh ke chhoda, kaaran likho |
