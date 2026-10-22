# AGENTS — Accounts

Status: Confirmed | Last verified: 2026-10-21 | Owner: Pawan

AI ke liye rules. Kaam shuru karne se pehle ye padho.

## Pehle kya padhna

1. `README.md` — kaunsa backup latest hai, 3-step check
2. `PROJECT.md` — scope aur abhi ki haalat
3. `ISSUES.md` — 10 khule masle, koi tumhare kaam se juda hai kya
4. `DATA-SCHEMA.md` — jab JSON chhedna ho
5. `BACKUP.md` — jab restore ya backup ka kaam ho

## ⚠️ Sabse badi rule — ye paisa hai

Baaki project mein galti se text galat ho jaata hai. **Yahan galti se hisaab
galat ho jaata hai.**

- **Koi number guess nahi.** Amount, balance, rate, quantity — pata nahi to
  poochho. Andaaza lagana sabse badi galti hai
- **Koi number khud se theek nahi karna.** Galat lage to batao, badlo nahi
- Calculation dikhao — kaunse field se kaunsa number nikla
- Rupee ka figure likhte waqt source batao: kaunsi file, kaunsa field

## Data ke niyam — ye teen sabse zyada galat hote hain

### `bal` vs `opening`

| Field | Kaun badalta hai |
|---|---|
| `opening` / `openingOrig` | **Pawan** — manually, ek baar |
| `bal` | **app** — opening + txns se calculate |

**`bal` kabhi haath se mat badlo.** Galat lage to txns dekho ya opening theek
karo. Seedha `bal` badalne se ledger aur balance match nahi karega.

### `stock` vs `stockAdj`

| Field | Kaun badalta hai |
|---|---|
| `stock` | **app** — purchase/sale se |
| `stockAdj` | **tum** — manual adjustment yahan likho |
| `lots` | **app** — lot-wise tracking |

Stock galat lage to `stockAdj` se adjust karo. Seedha `stock` badalne se lots
aur stock match nahi karenge.

### `billSeq` / `purSeq`

Sirf aage badhte hain, peeche nahi aate. Txn delete karne se number wapas nahi
milta. Inhe haath se peeche karna **mat** — purane bill number dobara ban
sakte hain. Dekho `ISSUES.md` #1.

## Kabhi nahi karna

- Koi amount, balance ya rate **guess** karna
- `bal` ya `stock` seedha badalna
- `billSeq` / `purSeq` peeche karna
- Khaali ya `rev: 0` wali file restore karna — `BACKUP.md` ke red flags dekho
- Backup lene se pehle bada kaam (bulk delete, restore, schema change) shuru karna
- `lastPurDate` / `lastSupplier` haath se likhna — app khud bharta hai
- Party ya product delete karna jab uske txns hain
- Band hua party/item delete karna — notes mein `inactive` likho
- API key, PIN ya secret kisi file mein likhna — placeholder `<YOUR_KEY_HERE>`
- Asli business data brain docs mein daalna **jab tak Pawan na kahe** — abhi
  tables jaanbujh ke khaali hain

## Purani schema file se savdhaan

Do schema generation hain. Purani file mein party balance `balance` (flat number)
hai, nayi mein `bal: {bizId: amount}`. **Purani file naye app mein seedhe import
karne se balance galat baith sakta hai.**

Pehchanne ka tareeqa `DATA-SCHEMA.md` ke "do schema generation" section mein hai.

## Backup aur restore

Poora tareeqa `BACKUP.md` mein hai — yahan dobara nahi likha (ek fact, ek ghar).

Sirf ye yaad rakho: **restore se pehle `BACKUP.md` ke 3 command chalane hain.**
Ek bhi fail hua to restore nahi.

## Kaam ka output kahan jaata hai

| Kya | Kahan |
|---|---|
| Backup JSON | Drive `Accounts/backups/` |
| Context aur rules | yahi folder (repo) |
| Faisla | `../DECISIONS.md` |
| Kaam khatam | `../CHANGELOG.md` |
| Naya issue | `ISSUES.md` ki table |

brain mein sirf context aur rules rehte hain — backup file ya report yahan nahi.

## Jab kuch adhoora mile

`PROJECT.md` aur baaki docs mein kaafi kuch `Pending` hai — tables khaali hain,
kyunki data pull baaki hai.

**Khaali field bharne ki jaldi mat karo.** Pawan ne saaf kaha hai: pehle poora
backup nikaalenge, phir tables bharenge. Tab tak khaali hi theek hai.

## Takraav mile to

Do doc alag baat kahein:

1. Chup-chaap kisi file ko theek **mat** karo
2. `ISSUES.md` mein likh do, check command ke saath
3. Pawan se poochho

`PROJECT.md` baaki docs par bhaari hai — scope ka sawaal wahan se tay hoga.
