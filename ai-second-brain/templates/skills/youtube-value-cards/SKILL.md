---
name: youtube-value-cards
description: Turn YouTube videos I watched into short JSON "value cards" for my second brain. Use when asked to process YouTube links, watch history or a Takeout export, or to "update my second brain from YouTube".
---

# YouTube → value cards

## Goal
For every work-relevant video I watched, save one compact JSON card capturing its *value pack*:
the key ideas, quotes, tools and what I could do with them.

## Inputs (check in this order)
1. `inbox/youtube-links.txt` (one URL per line; processed lines get moved to `inbox/processed.txt`)
2. A Google Takeout `watch-history.json` file, if one is in `inbox/`
3. My "Second Brain" YouTube playlist, if a playlist URL is given

## Steps
1. **Filter.** Keep only videos about my focus topics: [YOUR TOPICS, e.g. AI tools, marketing, business].
   Skip entertainment, music, sports, movies and anything off-topic. List the skipped titles at the end so I can correct the filter.
2. **Skip duplicates.** If `cards/youtube/<video_id>.json` already exists, skip it.
3. **Get the transcript** through the configured service (Supadata API, or the Apify actor `starvibe/youtube-video-transcript`).
   Don't scrape YouTube directly. If no transcript exists, use the title and description and set `"transcript_available": false`.
4. **Extract** the fields in `value-card.example.json`:
   - `summary`: 2–3 sentences, plain language
   - `key_ideas`: 3–7 bullets, each one a standalone insight (not "they talked about X")
   - `quotes`: up to 3 short verbatim quotes, each with a timestamp
   - `tools_mentioned`: name + what it's used for
   - `numbers`: notable stats or claims (mark as "claimed")
   - `relevance_to_me`: 1–2 lines tied to the goals in AGENTS.md
   - `action_ideas`: 1–3 things I could try
   - `content_angles`: 1–3 angles I could make content or proposals from (if relevant to my work)
5. **Save** to `cards/youtube/<video_id>.json`.
6. **Report:** number of cards created, a one-line summary of each, and the skipped titles.

## Quality bar
- Specific beats generic: "Use one agent per source, all writing to one inbox", not "use AI agents".
- Never invent quotes or numbers. If unsure, leave it out.
