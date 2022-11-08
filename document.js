const Kahoot = require("kahoot.js-latest");
const path = require('path');
const url = require('url');
var send

function go() {
var valid = true;
var pin = document.getElementById('pin').value.toString();
if (pin.length <= 2 || pin.length > 10) {
    document.getElementById('pinError').innerHTML = 'Error: Invalid Game PIN<br>';
    valid = false;
} else {
    document.getElementById('pinError').innerHTML = '';
}
var name = document.getElementById('name').value.replace(/\,\s/g, ',');
if (name.length < 1) {
    document.getElementById('nameError').innerHTML = 'Error: Enter at least 1 name<br>';
    valid = false;
} else {
    document.getElementById('nameError').innerHTML = '';
}
var num = Number(document.getElementById('num').value);
if (num < 1 || num > 2000) {
    document.getElementById('numError').innerHTML = 'Error: Must be between 1-2000<br>';
    valid = false;
} else {
    document.getElementById('numError').innerHTML = '';
}
if (valid) {
    document.getElementById('button').innerHTML = ' Joining... ';
    document.getElementById('success').innerHTML = '';
    send = `{ "uid":${Date.now()}, "pin":${pin}, "names":${encodeURIComponent(name)}, "ans":${document.getElementById('ans').value}, "numBots":${num} }`
	console.log(send)
	flood(send)
}
}

var bots = {};

function flood(s) {
var q = JSON.parse(s)
var task = q.task;

if (q.uid !== undefined && q.names !== undefined && q.pin !== undefined && q.ans !== undefined) {

	if (bots[q.uid] === undefined) {
		bots[q.uid] = [];
	}
	var num = Number(q.numBots) || 10;
	var i = -1;
	var names = q.names.split(',');
	console.log(num + " bots. Received Request..." + new Date() + "");
	console.log(names);
	initBot();
	function initBot() {
		i++;
		var name = names[Math.floor(Math.random() * names.length)];
		bots[q.uid].push(new Kahoot);
		bots[q.uid][i].join(Number(q.pin), name + (i + 1));
		
		bots[q.uid][i].on('invalidName', () => {
			//console.log("invalidName: " + name + (i + 1));
			bots[q.uid][i].join(Number(q.pin), name + (i + 1) + Math.floor(Math.random() * 100));
		});

		bots[q.uid][i].on("QuizStart", () => {
       		console.log(`The quiz has started for ${bots[q.uid][i]}!`);
     		});

		bots[q.uid][i].on("QuestionStart", (question) => {
       		const randomChoice = Math.floor(
     			Math.random() * question.numberOfChoices
       		);
       		console.log(`A new question has started for ${bots[q.uid][i]}, answering answer ${randomChoice + 1}.`);
       		question.answer(randomChoice);
   		});

		bots[q.uid][i].on("QuizEnd", () => {
     		console.log(`The quiz has ended for ${name} (${i}).`);
	  		if (i == Number(bot_amount)) {
		  		bots[q.uid][i].leave()
		  		//process.exit(0)
	  		}
  		});
			
		bots[q.uid][i].on("feedback", () => {
			bots[q.uid][i].sendFeedback(1, 0, 0, -1)
		});

		bots[q.uid][i].on("Disconnect", (reason) => {
       		console.log(`${bots[q.uid][i]} has disconnected for: `, reason);
  		});
			
		if (i < num - 1) {
			setTimeout(initBot, Math.floor(Math.random() * 100) + 50);
		} else {
			console.log('success');
		}
	}
} else {
	console.log('Missing one or more parameters');
}
}