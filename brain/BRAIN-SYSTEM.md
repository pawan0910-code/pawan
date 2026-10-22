# BRAIN SYSTEM

Status: Confirmed | Last verified: 2026-10-21 | Owner: Pawan

Har project ke brain ka standard. Naya project shuru karo to yahi dhancha utaro.

## 1. Status label — 6

| Label | Matlab |
|---|---|
| `Confirmed` | Pawan ne approve kiya |
| `Verified` | check kiya, proof hai |
| `Reported` | bataya gaya, test nahi hua |
| `Assumed` | maan ke chale, confirm hona baaki |
| `Pending` | decide nahi hua — **guess mat karo** |
| `Future` | aage ka plan, aaj nahi |

Bina label ki baat `Pending` maano.

**`Confirmed` sirf do soorat mein:** Pawan ne approve kiya, ya proof check kiya.
Waqt guzarne se kuch Confirmed nahi hota. Proof na ho to `Assumed` likho aur
open items mein rakho.

## 2. Header block — har doc ke top pe

```
Status: … | Last verified: YYYY-MM-DD | Owner: …
```

Created date se kaam nahi chalta. Jo doc mahine se verify nahi hua, shaq se dekho.

## 3. Core files — har brain mein, wahi naam

| File | Kaam | Kahan |
|---|---|---|
| `README.md` | 30-second orientation | `brain/<project>/` |
| `PROJECT.md` | kya, kyun, scope, open items | `brain/<project>/` |
| `AGENTS.md` | AI rules + kabhi nahi karna | `brain/<project>/` |
| `DECISIONS.md` | faisle — date, sawaal, faisla, kisne | `brain/` — sab project ka ek |
| `CHANGELOG.md` | kab kya badla | `brain/` — sab project ka ek |

Naam same hone se file seedha kholi jaati hai, dhoondhi nahi jaati.

### Saara brain repo mein hai

Drive connector **file ka content badal hi nahi sakta** — na line, na poori file.
Isliye 22 Oct 2026 ko saare brain docs repo mein shift kar diye. Ab ek line
badalna normal kaam hai: na trash, na naya file ID, na history ka nuksaan.

Drive mein sirf wo rehta hai jo badalta nahi, bas jama hota hai — assets (photo,
video, logo), backup JSON, research aur output.

Ek apwaad: Baroda Fresh ke teen master docs (`PROJECT.md` 27 KB, `AGENTS.md`
21 KB, `BRAND.md` 12 KB) Drive mein hi hain. Wo Pawan ke likhe aur bade hain;
copy karne se do ghar ban jaate. Link `brain/baroda-fresh/README.md` mein hai.

Ek file ka ek hi ghar — copy kahin nahi.

## 4. Add-on files, project ke type pe

| Type | Extra |
|---|---|
| App / data | `DATA-SCHEMA.md` · `BACKUP.md` · `ISSUES.md` |
| Customer-facing | `BRAND.md` |
| Social media | `CONTENT-PLAN.md` · `POSTING-SOP.md` |
| Business master | `PARTIES.md` · `PRODUCTS.md` |

## 5. Folder structure — har project

```
<Project>/
├── brain/      context aur rules
├── research/   competitor, market, trend
├── assets/     logo, photo, video
├── docs/       strategy, plan, SOP
└── output/     final deliverable
```

## 6. Trigger — khud chalte hain, poochhna nahi

| Kab | Kya |
|---|---|
| Koi faisla hua | `DECISIONS.md` mein turant entry |
| Kaam khatam | `CHANGELOG.md` mein ek line |
| Pending resolve hua | label badlo — proof ho to `Confirmed`, warna `Assumed` |
| Koi doc badla | us doc ki `Last verified` aaj ki karo |

Faisla Pawan ka tha ya Claude ka — `DECISIONS.md` mein saaf likho.
Claude ka andaaza kabhi `Confirmed` nahi.

## 7. Open items table — har doc ke neeche

```
| # | Item | Kaun | Blocker? |
|---|------|------|----------|
```

`Blocker? = haan` matlab iske bina aage ka kaam shuru nahi karna.

## 8. Ek fact, ek ghar

Ek baat ek hi file mein. Dusri jagah zarurat ho to link karo, copy mat karo.
Copy ki hui baat purani ho jaati hai, phir pata nahi chalta kaunsi sach hai.

## 9. Secrets

Koi API key, password, PIN ya token kisi brain file mein nahi.
Placeholder: `<YOUR_KEY_HERE>`

## 10. Naya project shuru karna

1. `work/` mein folder banao, andar 5 sub-folder
2. Core files `brain/` mein — Drive wali 3, repo wali 2 (project column se)
3. Type ke hisaab se add-on files
4. Jo pata nahi wo `Pending` chhodo — bharne ki jaldi mat karo
5. `CHANGELOG.md` mein ek line

## Open items

| # | Item | Kaun | Blocker? |
|---|---|---|---|
| 1 | Pending → Confirmed ka niyam Pawan confirm kare | Pawan | nahi |
| 2 | ~~15 docs mein header block~~ — ho gaya | Claude | — |
| 3 | ~~`work/_template/` folder~~ — ho gaya | Claude | — |
| 4 | `work/_template/` ab purana ho gaya — repo ke hisaab se likhna hai | Claude | nahi |
