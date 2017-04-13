/*************************************************

        AUTHENTICATION (Logout/Redirect)

*************************************************/
// Used to call fucntion to check if Facebook user is logged in 
// document.getElementById("face").onclick = function(event){
//   event.preventDefault();
//   face();
//   }


// On click posts to calls function to post to currently logged in Facebook user
document.getElementById("post").onclick = function(event){
  event.preventDefault();
  var fbHours = $("#myHours").val();
  submitHours();
  post();
  }


//  Posts to facebook
function post() {
  FB.login(function(){FB.api('/me/feed', 'post', {message: "I Volunteered "+ fbHours +" hours!" });}, {scope: 'publish_actions'});
}

// Checks if facebook user is logged in 
//   function face () {
//     FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     console.log('Logged in.');
//   }
//   else {
//     FB.login();
//   }
// });

//   }





document.getElementById("logout").onclick = function(event){
  event.preventDefault();
  logout();
  }

// var user = firebase.auth().currentUser;
// console.log(user);

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
var db = firebase.database();

var theDB;

var userKey;

var name;

var phone;

var startDate;

var inputHours;

var hours;

// Get key for current user

db.ref().once('value')
          .then(function(snapshot) {
            theDB = snapshot.val();
            theUser = theDB.currentlogin;  
             
}).then(function(){
    console.log(theUser);
    userKey = getVolKey(theUser, theDB);
}).then(function(){
    // console.log(userKey);
    name = theDB.Volunteers[userKey].name;
    console.log(name);
    phone = theDB.Volunteers[userKey].phone;
    console.log(phone);
    startDate = theDB.Volunteers[userKey].startDate;
    console.log(startDate);
    hours = theDB.Volunteers[userKey].hours;
    $("tbody").append("<tr><td>"+name+"</td><td>"+phone+"</td><td id='hours'>"+hours+"</td><td>"+startDate+"</td></tr>");
   
})


// Click function to add the hours collected to totalHours in Firebase
$("#submit").on('click', function(){
  submitHours();

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
    var beginM = volHours[1];
    var beginD = volHours[2];
    var beginY = volHours[3];
    var endM = volHours[4];
    var endD = volHours[5];
    var endY = volHours[6]; 
    var formSelector = $('.my-hours');
    console.log('the vol hours: '+volHours);
    // validate the input dates for hours
    if ((validateDate(formSelector,beginM)) && (validateDate(formSelector,beginD)) && (validateYear(formSelector,beginY)) &&
        (validateDate(formSelector,endM)) && (validateDate(formSelector,endD)) && (validateYear(formSelector,endY)))  {
            
            recordVolHours(volHours);

    }
}


function validateDate($jqSelector,mmORdd) {
    function isDateValidFunc(mmORdd) {
        if (mmORdd.length != 2) {
            return false;
        } else {
            for (x=0;x<mmORdd.length;x++) {
                if ((parseInt(mmORdd[x] === NaN)) || (mmORdd.length != 2)) {
                    return false;
                }
            }
            return true;
        }
    }
    if (!isDateValidFunc(mmORdd)) {
      $jqSelector.css("background-color","#FFA8A8");
      $jqSelector.val("MMDDYYYY");  
      return false;
    }
    return true;
}

function validateYear($jqSelector,yyyy) {
    function isDateValidFunc(yyyy) {
        if (yyyy.length != 4) {
            return false;
        } else {
            for (x=0;x<yyyy.length;x++) {
                if (parseInt(yyyy[x]) === NaN) {
                    return false;
                }
            }
        }
            return true;
    }
    if (!isDateValidFunc(yyyy)) {
      $jqSelector.css("background-color","#FFA8A8");
      $jqSelector.val("MMDDYYYY");  
      return false;
    }
    return true;
}

// records volunteer hours to the database
// volData = [ 0:hours, 1:begindate m, 2:begindate d, 3: begindate y, 4: enddate m, 5: enddate d, 6: enddate y]
function recordVolHours(volData) {
    console.log('the volunteer data: '+volData);
    // need the volunteer's key to access them in the DB
    var volKey;
    var volExistingHrs = 0;
    // turn hours into an integer
    var intHours = parseInt(volData[0]);
    db.ref().once('value')
        .then(function(snapshot) {
            var theDB = snapshot.val();
            var userEmail = theDB.currentlogin;
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
            db.ref().update(newSubmission);    
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
