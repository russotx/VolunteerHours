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

var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];

document.getElementById("currentMonth").innerHTML = n;
document.getElementById("currentYear").innerHTML =  "This Year"

var totalHours = 0;
// Click function to add hours to the table on the page
$("#submit").on('click', function(){
  totalHours+=parseInt(inputHours);
  var inputHours = $(".form-control").val();
  $(".form-control").val("");
  console.log(inputHours);
  console.log(typeof(totalHours));
  $("#tbody").append("<tr><td>"+inputHours+"</td><td>"+totalHours+"</td></tr>")

});


var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var n = month[d.getMonth()];