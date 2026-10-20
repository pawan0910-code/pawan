# Brain

Saare projects ka router. Kaam pehle yahan aata hai, phir sahi project ke
folder mein jaata hai.

## Structure

```
brain/
├── CLAUDE.md            Gate 0 — routing (auto-load)
├── INDEX.md             Gate 1 — project ka naksha
├── TEMPLATE-STATUS.md   naye folder ke liye template
└── <project>/
    ├── STATUS.md        Gate 2 — project ka summary
    └── <subfolder>/
        └── STATUS.md    Gate 3 — asli kaam ka context
```

## Gates

| Gate | File | Size | Kaam |
|---|---|---|---|
| 0 | `CLAUDE.md` | 30-40 line | Routing rules |
| 1 | `INDEX.md` | 1 line/project | Task -> kaun sa project |
| 2 | `<project>/STATUS.md` | 40 line max | Project -> kaun sa subfolder |
| 3 | `<project>/<sub>/STATUS.md` | 40 line max | Latest + pending |
| 4 | Asli files | — | Sirf yahan asli kaam |

Ek baar mein ek gate. Agle gate ka path pichle gate se milta hai, dhoondhna
nahi padta — yahi speed aur token dono bachata hai.

## Apne PC pe lagane ka tareeqa

Is repo ka `brain/` folder aur root ka `CLAUDE.md` — dono copy kijiye:

```
work/
├── CLAUDE.md     <- is repo ke root ka CLAUDE.md
└── brain/        <- is repo ka brain/ folder
```

`CLAUDE.md` ko `work/` root pe rakhna zaroori hai. Claude Code `CLAUDE.md`
ko current folder se **upar** ki taraf dhoondhta hai, to `work/` pe rakhi
file har project ko automatically mil jaati hai.

## Rules

- **Ek sach ek jagah.** Project ki detail project folder mein, routing brain
  mein. Duplicate shuru hua to system marna shuru.
- **Koi secret nahi.** API key, password, token, asli `.env` values — kabhi
  nahi. Sirf `.env.example` keys ke naam ke saath.
- **Pruning.** Mahine mein ek baar purane log aur dead projects nikaal dijiye.
- `STATUS.md` ke 6 heading har jagah same rakhiye. Fix format se Claude ko
  padhna nahi padta, scan kar leta hai.
