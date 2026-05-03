$Root = Split-Path -Parent $PSScriptRoot
$Port = 4184

Write-Host "Starting Case 004 prototype on http://127.0.0.1:$Port/prototype/"
Write-Host "Press Ctrl+C in this window to stop the server."

node "$PSScriptRoot\server.js"
