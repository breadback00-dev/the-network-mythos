@echo off
cd /d "%~dp0\.."
echo Starting Case 003 prototype...
echo.
echo Open this URL:
echo http://127.0.0.1:4180/prototype/
echo.
echo Keep this window open while using the prototype.
echo Press Ctrl+C to stop the server.
echo.
node "%~dp0server.js"
