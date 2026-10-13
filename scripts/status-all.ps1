# Saare projects ka quick haal: branch, uncommitted changes, OPEN messages
param([string]$Root = "C:\Work\Projects")
Get-ChildItem $Root -Directory | ForEach-Object {
  Push-Location $_.FullName
  if (Test-Path .git) {
    $branch = git rev-parse --abbrev-ref HEAD
    $dirty  = (git status --porcelain | Measure-Object).Count
    $open   = if (Test-Path docs\ai\MESSAGES.md) { (Select-String -Path docs\ai\MESSAGES.md -Pattern "Status: OPEN" | Measure-Object).Count } else { 0 }
    "{0,-20} branch={1,-25} uncommitted={2,-3} openMessages={3}" -f $_.Name, $branch, $dirty, $open
  }
  Pop-Location
}
