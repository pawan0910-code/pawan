# Pawan — standing rules

Hinglish mein baat karo (Hindi words, English alphabet). Jawaab chhota aur seedha.
Token bachao: zarurat se zyada file mat padho, recursive search mat karo.

## Skills aur plugins

- Jab lage ki kisi skill ya plugin ki zarurat hai, `skill-advisor` skill use karo
  aur mujhe batao — chup-chaap kaam adhoora mat chhodo.
- **Sirf free aur open-source.** Paid, trial ya subscription wala kabhi recommend nahi.
- Pehle built-in option, phir free skill, phir manual tareeqa.
- Khud kuch install nahi karna — command do, main chalaunga.
- Install counts ya download numbers kabhi quote nahi karne, wo bharose layak nahi.

## Kaam ka tareeqa

- Bada kaam shuru karne se pehle plan do.
- Secrets (API key, password, token) kisi file mein nahi.
- Confirm na ho to pooch lo, guess mat karo.

## Brain system

**Brain Drive mein hai** (faisla 2026-10-22, Pawan). Naya kaam bhi **sirf Drive
mein** save hota hai (faisla 2026-10-23, Pawan). Us project ka kaam shuru karne se
pehle uska brain padho.

| Brain | Drive mein kahan | Folder ID |
|---|---|---|
| Standard, Faisle, History | `work/brain/` — `BRAIN-SYSTEM.md` · `DECISIONS.md` · `CHANGELOG.md` | `1uonVF-v_RxGtzzanFnMa3kjELI91Tw7Q` |
| Accounts | `work/Accounts/brain/` — 9 docs | `1I_h-jQzI4eB8vDTlq4M4jh1dqX-_Flve` |
| Baroda Fresh | `work/Baroda Fresh/brain/` — README + 3 master docs | `1mnQJtA40zzvZnt0GG5VGLNK5HiW2uOJa` |
| Khanderao Market Social Media | `work/Khanderao Market Social Media/brain/` — 7 docs | `14cDMHGco65_1t7nWqb1eBXifqaer_o6D` |
| Claude tools (Playwright, test-app) | `work/claude-tools/` | `1geyPDXoqaUWq228pcBph4yML1GG2Wq2n` |

Drive mein baaki:

| Kya | Kahan |
|---|---|
| Assets — photo, video, logo | `<Project>/assets/` |
| Backup JSON | `Accounts/backups/` |
| Research, docs, output | `<Project>/research/ docs/ output/` |
| Archive/PRISM | `1ngLRzzkR9rYx2caXaZwJNSCBvTGJV3Xg` — **haath nahi lagana** |

Drive ka `work` folder: `1Xzp9Bw1TkMN3ZPLWwCrut5HuVEswBmqO`

### Repo mein sirf ye

Ye files Drive se kaam nahi karti, isliye repo mein hi rehti hain:
`CLAUDE.md` (ye file) · `.claude/skills/` · `mcp-configs/`.

⚠️ Repo ka `brain/` folder **purani copy hai** — usko mat padho, mat badlo. Sach
Drive wala hai.

### Status label — 6, har brain mein same

`Confirmed` · `Reported` · `Assumed` · `Pending` · `Verified` · `Future`

Bina label ki baat `Pending` maano. Har doc ke top pe header:
`Status: … | Last verified: YYYY-MM-DD | Owner: …`

### Trigger — ye khud karna hai, poochhna nahi

| Kab | Kya |
|---|---|
| Koi faisla hua | Drive `DECISIONS.md` ki line bana ke Pawan ko do (wo sabse upar jodega): date, sawaal, faisla, kisne, kaunsi file badli |
| Kaam khatam | Drive `CHANGELOG.md` ki ek line Pawan ko do: date, kya hua, asar |
| Kuch naya banaya | Drive mein **nayi file** banao, sahi project folder mein |
| Kaam naye tareeqe se hua | `skill-capture` skill chalao — teeno test paas ho to skill banao |
| Pending resolve hua | label badlo — proof ho to `Confirmed`, warna `Assumed` |
| Koi doc badla | us doc ki `Last verified` date aaj ki karo |

### Pending → Confirmed ka niyam

`Confirmed` **sirf** do soorat mein: Pawan ne approve kiya, ya proof check kiya.
Waqt guzarne se koi baat Confirmed nahi hoti. Proof na ho to `Assumed` likho
aur open items mein rakho.

Mera khud ka andaaza kabhi `Confirmed` nahi — wo `Assumed` hai. `DECISIONS.md`
mein saaf likho faisla Pawan ka tha ya mera.

### Drive ki file — trash aur recreate band

Pawan ka rule (21 Oct 2026): **koi file trash nahi karni, aur poori file recreate
nahi karni.** Sirf jo line badalni ho wahi badlo.

Drive connector mein line badalne ka tool nahi hai. Isliye **Drive ki doc
read-only hai** — usme kuch badalna ho to sahi line bana ke Pawan ko do, wo khud
badlega. Recreate-aur-trash ka raasta band hai.

Trash mein padi file ko haath nahi lagana.

### Ek fact, ek ghar

Ek baat ek hi file mein. Dusri jagah zarurat ho to link karo, copy mat karo.
Copy ki hui baat purani ho jaati hai aur phir pata nahi chalta kaunsi sach hai.

### Khud ko update karte raho

Pawan ka rule (23 Oct 2026): koi bhi rule, doc, skill ya config **Pawan ke kisi
faisle ke khilaf** mile, to **bina poochhe theek karo**, phir Pawan ko ek line
mein batao kya badla aur kyun.

- Sirf Pawan ke faisle se milane ke liye — apne andaaze se nahi. Shak ho to poochho.
- Repo ki file (`CLAUDE.md`, skills, `mcp-configs/`) — khud badlo, PR banao aur
  merge karo.
- Drive ki file — badal nahi sakta, to sahi line bana ke Pawan ko do.
- Delete kabhi nahi, Archive/PRISM ko haath nahi.
- Har aisa badlav Drive `CHANGELOG.md` ki line ke roop mein Pawan ko do.
