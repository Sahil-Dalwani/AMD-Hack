Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Set-Location (Join-Path $PSScriptRoot '..')
Write-Host "[ProdigyOS] Bootstrapping from repo root: $(Get-Location)"

npm install
npm run dev
