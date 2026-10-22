# DATA-SCHEMA

Status: Verified | Last verified: 2026-10-21 | Owner: Pawan

`ownaccounts` export JSON ka dhancha. **Ye structure hai, data nahi.**

Export file ka top level:

```
{ "rev": <number>, "at": <number>, "data": { ... } }
```

Settings-wala export (full state dump) mein `data` wrapper nahi hota — keys seedhe top pe hoti hain.

## Top-level keys (data ke andar)

| Key | Type | Kaam |
|---|---|---|
| `businesses` | array | saare business. v5 schema |
| `activeBiz` | string | kaunsa business khula hai (business `id`) |
| `business` | object | active business ki copy |
| `parties` | array | customer + supplier |
| `products` | array | item master |
| `txns` | array | sale aur purchase entries |
| `lots` | array | stock lot tracking |
| `stockAdj` | array | manual stock adjustment |
| `recurring` | array | repeat hone wale entries |
| `subscriptions` | array | subscription records |
| `budgets` | object | budget per category |
| `dayCloses` | array | din band karne ke records |
| `expenseCats` | array | kharche ki categories |
| `nwHistory` | array | net worth ka itihaas — `{date, value}` |
| `voiceNotes` | array | voice note records |
| `finance` | object | `{investments[], loans[], trades[]}` |
| `audit` | array | har action ka log |
| `rev` | number | revision counter |
| `user` | object | `{email, name}` |

## business

```
id, name, owner, phone, address, currency, logo,
openingCash, openingBank, purSeq, billSeq, gstRate, gstin
```

## party

```
id, kind, name, mobile, address, notes,
bal { <bizId>: <amount> },
opening { amt, date, bizId },
openingOrig, openingLog[]
```

- `kind` = `customer` ya `supplier`
- `bal` **calculated** hai — opening + txns ka asar
- `openingOrig` wo pehla opening jo manually daala gaya

## product

```
id, bizId, name, unit, purchaseRate, sellingRate,
stock, notes, lastPurDate, lastSupplier
```

## txn

```
id, type, date, time, ts, partyId, partyName,
lines: [ { productName, qty, rate, amount } ],
total, paid, pending, method, billNo, notes
```

- `type` = `sale` ya `purchase`
- `method` = `credit`, `cash` etc.
- `pending` = `total - paid`

## audit entry

```
id, at, a, e, ref, biz, note, title,
type, party, prods[], items
```

- `a` = action: `create`, `delete`
- `e` = entity: `txn`, `party`, `product`, `voice`
- `ref` = us entity ki `id`
- **`audit` hi batata hai ki koi entry pehle thi aur baad mein hat gayi**

## voiceNote

```
id, at, date, lang, text, parts[], done,
linked[], audio, audioAt, audioBytes, secs
```

## Settings keys (full-state export mein)

```
auth, theme, accent, lang, fontScale
backup   { apiKey, endpoint, last, auto, interval }
assistant{ enabled, apiKey }
pin, pinHash, pinSalt, requireLock, guard
security { autoLockMin, biometric, credId }
voice    { audioDays, cloud { enabled, endpoint, secret } }
trash[], snapshots[], locked, oldStockDays, lastSummary
customerViewURL, syncEndpoint, syncKey, loyaltyPer100
serverRev, lastFileBackup, exportedAt, exportedBy, secretsStripped
```

## ⚠️ Do schema generation — pehchanna zaroori hai

| | Purana | Naya (v5) |
|---|---|---|
| Business | single `business` object | `businesses[]` + `activeBiz` |
| Party balance | `balance` — flat number | `bal: { bizId: amount }` |
| Extra keys | nahi | `lots`, `stockAdj`, `audit`, `voiceNotes`, `finance` |

Pehchanne ka command:

```bash
jq 'if (.data.businesses? // empty) then "v5" else "purana" end' file.json
```

**Purani file naye app mein seedhe import karne se party balance galat baith sakta hai** — `balance` aur `bal` ka dhancha alag hai.

## Sequence fields

| Field | Kaam |
|---|---|
| `billSeq` | agla sale bill number |
| `purSeq` | agla purchase number |

Dono **sirf aage badhte hain**. Txn delete karne pe peeche nahi aate — isliye numbering mein gap aa sakta hai. Dekho `ISSUES.md` #1.

## rev / at / serverRev

| Field | Matlab |
|---|---|
| `rev` | local revision. **`rev: 0` = kabhi save nahi hui** |
| `at` | export ka timestamp (ms) |
| `serverRev` | server pe last synced revision |
| `lastFileBackup` | last file backup ka timestamp. `0` = kabhi nahi |
