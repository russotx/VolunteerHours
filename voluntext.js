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

    // event listener for login page
    loginContainer.addEventListener('click', routeLogin);

    // returns an array of all the data from every input field on a page 
    function grabAllFieldsData() {
        var userInputArray = [];
        var i = 0;
        while (document.getElementsByTagName('input')[i] != null) {
            var userInput = document.getElementsByTagName('input')[i].value;    
            userInputArray.push(userInput);
            i++;    
        }
        return userInputArray;
    }   

    // returns a string with the data from an input field with the id parameter
    function grabFieldText(id) {
        var targetId = '#' += id;
        var targetField = document.querySelector(targetId);
        return targetField.textContent();
    }

    // returns true of authentication succeeded
    function isAuthorized(username, password) {
        var status = false; 
        
        //...
        
        return status;
    }

    // sends the user to either the admin or volunteer page on authentication success
    function routeLogin(event) {
        // when using event.target the button should not contain nested elements
        var buttonClicked = event.target;
        
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


