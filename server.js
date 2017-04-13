// App node server

var express = require('express');

var app = express();

// var firebase = require('firebase');

var http = require('http');

var admin = require("firebase-admin");

var serviceAccount = require("./vtext.json");

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// **********************  SMS INIT *********************

var Bandwidth = require("node-bandwidth");
var client = new Bandwidth({
    userId    : "u-62ezq5xxxmelmsvqwsx4dti",
    apiToken  : "t-dgdru5nz3zdfdzkelgdyqka",
    apiSecret : "4s2lclirssdqsj5dtyemgehfu5o5epzyuwduaea"
});

//------------------------------------------------------------

//******************** FIREBASE INIT ************************

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://volunteerhours-35189.firebaseio.com/"
});

// authenticate with admin privileges
var database = admin.database();
// var ref = database.ref("restricted_access/secret_document");

//-------------------------------------------------------------

app.use(express.static('public'));



//*************************   SMS  ************************************ 

function sendSMS(toPhone,smsContent) {
  var message = {
    from: "+15122981573", // <-- This must be a Bandwidth number on your account
    to: "+1"+toPhone,
    text: smsContent
  };
  console.log("sending");
  client.Message.send(message)
  .then(function(message) {
  	 console.log("Im sending");
      // report status, change sendSMS flag back to false and revert to default message
      dbSMSreset = {};
      var smsSentKey = database.ref('/smsAction/smsSentLog/').push().key;
      console.log(smsSentKey);
      var smsSentStatus = "Message sent with ID " + message.id;
      dbSMSreset['/smsAction/smsSentLog/'+smsSentKey+'/'] = smsSentStatus;
      dbSMSreset['/smsAction/sendSMS/'] = false;
      dbSMSreset['/smsAction/smsContent/'] = "Attn Awesome Volunteers, please report your hours!";
      database.ref().update(dbSMSreset);
  })
  .catch(function(err) {
      var smsSentKey = database.ref('/smsAction/smsSentLog/').push();
      var smsSentStatus = "Message error " + err.message;
  });
}

// check for changes to Firebase at ~/sendSMS/boolean
database.ref('/smsAction/').on('value', function(snapshot) { 
    var dbImage = snapshot.val();
    if (dbImage.sendSMS === true) {
        // console.log(dbImage);
        database.ref().once('value') 
            .then(function(snapshot) {
                // if the sendSMS flag in Firebase is true, send an SMS
                // this gets triggered by the org page button to send SMS
                // console.log(snap);
                var fullDB = snapshot.val();
                // console.log(fullDB.Volunteers);
                // console.log(typeof fullDB.Volunteers);
                for (x in fullDB.Volunteers){ 
                	console.log(fullDB.Volunteers[x]);
                    if (fullDB.Volunteers[x].smsOpt === 'on') { 
                        var phone = fullDB.Volunteers[x].phone;
                        var theMessage = fullDB.smsAction.smsContent;        
                        sendSMS(phone,theMessage);
                    }
                    else { 
                       
                    }
                }
        });
    }    
});

// get today as 'mm-dd-yyy'
function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    } 
    if(mm<10) {
        mm='0'+mm
    } 
    today = mm+'-'+dd+'-'+yyyy;
    return today;
}


//------------------------ END SMS ---------------------------

    
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;


app.get('/', function(req, res) {   
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/index', function(req, res) {   
	console.log("received");
	var inputHours=req.body.text;
	var srcPhone=req.body.from;
	srcPhone = srcPhone.substring(2);
  var inputDate = getToday();
  database.ref().once('value') 
    .then(function(snapshot) {
      var dbImage = snapshot.val();
      var vols = dbImage.Volunteers;
      var newTotal = 0;
      for (x in vols) {
        if (vols[x].phone === srcPhone) {
          if (vols[x].totalHours === undefined) {
          	newTotal = parseInt(inputHours);
          } else {
          		newTotal = parseInt(vols[x].totalHours) + parseInt(inputHours);
          	}
          var fanout = {};
          fanout['/Volunteers/'+x+'/totalHours/'] = newTotal;
          fanout['/Volunteers/'+x+'/log/'+inputDate+'/'] = parseInt(inputHours);
          fanout['/Volunteers/'+x+'/lastUpdateDate/'] = inputDate;
          fanout['/Volunteers/'+x+'/lastUpdateHours/'] = parseInt(inputHours);
          database.ref().update(fanout);
        }
      }
  });
    
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/views/login.html');
});


app.get('/index', function (req, res) {
	
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/auth', function (req, res) {
	
	res.sendFile(__dirname + '/views/auth.html');
});


app.get('/org', function (req, res) {
	res.sendFile(__dirname + '/views/org.html');
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

