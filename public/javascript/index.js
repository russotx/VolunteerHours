
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
  //..
  
  $("#tbody").append("<tr><td>"+inputHours+"</td><td>"+hoursYear+"</td></tr>")

});


//Get the current user's key
function getVolKey(email) {
    var emailToKey = function(inputEmail) {
        var converted = (inputEmail).split('.').join('*');
        return converted;
    };
    var volKeyEmail = emailToKey(email.toLowerCase());
    var volKey;
    database.ref().once('value')
        .then(function(snapshot) {
            var theDB = snapshot.val();
            volKey = theDB.volsByEmail[volKeyEmail];
            return volKey;
        });
}