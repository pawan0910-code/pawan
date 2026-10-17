# Data Plan — kahan kya rakhna hai (PC + phone dono par same)

## Rule: har data type ki EK hi asli jagah
| Data | Asli jagah | PC | Phone |
|---|---|---|---|
| Projects (code, docs/ai/) | **GitHub** (private repo) | `git pull/push` | Claude app / claude.ai/code |
| Personal files (accounts.md, docs, PDFs, Excel, photos) | **Google Drive** | Drive for Desktop | Drive app |
| Passwords, API keys, logins | **Password manager** (Bitwarden) | extension/app | app |

## Folder layout
```
C:\Work\Projects\          -> Git + GitHub. Drive ke ANDAR NAHI.
    BarodaFresh\  PrismResearch\  ...
C:\Work\_Template\         -> naye project ka starter
C:\Work\scripts\           -> PowerShell scripts

G:\My Drive\Pawan\         -> Google Drive (sync)
    _Personal\accounts.md  -> sirf service/email/use. PASSWORD NAHI.
    _Archive\              -> Fruit App Idea waghera (delete nahi)
```
(`G:` aapke Drive for Desktop ka letter hai; alag ho sakta hai.)

## Kabhi nahi
1. Git repo Drive folder ke andar nahi (sync se `.git` corrupt ho sakta hai).
2. Password/API key kisi file, repo ya chat me nahi.
3. Ek hi data ki do "asli" copy nahi.

## Backup rule
- Code: PC + GitHub. Push har session ke end me (HANDOFF prompt).
- Personal: PC/Drive + Drive cloud. Phone se bhi khulna chahiye.
- Mahine me ek baar test: GitHub se fresh `git clone` karke dekho ki sab aa raha hai.

## Phone par kaam
- Code/AI kaam: Claude app me GitHub repo wala cloud session (PC band ho tab bhi chalta hai). Result branch/PR me aata hai, PC par `git pull`.
- Files: Google Drive app.
- Passwords: Bitwarden app.
Note: Claude Code CLI aur Codex CLI phone par local nahi chalte; PC par chalte hain.

## Pehli baar setup checklist
- [ ] Bitwarden PC + phone par, master password yaad/safe
- [ ] Drive for Desktop install, `Pawan\_Personal` aur `Pawan\_Archive` banao
- [ ] Har project ka private GitHub repo, pehla push
- [ ] Phone: Claude app, Drive app, Bitwarden login
- [ ] Clone test (mahine me ek baar)
