# Baroda Fresh — brain

Status: Confirmed | Last verified: 2026-10-21 | Owner: Pawan

Is project ka saara context. Kaam shuru karne se pehle ye folder padho.

## Project ek line mein

Baroda Fresh — Vadodara, Gujarat ki online fresh-fruit retail brand. Shopify storefront.

| | |
|---|---|
| Platform | Shopify |
| Store | `9tmz10-ne.myshopify.com` |
| Currency / country / timezone | INR / India / IST |
| Instagram | `@baroda_fresh` |
| Launch target | October 2026 (exact date pending) |

## ⚠️ Status — dhyan se padho

**Build complete hai, testing PENDING hai.**

Store ko "live", "orders le raha hai", "tested" ya "launch-ready" **mat** kaho
sirf isliye ki build complete hai. Launch `PROJECT.md` section 18 ke acceptance
checks pe depend karta hai — wo saare abhi unchecked hain.

## 🔴 Teen master docs Drive mein hain — repo mein nahi

Ye teen Pawan ke likhe hue hain aur bade hain. Inhe repo mein copy **nahi** kiya,
kyunki do jagah hone se takraav ho jaata. Drive mein hi rahenge.

| File | Size | Drive link |
|---|---|---|
| `PROJECT.md` | 27 KB | https://drive.google.com/file/d/1SkNi5FPvwmRcQci8nQ0LAgTYs8mrOgGl/view |
| `AGENTS.md` | 21 KB | https://drive.google.com/file/d/1OfwWSx308sJl-B7hGzjjH2H9MdgxmYrU/view |
| `BRAND.md` | 12 KB | https://drive.google.com/file/d/1wuc5_Wsmn2HH_RoI3Ocs9S4yMCwIGoSx/view |

Brain folder: `1mnQJtA40zzvZnt0GG5VGLNK5HiW2uOJa`

## Padhne ka order

| # | File | Kya hai |
|---|---|---|
| 1 | `PROJECT.md` (Drive) | **Master spec.** v1.0, 14 Oct 2026. 20 section — requirements, policies, delivery charges, testing checklist, open items |
| 2 | `AGENTS.md` (Drive) | Business rules, protected product references, agent workflow |
| 3 | `BRAND.md` (Drive) | Approved brand baseline — colors, fonts, tagline, logo rules |

`PROJECT.md` **pehle** padho. Wo `AGENTS.md` aur `BRAND.md` dono ko consolidate
karta hai aur jahan takraav hai wahan naya faisla likhta hai.

Faisle aur history — `../DECISIONS.md`, `../CHANGELOG.md`.

## Tools aur settings

Repo mein — `../../mcp-configs/baroda-fresh/`.

Plugins: `marketing` + `design` on, baaki off.
Account connectors ON: Shopify · Apify · Drive · Docs. OFF: Supabase · vidIQ.

## Takraav ka niyam

`PROJECT.md` ke **current explicit decisions purane statements ko supersede karte hain.**

Teen jagah ye already ho chuka hai:

- Fixed delivery slots (morning/afternoon/evening) **approved nahi hain** — Q35 ne
  ASAP policy di, jo `AGENTS.md` ki fixed-slot direction ko supersede karti hai
- Shopify **initial inventory master** hai (Q32) — automatic wholesale sync future
  intent hai, abhi kaam nahi karta
- Login site pe ghusne par nahi chahiye (Q31) — sirf checkout se pehle

`AGENTS.md` aur `BRAND.md` **source reference hain — inhe edit nahi karna.** Naya
takraav mile to `PROJECT.md` section 19 ke open register mein likho, chup-chaap
source file mat badlo.

## Status vocabulary — ye samajhna zaroori hai

`PROJECT.md` har baat pe ek label lagata hai. Label ka matlab:

| Label | Matlab |
|---|---|
| Confirmed policy | business intent approved — par implementation ka proof abhi chahiye |
| Owner-reported | Pawan ne bataya, independently test nahi hua |
| Source-reported | purani conversation mein tha, store mein fresh check nahi kiya |
| Pending implementation verification | claim karne se pehle actual config dekho aur test karo |
| Pending operational detail | business value ya process abhi decide nahi hua |
| Future scope | aage ka plan, aaj ki capability nahi |

**"Confirmed policy" ka matlab "built aur working" nahi hai.** Ye sabse badi
galti hai jo yahan ho sakti hai.

## Kaam karne se pehle

1. `PROJECT.md` section 3 dekho — current baseline kya hai
2. Section 19 ka open register dekho — kya abhi undecided hai
3. Design change karna ho to section 4 — **existing design preserve karna hai**,
   redesign ke liye owner approval chahiye
4. Koi number ya rate publish karne se pehle section 13 dekho — formula wahan hai,
   apne se rate mat banao

## Kabhi nahi karna

- Unverified claim publish karna — organic, pesticide-free, farm-direct, quality
  guarantee, lowest price
- AI generated image ko asli customer order ki photo kehna
- Logo ka "Natural & Organic" wala text public use mein lagana — wo withheld hai,
  public-safe variant approve hona baaki hai
- Fixed delivery slot customer ko dikhana
- Exact delivery time guarantee karna, jab tak us order ke liye confirm na ho
- Credentials, customer data ya access token kisi doc ya log mein likhna
- Live settings badalna ya asli order place karna sirf testing dikhane ke liye

## Khula sawaal

`PROJECT.md` section 5 dispatch origin **"Khandero Market, Rajmahal Road, Vadodara
390001"** likhta hai, aur saaf bolta hai ki *exact spelling aur map pin verified
nahi hai*.

Pawan ne 21 Oct 2026 ko confirm kiya: sahi spelling **Khanderao** hai. Drive ka
folder bhi "Khanderao Market Social Media" hai. **`PROJECT.md` section 5 mein
"Khandero" theek karna baaki hai** — wo Pawan khud karega.
