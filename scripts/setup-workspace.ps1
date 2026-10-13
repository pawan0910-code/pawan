# Run once on your PC:  powershell -ExecutionPolicy Bypass -File setup-workspace.ps1
param([string]$Root = "C:\Work")

Write-Host "== Tool check ==" -ForegroundColor Cyan
foreach ($t in @(@{n="git";c="git --version"}, @{n="node";c="node -v"}, @{n="claude";c="claude --version"}, @{n="codex";c="codex --version"}, @{n="code";c="code --version"})) {
  try { $v = (Invoke-Expression $t.c 2>$null | Select-Object -First 1); Write-Host ("OK   {0}: {1}" -f $t.n, $v) -ForegroundColor Green }
  catch { Write-Host ("MISSING {0}" -f $t.n) -ForegroundColor Yellow }
}

Write-Host "== Folders ==" -ForegroundColor Cyan
foreach ($d in "Projects","_Archive","_Personal","_Template") {
  New-Item -ItemType Directory -Force -Path (Join-Path $Root $d) | Out-Null
}
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot  = Split-Path -Parent $scriptDir
Copy-Item -Recurse -Force (Join-Path $repoRoot "template\*") (Join-Path $Root "_Template")
Copy-Item -Recurse -Force (Join-Path $repoRoot "scripts") (Join-Path $Root "scripts")
Copy-Item -Force (Join-Path $repoRoot "docs\ai\WORKFLOW.md"), (Join-Path $repoRoot "docs\ai\PROMPTS.md") $Root

$acc = Join-Path $Root "_Personal\accounts.md"
if (-not (Test-Path $acc)) {
  "# Accounts (NO PASSWORDS here - use a password manager)`n`n| Service | Username/Email | Used for |`n|---|---|---|" | Set-Content $acc
}
Write-Host "Done. Workspace: $Root" -ForegroundColor Green
Write-Host "Move old folders manually, e.g.: Move-Item '$Root\Fruit App Idea' '$Root\_Archive\'"
