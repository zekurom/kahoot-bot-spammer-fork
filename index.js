const path = require('path');
const url = require('url');
const Kahoot = require("kahoot.js-latest");
const express = require('express')
const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const words = require("random-words")

const port = process.env.PORT || 8080;

app.use('/', express.static('public'))
app.get('/', function(req, res) {
  console.log(req.url)
});




io.on("connection", function(socket) {
	function mconsole(...args) {
		let msg = `${args.join(` `)}`
		console.log(msg)
		socket.emit('console', msg)
	}

    socket.on('clientMessage', function(jsonData, from) {
        socket.emit('serverMessage', 'Got a message!');
        mconsole(jsonData);
    });

	socket.on('flood', function(s) {
		var bots = {};

		mconsole(s)
		var q = JSON.parse(s)
		var task = q.task;
		if (q.uid !== undefined && q.names !== undefined && q.pin !== undefined) {
			if (bots[q.uid] === undefined) {
				bots[q.uid] = [];
			}
			var names = q.names.split('%2C')
			var num = Number(q.numBots) || 10;
			console.log(num + " bots. Received Request..." + new Date() + "");
			console.log(names, typeof names);
			initBot();
			async function initBot() {
			for (var i = 0, len = num; i < len; i++) {
				//await new Promise((resolve) => setTimeout(resolve, 1000)).catch(err => mconsole(err))
				var name = names[Math.floor(Math.random() * names.length)];
				bots[q.uid].push(new Kahoot());
				bots[q.uid][i].setMaxListeners(Number.POSITIVE_INFINITY)
				let botname;
				if (name == "random" || name == "rn") {
					botname = words()
				} else {
					botname = name+i
				}
				bots[q.uid][i].join(Number(q.pin), botname);

				bots[q.uid][i].on('invalidName', () => {
					//mconsole("invalidName: " + name + (i + 1));
					//bots[q.uid][i].join(Number(q.pin), name + (i + 1) + Math.floor(Math.random() * 100));
					console.log("Invalid name")
					i=i-1
				});

				await new Promise(resolve => {
					bots[q.uid][i].on("Joined", () => {
						mconsole(`${botname} has connected`)
						resolve()
					})
				}).catch(err => mconsole(err))
		
				bots[q.uid][i].on("QuizStart", () => {
		       		console.log(`The quiz has started for ${botname}!`);
		     	});
		
				bots[q.uid][i].on("QuestionStart", (question) => {
		       		const randomChoice = Math.floor(
		     			Math.random() * question.numberOfChoices
		       		);
		       		mconsole(`A new ${question.type.toString()} question has started for ${botname}.`);
		       		if (q.ctrl == "false") {
						question.answer(randomChoice);
						mconsole(`answering answer ${randomChoice + 1}`)
					} else {
						let answers;
						if (question.type.toString() == "quiz") {
							answers = "Choose answer: 1=red, 2=blue, 3=yellow, 4=green"
						} else {
							answers = "Choose answer: 1=red, 2=blue"
						}
						mconsole(answers)
						async function agree(){
							let data = await new Promise(resolve => {
								socket.on('ans2', (answer) => {
									resolve(answer);
								});      
							});
							let j;
							if (Number(data) == 5) {
								j = randomChoice
							} else {
								j = Number(data)-1
							}
							question.answer(j)
							mconsole(`answering ${j}`)
						}
						socket.emit('ans1', answers)
						agree()
					}
		   		});
		
				bots[q.uid][i].on("QuizEnd", () => {
		     		mconsole(`The quiz has ended for ${bots[q.uid][i]}.`);
			  		if (i == Number(bot_amount)) {
				  		bots[q.uid][i].leave()
				  		//process.exit(0)
			  		}
		  		});
					
				bots[q.uid][i].on("feedback", () => {
					bots[q.uid][i].sendFeedback(1, 0, 0, -1)
				});
		
				bots[q.uid][i].on("Disconnect", (reason) => {
	       			mconsole(`${botname} has disconnected for: `, reason);
	  			});

				/*
				bots[q.uid][i].on("Joined", () => {
					mconsole(`${botname} has connected`)
				})
				*/
			}
				socket.emit('flooded')
				console.log("success")
			}
		} else {
			console.log('One or more missing parameters')
		}
	
	});

});



server.listen(port, function() {
    console.log('Server started at https://localhost:' + port);
});


