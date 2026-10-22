---
name: drive-brain-docs
description: Google Drive ke brain docs padhna, banana ya badalna. Use karo jab Drive mein koi .md file edit karni ho, nayi doc banani ho, ya kisi project ke brain mein kuch add karna ho. Drive connector maujooda file ka content badal nahi sakta — ye skill batati hai kis file ko kaise handle karna hai.
---

# Drive Brain Docs

Drive connector ki ek badi limitation hai jo har baar bhool jaati hai. Ye skill
wahi batati hai, aur uske aas-paas kaam karne ka tareeqa.

## Sabse pehli baat — ye limitation yaad rakho

**Drive connector maujooda file ka content badal nahi sakta.**

| Tool | Kya karta hai |
|---|---|
| `create_file` | **nayi** file banata hai |
| `update_file` | sirf metadata — naam, folder, starred, description. **content nahi** |
| `download_file_content` | padhta hai (base64 mein) |
| `trash_file` | trash mein daalta hai |

Content likhne ka koi tool nahi hai jo already bani file pe chale. Koi append,
patch ya revision-upload **nahi hai** — dhoondhne mein waqt mat barbaad karo.

## Isliye file ko teen category mein baanto

| Category | Kahan rakhni | Badalne ka tareeqa |
|---|---|---|
| Roz badalti (`DECISIONS.md`, `CHANGELOG.md`) | **repo** `brain/` | seedha edit — Drive mein rakhna hi galti hai |
| Drive ki koi bhi doc | Drive | **badal hi nahi sakte** — na line, na poori file |

## ⛔ Drive doc badalna — ab bilkul nahi

**Pawan ka rule (21 Oct 2026): koi file trash nahi karni, aur poori file recreate
nahi karni. Sirf jo line badalni ho wahi badlo.**

Drive mein line badalne ka koi tool nahi hai. Dono baatein mila ke matlab:
**Drive ki doc ab read-only hai.** Usme kuch badalna ho to do hi raaste:

1. Pawan khud editor mein badle
2. Claude batata hai ki kya likhna hai, Pawan likhta hai

22 Oct 2026 se **saare brain docs Drive mein hain** (Pawan ka faisla). Matlab
`DECISIONS.md`, `CHANGELOG.md`, khaali tables, issue status — inme Claude kuch
nahi likh sakta. Kaam ke baad **batana zaroori hai** ki kaunsi file mein kya
line jodni hai. Chup-chaap chhodna nahi.

Teesra raasta nahi hai. Recreate-aur-trash **band hai**, chahe file chhoti ho
aur chahe maine hi likhi ho.

## Lambi file mein ek chhota change

Pawan ki likhi lambi doc mein ek shabd theek karna ho to **recreate ka suggest
hi nahi karna.** Us doc mein pricing formula, policy, timing, checklist hote hain.
Retype karte waqt ek digit chup-chaap badal jaaye to pata nahi chalega — purani
file trash mein, compare karne ko kuch nahi.

Aisa case aaye to Pawan ko bolo ki wo khud editor mein 1-line edit kar le. File ID
aur revision history bachi rahegi.

**Base64 ko chunks mein likh ke byte-exact copy karne ki koshish mat karo** — ye
try ho chuka hai aur fail hua. Har chunk ke end pe base64 ka padding (`=`) aa
jaata hai, jo string terminate kar deta hai; chunks jodne se invalid base64 banta hai.

## Nayi doc banane ka tareeqa

```
create_file(
  title: "NAAM.md",
  parentId: "<brain folder id>",
  contentMimeType: "text/markdown",
  disableConversionToGoogleType: true,     <-- ye zaroori hai
  textContent: "..."
)
```

`disableConversionToGoogleType: true` **chhoda to file Google Doc ban jaayegi**,
`.md` nahi rahegi. Har baar lagao.

## Padhne ka tareeqa

`read_file_content` **markdown support nahi karta** — uski list mein `text/markdown`
nahi hai. `.md` ke liye `download_file_content` use karo, jo base64 deta hai.

JSON ya bada markdown samajhna ho to base64 ko bash mein decode karo aur `jq` /
`grep` se sirf wahi nikalo jo chahiye — poora content context mein mat kheencho.

## Search index 1-2 minute peeche chalta hai

`search_files` abhi-abhi bani ya move hui file turant nahi dikhati. Verify karne
ke liye `get_file_metadata` use karo — wo direct fetch hai, index se nahi aata.

Isse ghabrao nahi aur dobara move/create mat karo — pehle metadata se confirm karo.

## Hard rules

- `update_file` se content badalne ki koshish kabhi nahi — field hi nahi hai
- `disableConversionToGoogleType: true` har markdown create mein
- Pawan ki lambi doc recreate nahi — usko khud edit karne do
- **Koi file trash nahi karni.** Ye Pawan ka saaf rule hai
- Trash mein padi file ko haath nahi lagana
- Move ya create ke baad verify `get_file_metadata` se, `search_files` se nahi
- Roz badalne wali file Drive mein kabhi na banao — wo repo mein jaati hai
