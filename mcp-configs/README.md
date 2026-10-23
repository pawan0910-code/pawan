# Per-project tool setup

Status: Confirmed | Last verified: 2026-10-23 | Owner: Pawan

Teen project, teen folder. Folder ke andar ki `.claude/` us project ke root mein
copy karo — bas.

```
baroda-fresh/        Baroda Fresh — Shopify storefront
khanderao-social/    Khanderao Market — social media
accounts-app/        Accounts software folder (PC pe, local)
```

## ⚠️ `.mcp.json` jaanbujh ke nahi hai

Pehle in folders mein `.mcp.json` thi, jisme `notion`, `slack`, `canva` likhe the.
**Wo galti thi** — ye server Pawan ne kabhi connect nahi kiye. Maine inhe jodne ke
liye *suggest* kiya tha aur galti se config mein likh bhi diya, jaise already use
hote hain.

Jab asli mein koi server connect ho, tab uski `.mcp.json` banegi. Jhoothi config
rakhne se bura hota hai — agli baar koi usko sach maan leta hai.

**Ab asli `.mcp.json` (23 Oct):** `accounts-app` aur `baroda-fresh` mein sirf
**Playwright** — browser testing ke liye, `test-app` skill ke saath. Khanderao mein
nahi (wahan test karne ko koi app nahi). Windows ke liye `cmd /c npx` likha hai.

Asli faayda **`enabledPlugins`** se hai: 4 fizool plugin band karne se. Wahi bloat tha.

## Plugins — kis project mein kya

| Project | Plugins on | Kyun |
|---|---|---|
| `baroda-fresh` | marketing, design | storefront copy, brand, UX |
| `khanderao-social` | marketing | content, campaign |
| `accounts-app` | engineering | app ka code — PC pe Claude Code yahan kaam karta hai |

Baaki sab `false`. Global `~/.claude/settings.json` mein bhi sab `false` rakho,
phir har project apna `true` karega.

## Account-level connectors — kis project mein kaunsa ON

Ye `.mcp.json` mein nahi aate. Account level pe hain:
https://claude.ai/customize/connectors

| Project | ON rakho | OFF rakho |
|---|---|---|
| Baroda Fresh | Shopify · Apify · Drive · Docs | Supabase · vidIQ |
| Khanderao | Drive · Docs | Shopify · Supabase · vidIQ |
| Accounts | Drive (backup ke liye) | Shopify · Supabase · vidIQ · Apify |

Account connectors **per-project pick nahi ho sakte** — `disableClaudeAiConnectors`
all-or-nothing hai. Isliye account pe sirf kaam ke connector rakho, aur plugins
per-project karo.

## Accounts ka setup alag hai — dhyaan do

Accounts ke do hisse hain:

| Hissa | Kahan | Kaun chalata hai |
|---|---|---|
| App ka source folder | **PC pe, local** — GitHub pe nahi | PC ka Claude Code |
| Live app | **Netlify** | Pawan, phone browser se |

`accounts-app/.claude/` **PC ke us software folder mein** copy karni hai, is repo
mein nahi. Us folder ka kaam: data entry fill karna aur app ka code.

App ka context, schema aur backup ke commands Drive ke brain mein hain —
`Accounts/brain/`. ID `CLAUDE.md` mein hai.

## Plugin IDs

Marketplace: `knowledge-work-plugins`

```
design@knowledge-work-plugins
engineering@knowledge-work-plugins
finance@knowledge-work-plugins
marketing@knowledge-work-plugins
sales@knowledge-work-plugins
```

`/plugin` se verify kar lena. Naam galat hua to Claude Code chup-chaap ignore
karta hai, error nahi deta.

## Agar server connect na ho

Cloud session mein `sales`, `marketing`, `design` ke zyada tar server `403
Forbidden` dete hain. Wo server kharaab nahi — is container ka network block karta
hai. Apne laptop pe theek chalenge.
