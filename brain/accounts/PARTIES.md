# PARTIES

Status: Pending | Last verified: 2026-10-21 | Owner: Pawan

Customer aur supplier ka master list.

> Khaali hai. Data wapas nikalne ke baad bharna hai.

## Customers

| Name | mobile | opening | notes |
|---|---|---|---|
| | | | |

## Suppliers

| Name | mobile | opening | notes |
|---|---|---|---|
| | | | |

## Nikalne ka command

```bash
# customers
jq -r '.data.parties[] | select(.kind=="customer") | [.name, .mobile, .openingOrig] | @tsv' file.json

# suppliers
jq -r '.data.parties[] | select(.kind=="supplier") | [.name, .mobile, .openingOrig] | @tsv' file.json
```

Purani schema wali file se (jahan `bal` ki jagah `balance` hai):

```bash
jq -r '.data.parties[] | [.kind, .name, .balance] | @tsv' file.json
```

## `opening` aur `bal` ka farak — ye confuse hota hai

| Field | Kya hai |
|---|---|
| `opening` / `openingOrig` | **manually daala** gaya purana baaki. Ek baar set hota hai |
| `bal` | **calculated** — opening + saare txns ka asar. App khud banata hai |

**`bal` kabhi haath se mat badlo.** Galat lage to txns check karo ya opening theek karo. `bal` seedha badalne se ledger aur balance match nahi karega.

## Naya party add karna

1. App mein add karo, ya purchase/sale entry karte waqt app khud bana deta hai (`note: auto-created from an entry`)
2. `kind` sahi chuno — `customer` ya `supplier`
3. Opening baaki ho to `opening` mein daalo, txn bana ke nahi
4. Is file ki table mein row add karo

## Niyam

- **Ek party ka ek hi spelling.** Chhoti-badi letter, extra space, ya "Ravi" vs "RV(Ravi)" — teen alag record ban jaate hain aur balance baant jaata hai
- Mobile number bhar do. Baad mein same naam ke do party aaye to pehchanne ka ek hi tareeqa bachta hai
- Short naam (initials) use karo to notes mein poora naam likho — warna 6 mahine baad khud ko yaad nahi rahega
- Party delete karne se pehle dekho uske txns hain kya:
  `jq --arg id "<partyId>" '.data.txns[] | select(.partyId==$id)' file.json`
- Jo party band ho gaya usko delete mat karo — notes mein `inactive` likh do. Delete karne se purane bill ka party naam toot jaata hai
