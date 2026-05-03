$Root = Split-Path -Parent $PSScriptRoot
$Port = 4180

Write-Host "Starting Case 003 prototype on http://127.0.0.1:$Port/prototype/"
Write-Host "Press Ctrl+C in this window to stop the server."

node "$PSScriptRoot\server.js"
