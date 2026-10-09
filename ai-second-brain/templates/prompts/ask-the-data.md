# Prompt: ask your data like a great analyst

From the video ([1:05:20](https://youtu.be/LqY6hFLMEJw?t=3920) and [1:08:49](https://youtu.be/LqY6hFLMEJw?t=4129)).
The real job of a data person was never SQL. It was **turning a vague problem into 10–15 sharp questions**,
then finding evidence for each one. AI now does the SQL, cleaning and Python. You still need to frame the question.

## One-time: a "business intelligence" skill
Before asking questions, write `skills/business-intelligence/SKILL.md` covering:
- What the business sells, to whom, and through which funnel steps
- Where each data source lives (ads account, CRM, database tables, sheets) and what each column means
- Metric definitions: how revenue is attributed to a source, what counts as a lead or conversion, refund rules
- Known data quirks (duplicates, timezone, test orders)

## The question prompt

```
Use the business-intelligence skill. Problem: [e.g. "ROI on ad spend dropped ~30% from last month to this month."]

1. Break this into 10–15 hypotheses (e.g. CPM rose, CTR fell on new creatives, landing page conversion fell,
   price/offer change, lead quality, sales follow-up speed, seasonality, tracking broke...).
2. For each hypothesis, say which data would confirm or reject it, then check it.
3. Report a table: hypothesis | evidence | verdict (supported / rejected / unclear) | confidence.
4. Give the 3–4 metrics I should optimise, and 3 experiments with expected impact.
5. Simulate best case / worst case for each experiment (risk profile) before I run anything.
6. List anything a human should double-check before I act on it.
Cross-verify important numbers by computing them two different ways.
```

## Example from the video: what made sales calls convert
```
Here are [N] recorded sales calls (Zoom recordings, transcripts, chat messages and reactions)
plus the outcome of each lead (didn't buy / low ticket / high ticket).
Find the things that we (sales team, advisers, me) said that came before positive signals
(reactions, positive chat messages) and before higher-ticket purchases.
Also find where we lost people (e.g. getting too technical).
Give me 3 concrete experiments to change in our calls.
```
In the video, three changes like this increased revenue from the same ad spend by about **45%**. Big moves were human-verified first.
