# Copy-paste prompts (dono agents ke liye)

## START (har session ki shuruaat)
AGENTS.md aur docs/ai/ ki saari files padho (MESSAGES, TASKS, CHANGELOG_AI, PROJECT_STATE). Batao: abhi status kya hai, kaunse OPEN messages hain, aur agla kaam kya hona chahiye. Abhi code mat badlo.

## TASK
Task: <yahan likho>. Naya branch banao (claude/<topic> ya codex/<topic>). TASKS.md me IN PROGRESS mark karo. Kaam karo, tests chalao, phir CHANGELOG_AI.md, TASKS.md aur MESSAGES.md update karke commit karo.

## REVIEW (dusre agent ka kaam)
Branch <naam> ka diff review karo: bugs, security, missing tests, AGENTS.md ke rules. Findings MESSAGES.md me likho (TO <original agent>). Code khud mat badlo jab tak main na bolun.

## HANDOFF (session khatam karte waqt)
Aaj ka kaam CHANGELOG_AI.md me likho, PROJECT_STATE.md update karo, MESSAGES.md me dusre agent ke liye agla step likho, commit karo.

## STATUS (jab aapko poora haal chahiye)
Saare projects ka short status do: kya chal raha hai, kya atka hai, kya mere approval ka wait kar raha hai.
