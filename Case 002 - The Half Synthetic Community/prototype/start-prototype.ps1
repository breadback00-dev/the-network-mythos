$Root = Split-Path -Parent $PSScriptRoot
$Port = 4178

Write-Host "Starting Case 002 prototype on http://127.0.0.1:$Port/prototype/"
Write-Host "Press Ctrl+C in this window to stop the server."

node "$PSScriptRoot\server.js"
