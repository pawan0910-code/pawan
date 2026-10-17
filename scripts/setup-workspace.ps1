# Run once on your PC:  powershell -ExecutionPolicy Bypass -File setup-workspace.ps1
param([string]$Root = "C:\Work", [string]$Drive = "G:\My Drive\Pawan")

Write-Host "== Tool check ==" -ForegroundColor Cyan
foreach ($t in @(@{n="git";c="git --version"}, @{n="node";c="node -v"}, @{n="claude";c="claude --version"}, @{n="codex";c="codex --version"}, @{n="code";c="code --version"})) {
  try { $v = (Invoke-Expression $t.c 2>$null | Select-Object -First 1); Write-Host ("OK   {0}: {1}" -f $t.n, $v) -ForegroundColor Green }
  catch { Write-Host ("MISSING {0}" -f $t.n) -ForegroundColor Yellow }
}

Write-Host "== Folders ==" -ForegroundColor Cyan
foreach ($d in "Projects","_Template") {
  New-Item -ItemType Directory -Force -Path (Join-Path $Root $d) | Out-Null
}
# Personal data Google Drive me (sync PC + phone). Repo Drive ke andar nahi.
if (Test-Path (Split-Path $Drive -Qualifier)) {
  foreach ($d in "_Personal","_Archive") { New-Item -ItemType Directory -Force -Path (Join-Path $Drive $d) | Out-Null }
  $PersonalRoot = $Drive
} else {
  Write-Host "Drive path '$Drive' nahi mila. Drive for Desktop install karo ya -Drive se sahi path do. Abhi local $Root use ho raha hai." -ForegroundColor Yellow
  foreach ($d in "_Personal","_Archive") { New-Item -ItemType Directory -Force -Path (Join-Path $Root $d) | Out-Null }
  $PersonalRoot = $Root
}
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot  = Split-Path -Parent $scriptDir
Copy-Item -Recurse -Force (Join-Path $repoRoot "template\*") (Join-Path $Root "_Template")
Copy-Item -Recurse -Force (Join-Path $repoRoot "scripts") (Join-Path $Root "scripts")
Copy-Item -Force (Join-Path $repoRoot "docs\ai\WORKFLOW.md"), (Join-Path $repoRoot "docs\ai\PROMPTS.md"), (Join-Path $repoRoot "docs\ai\DATA.md") $Root

$acc = Join-Path $PersonalRoot "_Personal\accounts.md"
if (-not (Test-Path $acc)) {
  "# Accounts (NO PASSWORDS here - use a password manager)`n`n| Service | Username/Email | Used for |`n|---|---|---|" | Set-Content $acc
}
Write-Host "Done. Workspace: $Root" -ForegroundColor Green
Write-Host "Personal data: $PersonalRoot"
Write-Host "Move old folders manually, e.g.: Move-Item '$Root\Fruit App Idea' '$PersonalRoot\_Archive\'"
