---
name: topic-scorer
description: Score raw ideas (content topics, campaign ideas, product ideas, leads) from 1 to 100 using my own past results and others' results, then shortlist. Use when asked to "score", "rank", "shortlist" or "pick the best" ideas from digests or a list.
---

# Topic scorer (the "viral score" system from the video)

## Goal
Turn ~100 raw ideas into a ranked shortlist with evidence, so that **I** can make the final pick quickly.
You never make the final pick.

## Inputs
- Ideas: today's files in `digests/`, or a list I give you
- My evidence: `playbook/dna-playbook.csv` (my past work + metrics + why it worked)
- Others' evidence: the source data attached to each idea (views/likes on the original post), plus vidIQ / Apify data if available
- History: `playbook/ideas-log.csv` (don't re-propose ideas I rejected in the last [30] days unless something changed)

## Steps
1. **Normalise.** Merge duplicates (the same story from several sources = one idea with multiple signals).
2. **Score each idea independently.** If you can run sub-agents, use **one sub-agent per idea**, and give each one only that idea plus the playbook.
   Score 1–100 with this weighting (edit the weights to fit your work):

   | Factor | Weight | Question |
   |---|---|---|
   | My evidence | 40 | Has something similar worked *for me*? Find the closest 1–3 rows in dna-playbook and compare their results to my median |
   | Others' evidence | 25 | Has something similar worked *for others* recently? Is the original post an outlier vs. that account's normal? |
   | Source signal | 10 | Viral post/reel > trending discussion > plain news > random mention |
   | Freshness | 10 | Did it break in the last 24–48h? Is it still rising? |
   | Fit | 15 | Fits my buckets, audience and goals in AGENTS.md? Can I add a genuine personal angle? |

3. **Top 10.** For each of the top 10, propose **3–10 angles** (different hooks or positions on the same topic).
4. **Re-score the angles** against the playbook's "angles that worked" column. Keep the best **5 topics × 2–3 angles**.
5. **Experiment slot.** Separately flag 1–3 ideas that score low on past data but feel genuinely new. These go into my 25–30% experimentation budget.
6. **Log everything.** Append every idea with its score and status (`shortlisted` / `rejected` / `experiment`) to `playbook/ideas-log.csv`.

## Output format
| # | Topic | Best angle | Score | My evidence (closest past row + result) | Others' evidence | Risk |
|---|---|---|---|---|---|---|

Then: **"Experiments worth a shot"** (1–3 rows) and **"Rejected but interesting"** (3 rows).

## Rules
- Every score must cite evidence. "Feels viral" is not evidence.
- If my playbook has fewer than 20 rows, say so: scores will be weak until it grows.
- Don't pick the winner. End with: "Your call. Which 1–2 should we produce?"
