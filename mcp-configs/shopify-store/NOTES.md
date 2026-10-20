# shopify-store

## Is folder mein kya hai

- `.mcp.json` — is project ke apne MCP server (Notion, Slack)
- `.claude/settings.json` — sirf `marketing` + `design` plugin on, baaki off

Dono files project ke **root** mein copy karo (`.claude/` folder ke saath).

## claude.ai connectors — is project ke liye ON rakho

Ye account-level hain, inko `.mcp.json` mein nahi daal sakte.
https://claude.ai/customize/connectors

| Connector | Kyun |
|---|---|
| Shopify | product, order, collection, discount, analytics |
| Apify | competitor price scraping, product data |
| Google Drive | product sheets, images |
| Claude Docs | plan aur report likhne ke liye |

**OFF rakho:** Supabase, vidIQ, GitHub

## Agar poora alag-thalag chahiye

`.claude/settings.json` mein ye add karo — phir is project mein claude.ai ka
**koi bhi** cloud connector load nahi hoga, sirf `.mcp.json` wale chalenge:

```json
"disableClaudeAiConnectors": true
```

Dhyan rakho: ye all-or-nothing hai. Shopify bhi band ho jayega, kyunki wo
account connector hai. Isliye normally ise **mat** lagao — Tareeqa A hi theek hai.
