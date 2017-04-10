/*****************************************
*
*       INITIALIZE FIREBASE
* 
******************************************/

var config = {
    apiKey: "AIzaSyAwiUWpP21I3pAPdZExjgIj5ebtvFMjYrs",
    authDomain: "realtime-database-331a6.firebaseapp.com",
    databaseURL: "https://realtime-database-331a6.firebaseio.com",
    projectId: "realtime-database-331a6",
    storageBucket: "realtime-database-331a6.appspot.com",
    messagingSenderId: "382530147790"
  };
firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref();

/*****************************************
*
*       LOGIN EVENTS
* 
******************************************/

// for login to the organization page
var adminButton = document.querySelector('#admin-login');
// for login to a volunteer page
var volButton = document.querySelector('#vol-login');
// container surrounding all login buttons
var loginContainer = document.querySelector('#login-container');

/* --[EVENT]-- */
// event listener for login page
//loginContainer.addEventListener('click', routeLogin);

// sends the user to either the admin or volunteer page on authentication success
function routeLogin(event) {
    // when using event.target the button should not contain nested elements
    var buttonClicked = event.target;
    var inputData = fieldData.getAll();
    var name = inputData[0];
    var pwd = inputData[1];
    // direct functionality depending on button clicked 
    switch (buttonClicked.id) {
        // user clicks admin button
        case (adminButton) : 
            var authStatus = isAuthorized(name, pwd);
            if (authStatus) { // auth success

                //...
                
            } else // auth failed
                {

                    //...
                }
        break;

        // user clicks volunteer button
        case (volButton) : 
            var authStatus = isAuthorized(name, pwd);
            if (authStatus) { // auth success

                //...
                
            } else // auth failed
                {

                    //...
                }
        break; 
        // end of switch statement
    }
}



// returns true of authentication succeeded
function isAuthorized(username, password) {
    var status = false; 
    
    //...
    
    return status;
}




/*****************************************
*
*       ONBOARDING FUNCTIONS
* 
******************************************/

/*************
*  GLOBALS
**************/


/* --[EVENT]-- */
// Event listener for onboarding form button uses onboardVol() as callback
$('#onboard-button').on('click',onboardVol);

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

function emailNewUser(userData) {

    // email via front end 
    // or send request to Node? ...

}



/*****************************************
*
*   QUERY VOLLUNTEER DATABASE FUNCTIONS
* 
******************************************/

/**********
* GLOBALS
***********/

// store query result to pass to SMS API
var QueryResult = {};


/*--[EVENT]--*/
// Event listener for query button
//$('#query-button').on('click',queryVolDB);

/*--[EVENT]--*/ 
// Event listener for clear query button
//$('#clear-Q-button').on('click',clearQuery);

/*--[EVENT]--*/ 
// Event listener for schedule SMS from query button
//$('#sched-sms').on('click',schduleQuerySMS);


// queries the volunteer database, displays the result, 
// stores the result as a gobal variable
function queryVolDB(){
    var queryRules = grabQueryFields();
    if(isValidQuery(queryRules)) { // valid query
        var queryObject = fetchDBQuery(queryRules);
        displayQuery(queryObject);
        QueryResult = captureQueryResult();
    } else // invalid query
        {
            clearQuery();
            // ...
        }
}

// validates the query input to ensure compatibility with database
// structure. Check for non alphanumeric chars
function isValidQuery(query) {
    var status = false;

    // ...

    return status;
}

// returns an array (or object?) of all the query fields
function grabQueryFields() {
    // variables to be assigned to ids that match input fields in the DOM
    var name, beginDate, endDate;
    var queryFields = []; // or could make this an object too
    
    queryFields[0] = fieldData.grabById(name);
    queryFields[1] = fieldData.grabById(beginDate);
    queryFields[2] = fieldData.grabById(endDate);

    return queryFields;
}

// accesses the firebase DB and returns a result as an object
function fetchDBQuery(query) {
    var queryResultObj = {};
    
    // ...
    
    return queryResultObj;
}

// displays the results of the query to the admin's screen
function displayQuery(results) {

    $('#query-display').append( /*   ...  */ );

}

// captures the query result as a global object to pass to outgoing SMS function.
function captureQueryResult() {

    // ...

}

// schedule an sms message for the group of volunteers queried from the DB
function scheduleQuerySMS(results){
    var schedPreferences = grabSchedFields();
    runTillAPI();
    logSMSbatchInDB();
}

// cancels the most recent scheduled sms 
function cancelQuerySMS(){

    // ...

}

// shares data from a DB query to Facebook
function shareQueryFB() {
    // ...
}

// turn data into a string which can be appended with predefined text 
// about the organization and the Voluntext app
function parseQueryData() {
    // ...
}

// returns an array of data from input fields for scheduling SMS 
function grabSchedFields() {
    var schedData = [];
    schedData = fieldData.grabSet();
    return schedData;
}

// logs the batch of sent SMS to the DB for future review 
function logSMSbatchInDB() {
    //... 
}


/*****************************************
*
*    VOLUNTEER FUNCTIONS
* 
******************************************/

/* --[EVENT]-- */
// event listener for volunteer clicking button to submit hours online
//$('#submit-hours').on('click', submitHours);

/* --[EVENT]-- */
// event listener for volunteer clicking button to submit hours online
//$('#cancel-hours').on('click', undoLastSubmit);

/* --[EVENT]-- */
// event listener for volunteer clicking button to submit hours online
//$('#post-fb').on('click', postVoltoFB);


// submit hours manually online
function submitHours(){
    // need Email, Hours, begin date, end date
    var volHours = fieldData.grabSet('.myHours');
    recordVolHours(volHours);
}

// returns true if toggle button for opting in to sms messages is on
function isSMSoptout() {
    var smsBox = document.getElementById('sms-toggle');
    if (smsBox.checked) {
        return false;
    } else 
        {
            return true;
        }
}

function isValidSubmit(theArray = []) {
    if (!(isNumeric(theArray[1])) || !(isNumeric(theArray[2])) || !(isNumeric(theArray[3]))) {
        return false;
    } else 
        {
            return true;
        }
}

// records volunteer hours to the database
function recordVolHours(volData) {
    // need the volunteer's key to access them in the DB
    var volEmail = noDotEmail(volData[0]);
    var volKey;
    var volExistingHrs = 0;
    database.ref().once('value')
        .then(function(snapshot) {
            var theDB = snapshot.val();
            volKey = theDB.volsByEmail[volEmail];
            if (theDB.volKey.totalHours != undefined)
            {
                // get the total hours if they exist
                volExistingHrs = theDB.volKey.totalHours;
            } else 
                {
                    volExistingHrs = 0;   
                }
        });
    if (isValidSubmit(volData)) {
        // convert submission date integer mmddyyyy to a string 
        submissionDate = volData[3].toString();
        newSubmission = {};
        // add new hours to total hours
        var totalHours = volExistingHrs+volData[1]; 
        newSubmission['/Volunteers/'+volKey+'/totalHours/'] = totalHours;
        // add the last updated hours
        newSubmission['/Volunteers/'+volKey+'/lastUpdateHours/'] = volData[1];
        // submit the end date from the volunteer's submit period
        newSubmission['/Volunteers/'+volKey+'/lastUpdateDate/'] = submissionDate;
        // add the submission to the log
        newSubmission['/Volunteers/'+volKey+'/log/'+submissionDate+'/'] = volData[1];  
        // opt volunteer out of sms messages if they flip the toggle switch
        if (isSMSoptout) {
            newSubmission['/Volunteers/'+volKey+'/smsOpt/']  = false;    
        }
        // update the database at the volunteer's key with the new data
        database.ref().update(newSubmission);    
    } else // data validation error
        {
            alert("invalid data");
        } 

}


// posts recent volunteer hours to Facebook
function postVoltoFB() {
    connectFBacct();
    buildVolFBmsg();
    submitFB();
}

// connects user to their Facebook account within our web app
function connectFBacct() {

    // FB api functionality ...

}

// builds a message for the volunteer's Facebook post
function buildVolFBmsg() {
    
    // ...
    
}

// actually submits the facebook post
function submitFB() {

    // Facebook api functionality

}

/******************************************
*
*   fieldData Object: 
*    - handles grabbing data from
*    - form fields
* 
*******************************************/

// object of methods for dealing with form field data without jQuery
var fieldData = {
    // returns string of data from an input element matching id, does not need #
    grabById : function(id) {
        var targetId = '#' + id;
        var targetField = document.querySelector(targetId);
        return targetField.value;
    },
    // returns an array of input from a select group of fields matching the parameter
    // requires prepend parameter with . for class, # for id. '[name="nameString"]' etc.
    grabSet : function(selector) {
        var userInputArray = [];
        var i = 0;
        while (document.querySelector(selector)[i] != null) {
            var userInput = document.getElementsByTagName('input')[i].value;    
            userInputArray.push(userInput);
            i++;    
        }
            return userInputArray;
    },
    // returns an object containing all the data matching the fields with the
    // selector
    fieldsToObject : function(selector) {
        var userInputObj = document.querySelectorAll('input '+selector);
        return userInputObj;
    },
    // returns an array of all the data from every input field on a page 
    grabAll : function() {
        var userInputArray = [];
        var i = 0;
        while (document.getElementsByTagName('input')[i] != null) {
            var userInput = document.getElementsByTagName('input')[i].value;    
            userInputArray.push(userInput);
            i++;    
        }
            return userInputArray;
    },
    // clears all input elements on the page
    clearAll : function() {
        var i = 0;
        while (document.getElementsByTagName('input')[i] != null) {
            document.getElementsByTagName('input')[i].value = "";    
            i++;    
        }     
    },
    // clears an input element with matching id
    clearById : function(id) {
        var targetId = '#' + id;
        var targetField = document.querySelector(targetId);
        targetField.value = "";    
    }
} //.... end of fieldData object.
