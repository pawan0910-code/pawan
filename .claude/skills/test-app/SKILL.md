---
name: test-app
description: Playwright MCP se app ya storefront ko browser mein khol ke test karna — flow chalao, numbers verify karo, bugs ki list do. Use karo jab Pawan bole "test karo", "check karo chal raha hai", "/test-app", ya Accounts app / Baroda Fresh store mein koi feature bana ya badla ho.
---

# Test App — Playwright se browser test

Status: Confirmed | Last verified: 2026-10-23 | Owner: Pawan

Main browser khol ke app ko waise chalata hoon jaise Pawan phone pe chalata hai,
aur batata hoon kya chala, kya toota.

## Pehle check — Playwright hai?

`/mcp` mein `playwright` connected na ho to rukk jao aur Pawan ko batao:
project root mein `mcp-configs/<project>/.mcp.json` copy karni hai, phir Claude
Code restart. Khud install nahi karna.

## ⛔ Accounts — asli data ko haath nahi

Accounts ka data browser **localStorage** mein hai, aur ek baar save-fail ho
chuka hai (20 Oct). Isliye:

- Test sirf **local file** (`file:///...`) ya local server pe. **Live Netlify
  wali app pe kabhi test entry nahi.**
- Playwright ka apna alag browser profile hota hai — Pawan ka asli data usme nahi
  hota. Usme koi asli backup JSON **import mat karo**.
- Test data ke naam `TEST-` se shuru karo (jaise `TEST-Ramesh`), taaki pehchaan ho.
- `bal` / `stock` / `billSeq` ke niyam Accounts brain ke `AGENTS.md` mein hain —
  numbers unke hisaab se hi verify karo.

## Baroda Fresh — sirf dekhna, kharidna nahi

- Store pe browse, cart, layout check theek hai. **Checkout poora mat karo**,
  koi asli order nahi banna chahiye.
- `README.md` ke hisaab se store "build complete, testing pending" hai — test
  ke baad bhi usko "live" ya "tested" tab tak mat likho jab tak Pawan na bole.

## Test kaise karna — 4 step

1. **Scope** — is session mein kya bana/badla? Sirf wahi flow + uske aas-paas
   ka test karo, poori app nahi (tokens bachao).
2. **Chalao** — pehle mobile size (390×844, Pawan phone pe use karta hai),
   phir desktop. Har step ke baad page snapshot dekho.
3. **Verify** — Accounts mein: entry ke baad party ka balance, stock aur bill
   number sahi badla? Haath se hisaab lagao aur app ke number se milao.
   Store mein: price, quantity, delivery charge `AGENTS.md` ke niyam se match?
   Browser console ke errors bhi dekho.
4. **Report** — chhota sa:

| | Kya |
|---|---|
| ✅ | jo chala |
| ❌ | jo toota — steps, expected vs actual |
| ⚠️ | shak wali baat, pakka nahi |

Fix **khud mat karo** — report do, Pawan bole tab fix.

## Kaam ke baad

- Mila bug Accounts ka ho to `ISSUES.md` mein jodne ka suggest karo.
- `CHANGELOG.md` mein ek line: kya test hua, kya mila.
