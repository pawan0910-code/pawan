# Usage: .\new-project.ps1 -Name BarodaFresh [-Root C:\Work]
param([Parameter(Mandatory=$true)][string]$Name, [string]$Root = "C:\Work")
$dest = Join-Path $Root "Projects\$Name"
if (Test-Path $dest) { Write-Host "Already exists: $dest" -ForegroundColor Red; exit 1 }
New-Item -ItemType Directory -Force -Path $dest | Out-Null
Copy-Item -Recurse -Force (Join-Path $Root "_Template\*") $dest
Copy-Item -Force (Join-Path $Root "_Template\.gitignore") $dest
Set-Location $dest
git init -b main | Out-Null
(Get-Content docs\ai\PROJECT_STATE.md) -replace '# Project State', "# Project State - $Name" | Set-Content docs\ai\PROJECT_STATE.md
git add -A; git commit -q -m "Initial project scaffold with shared AI workflow"
Write-Host "Created $dest . Ab PROMPTS.md ka START prompt chalao." -ForegroundColor Green
