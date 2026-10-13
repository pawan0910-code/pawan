# Live agent chat dekhne ke liye (alag terminal me chalao):
#   .\show-chat.ps1 -Project C:\Work\Projects\BarodaFresh
param([string]$Project = (Get-Location).Path)
$f = Join-Path $Project "docs\ai\MESSAGES.md"
if (-not (Test-Path $f)) { Write-Host "MESSAGES.md nahi mila: $f" -ForegroundColor Red; exit 1 }
Write-Host "Watching $f  (Ctrl+C to stop)" -ForegroundColor Cyan
Get-Content $f -Tail 40 -Wait
