/*****************************************
*
*       ONBOARDING FUNCTIONS
* 
******************************************/

// setup firebase
firebase.initializeApp(config);
var database = firebase.database();


/* --[EVENT]-- */
// Event listener for onboarding form button uses onboardVol() as callback
$('#onboard-button').on('click',onboardVol);

// Adds a single new volunteer to the database from DOM input
function onboardVol() {
    // get an array with all the new volunteer's data
    newVolData = fieldData.grabAll();
    if (isValidVolData(newVolData)) {
        // save ther user data to Firebase
        newUserToDB(newVolData);
        emailNewUser(newVolData);
    } else // data validation error
        {
            alert("invalid data");
        }
}

// validates input for onboarding volunteers to ensure compatibility
// with the database. Checks for non alphanumeric characters, returns true if ok.
function validateUserData(dataArray=[]) {
    var status = false;

    //...

    return status;
}

// sends new user data to the DB
function newUserToDB(userData) {
    var fanoutObject = {};
    
    //...

}

function emailNewUser(userData) {

    // email via front end 
    // or send request to Node? ...

}



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






