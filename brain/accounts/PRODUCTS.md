# PRODUCTS

Status: Pending | Last verified: 2026-10-21 | Owner: Pawan

Item master.

> Khaali hai. Data wapas nikalne ke baad bharna hai.

| Name | unit | purchaseRate | sellingRate | notes |
|---|---|---|---|---|
| | | | | |

## Nikalne ka command

```bash
jq -r '.data.products[] | [.name, .unit, .purchaseRate, .sellingRate, .stock] | @tsv' file.json
```

## ⚠️ `sellingRate` zaroor set karo

`sellingRate: 0` reh gaya to **profit report galat aayegi** — app 0 ko asli selling rate maan leta hai aur poora purchase loss dikha deta hai.

Check:

```bash
jq -r '.data.products[] | select(.sellingRate == 0) | .name' file.json
```

## `unit` ek jaisa rakho

Ek item ka unit **kabhi mat badlo**. `box` se `kg` karne pe purane txns ki quantity ka matlab badal jaata hai, par purane entries update nahi hote — stock aur value dono galat ho jaate hain.

Agar unit badalna hi hai: naya product bana do, purane ko notes mein `inactive` likh ke chhod do.

## `stock` haath se mat chedo

| Field | Kaun badalta hai |
|---|---|
| `stock` | app khud — purchase/sale se |
| `stockAdj` | tum — manual adjustment yahan likhte hain |
| `lots` | app — lot-wise tracking |

Stock galat lage to `stockAdj` se adjust karo, `stock` seedha nahi. Seedha badalne se lots aur stock match nahi karenge.

## `lastPurDate` / `lastSupplier`

App khud bharta hai pichhli purchase se. Haath se mat likho — agli purchase pe overwrite ho jaayega.

## Naya product add karna

1. App mein add karo, ya purchase entry karte waqt app khud bana deta hai (`note: auto-created from a purchase`)
2. `unit` pehle hi socho — baad mein badalna mushkil hai
3. `purchaseRate` aur `sellingRate` **dono** bharo
4. Is file ki table mein row add karo

## Niyam

- Ek item ka ek hi naam, ek hi spelling
- Rate badalne pe is file mein update karo — warna pata nahi chalega kab se kya rate chal raha hai
- Product delete karne se pehle dekho uske txns hain kya — `lines[].productName` se match karo
- Band hua item delete mat karo — notes mein `inactive` likh do
