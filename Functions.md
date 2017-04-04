# Functions List

------

## Staff Page

### Front End

- #### Login?
    - Node transfers client to separate page after auth
 
- #### Navigate to query page
    - just a button that acts as an anchor link


- #### Create new user profile button

    >interacts with Firebase api to save data to the DB  
    >needs to validate the data   
    >use form fields to aid validation and prevent  
    >accidental deletion of DB data

    - **FUNCTIONS**
        - `onboardVol()`
            - `grabUserData()`
            - `validateUserData()`
            - `newUserToDB()`
            - `emailNewUser()`

       
- #### Query data button

    >interacts with Firebase api to fetch data  
    >need to validate the data for special chars and   
    >empty fields  
    >implement ability to gather data by volunteer or anonymous agregates?
    >return an object based on `firebase/path/child.val()`  
    >write the object to the DOM  
    >interacts with FBook api to share data  

    - **FUNCTIONS**
        - `queryVolDB()`
            - `grabQueryFields()`
            - `validateQueryFields()`
            - `fetchDBQuery()`
            - `displayQuery()`
            - `clearQuery()`
            - `captureQueryResults()`

                >need to save the data as an object to pass as parameter  
                >to the send SMS function  
                
            - `scheduleQuerySMS()` *interface with functions below* 
            - `cancelQuerySMS()`  *interface with functions below* 

        - `shareQueryFB()`
            - `parseQueryData()`  

                >turn data into a string which can be appended with  
                >additional information about the organization and app  

- #### Send SMS

    >Takes the DB query results and sends them to the  
    >Till api for sending a group of outgoing messages  
    >Need to integrate Heroku scheduler and Node scheduling module  

    - **FUNCTIONS** 
        - `grabSchedFields()`  
        - `runTillAPI()`
        - `logSMSbatchInDB()`

            >need a place to store scheduled SMS batches so organization  
            >can view a list of scheduled messages  
            >capture this data to send to cancel function?

### Back end

- #### Receive SMS
    - Event listener watches for incoming response from Till
    - When data comes in from Till, save data to database
    - Event listener watches DB for new volunteer hours data 
    - When database has new volunteer hours, update the HTML  

    - **FUNCTIONS**
        - `watchSMSincoming()`
        - `parseSMSdata()`
        - `recordSMSinDB()`
        - `watchDBforSMS()`
        - `fetchSMSfromDB()`
        - **`orgUpdateDataDisplay()`**
            - *equivalent to `volUpdateDataDisplay()`*  

        >*Bonus functionality*:  
        >quarantine income SMS data until review?  
        >admin manually verifies data in daily batches  
        >and records in final DB?  
        


-----



## Volunteer Page

### Front End

>Facebook API interaction handled in the front end.  
>User authentication via firebase API on front end?  
    -or-  
>User authentication via Heroku api in Node.  

- #### Post Hours

    - **FUNCTIONS**
        - `submitHours()`
            - `grabVolHours()`
            - `recordVolHours()`

            >*Bonus Functionality*  
            > - `undoLastSubmit()`

- #### Post to Facebook
    >In case user submitted hours via phone  
    >need to have most recently submitted hours displayed  
    >with option to post to Facebook.  
    >when vol submits new hours via website they replace  
    >the existing hours displayed and allow user  
    >to post the new hours to Facebook.  
    
    - **FUNCTIONS**
        - `connectFBacct()`
        - `postVoltoFB()`
            - `buildVolFBmsg()`
            - `submitFB()`

### Back End

- #### Submit Hours Via SMS  

    >after receiving SMS Vol can respond with hours  
    >See staff page backend notes for Node handling  
    >of incoming SMS  
