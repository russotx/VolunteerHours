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
loginContainer.addEventListener('click', routeLogin);

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
