# Per-project MCP / connector setup

Har project ke liye ek folder. Folder ke andar ki `.mcp.json` aur `.claude/`
us project ke **root** mein copy karo — bas.

```
shopify-store/     Shopify website
youtube-content/    YouTube / Instagram content
webapp-dev/         coding, own account wala kaam
```

Naya project chahiye? Kisi folder ki copy bana lo aur list chhant do.

---

## Do level hote hain — confuse mat hona

| Level | Kahan set hota hai | Kya control karta hai |
|---|---|---|
| **Project** | `<project>/.mcp.json` + `<project>/.claude/settings.json` | plugins, aur apne http MCP server |
| **Account** | https://claude.ai/customize/connectors | claude.ai cloud connectors (Shopify, Supabase, vidIQ, Apify, Drive, Docs) |

Account connectors ko per-project pick nahi kar sakte. Project settings mein
`"disableClaudeAiConnectors": true` lagao to us project mein **saare** cloud
connector band ho jaate hain — all-or-nothing. Isliye normal tareeqa:
account pe sirf apne 5-6 connector rakho, aur **plugins** ko per-project karo.
Plugins hi asli bloat hain.

---

## Abhi tumhare account pe kya hai

### Chal rahe hain
Shopify · Supabase · vidIQ · Apify · Google Drive · Claude Docs · GitHub

### Sign-in chahiye
- **Datadog** — authorize karo ya off. Abhi bekaar latka hai.
- **BigQuery** — same.

Dono paid/enterprise hain. Zarurat nahi to **off kar do**.

### Jo connect nahi hain — free hain, kaam aa sakte hain

| Connector | Kis project mein | Free? |
|---|---|---|
| Notion | teeno — notes, calendar, catalog plan | haan, free plan |
| Slack | team ho to | haan, free plan |
| Linear | webapp-dev — issue tracking | haan, free plan |
| Figma | webapp-dev, shopify-store — design | haan, free plan |
| Gmail | order mail, outreach | haan |
| Google Calendar | content schedule | haan |
| Canva | youtube-content — thumbnail | haan, free tier |

Inhe jodne ka tareeqa: https://claude.ai/customize/connectors → Add

### Paid — main recommend nahi kar raha

Ahrefs, SimilarWeb, HubSpot, Klaviyo, Salesforce, Gong, Apollo, Lusha,
Crunchbase, Outreach, Close, Monday, Clay, ZoomInfo, Fireflies, Otter,
Amplitude, Supermetrics, Datadog, Snowflake, Databricks, PagerDuty,
Microsoft 365, Atlassian, Asana, Intercom.

Sab subscription maangte hain. Agar pehle se koi subscription hai to khud jod
lena — URL har plugin ke `.mcp.json` mein hai (`~/.claude/plugins/synced/.../<plugin>/.mcp.json`).

---

## Plugin IDs

`enabledPlugins` mein ye exact naam chahiye (marketplace: `knowledge-work-plugins`):

```
design@knowledge-work-plugins
engineering@knowledge-work-plugins
finance@knowledge-work-plugins
marketing@knowledge-work-plugins
sales@knowledge-work-plugins
```

Ek baar `/plugin` chala ke verify kar lena. Naam galat hua to Claude Code
chup-chaap ignore kar deta hai, error nahi deta.

---

## Global settings bhi theek karo

`~/.claude/settings.json` mein sab plugin band kar do, phir har project apna
`true` karega:

```json
{
  "enabledPlugins": {
    "design@knowledge-work-plugins": false,
    "engineering@knowledge-work-plugins": false,
    "finance@knowledge-work-plugins": false,
    "marketing@knowledge-work-plugins": false,
    "sales@knowledge-work-plugins": false
  }
}
```

Project settings user settings ko override karte hain, isliye ye safe hai.

---

## Agar server connect na ho

Is cloud session mein `sales`, `marketing`, `design` ke zyada tar server
`403 Forbidden` de rahe the. Wo server kharaab nahi hain — is container ka
network policy unhe block kar raha hai. Apne laptop pe ye theek chalenge.
