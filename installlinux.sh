#!/bin/bash

mv node_modules.a/ node_modules/
apt install -y nano nodejs npm

npm install random-useragent
npm install system-sleep
npm install got
npm install ws

echo "Just open spamkahoot.js with your favorite text editor and change the kahootCode variable to your kahoot game pin"
echo "Also change kahootBotPrefix to whatever username you want"
echo "Open terminal and navigate to this directory. Then type 'node spamkahoot.js'"
exit 0
