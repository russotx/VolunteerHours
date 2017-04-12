/*************************************************

        AUTHENTICATION (Logout/Redirect)

*************************************************/

document.getElementById("logout").onclick = function(event){
  event.preventDefault();
  logout();
  }

// var provider = new firebase.auth.FacebookAuthProvider();

var user = firebase.auth().currentUser;
console.log(user);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
  } else if (!user) {
    window.location = "/login";
  }
});


function logout () {
  firebase.auth().signOut().then(function() {
  }, function(error) {
  console.log(error);
  });
}

/*********************************************
        DOM Code
*********************************************/

//Get key for current user
var userKey = getVolKey("user@email.com")


// Get total hours and start date from firebase and assign them to variables
var totalHours = db.Volunteers[key].totalHours;
var startDate = db.Volunteers[key].startDate;


// Click function to add the hours collected to totalHours in Firebase
$("#submit").on('click', function(){
  
  var inputHours = $(".form-control").val();
  $(".form-control").val("");
  console.log(inputHours);
  //add hours to totalHours in Firebase
  submitHours();
  
  $("#tbody").append("<tr><td>"+inputHours+"</td><td>"+hoursYear+"</td></tr>")

});


//Get the current user's key
function getVolKey(email, snap) {
    var emailToKey = function(inputEmail) {
        var converted = (inputEmail).split('.').join('*');
        return converted;
    };
    var volKeyEmail = emailToKey(email.toLowerCase());
    var volKey = snap.volsByEmail[volKeyEmail];
    return volKey;
}

/*****************************************
*
*    VOLUNTEER FUNCTIONS
* 
******************************************/


// submit hours manually online
function submitHours(){
    // need Email, Hours, begin date, end date
    var volHours = fieldData.grabSet('my-hours');
    console.log('the vol hours: '+volHours);
    recordVolHours(volHours);
}

// records volunteer hours to the database
// volData = [ 0:hours, 1:begindate m, 2:begindate d, 3: begindate y, 4: enddate m, 5: enddate d, 6: enddate y]
function recordVolHours(volData) {
    console.log('the volunteer data: '+volData);
    // need the volunteer's key to access them in the DB
    var userEmail = database.ref().currentLogin;
    var volKey;
    var volExistingHrs = 0;
    // turn hours into an integer
    var intHours = parseInt(volData[0]);
    database.ref().once('value')
        .then(function(snapshot) {
            var theDB = snapshot.val();
            volKey = getVolKey(userEmail,theDB);
            console.log('volunteer key: '+volKey);
            console.log(theDB[volKey]);
            if (theDB.Volunteers[volKey].totalHours != undefined)
            {
                // get the total hours if they exist
                volExistingHrs = parseInt(theDB.Volunteers[volKey].totalHours);
            } else 
                {
                    volExistingHrs = 0;   
                }
            // get today's date as string 'mm-dd-yyyy'
            submissionDate = getToday();
            var begin = volData[1]+'-'+volData[2]+'-'+volData[3];
            var end = volData[4]+'-'+volData[5]+'-'+volData[6];
            newSubmission = {};
            // add new hours to total hours
            var totalHours = volExistingHrs+intHours; 
            newSubmission['/Volunteers/'+volKey+'/totalHours/'] = totalHours;
            // add the last updated hours
            newSubmission['/Volunteers/'+volKey+'/lastUpdateHours/'] = intHours;
            // submit the end date from the volunteer's submit period
            newSubmission['/Volunteers/'+volKey+'/lastUpdateDate/'] = submissionDate;
            // add the submission to the log
            newSubmission['/Volunteers/'+volKey+'/log/'+begin+':'+end+'/'] = intHours;  
            database.ref().update(newSubmission);    
        });
      
    

}

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
    grabSet : function(className) {
        var userInputArray = [];
        var i = 0;
        while (document.getElementsByClassName(className)[i] != null) {
            var userInput = document.getElementsByClassName(className)[i].value;    
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
