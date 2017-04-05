/*****************************************
*
*    BACKEND FUNCTIONS
* 
******************************************/

/* --[EVENT]-- */
// watches for incoming SMS from volunteers via Till
function watchSMSincoming() {
//...
recordSMSinDB();
parseSMSdata();


}

// returns a useful data structure of the incoming SMS data 
function parseSMSdata() {
//...
}

// saves the incoming volunteers hours from SMS to the database
function recordSMSinDB() {
//...
}

/* --[EVENT]-- */
// watches the Firebase database for updated hours data
function watchDBforSMS() {
    database.on('value',function(snapshot){

        var liveUpdate = fetchSMSfromDB(snapshot); // might not be necessary to have as separate func
        orgUpdateDataDisplay(liveUpdate);
        volUpdateDataDisplay(liveUpdate);

    });
}

// hours recorded updated live to the organization facing page
function orgUpdateDataDisplay() {
//...
}

// hours recorded updated live to the volunteer facing page
function volUpdateDataDisplay() {
//...
}


// grabs the latest SMS data from the DB and feeds it live to webpages.
function fetchSMSfromDB(snap) {
    var freshData = snap.val(); 
// this might be unnecessary as a function
}




