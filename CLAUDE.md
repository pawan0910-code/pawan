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

Har project ka ek `brain/` folder hai Google Drive mein — context, rules aur
faisle wahin rehte hain. Us project ka kaam shuru karne se pehle uska brain padho.

| Brain | Drive folder ID |
|---|---|
| `work` (root) | `1Xzp9Bw1TkMN3ZPLWwCrut5HuVEswBmqO` |
| Accounts | `1I_h-jQzI4eB8vDTlq4M4jh1dqX-_Flve` |
| Baroda Fresh | `1mnQJtA40zzvZnt0GG5VGLNK5HiW2uOJa` |
| Khanderao Market Social Media | `14cDMHGco65_1t7nWqb1eBXifqaer_o6D` |
| Archive/PRISM | `1ngLRzzkR9rYx2caXaZwJNSCBvTGJV3Xg` — **haath nahi lagana** |

`DECISIONS.md` aur `CHANGELOG.md` **is repo mein** hain — `brain/` folder mein.
Wajah: Drive connector se maujooda file mein line jodi nahi ja sakti, sirf nayi
file banti hai. In do file mein roz line judti hai, isliye ye repo mein rehti hain.
Drive mein wo docs rehte hain jo kam badalte hain (PROJECT, BRAND, SCHEMA) aur assets.

### Status label — 6, har brain mein same

`Confirmed` · `Reported` · `Assumed` · `Pending` · `Verified` · `Future`

Bina label ki baat `Pending` maano. Har doc ke top pe header:
`Status: … | Last verified: YYYY-MM-DD | Owner: …`

### Trigger — ye khud karna hai, poochhna nahi

| Kab | Kya |
|---|---|
| Koi faisla hua | `DECISIONS.md` mein turant: date, sawaal, faisla, kisne, kaunsi file badli |
| Kaam khatam | `CHANGELOG.md` mein ek line: date, kya hua, asar |
| Pending resolve hua | label badlo — proof ho to `Confirmed`, warna `Assumed` |
| Koi doc badla | us doc ki `Last verified` date aaj ki karo |

### Pending → Confirmed ka niyam

`Confirmed` **sirf** do soorat mein: Pawan ne approve kiya, ya proof check kiya.
Waqt guzarne se koi baat Confirmed nahi hoti. Proof na ho to `Assumed` likho
aur open items mein rakho.

Mera khud ka andaaza kabhi `Confirmed` nahi — wo `Assumed` hai. `DECISIONS.md`
mein saaf likho faisla Pawan ka tha ya mera.

### Ek fact, ek ghar

Ek baat ek hi file mein. Dusri jagah zarurat ho to link karo, copy mat karo.
Copy ki hui baat purani ho jaati hai aur phir pata nahi chalta kaunsi sach hai.
