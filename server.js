// App node server

var express = require('express');

var app = express();

var firebase = require('firebase');

var http = require('http');

var admin = require("firebase-admin");

var serviceAccount = require("./vtext.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://volunteerhours-35189.firebaseio.com/"
});

app.use(express.static('public'));
    
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


app.get('/', function(req, res) {   
    res.sendFile(__dirname + '/views/login.html');
});


app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/views/login.html');
});


app.get('/index', function (req, res) {
	
	res.sendFile(__dirname + '/views/index.html');
});


app.get('/org', function (req, res) {
	res.sendFile(__dirname + '/views/org.html');
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

