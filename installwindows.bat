@echo off
cls

powershell.exe -ExecutionPolicy Bypass -Command "& Invoke-WebRequest -Uri 'https://nodejs.org/dist/v14.16.0/node-v14.16.0-x64.msi' -OutFile 'installnode.msi'"
installnode.msi /quiet /norestart
rename node_modules.a node_modules
npm install random-useragent
npm install system-sleep
npm install got
npm install ws
echo Just open spamkahoot.js with your favorite text editor and change the kahootCode variable to your kahoot game pin
echo Also change kahootBotPrefix to whatever username you want
echo Open cmd and navigate to this directory. Then type "node spamkahoot.js"
echo.
echo Press any key twice to exit installer..
pause >nul
pause >nul
