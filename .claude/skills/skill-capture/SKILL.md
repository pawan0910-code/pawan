---
name: skill-capture
description: Kisi task ya project ke complete hone ke baad uska tareeqa dobara kaam aane layak ho to usko skill bana ke save karna. Khud chalti hai jab kaam khatam hua aur tareeqa non-obvious tha; ya jab Pawan kahe "iska skill bana do", "ye yaad rakh lo", "agli baar ye tareeqa use karo".
---

# Skill Capture

Jo tareeqa mehnat se nikla, wo dobara nahi nikalna chahiye. Kaam khatam hone par
tareeqa skill ban jaaye — phir agli baar seedha use hota hai.

## Kab banani hai — teeno test paas hone chahiye

| # | Test | Sawaal |
|---|---|---|
| 1 | **Non-obvious** | Tareeqa dhoondhne mein mehnat lagi? Tool ki limitation, workaround, ya galat raasta pehle try hua? |
| 2 | **Dobara aayega** | Ye kaam ya is tarah ka kaam phir aayega? |
| 3 | **Bhool jaayega** | Agar na likha to agli session mein dobara dhoondhna padega? |

Teen mein se ek bhi `nahi` — skill nahi banani.

## Kab NAHI banani

- Kaam one-off tha, dobara nahi aayega
- Tareeqa seedha tha — koi bhi pehli koshish mein kar leta
- **Wo baat kisi brain doc mein already likhi hai.** Skill banane se wo do jagah ho
  jaayegi aur "ek fact ek ghar" tootega. Aise case mein skill ki jagah us doc ka
  link do
- Sirf ek command hai — usko project doc mein likho, poori skill nahi banao
- Pehle se koi skill isko cover karti hai — **usko update karo**, nayi mat banao

## Process

1. **Kaam khatam hone par teeno test lagao.** Ye khud karna hai, poochhna nahi.
2. Paas ho gaya to **pehle check karo** ki koi maujooda skill isse milti hai kya.
   Milti hai to usme section add karo.
3. Nayi chahiye to `.claude/skills/<naam>/SKILL.md` banao (format neeche).
4. Drive `work/brain/CHANGELOG.md` ki ek line bana ke Pawan ko do.
5. Drive `work/brain/DECISIONS.md` ki line **sirf tab** jab ye koi faisla badalti ho — wo bhi Pawan ko do.
6. Pawan ko ek line mein batao — kaunsi skill bani aur kyun. Chup-chaap nahi.

## SKILL.md ka format

```
---
name: <chhota-kebab-case>
description: <kab chalni chahiye. Trigger shabd zaroor likho — Pawan jo bolta hai
             wahi shabd. Ek-do line, zyada nahi — ye har session mein load hoti hai>
---

# <Naam>

<Ek line — ye skill kya solve karti hai>

## Kab use karna hai
<trigger — khud se kab, aur Pawan kab bole>

## Kab NAHI
<jahan ye galat jawaab degi>

## Process
<step by step, order fix>

## Hard rules
<jo galti pehle hui, wo dobara na ho>
```

## Kahan rakhni hai

**Sirf `.claude/skills/` mein, is repo ke andar.**

Drive mein "skill" ki file rakhna bekaar hai — wo sirf ek document rahegi, skill
ki tarah load nahi hogi. Drive ke brain docs project ka context rakhte hain;
skills tareeqa rakhti hain. Dono alag cheez hain.

## Hard rules

- **Har task ki skill nahi.** Teeno test paas hone par hi. `skill-advisor` ka
  apna rule hai — 5-6 se zyada skills fizool kharcha hai, kyunki har skill ka
  description har session mein context leta hai. Wahi rule yahan bhi lागू hai.
- `description` chhoti rakho. Wo har turn load hoti hai, body nahi.
- Trigger mein **Pawan ke asli shabd** daalo, apni angrezi nahi. Warna skill
  kabhi fire nahi hogi.
- Ek skill ek kaam. Do kaam ho to do skill.
- Skill banane ke baad **batana hai**. Chup-chaap skill add karna = Pawan ko pata
  nahi chalega ki context kharch ho raha hai.
- Jo skill 2 mahine use nahi hui, usko hatane ka suggest karo.
