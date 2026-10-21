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
| `README.md` | 30-second orientation | Drive |
| `PROJECT.md` | kya, kyun, scope, open items | Drive |
| `AGENTS.md` | AI rules + kabhi nahi karna | Drive |
| `DECISIONS.md` | faisle — date, sawaal, faisla, kisne | **repo** |
| `CHANGELOG.md` | kab kya badla | **repo** |

Naam same hone se file seedha kholi jaati hai, dhoondhi nahi jaati.

### Kyun do jagah

Drive connector **maujooda file mein line nahi jod sakta** — sirf nayi file bana
sakta hai. `DECISIONS.md` aur `CHANGELOG.md` mein roz line judti hai, isliye wo
repo mein. Baaki docs kam badalte hain, wo Drive mein projects ke saath.

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
| 2 | 15 maujooda docs mein header block add karna | Claude | nahi |
| 3 | `work/_template/` folder Drive mein banana | Claude | nahi |
