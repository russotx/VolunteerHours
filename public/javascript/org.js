// JS for organization page

document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        createUser();
        console.log("click works");
    }

    function createUser () {
        var email = document.getElementById("volunteerEmail").value;
        var password = document.getElementById("volunteerPassword").value;
        console.log(email);
        console.log(password);

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            user.sendEmailVerification();
            logout();
            clear(); //debugging purpose
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }


function logout () {
  firebase.auth().signOut().then(function() {
  }, function(error) {
  console.log(error);
  });
}

function clear () {
    document.getElementById("volunteerPassword").value = "";
    document.getElementById("volunteerEmail").value = "";
}

// Adds a single new volunteer to the database from DOM input
function onboardVol() {
    // get an array with all the new volunteer's data
    newVolData = fieldData.grabAll();
    console.log(newVolData);
    volSMSpref = isSMSopt();
    console.log(volSMSpref);
    if (isValidVolData(newVolData)) {
        // push the volSMSpref value into the end of the array 
        newVolData[newVolData.length-1] = volSMSpref;
        // save ther user data to Firebase
        newUserToDB(newVolData);
        emailNewUser(newVolData);
    } else // data validation error
        {
            alert("invalid data");
        } 
}


// returns true if toggle button for opting in to sms messages is on
function isSMSopt() {
    var smsBox = document.getElementById('sms-toggle');
    if (smsBox.checked) {
        return true;
    } else 
        {
            return false;
        }
}


// returns true if all chars in a string are alphaNumeric
function isAlpha(inputString) {
  // remove spaces from name
  var strNoSpaces = inputString.split(' ').join('');
  console.log(strNoSpaces);
  for (i = 0; i < strNoSpaces.length; i++) {
    var code = strNoSpaces.charCodeAt(i);
    if (!(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

function isNumeric(str) {
    // remove dashes from phone number
    var strNoDashes = str.split('-').join('');  
    for (i = 0; i < strNoDashes.length; i++) {
        var code = strNoDashes.charCodeAt(i);
        if (!(code > 47 && code < 58)) { // numeric (0-9)
          return false;
        }
    }
    return true;
}

function noSpaces(str) {
    for (i=0; i < str.length; i++) {
        if (str.charAt(i) === ' ') {
            return false;
        }
    }
    return true;
}


// validates input for onboarding volunteers to ensure compatibility
// with the database. Checks for non alphanumeric characters, returns true if ok.
function isValidVolData(dataArray=[]) {
    console.log(isAlpha(dataArray[0]));
    console.log(isNumeric(dataArray[2]));
    console.log(noSpaces(dataArray[1]));
    if (!(isAlpha(dataArray[0])) ||
        !(isNumeric(dataArray[2])) ||
        !(noSpaces(dataArray[1]))) {
        return false;
    } 
    return true;
}


// sends new user data to the DB
// index 0 = name, 1 = email, 2 = phone, 3 = smsOpt
function newUserToDB(userData=[]) {
    var volsRef = database.ref('/Volunteers/');
    var newVolRef = volsRef.push();
    var volLink = newVolRef.toString();
    var volKey = newVolRef.key;
    var newVol = {
        name : userData[0],
        email : userData[1],
        phone : userData[2],
        smsOpt : userData[3],
        link : volLink
    }
    var fanout = {};
    var noDotEmail = (userData[1]).split('.').join('*');
    console.log(noDotEmail);
    console.log(volKey);
    fanout['/Volunteers/'+volKey+'/'] = newVol;
    fanout['/volsByEmail/'+noDotEmail+'/'] = volKey;   
    database.ref().update(fanout);
    console.log(newVol);
}
