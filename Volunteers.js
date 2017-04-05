/*****************************************
*
*    VOLUNTEER FUNCTIONS
* 
******************************************/

/* --[EVENT]-- */
// event listener for volunteer clicking button to submit hours online
$('#submit-hours').on('click', submitHours);

/* --[EVENT]-- */
// event listener for volunteer clicking button to submit hours online
$('#cancel-hours').on('click', undoLastSubmit);

/* --[EVENT]-- */
// event listener for volunteer clicking button to submit hours online
$('#post-fb').on('click', postVoltoFB);


// submit hours manually online
function submitHours(){
    var volHours = grabVolHours();
    recordVolHours(volHours);
}

// get volunteer hours from the input field
function grabVolHours() {

    // ...

}

// records volunteer hours to the database
function recordVolHours(volData) {
    
    // send volData to firebase...

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



