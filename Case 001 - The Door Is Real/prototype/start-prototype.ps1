$Root = Split-Path -Parent $PSScriptRoot
$Port = 4177

Write-Host "Starting Case 001 prototype on http://localhost:$Port/prototype/"
Write-Host "Press Ctrl+C in this window to stop the server."

node "$PSScriptRoot\server.js"
