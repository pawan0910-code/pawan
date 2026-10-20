---
name: skill-advisor
description: Suggest a Claude Code skill or plugin when the current task would clearly go better with one, and when the user asks "koi skill chahiye?", "which skill for this", "plugin recommend karo", "is kaam ke liye kya install karun". Always checks built-in options first, only recommends free and verified options, and never installs anything on its own.
---

# Skill Advisor

Pawan ke liye skill/plugin recommend karna. Hinglish mein jawaab. Chhota aur seedha.

## Kab use karna hai

Khud se, jab:
- Ye kaam repeat ho raha hai (3rd+ baar) aur ek skill ise fix kar degi
- Mujhe lage ki ek specific tool/skill ke bina kaam adhoora rahega
- Kaam ka poora ek category miss ho raha hai (browser testing, design, docs, data)

Jab Pawan poochhe: "koi skill chahiye?", "kya install karun", "plugin recommend karo".

**Mat use karo** jab: kaam one-off hai, ya built-in se ho jaa raha hai, ya is session mein pehle hi ek recommend kar diya aur Pawan ne interest nahi dikhaya.

## Process — order fix hai, skip nahi

1. **Built-in pehle.** Check karo kya Claude Code mein pehle se hai — plan mode, `/compact`, subagents, built-in browser/docs/pdf/xlsx skills, Workflow. Agar built-in se kaam ho jaata hai: **koi recommendation nahi do.** Sirf batao ki built-in kaise use karna hai. Yeh step sabse zyada baar lagta hai.
2. **Installed check karo.** Available skills list dekho. Jo pehle se hai, uska dobara suggest mat karo.
3. **Verify karo — memory se kabhi nahi.** Web search karke confirm karo: skill asli mein exist karti hai, naam-author sahi hai, maintained hai, aur **free** hai.
4. **Free-only rule.** Sirf free aur open-source. Paid, trial, subscription, "pro tier", credit-card maangne wala — recommend hi nahi karna. Agar sirf paid option mila to saaf bolo: "free option nahi hai, manually aise karte hain" aur manual tareeqa bata do.
5. **Safety check.** Priority: `anthropics/*` official > known author ka repo > kuch nahi. Random fork kabhi nahi. Agar skill `npx`, `curl | sh`, ya koi shell install chalati hai — ye risk saaf likhna.
6. **Card dikhao** (neeche format), phir **rukho**. Install karne se pehle Pawan ki "haan" chahiye — hamesha.

## Output format — yahi card, har baar

```
SKILL SUGGESTION

Kaam        : <kya karna hai>
Built-in se : <ho jaata hai? haan -> ye use karo, bas. nahi -> aage>
Suggestion  : <naam>  (owner/repo)
Official?   : Anthropic official / community (<author>)
Free?       : Haan — <kaise confirm kiya>
Risk        : Low / Medium — <kyun, shell-out ho to likho>
Install     : <exact command>
Token cost  : <description hamesha load hogi, ~X line>
Zarurat?    : <1 line — asli mein chahiye ya nice-to-have>
```

## Hard rules

- Ek baar mein **max 2** suggestions. Zyada = noise.
- **Khud install kabhi nahi.** Command do, Pawan chalayega.
- Install counts, "80 lakh downloads" type numbers **kabhi quote nahi** karne — third-party directories pe ye aapas mein 20x tak farak dete hain, bharose layak nahi.
- Reel, tweet, ya blog ke claim ko sach mat maano — har baar khud verify.
- Jo install karne layak nahi, uske liye saaf "**zarurat nahi**" bolna. Har gap ko skill se bharna galat hai.
- Token ka dhyaan: har installed skill ka description permanently context mein rehta hai. 5-6 se zyada skills = fizool kharcha. Ye Pawan ko yaad dilana jab wo limit ke paas aaye.
- Pehle built-in, phir free skill, phir manual tareeqa. Paid kabhi nahi.
