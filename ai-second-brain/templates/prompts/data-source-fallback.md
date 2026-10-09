# Prompt: connect a social data service with a backup

From the video ([53:26](https://youtu.be/LqY6hFLMEJw?t=3206)). When an agent needs data from **hundreds of accounts**
(Instagram, TikTok, YouTube...), don't let it log in as you. Plug in a scraping/data API instead,
with a primary and a backup, and stay inside the free tiers.

---

```
I'm building a triage system that scans [NUMBER, e.g. 300] [Instagram accounts / TikTok accounts / YouTube channels]
every day for [WHAT, e.g. new reels about AI tools that are outperforming the account's average].
I can't use my personal account for this. It will get banned.

Integrate a data service for this:
- Option 1: Apify  (docs: https://docs.apify.com)
- Option 2: Supadata (docs: https://supadata.ai)
Read both docs and tell me which one fits this job better and why (coverage, search vs URL-only, price per 1,000 items).

Then:
1. Set up the better one as the PRIMARY data layer and the other as the BACKUP if the primary fails or hits limits.
2. Stay within both free tiers. Track usage, warn me at 80% of each limit, and never go over without asking.
3. Store results in [digests/ | a sheet | a database] in this format: account, post link, date, views, likes, comments, caption, transcript (if available).
4. Run it on a schedule: [every day at 7am].
5. Show me a sample of 10 results before turning on the schedule.

My API keys: I'll add them to your secure settings / environment. Don't echo them back in chat.
```

---

## Notes
- In the video, Apify could *discover* reels at about **$2.60 per 1,000**. Supadata was cheaper but needed the reel URL (no search). Check current prices.
- Apify has a free monthly credit. Set a spending cap in its billing settings.
- "These days I don't even give URLs. The agents are smart enough to figure it out." Giving docs URLs still helps reliability.
