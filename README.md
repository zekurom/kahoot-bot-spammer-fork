# kahoot-bot-spammer  
 Spam Kahoot with bots - node.js  
 
# DEMO  
 ![demo](https://github.com/aidanbxyz/kahoot-bot-spammer/blob/master/demo.gif?raw=true)

# How to use  
 ## 1. Clone this repo  
 `git clone https://github.com/aidanbxyz/kahoot-bot-spammer.git`  
 ## 2. Install required packages
 ```
 npm install kahoot.js-updated  
 npm install system-sleep
 ```
 ## 3. Rename "node_modules.a" to "node_modules"
 ```
 mv node_modules.a node_modules
 ```
 ## 4. Edit variables
 **ONLY EDIT VARIABLES BETWEEN THE `// main vars` AND `// end main vars` COMMENTS**  
 `const kahootCode = 1234567;` This is where your Kahoot game code goes. example: `const kahootCode = 9088726;`  
 `const kahootBotPrefix = 'kbot';` The Kahoot bot's name should go here. example: `const kahootBotPrefix = 'goodBot';`  
 `const kahootBotNumberSeperator = ' #';` The Seperator of the bot's name and number. exmaple: `const kahootBotNumberSeperator = '.';` will pop up as botName.1, botName.2, and so on  
 `const numberOfBots = 51; // usually 75 or under. 51 as default.` The actual amount of bots to add. example: `const numberOfBots = 10;`  
## 5. Execute script
 `node spamkahoot.js`  

 ## NOTES:
 ### Each bot joins with a 250ms (.25s) delay to show up in numerical order AND to not get kicked for spam  
 ### On every question, each bot will automatically select the first answer. This makes for a hilarious wrong/right ratio
 ### Please use responsibly :)  
 ### Have fun and try not to annoy too many people  
 ###### Remember, emia means presence in blood
