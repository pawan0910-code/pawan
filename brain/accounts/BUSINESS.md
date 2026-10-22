# BUSINESS

Status: Pending | Last verified: 2026-10-21 | Owner: Pawan

Business ka **master record**. App aur yahan mismatch ho to **yahan se app theek karo**, ulta nahi.

> Khaali hai. Data wapas nikalne ke baad bharna hai.

## Business 1

| Field | Value |
|---|---|
| `id` | |
| `name` | |
| `owner` | |
| `phone` | |
| `address` | |
| `currency` | |
| `gstin` | |
| `gstRate` | |
| `openingCash` | |
| `openingBank` | |

Ek se zyada business ho to neeche usi format mein section add karte jao.

## Nikalne ka command

```bash
jq '.data.businesses[] | {id, name, owner, phone, address, currency, gstin, gstRate}' file.json
```

## Kyun ye file zaroori hai

- **`address` aur `phone` schema migration mein kho jaate hain.** Purani file mein bhare hue the, nayi mein khaali reh gaye. Ek baar yahan likh do to dobara nahi khoyenge
- `gstin` khaali rahega to bill pe GST nahi aayega
- `openingCash` / `openingBank` galat hue to net worth report galat aayegi

## Niyam

- Business ka naam **ek hi spelling** mein rakho. Chhoti-badi letter ya extra space se do alag record ban jaate hain
- `id` kabhi haath se mat badlo — parties aur products isi `id` se jude hote hain (`bal{bizId}`, `product.bizId`)
- Phone number likhte waqt check karo — typo ho jaata hai aur bill pe chhap jaata hai
- GST shuru karna ho to `gstin` + `gstRate` dono bharo, ek se kaam nahi chalega
