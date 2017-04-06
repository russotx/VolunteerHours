// Initialize Firebase
   var config = {
    apiKey: "AIzaSyAwiUWpP21I3pAPdZExjgIj5ebtvFMjYrs",
    authDomain: "realtime-database-331a6.firebaseapp.com",
    databaseURL: "https://realtime-database-331a6.firebaseio.com",
    projectId: "realtime-database-331a6",
    storageBucket: "realtime-database-331a6.appspot.com",
    messagingSenderId: "382530147790"
  };
  firebase.initializeApp(config);

  // the database
  var database = firebase.database();
  var ref = database.ref();

  var testVol1 = {  name : 'bob',
                    email : 'bob@gmail.com',
                    phone : 5552348769,
                    smsOpt : false,
                    link : 'https://firebase.com',
                    totalHours : 750,
                    lastUpdateHours : 32,
                    lastUpdateDate : '03/24/2017',
                    log: { 03242017 : 54,
                           03232017 : 75,
                           03222017 : 36,
                           03212017 : 98,
                           03202017 : 230,
                           03192017 : 445 } 
                };

  var testVol2 = {  name : 'dan',
                    email : 'dan@gmail.com',
                    phone : 5552348769,
                    smsOpt : true,
                    link : 'https://firebase.com',
                    totalHours : 600,
                    lastUpdateHours : 36,
                    lastUpdateDate : '02/24/2017',
                    log: { 02242017 : 36,
                           02232017 : 75,
                           02222017 : 36,
                           02212017 : 98,
                           02202017 : 230,
                           02192017 : 445 } 
                  };


  // log = every submission by the vol, uniqueDate will actually be a date as 
  // the key and number of hours as the value
  // SMSbattch = an object containing multiple volunteers to send messages to
  // queryResult = object containing volunteer hours data as result of a query
  var resetDB = {
    Volunteers : {
                    testVol1,
                    testVol2

                },

    Admin : {
                totalHours : 0,
                SMSbatch : {testVol1, testVol2}, 
                queryResult : {} 
            },
    volsByEmail : {
                email1 : 'key',
                email2 : 'key',
    }
  }

 ref.set(resetDB);
