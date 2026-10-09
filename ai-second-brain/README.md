# AI Second Brain: summary, implementation plan and setup kit

Based on **[How AI Makes Him Crores: Second Brain, Automations & Systems](https://youtu.be/LqY6hFLMEJw)**, with
Vaibhav Sisinty (GrowthSchool) on Raj Shamani's *Figuring Out* (FO557, Sep 2026).

## The idea in 30 seconds

> AI is smarter than you but knows nothing about **you**. Give it your context (a **second brain**),
> write your process down as **skills**, run **many small agents** that each do one sharp job,
> score everything against **your own data**, and keep the **final decision** for yourself.
> Expect 12–18 weeks before it works at your level. Most people quit at week 3.

```
  What you consume / discuss / think                      Your judgment (20%)
  ┌──────────────────────────────┐                          ▲
  │ YouTube → value cards        │                          │ pick 1–2 of ~5 options
  │ Slack / WhatsApp triage      │   ┌──────────────┐   ┌───┴─────────────┐   ┌──────────────┐
  │ Meeting & standup transcripts├──►│ SECOND BRAIN ├──►│ Agents + skills │──►│ Output       │
  │ AI chat exports, voice notes │   │ (folder →    │   │ triage → score  │   │ (content,    │
  └──────────────────────────────┘   │  Cognee)     │   │ → angles → draft│   │  sales, ops) │
                                     └──────▲───────┘   └─────────────────┘   └──────┬───────┘
                                            │   results data (Metricool, ads, CRM)   │
                                            └────────────── DNA playbook ◄───────────┘
```

## Read in this order

| File | What's inside |
|---|---|
| [01-video-summary.md](01-video-summary.md) | 12 key takeaways, chapter notes with timestamps, numbers, tool list |
| [02-apply-to-your-work.md](02-apply-to-your-work.md) | Worksheets to apply it to *your* job, examples by role, team guardrails, 12-week roadmap |
| [03-setup-guide.md](03-setup-guide.md) | Step-by-step setup: 3 paths (easy / free / power), second brain, agents, scoring, analytics, loops, safety, scheduling |

## Templates (copy into your own second-brain folder)

| Template | Use it for |
|---|---|
| [templates/AGENTS.md](templates/AGENTS.md) | Master instructions every agent reads first |
| [templates/skills/youtube-value-cards/SKILL.md](templates/skills/youtube-value-cards/SKILL.md) | Turn watched videos into JSON value cards |
| [templates/skills/topic-scorer/SKILL.md](templates/skills/topic-scorer/SKILL.md) | Score 100 ideas from 1–100 against your past results → shortlist |
| [templates/skills/script-writer/SKILL.md](templates/skills/script-writer/SKILL.md) | Draft scripts and posts in your style, by topic bucket |
| [templates/prompts/research-agent.md](templates/prompts/research-agent.md) | One triage agent per source (the "GeoWatch" demo) |
| [templates/prompts/data-source-fallback.md](templates/prompts/data-source-fallback.md) | Apify primary + Supadata backup, inside free tiers |
| [templates/prompts/analytics-agent.md](templates/prompts/analytics-agent.md) | Daily and weekly "what worked" report (Metricool or free APIs) |
| [templates/prompts/ask-the-data.md](templates/prompts/ask-the-data.md) | Turn a business problem into 10–15 hypotheses and test them |
| [templates/prompts/meeting-prep.md](templates/prompts/meeting-prep.md) | Prep any meeting from your second brain |
| [templates/prompts/loop-engineering.md](templates/prompts/loop-engineering.md) | Self-improving skill loop with anti-cheat safeguards |
| [templates/dna-playbook.csv](templates/dna-playbook.csv) | Every past piece of work + metrics + *why it worked* |
| [templates/ideas-log.csv](templates/ideas-log.csv) | Every idea scored, picked or rejected (to train your judgment) |
| [templates/value-card.example.json](templates/value-card.example.json) | Example value card (made from this video) |

## Start today (first 60 minutes)

1. Fill in the **work audit** in [02 → Step 1](02-apply-to-your-work.md#step-1-split-your-work-into-ai-does-it-and-i-decide-it) (15 min).
2. Create the **second-brain folder** and fill in `AGENTS.md` ([03 → Part 1](03-setup-guide.md#part-1-create-the-second-brain-folder-everyone)) (20 min).
3. Install **one** agent harness ([03 → Part 2](03-setup-guide.md#part-2-install-an-agent-harness)) and create your first **daily digest** bot with [research-agent.md](templates/prompts/research-agent.md) (25 min).
