# Brain — router

Standing rules root ke `CLAUDE.md` mein hain. Yahan sirf routing hai.
Dono ek saath load hote hain, isliye rules dobara likhne ki zarurat nahi.

## Routing — yeh order follow karo, skip mat karo

1. `brain/INDEX.md` padho -> project ka folder pata karo
2. `<project>/STATUS.md` padho -> kaun sa subfolder, uska path lo
3. `<project>/<subfolder>/STATUS.md` padho -> ab asli context hai
4. Ab sirf us subfolder ki files kholo

Agar kaam kis project ka hai saaf nahi, to step 1 ke baad **pooch lo** —
saare projects scan mat karo.

## Rules

- Ek baar mein ek gate. Zarurat se zyada kuch na padho.
- Recursive search (`grep -r`, poora folder scan) nahi. Path INDEX aur
  STATUS se banta hai, dhoondh kar nahi.
- Kaam poora hone ke baad **us subfolder ka `STATUS.md` update karo** —
  Updated date, "Abhi chal raha hai", "Pending", "Last kiya".
- Dusre project ki files kabhi mat chhuo.
- Naya project bane to `INDEX.md` mein ek line add karo.
- `STATUS.md` 40 line se badi ho jaaye to purana "Last kiya" usi folder ke
  `ARCHIVE.md` mein shift kar do.
- Bahut saari files padhni ho to `Explore` subagent use karo, khud nahi —
  uska file-output uske apne context mein rehta hai.
