const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.get('/', function(req, res) {
  console.log(req.url)
  res.sendFile(path.join(__dirname, '/index.html'));
  res.sendFile(path.join(__dirname, '/document.js'))
});

app.listen(port);
console.log('Server started at http://localhost:' + port);