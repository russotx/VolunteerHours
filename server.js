var express = require('express');
var app = express();
var firebase = require('firebase');
    
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;



app.get('/', function(req, res) {   
    res.sendFile(__dirname + '/public/login.html');
});

app.get('/index', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/org', function (req, res) {
	res.sendFile(__dirname + '/public/org.html');
});



app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});