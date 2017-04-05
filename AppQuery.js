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
$('#query-button').on('click',queryVolDB);

/*--[EVENT]--*/ 
// Event listener for clear query button
$('#clear-Q-button').on('click',clearQuery);

/*--[EVENT]--*/ 
// Event listener for schedule SMS from query button
$('#sched-sms').on('click',schduleQuerySMS);


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

