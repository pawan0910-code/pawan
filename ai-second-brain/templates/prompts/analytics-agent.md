# Prompt: social analytics agent (Metricool or free APIs)

From the video ([59:16](https://youtu.be/LqY6hFLMEJw?t=3556)). Metricool is "a software for my agent". You don't open it yourself.

## Setup (Metricool route)
1. Connect all your accounts in Metricool (Instagram, YouTube, LinkedIn, TikTok, X, Facebook...).
2. Metricool → Account settings → **API** → copy the key (Advanced plan or higher).
3. In Hermes / Grok Bot / Claude, create a new bot called **"Social data"** and paste:

```
Connect to my Metricool account using this API key: [store it in your secrets, don't paste it in shared chats].
API docs: [Metricool API docs URL]

1. Pull the last 90 days of data for every connected account: each post's date, format, caption,
   views, likes, comments, shares, saves, watch time / retention, and followers gained.
2. Append new posts to playbook/dna-playbook.csv (keep my "why_it_worked_human_note" column untouched).
   Compute each post's result vs that account's median ("result_vs_median").
3. Every day at [21:00], send me a report:
   - TL;DR in 3 lines
   - Top 3 posts (vs median) and the likely reason: topic? hook? format? timing?
   - Bottom 3 posts and the likely reason
   - 3 experiments to run next week
4. Every Sunday, send a weekly version with trends per platform and per topic bucket.
```

## Free route (no Metricool)
```
Set up data collection from the official APIs:
- YouTube Data API + YouTube Analytics API for my channel [link]
- Meta Graph API for my Instagram/Facebook (guide me through creating a personal developer app)
- X API for my account (tell me the cheapest tier that works)
Store everything in [playbook/ as CSV | a SQLite file | Google Sheet] and keep history.
Then produce the same daily and weekly reports as above.
```

## YouTube packaging data (optional)
Connect **vidIQ MCP** (https://vidiq.com/mcp/) so the agent can compare your titles and thumbnails with outliers in your niche.
