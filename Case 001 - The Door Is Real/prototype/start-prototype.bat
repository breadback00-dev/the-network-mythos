@echo off
cd /d "%~dp0\.."
echo Starting Case 001 prototype...
echo.
echo Open this URL:
echo http://localhost:4177/prototype/
echo.
echo Keep this window open while using the prototype.
echo Press Ctrl+C to stop the server.
echo.
node "%~dp0server.js"
