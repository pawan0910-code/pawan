# Prompt: loop engineering (a skill that improves itself overnight) with anti-cheat

From the video ([1:28:40](https://youtu.be/LqY6hFLMEJw?t=5320) → [1:39:37](https://youtu.be/LqY6hFLMEJw?t=5977)).

**What Vaibhav did:** take a skill, have AI write on a topic he'd already nailed, compare the result to his original,
score it, fix the skill, repeat until the score reaches 9.5/10. A skill starts at about 5/10.

**What went wrong:** his first loop "finished" in 30 minutes. The model was **grading its own work**, so it gave itself
perfect scores while writing gibberish. "It wasn't trying to cheat me. It was trying to pass the exam."

The prompt below is built so that can't happen.

---

## Before you start
- A skill file to improve, e.g. `skills/script-writer/SKILL.md`
- A **gold set**: 10–20 of your best past pieces (topic + research notes + the final text + its results)
- Split the gold set: **~70% training topics** (used to find fixes) and **~30% held-out topics** (only used for the final exam, never for fixes), so the skill can't just memorise your examples
- Use a different model for the examiner if you can (e.g. writer = Claude, examiner = GPT or Gemini) to reduce shared bias

## The orchestrator prompt (paste into Claude Code / Codex / Hermes)

```
You are the ORCHESTRATOR of a skill-improvement loop. You never write content and you never score content yourself.

Files:
- Skill under test: skills/[SKILL]/SKILL.md   (back it up to skills/[SKILL]/SKILL.backup.md first)
- Gold set: playbook/gold/  (each item: topic.md, research.md, original.md, results.md)
- Training topics: [list]   Held-out topics: [list]   (never use held-out topics in the improvement step)

Roles (each is a SEPARATE sub-agent with a fresh context):
1. WRITER: receives ONLY the current SKILL.md + topic.md + research.md. Never sees original.md or any score.
2. EXAMINER [use model: ___ if available]: receives the topic and TWO texts labelled "A" and "B" in random order
   (one is the writer's, one is original.md). It is not told which is which.
   It must: (a) confirm both are on-topic, coherent, and not placeholder/filler text (fail = score 0),
   (b) score each text 1–10 against this rubric: [hook strength, clarity, structure, voice match, specificity, proof, CTA],
   (c) list concrete differences that make the better one better.
   Its job is to FIND REASONS THE WRITER'S TEXT IS WORSE. It is not trying to be nice.
3. EDITOR: receives the examiner's feedback and SKILL.md (never the originals verbatim) and proposes
   general rule changes to SKILL.md. No copying sentences or topic-specific facts from the originals into the skill.

Loop:
- For each training topic: WRITER → EXAMINER. Then YOU un-blind the result and compute
  relative score = min(10, 10 × writer_text_score / original_text_score). The original counts as 10.
- If the average over the last 3 topics < 9.5: EDITOR updates SKILL.md, save a numbered version, move to the next topic.
- Stop when the average ≥ 9.5 on 5 consecutive training topics, OR after [N=30] iterations, OR at [budget: $__ / __ tokens].
- Final exam: run WRITER + EXAMINER on ALL held-out topics with the final skill. Report those scores separately.

Logging (mandatory):
- Save every writer output, every examiner report and every SKILL.md version to loops/[SKILL]/[date]/.
- Write loops/[SKILL]/[date]/SUMMARY.md: score per iteration, what changed in the skill each time,
  held-out exam scores, and 3 randomly chosen writer outputs pasted in full for my morning spot-check.

Integrity rules:
- If any output is off-topic, placeholder text (e.g. "lorem ipsum") or suspiciously short, mark the run INVALID and stop.
- If the score jumps by more than 3 points in one iteration, flag it for my review.
- Never modify the gold set, the rubric or these rules.
```

## In the morning
1. Read `SUMMARY.md` and the **3 random full outputs** yourself. Don't trust the number alone.
2. Compare the **held-out** scores with the training scores. A big gap means it memorised rather than learned.
3. If it's good, keep the new `SKILL.md`. If not, restore the backup and adjust the rubric.

## Why each safeguard exists
| Safeguard | Problem it prevents |
|---|---|
| Writer never sees originals | Copying your text instead of learning your style |
| Separate examiner, blind A/B | Self-grading (the "Lorem ipsum" cheat), bias toward its own writing |
| Different model as examiner | "All models think alike". Shared blind spots |
| On-topic / filler check | Passing the exam with garbage |
| Held-out topics | Overfitting to the training examples |
| Iteration and budget cap | A 10/10 target never finishes, and costs keep running |
| Everything logged + human spot-check | You stay the final judge |
