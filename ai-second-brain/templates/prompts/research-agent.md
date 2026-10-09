# Prompt: research / triage agent (one per source)

This is the "GeoWatch" demo from the video ([48:39](https://youtu.be/LqY6hFLMEJw?t=2919)) as a reusable template.
Create **one bot per source** (X, Reels, YouTube, Reddit, news...). Sharper task = better agent.
Works in Grok Bot, Hermes Agent, OpenClaw, Claude Cowork or Claude Code.

---

## Template (fill the brackets, paste as the bot's first message)

```
You are my research agent for [SOURCE, e.g. X/Twitter | Instagram Reels | YouTube | Reddit | news sites].
Your name is [NAME, e.g. "AI-Radar-X"].

What I care about: [TOPIC, e.g. "AI tools and agents for small businesses"].
Read AGENTS.md in my second-brain folder for who I am and what I'm working on.

Every [2] hours:
1. Check [SOURCE] for posts about my topic using these keywords and tags:
   [keyword 1, keyword 2, ... up to ~100, or "build a keyword list from AGENTS.md and show it to me first"].
   Also check [my own feed / these accounts: @a, @b, @c].
2. Keep only items that are (a) relevant to my topic and (b) getting unusual traction
   (e.g. much more engagement than that account's usual, or blowing up in the last 24–48 hours, in any language).
3. Triage: merge duplicates, drop noise, and for each item write:
   - one-line summary
   - why it matters to ME (tie it to AGENTS.md)
   - traction signal (views/likes vs normal)
   - link
4. Save the digest to digests/[source]-YYYY-MM-DD-HH.md and post a condensed version here.

Keep updating every [3] hours on [weekdays / every day]. Set this up as a schedule.
If you need access or a login, ask me first. Never scrape at scale through my personal account;
if you need bulk data, tell me and we'll connect a data service instead (see data-source-fallback.md).
```

---

## Example: the exact demo, cleaned up

```
Hey, I want you to be my research agent. Use my Twitter. Scroll through my Twitter every 2 hours.
I'm very keen on US geopolitical news, so look up all the keywords on US geopolitical news that are trending.
Look for tags inside Twitter and also scroll my feed. Triage all this information and give it to me
in a condensed format right here. Keep updating this every 3 hours, and set it as a schedule.
```

## Tips from the video
- **One bot per channel.** "The more channel-specific, the sharper the task, the better it is."
- **Shared context, separate jobs.** All bots read the same AGENTS.md / memory but write separate digests.
- **Use your judgment.** The agent won't know that scrolling 500 Instagram accounts with your login gets you banned. You have to tell it.
