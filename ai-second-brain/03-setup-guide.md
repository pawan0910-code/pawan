# Full setup guide: build Vaibhav's system yourself

This guide rebuilds the system from the video in 10 parts. Do them in order; each part works on its own.
Ready-made files are in [`templates/`](templates/).

> Product names, prices and menus change fast. Everything here was checked in October 2026.
> If a menu looks different, give your agent the product's docs URL and ask it to do the step. That's how Vaibhav works too.

---

## Part 0: Choose your path

| | **Path A: Easiest (paid, no code)** | **Path B: Free / open source** | **Path C: Power user** |
|---|---|---|---|
| Agent system | Grok Bot (xAI) or Claude Cowork | Hermes Agent (desktop app) or OpenClaw | Claude Code or Codex, plus Hermes for always-on bots |
| Memory | Files in a folder / Google Drive | Folder + Cognee (later) | GitHub repo + Cognee via MCP |
| Social data | Apify free tier | Apify + Supadata free tiers (primary + backup) | Apify/Supadata + Metricool API + vidIQ MCP |
| Results data | Google Sheet you fill weekly | YouTube / Meta / X APIs | Metricool API, ad accounts, database |
| Monthly cost | ~$30–300 (plan dependent) | $0 + AI model usage | $50–300+ |
| Skill needed | Typing instructions | Install apps, copy API keys | Comfortable with a terminal and git |

**Not sure?** Start with Path B on a laptop that stays on. Vaibhav runs his agents on a dedicated computer at home.

---

## Part 1: Create the second-brain folder (everyone)

Create one folder, ideally a **private GitHub repo**, so it's versioned and your team can read the shared parts:

```
second-brain/
├── AGENTS.md              ← master instructions every agent reads first (template provided)
├── CLAUDE.md              ← one line: @AGENTS.md (so Claude Code reads the same file)
├── inbox/                 ← raw drops: links, voice-note transcripts, screenshots
│   └── youtube-links.txt
├── cards/
│   └── youtube/           ← JSON value cards (one per video)
├── meetings/              ← meeting / standup transcripts  (team-shareable)
├── chats/                 ← exported AI chats              (PRIVATE, see Part 9)
├── digests/               ← daily outputs from triage agents
├── playbook/
│   ├── dna-playbook.csv   ← every past piece of work + results + why it worked
│   └── ideas-log.csv      ← every idea scored, picked or rejected
└── skills/                ← your SOPs as SKILL.md files
```

Quick create (Mac/Linux terminal):

```bash
mkdir -p second-brain/{inbox,cards/youtube,meetings,chats,digests,playbook,skills}
cd second-brain && git init
echo "@AGENTS.md" > CLAUDE.md
touch inbox/youtube-links.txt
```

Then copy in the templates:

| Copy this | To |
|---|---|
| [`templates/AGENTS.md`](templates/AGENTS.md) | `second-brain/AGENTS.md` (fill in the blanks!) |
| [`templates/dna-playbook.csv`](templates/dna-playbook.csv) | `second-brain/playbook/dna-playbook.csv` |
| [`templates/ideas-log.csv`](templates/ideas-log.csv) | `second-brain/playbook/ideas-log.csv` |
| [`templates/skills/*`](templates/skills/) | `second-brain/skills/` |

Add `chats/` to `.gitignore` if the repo is shared with anyone:

```bash
echo "chats/" >> .gitignore
```

---

## Part 2: Install an agent harness

The agent harness is the app that combines the brain, memory, tools and skills. Pick one to start; you can add others later.

### Option A: Grok Bot (easiest, paid)
1. Get a plan that includes Grok Bot (SuperGrok tiers or certain Cursor plans while it's in beta; check [x.ai/news/introducing-grok-bot](https://x.ai/news/introducing-grok-bot)).
2. Open Grok Bot (desktop or iOS) and create a new bot for each job (see Part 5).
3. It already has X/Twitter access. For other apps it asks you to sign in on its computer.
4. ⚠️ Some reviewers say all your bots share one cloud computer, including logins. Don't sign it into anything you wouldn't let every bot see.

### Option B: Hermes Agent (free, open source)
1. Download the desktop installer from [hermes-agent.nousresearch.com](https://hermes-agent.nousresearch.com/docs/user-guide/desktop) (macOS/Windows), or on Mac/Linux run:
   ```bash
   curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash -s -- --include-desktop
   ```
2. Connect a model: paste an API key (Anthropic, OpenAI, OpenRouter...) or use a local model via Ollama.
3. In the app, create **bots** (e.g. "Inbox", "Social data", "AI news"). Each is a chat with its own job.
4. Point it at your `second-brain/` folder and tell it: *"Read AGENTS.md before every task."*

### Option C: Claude Code or Codex (power user)
1. Install one:
   ```bash
   # Claude Code
   curl -fsSL https://claude.ai/install.sh | bash
   # or Codex
   npm install -g @openai/codex
   ```
2. `cd second-brain` and run `claude` (or `codex`). Claude Code reads `CLAUDE.md` (which imports `AGENTS.md`). Codex reads `AGENTS.md`.
3. Put skills where your tool looks for them. For Claude Code: `.claude/skills/<skill-name>/SKILL.md` in the project (or `~/.claude/skills/` for all projects). Codex and Hermes also support `SKILL.md` skills; check each tool's docs for its folder.
4. For a non-technical, desktop version of the same idea, use **Claude Cowork** (Claude desktop app) and give it access to the `second-brain` folder.

---

## Part 3: Feed the second brain (the 4 inputs)

### 3.1 YouTube → JSON value cards
Goal: every work-relevant video you watch becomes a short card with its key takeaways.

1. **Collect the links.** Easiest to most automatic:
   - Paste links into `inbox/youtube-links.txt`, or save videos to a YouTube playlist called "Second Brain". Curating this yourself is a judgment step.
   - Weekly **Google Takeout** export of your YouTube watch history ([takeout.google.com](https://takeout.google.com) → YouTube → history → JSON).
   - Fully automatic, like Vaibhav: an agent with a browser (Grok Bot / Hermes) opens youtube.com/feed/history daily.
2. **Get transcripts through a service.** YouTube often blocks transcript downloads from servers and cloud machines.
   - **Supadata** ([supadata.ai](https://supadata.ai/)): transcript API with a free tier.
   - **Apify** actor `starvibe/youtube-video-transcript` (about $0.005 per video; this guide's transcript was fetched with it).
3. **Make the cards.** Install the skill [`templates/skills/youtube-value-cards/SKILL.md`](templates/skills/youtube-value-cards/SKILL.md). It filters to your topics, ignores entertainment, and writes one JSON card per video into `cards/youtube/`, like [`templates/value-card.example.json`](templates/value-card.example.json).
4. **Schedule it daily** (see Part 10).

### 3.2 Slack / WhatsApp / email triage
- **Slack:** connect Slack through your harness's connector or MCP (Claude and Hermes both support it). Daily prompt: *"Summarise what I discussed and shared in Slack today, by person and topic. Save to digests/slack-YYYY-MM-DD.md."*
- **WhatsApp / email:** Hermes and OpenClaw can connect to messaging apps, and Grok Bot can sign in. Use the same prompt pattern.

### 3.3 Meetings and standups
1. Record and transcribe with **Granola**, **Fireflies**, Otter or Zoom's built-in transcripts. Use **Wispr Flow** for voice notes.
2. Save each transcript to `meetings/YYYY-MM-DD-<topic>.md`. Many of these tools can auto-export to Drive, Notion or Slack, and an agent can move them into the repo.
3. Optional, like Vaibhav: start a 15-minute daily standup where you speak your opinions on the topics you work on. It's the cheapest way to capture *your perspective*.

### 3.4 AI chat exports + voice brainstorms
- **ChatGPT:** Settings → Data controls → Export data (zip by email)
- **Claude:** Settings → Privacy → Export data
- **Gemini:** via Google Takeout
- Most apps only offer manual export, so do it **weekly**. Unzip into `chats/` and ask your agent to turn it into dated summary notes.
- Use voice mode during walks or gym sessions as a brainstorming partner. Those transcripts are gold.
- ⚠️ This is your most sensitive data. Keep it private and local (Part 9).

---

## Part 4: Add graph memory (Cognee) when the folder gets big

Plain folders work fine for the first few weeks. Once you have hundreds of cards and transcripts, agents hit **context rot**: too much text, and the important bits get lost. That's when Vaibhav's **Cognee** comes in.

1. Cognee is open source: [github.com/topoteretes/cognee](https://github.com/topoteretes/cognee) (Python package `cognee`). It turns your files into a knowledge graph and retrieves only what a task needs.
2. It ships an **MCP server** (`cognee-mcp`) so Claude Code, Hermes and others can query it as a tool.
3. The easiest install is to ask your agent:
   > "Read the README at github.com/topoteretes/cognee and its cognee-mcp folder. Install Cognee locally, connect it to yourself as an MCP tool, and load everything in cards/, meetings/, digests/ and chats/ into it. Re-load new files every night. Then show me 3 example queries."
4. Update `AGENTS.md`: *"For any question about my past thinking, query Cognee first."*

---

## Part 5: Topic / signal triage agents (one per source)

Vaibhav's rule is **one agent per smallest, sharpest task**, all writing to one inbox.

1. List your sources (from the [02 worksheet](02-apply-to-your-work.md#step-2-map-your-context-sources-your-future-second-brain)): X, Reels/TikTok, YouTube, Reddit, news, Product Hunt, research papers, communities...
2. For each source, create a bot using [`templates/prompts/research-agent.md`](templates/prompts/research-agent.md). It's the video's "GeoWatch" demo prompt turned into a fill-in template.
3. **Don't scrape with your personal account.** For Instagram, TikTok and other accounts at scale, use a scraping service with a backup: [`templates/prompts/data-source-fallback.md`](templates/prompts/data-source-fallback.md) (Apify primary + Supadata backup, staying in free tiers).
4. All agents write to `digests/` in the same format so the scorer (Part 6) can read them.

---

## Part 6: DNA playbook + viral score (100 ideas → 1)

1. **Fill the DNA playbook.** Open [`templates/dna-playbook.csv`](templates/dna-playbook.csv) in Google Sheets. Add your last 30–100 pieces of work with their metrics. Write the `why_it_worked` column yourself; this human tagging is what makes it yours.
2. **Install the scorer skill**: [`templates/skills/topic-scorer/SKILL.md`](templates/skills/topic-scorer/SKILL.md). For each idea it checks:
   - Evidence layer 1: has something similar worked *for me*? (dna-playbook)
   - Evidence layer 2: has something similar worked *for others*? (digests, vidIQ/Apify data)
   - Source weight: a viral reel counts for more than a news headline.
   - Output: a score of 1–100 with reasons.
3. **Run in parallel.** In Claude Code / Codex, ask: *"Use one sub-agent per idea in digests/today to score it with the topic-scorer skill, then give me the top 10."* In Hermes or Grok Bot, ask a bot to fan out the work.
4. **Expand and narrow:** top 10 → 10 angles each → re-score → **you pick from ~5 topics × 2–3 angles.**
5. **Log everything,** including the rejected ideas, in `ideas-log.csv`. Later, check how others did with ideas you rejected. That's Raj's "reinforcement learning for your judgment."
6. **Packaging** (titles, thumbnails, subject lines, ad hooks) follows the same steps. For YouTube, connect **vidIQ MCP** ([vidiq.com/mcp](https://vidiq.com/mcp/)) so the agent can see which packaging works in your niche. Then A/B test the top options, for example with small ad spends, before deciding.

---

## Part 7: Analytics agent (what actually worked)

**Paid shortcut, like Vaibhav: Metricool**
1. Connect all your social accounts in [Metricool](https://metricool.com/). API access is on the **Advanced** plan (roughly $53–67/month for 15 brands in 2026; he quoted ~$100).
2. Metricool → Account settings → **API** → copy the key.
3. In Hermes (or Grok Bot / Claude), create a bot called "Social data" and use [`templates/prompts/analytics-agent.md`](templates/prompts/analytics-agent.md).

**Free route:** YouTube Data/Analytics API, Meta Graph API (create a personal app at developers.facebook.com), X API. Ask your agent to set each one up and store results in `playbook/` or a database. It's more setup, and you need somewhere to keep history.

**Business data (his BI dashboard):** connect your ad account, CRM or database, write a "business intelligence" skill that explains your business and metric definitions, then ask questions with [`templates/prompts/ask-the-data.md`](templates/prompts/ask-the-data.md). It turns your question into 10–15 hypotheses and checks each one, which is the data analyst's real job.

---

## Part 8: Skills + loop engineering (self-improving overnight)

1. **Write your first skills** from your real SOPs. Use [`templates/skills/script-writer/SKILL.md`](templates/skills/script-writer/SKILL.md) as the model: topic buckets, what works per bucket (yours ~70%, others' ~30%), structure, voice rules and examples.
2. **Test the skill** against your own best past work: give it a topic you've already nailed, then compare. Expect a score of about 5/10 at first.
3. **Run the improvement loop** with [`templates/prompts/loop-engineering.md`](templates/prompts/loop-engineering.md). It includes the anti-cheat setup Vaibhav learned the hard way:
   - The writer agent never sees your originals.
   - A **separate examiner** (ideally a different model) does the scoring, and its job is to fail the writer.
   - Comparisons are **blind** (A/B without labels), with on-topic sanity checks.
   - Every output is saved for you to spot-check in the morning.
   - The target is **9.5**, not 10, which never finishes. Add a budget cap.
4. Read 3 random outputs yourself before trusting the score.

---

## Part 9: Safety and privacy checklist

- [ ] `chats/` and finance data stay **private**: local only, git-ignored, never in a shared bot
- [ ] API keys live in the tool's secret settings or environment variables, not pasted into shared chats or committed to git
- [ ] One agent = least access. A subscription tracker gets email only, a social agent gets the Metricool key only
- [ ] Never scrape with your personal social login (ban risk). Use Apify/Supadata and respect each platform's terms
- [ ] No agent grades its own work. Use a separate examiner, ideally a different model
- [ ] Any decision that moves money, pricing or public messaging gets a **human check**
- [ ] Spend caps on every paid API (Apify, model providers)
- [ ] When a new major model ships, consider a fresh rebuild of skills and memory (keep a backup), per Boris Cherny's advice

---

## Part 10: Scheduling (make it run without you)

| Tool | How to schedule |
|---|---|
| Grok Bot | Say it in the chat: *"run this every 3 hours, set it as a schedule"* |
| Hermes Agent | Built-in scheduling. Tell the bot in plain English: *"every day at 8am, do X"* |
| Claude | Scheduled tasks in Claude Cowork, or routines for Claude Code on the web (check current docs) |
| Any computer | Cron + a headless agent run, for example: |

```bash
# crontab -e   → runs daily at 07:30
30 7 * * * cd ~/second-brain && claude -p "Run the youtube-value-cards skill on new links in inbox/youtube-links.txt, then run the daily digest." >> digests/cron.log 2>&1
# Codex equivalent: codex exec "..."
```

Headless runs need the tools they use pre-approved. See `claude --help` (`--allowedTools`) or your tool's docs.

---

## Suggested daily rhythm once it's running

| Time | What happens | You |
|---|---|---|
| Overnight | Cards and transcripts loaded into memory. Loop engineering runs on one skill | — |
| 07:30 | Triage agents → digests. Scorer → top 10 ideas with angles | — |
| 08:00 | Analytics agent → yesterday's results + what worked | 10 min: read |
| 09:00 | **You pick** 1–2 ideas/angles, add your opinion in a quick voice note or standup | 15 min: decide |
| Day | Skills draft scripts, posts, proposals → you edit | Edit, approve |
| Weekly | Export AI chats, update the DNA playbook "why it worked", review the 30% experiments | 30 min |

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Output is generic / "AI slop" | Not enough context. Add past work, the `why_it_worked` notes and your opinions to the second brain, and reference them in the skill |
| All ideas look the same | Same model, same prompt. Add a second model, different personas, or more diverse sources |
| Agent forgets things / gets confused | Context rot. Move to Cognee (Part 4) and keep each agent's task narrow |
| Instagram account got flagged | Stop logging in through agents. Switch to Apify/Supadata |
| Loop finished suspiciously fast | It cheated. Read the outputs and separate writer and examiner (Part 8) |
| Too many digests, nobody reads them | Kill agents whose output you haven't used in 2 weeks |
| "This isn't working" in week 3 | Expected. The curve bends around weeks 8–12. Keep improving the skills |
