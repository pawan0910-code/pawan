# BACKUP

Status: Confirmed | Last verified: 2026-10-21 | Owner: Pawan

> ⚠️ **Is file mein koi API key, PIN, secret ya token nahi likhna.** Sirf `<YOUR_KEY_HERE>` jaisa placeholder.

## Backup lena

1. App kholo → Export / Backup
2. File save karo: Drive ke `work/Accounts/backups/`
3. Naam: `ownaccounts-<email>-YYYY-MM-DD.json`

Date zaroori hai. Bina date ke ek jaise naam ki do file ban jaati hai aur pata nahi chalta kaunsi nayi hai.

## ⛔ Restore se PEHLE ye 3 command chalao

Ek bhi fail hua to **restore mat karo**.

```bash
# 1. rev aur timestamp — rev 0 matlab file kabhi save nahi hui
jq '{rev, at}' backup.json

# 2. kitna data andar hai
jq '.data | {biz:(.businesses|length), parties:(.parties|length),
             products:(.products|length), txns:(.txns|length)}' backup.json

# 3. ek-line safety check
jq -e '.rev > 0 and (.data.parties|length) > 0' backup.json \
  && echo "SAFE" \
  || echo "DANGER - khaali file, restore mat karo"
```

Saari backup file ek saath compare karne ke liye:

```bash
for f in *.json; do
  echo "$f  rev=$(jq -r '.rev' "$f")  parties=$(jq -r '.data.parties|length' "$f")"
done | sort -t= -k2 -n
```

## 🔴 Red flags — ye file restore NAHI karni

| Nishani | Matlab |
|---|---|
| `rev: 0` | file kabhi save nahi hui |
| `parties`, `products`, `txns` sab `[]` | khaali state dump |
| naam mein `save-fail` | crash ke waqt ka emergency dump, asli backup nahi |
| `auth: false`, `user: null` | login se pehle ki state |
| `secretsStripped: 1` | keys hata di gayi — settings adhoora aayega |
| `businesses: []` | koi business hi nahi |

**Khaali dump ko backup samajh ke restore karna = poora data mit jaana.** App crash hone par apne aap khaali file bhi likh deta hai — naam "backup" jaisa hota hai par andar kuch nahi.

## Restore karna

1. **Pehle current state ka export lo** — ye safety net hai
2. Us export ko `backups/` mein date ke saath rakho
3. Naya file import karo
4. Import ke baad counts milao:
   `jq '.data | {parties:(.parties|length), txns:(.txns|length)}'` — jo number file mein tha, wahi app mein dikhe
5. `../CHANGELOG.md` mein entry likho

## Auto backup wire karna

Abhi band hai. Settings mein ye bharne padenge:

| Field | Kya daalna |
|---|---|
| `backup.endpoint` | backup URL |
| `backup.apiKey` | `<YOUR_KEY_HERE>` — app mein daalo, **yahan nahi** |
| `backup.auto` | `true` |
| `backup.interval` | minute mein (default 60) |

Haalat check karne ka command:

```bash
jq '{endpoint: .backup.endpoint, auto: .backup.auto,
     last: .backup.last, lastFileBackup}' file.json
```

`endpoint` khaali aur `lastFileBackup: 0` ho to **sirf manual backup chal raha hai** — crash hone pe data bachane ka koi intezaam nahi.

## Niyam

- Hafte mein kam se kam ek manual export, jab tak auto wire na ho
- Bada kaam (bulk delete, schema change, restore) karne se **pehle** export
- `backups/` mein 5 se zyada purani file na rakho — confusion badhta hai. Purani `Archive/` mein daal do
- Secret kabhi is folder ki kisi file mein nahi
