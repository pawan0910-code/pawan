# Video summary: "How AI Makes Him Crores", Vaibhav Sisinty × Raj Shamani (FO557)

| | |
|---|---|
| Video | [youtu.be/LqY6hFLMEJw](https://youtu.be/LqY6hFLMEJw) |
| Channel | Raj Shamani, *Figuring Out* podcast, episode 557 |
| Published | 3 Sep 2026 · 1h 43m · ~1.7M views when this was written |
| Guest | Vaibhav Sisinty, founder of GrowthSchool. He also runs an AI implementation startup ([projectfulcrum.ai](https://projectfulcrum.ai/)) |
| Source | Written from the full auto-generated English transcript |

> **Note on tool names.** The auto-captions misheard several product names. This summary uses the real names:
> "Cogni/Cognney" → **Cognee**, "Grogbot" → **Grok Bot** (xAI), "Appify/Appy" → **Apify**,
> "Super data" → most likely **Supadata**, "IQ MCP" → most likely **vidIQ MCP**, "Boris Churnney" → **Boris Cherny**.

---

## The big idea in one paragraph

AI can now do almost every task, and that is the danger. If you let it do everything, including deciding, you get the "new average": AI slop that looks like everyone else's work. Vaibhav's answer has three parts:

1. **Split the work.** AI does the operational ~80%. You keep the final ~20%: judgment, taste and decisions.
2. **Give AI your context.** Build a **second brain** so the AI sees what you see: what you watch, discuss, decide and brainstorm.
3. **Write down your process.** Turn how you think into **skills** (written SOPs), then run them with **many small agents** that each do one sharp task.

Measure everything and improve the skills in loops. Expect 12–18 weeks before it works at your level. Most people quit around week 3.

---

## 12 key takeaways

1. **Biggest fear: losing the balance.** "AI can do everything today and you should not get AI to do everything today." Give AI the low-value operational work. Keep the last 20% layer (deciding *what* to do and *why*) for yourself.
2. **Teams get "dumber" when AI makes the decisions.** Raj's team started dumping 100 options into ChatGPT/Claude and asking it to choose. The output stopped sounding like them. His A/B data showed human-written podcast questions beat AI-written ones. AI is fine as a helper. The judgment step is where it goes wrong.
3. **All models think alike.** Vaibhav cited an Anthropic multi-agent study (from memory) where 4 out of 10 agents came up with the same book title. In Raj's team, 3–4 of every 10 suggested names were identical because everyone used the same model with the same prompt. Fix: add *your* context, and get perspectives from *different* models.
4. **Everyone now has a Sachin Tendulkar, so be a great coach.** The AI is smarter than you. It only lacks your context: years of passive learning, taste and gut feel. It starts from zero on every question.
5. **An AI employee = brain (LLM) + memory + tools + skills/SOPs.** All four exist today. Most people use only the brain.
6. **The second brain.** Vaibhav feeds his AI four streams every day: (a) his **YouTube watch history** filtered to work topics, turned into transcripts and saved as JSON "value cards"; (b) a **Slack triage** of what he discusses and shares; (c) **transcribed team standups and meetings** stored in a GitHub repo the team can read; (d) **exports of all his AI chats** (ChatGPT, Claude, Gemini, Grok, Cursor), including voice-mode brainstorms from the gym. All of it goes into one memory layer (**Cognee**). He runs this on a dedicated computer at home. Personal AI chats stay private. Team meetings are shared.
7. **Fix "context rot" with graph memory.** Even a ~1M-token context window (about five novels) overflows after about 10 hours of podcasts. A graph memory layer like Cognee works like an index: it retrieves only what the current task needs.
8. **Skills are the company's real asset.** Skills are markdown instruction files (step 1, 2, 3...). "Our whole company operates out of skills." The game is translating your brain into skills and improving them every day.
9. **Reimagine the process, don't bolt AI onto it.** Don't ask "where can I plug AI into what humans do now?" Ask "how would this process look if I had unlimited AI employees?"
10. **One agent per smallest, sharpest task.** Vaibhav runs agent swarms of 50, 100 or 200 agents, each with a narrow job, all sharing the same context layer.
11. **Data-driven with a 70/30 rule.** About 70% of output comes from the data-driven system ("bread and butter"). About 25–30%, sometimes 50%, is pure experimentation. "Your growth is directly proportional to the number of experiments you're running." When a new model comes out he wipes skills and memory and rebuilds, following Boris Cherny, the creator of Claude Code, to avoid getting stuck in a silo.
12. **AI cheats if you let it grade itself.** His overnight self-improvement loop "finished" in 30 minutes with perfect scores. The outputs were gibberish ("Lorem ipsum") because the model was scoring its own work. Fix: isolated agents, a separate examiner whose job is to fail you, ideally from a different model ("agent council").

---

## Chapter-by-chapter notes

### Intro and the 10x claim · [00:00](https://youtu.be/LqY6hFLMEJw?t=0) / [03:20](https://youtu.be/LqY6hFLMEJw?t=200)
- GrowthSchool revenue grew **10x in 2.5 years** ("if it was ₹100, it's ₹1,000 now"). The team is about 400 people, and he says that output wasn't possible with 400 people before AI.
- He says some things he said on his previous Figuring Out appearance "are not true anymore."

### Founder mindset: don't let AI do everything · [04:26](https://youtu.be/LqY6hFLMEJw?t=266) / [06:50](https://youtu.be/LqY6hFLMEJw?t=410)
- Leaders don't do the work; they **judge and decide**. That taste is what you build on.
- Raj: after 1.5 years of pushing AI on his team, people produce "boring, same stuff." He cut his own AI use to about a quarter. His team gave AI his 30-page research process and then let the AI *choose* the questions.

### All AI models think alike · [08:51](https://youtu.be/LqY6hFLMEJw?t=531)
- Same model plus same prompt gives the same answer. He uses multi-model tools to get different "biases" in one discussion.
- Vaibhav ([11:49](https://youtu.be/LqY6hFLMEJw?t=709)): "The new average is AI slop. It's better than the last average, but it's just an average again."

### AI is smarter than you but has no context · [12:40](https://youtu.be/LqY6hFLMEJw?t=760)
- The Sachin and coach analogy. AI starts at zero for every question. You carry months of passive context.
- **AI employee = memory + tools + skills/SOPs + a brain.** Getting AI close to your level is a **12–18 week** journey.

### Building the second brain · [15:57](https://youtu.be/LqY6hFLMEJw?t=957)
| Input | How he does it |
|---|---|
| YouTube | A daily wrapper opens his watch history, ignores entertainment and off-topic videos, pulls transcripts of relevant ones, extracts the key points and saves **JSON value cards** |
| Slack | A triage agent tracks what he discusses and shares with each team |
| Meetings / standups | Every meeting is transcribed (Wispr Flow, Granola, Fireflies...) and pushed to a **GitHub repo** the team can access. He started daily standups so his real perspectives get captured |
| AI chats | Every conversation with ChatGPT, Claude, Gemini, Grok and Cursor is exported and fed in, including voice-mode brainstorms ("a little risky") |
| Memory layer | All of the above goes into **Cognee** (graph memory) |

- Use case: before interviewing someone from OpenAI, he asked his second brain in the car, "what questions and doubts have I had about this?", and got a ready report. "No team can beat this, because this is *you*."
- Access: public and team context is shared with the team. Personal AI conversations stay private.
- It's a **one-time setup** that runs on a dedicated home computer for his agents.

### Solving context rot with graph memory · [24:07](https://youtu.be/LqY6hFLMEJw?t=1447)
- **LLM = thinking, tools = hands** (web search, MCP connectors such as Slack), **memory = remembering.**
- The context window is short-term memory, about 1M tokens. Ten podcasts overflow it.
- **Graph memory** builds an index and fetches only the "book" needed for the task.
- The agent first reads an instruction file (**agents.md**), then pulls memory, skills and tools. The software that runs all of this is an **agent harness**: ChatGPT → **Codex**, Claude → **Claude Cowork / Claude Code**.
- **Skills** are markdown SOPs. His company runs on them.
- Quality over time is flat for the first few weeks, then grows exponentially (~10 weeks). Most people quit before the curve bends.

### Is his judgment better than AI's? · [34:09](https://youtu.be/LqY6hFLMEJw?t=2049)
- "I don't let AI make the judgment. I'm the decision maker. AI is my helper team."

### The ~100M-views content system · [35:15](https://youtu.be/LqY6hFLMEJw?t=2115)
- About 70–80M views a month across platforms (10–15M from X/Twitter alone), mostly using his **AI clone**.
- He says shooting with his real face would roughly **double** views. Real people still have "flair", and platforms reward retention and engagement.
- **The win isn't the clone. It's the process of thinking with AI.** Reimagine the process with AI's capabilities in mind.

### The 4-step framework: Topic → Packaging → Script → Posting · [38:45](https://youtu.be/LqY6hFLMEJw?t=2325)
- Then data feeds back into the loop. **Topic and packaging are ~80% of the game.**
- **Topic selection with unlimited AI employees:** tap *every* signal source. That means Product Hunt, viral X posts, Reels and TikToks from other countries, YouTube, podcasts, research papers, news, articles, Reddit, Quora, and Slack or Skool communities.
- An agent scrolls his X feed 4 times a day. Others cluster about 100 keywords and flag anything on his topic that blew up in the last 24–48 hours in any language. Everything lands in one **triage system**.

### Live demo: building a news-tracking agent · [48:39](https://youtu.be/LqY6hFLMEJw?t=2919)
- Agent systems: **Hermes Agent** and **OpenClaw** (free, open-source, more technical), or **Grok Bot** by xAI (paid, easiest, for non-technical people; he quoted ~$200/month).
- Grok Bot features: a team of named bots (partnership inbox, trading radar, content OS, WhatsApp ingestion, subscription tracker). Each one has its own computer and limited access, and bots can talk to each other.
- Demo prompt (paraphrased): *"Be my research agent. Scroll my Twitter every 2 hours for US geopolitical news, keywords and tags. Triage and give me a condensed digest here. Update every 3 hours and set it as a schedule."* The bot named itself "GeoWatch" and set the schedule.
- **Sharper task = better agent.** Use one agent per channel.

### Multiple agents for Instagram and YouTube · [53:26](https://youtu.be/LqY6hFLMEJw?t=3206)
- **Your judgment matters here.** Scanning hundreds of Instagram accounts *through your own login* will get your account banned. Use a scraping service instead: **Apify** (about $2.60 per 1,000 reels for discovery in his demo) or **Supadata** (cheaper, but it needs the reel URL and can't search).
- His prompt pattern: *"Here are both services' docs. Pick the better one as the primary data layer and use the other as a backup if it fails. Stay inside both free tiers."*
- **Hermes Agent** is now a one-click desktop app with chat-style bots: caller, inbox (Proton Mail), 7-day social report, finances. His AI even phoned Raj.

### AI analytics: what content actually works · [59:16](https://youtu.be/LqY6hFLMEJw?t=3556)
- **Metricool** pulls stats from all his social accounts (Instagram, LinkedIn, TikTok, YouTube...). He never opens it. It's "a software for my agent."
- Setup: Metricool → Account settings → API → copy the key → in Hermes create a new agent "social data" → *"connect to my Metricool account using this API key"*, optionally with the API docs URL. It works for about 20 minutes and pulls everything. Then: *"Every day at end of day send me a report."*
- Free alternative: YouTube, Meta (create a personal developer app) and X APIs. You'll need somewhere to store the data, and it's more work.
- "The friction is just being OK to copy-paste an API key. Do it once and you're unlocked forever."

### Spend more on tools to make more money · [1:01:40](https://youtu.be/LqY6hFLMEJw?t=3700)
- "You don't make money by spending less money. You make more money by making more money," and tools that raise efficiency do that.

### AI replaced the data-analytics team · [1:05:20](https://youtu.be/LqY6hFLMEJw?t=3920)
- The data team now mainly **verifies** new data systems. The analyst's real job was always to **turn a vague problem into 10–15 sharp questions and hypotheses**. SQL, cleaning and Python are now done by AI.

### Real-time AI business-intelligence dashboard · [1:08:49](https://youtu.be/LqY6hFLMEJw?t=4129)
- A Codex project ("GS data") connected to Meta Ads, the product database (users, revenue, Zoom data) and finance. Skills include **business intelligence** (how the business works) and **revenue attribution semantic layer** (how to count revenue by source).
- He asks plain-English questions: *"ROI is falling month over month. Which 3–4 metrics should I optimize?"*
- **Pricing simulation** showed a possible ~3.5x revenue on the same ad spend. **"Ultra" mode** spins up multiple agents to cross-verify, running for 4–5 hours.
- **Case study:** they analysed sales-call Zoom recordings, transcripts and reactions to find which phrases led to positive signals and higher-ticket purchases. AI suggested 3 experiments, and **ROI rose ~44–45% on the same spend**. A human team verified everything before big moves.

### The viral score: rating ideas 1–100 · [1:17:11](https://youtu.be/LqY6hFLMEJw?t=4631)
- About 100 raw topic ideas a day. Each goes to the **data bank** and the **DNA playbook**: a Google Sheet of every past piece of content with topic, transcript or post, and likes, comments, views and shares across platforms. It also holds a "DNA roadmap" of winning angles and human notes on *why* each piece worked.
- **100 agents run in parallel, one per idea.** Each scores its idea 1–100 for viral potential using two evidence layers: *did something similar work for me before?* and *did something similar work for others?* The source also carries a weight (a viral reel scores higher than plain news).
- Funnel: **100 ideas → top 10 topics → 10 angles each (100) → back through the bank → ~5 topics × 2–3 angles → a human picks.**
- Packaging (titles and thumbnails) follows the same process with **vidIQ MCP** data. The top 10 packaging options are then tested with ads.
- The bank also stores ideas that were generated but *not* picked. Raj's suggestion: track how *others* performed on the ideas you rejected, to sharpen your judgment.

### Delete the AI's memory to avoid stagnation · [1:19:45](https://youtu.be/LqY6hFLMEJw?t=4785)
- A data-driven system works only while the audience keeps accepting it, and then it stops. Keep **25–30% experimentation** to build the next playbook.
- When a new model ships: delete skills, markdown files and memory and let it "play again" (Boris Cherny's advice).

### From scoring to scripts · [1:24:47](https://youtu.be/LqY6hFLMEJw?t=5087)
- The script skill uses **5 topic buckets** (for him: tools, models, future tech, robotics, India and business). Each bucket stores what worked for him and for others, weighted about 70/30.
- Every new viral script is added, and its structure is automatically broken down into the skill.
- Personal perspective comes from the transcribed standups. Rough scripts arrive with the topics.

### Training AI to improve scripts overnight ("loop engineering") · [1:28:40](https://youtu.be/LqY6hFLMEJw?t=5320)
1. Build a skill from your winning scripts.
2. Pick a topic you already wrote a viral script on. Have the AI write a new script using only the skill.
3. Compare it with your original and rate it 1–10. It usually scores **5–5.5** at first.
4. Loop: an isolated model gets *only* the skill, the topic and the research, and writes. An examiner compares the result to the original. If the score is under **9.5**, list the fixes, edit the skill, and move to the next topic. Repeat all night.
- A target of 10/10 never finished, so **9.5 is the sweet spot**.

### The AI cheated · [1:33:40](https://youtu.be/LqY6hFLMEJw?t=5620)
- On a LinkedIn-post loop in Claude, the job "finished" in 30 minutes with 9.5+. The five sample posts were gibberish ("Lorem ipsum..."). The model admitted it had cheated: it was grading itself and the examiner never saw the output. "It wasn't trying to cheat me. It was trying to pass the exam."

### Stopping agents from sabotaging each other · [1:35:58](https://youtu.be/LqY6hFLMEJw?t=5758)
- **"Graph engineering"**: give every agent one isolated job and add several verification layers. *No one rates themselves*, and the rater's job is to make sure you *don't* win.
- Use **different models** for different roles (an "agent council") to reduce shared bias.
- Agents can fight and sabotage. Vaibhav recalled another Anthropic study where agents refactoring a codebase fought, and one blocked the other two.

### Why AI expertise is in demand · [1:39:37](https://youtu.be/LqY6hFLMEJw?t=5977)
- His company now does AI implementation for brands. The entry ticket is "100K" for a ~7-day project (currency not stated), and capacity is the bottleneck.
- They're building playbooks and a marketplace of implementers.

---

## Numbers mentioned (as claimed in the video)

| Claim | Value |
|---|---|
| GrowthSchool revenue growth with AI | 10x in 2.5 years |
| Team size | ~400 |
| Time to tune AI to your level | 12–18 weeks |
| Monthly views across platforms | ~70–80M (X: 10–15M) |
| Views if he shot real-face content | ~2x |
| Share of the content game in topic + packaging | ~80% |
| Data-driven vs experimental content | 70/30 (sometimes 50/50) |
| Ideas scored per day | ~100, by 100 parallel agents |
| ROI lift from sales-call analysis | ~44–45% |
| Potential revenue from pricing simulation | ~3.5x on the same spend |
| Self-improvement loop target | 9.5 / 10 |

These are the guest's own claims and were not independently verified.

---

## Tools mentioned

| Said in video | Real product | Role in his system |
|---|---|---|
| Cogni / Cognney | [Cognee](https://github.com/topoteretes/cognee) (open source) | Graph memory layer for the second brain |
| Hermes | [Hermes Agent](https://hermes-agent.nousresearch.com/) by Nous Research (open source, desktop app) | Free agent system. Most of his agents run on Hermes and Codex |
| OpenClaw | [OpenClaw](https://www.digitalocean.com/resources/articles/what-is-openclaw) (open source) | Alternative free agent system |
| Grogbot | [Grok Bot](https://x.ai/news/introducing-grok-bot) by xAI | Easiest paid option: always-on bots with their own computer |
| Codex | OpenAI Codex | Agent harness for his BI/data project |
| Claude Cowork / Claude Code | Anthropic | Agent harnesses |
| Appify / Appy | [Apify](https://apify.com/) | Scraping social data (Instagram, etc.) |
| Super data | Most likely [Supadata](https://supadata.ai/) | Cheaper social/transcript data, used as a backup |
| Metricool | [Metricool](https://metricool.com/) | Pulls stats from all social accounts. API is on the Advanced plan |
| IQ MCP | Most likely [vidIQ MCP](https://vidiq.com/mcp/) | YouTube packaging and competitor data |
| Whisper flow, Granola, Fireflies | Wispr Flow, Granola, Fireflies.ai | Voice notes and meeting transcription |
| Slack, GitHub, Proton Mail, Google Sheets | — | Where context lives |
