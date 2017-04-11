// JS for login page
document.getElementById("signIn").onclick = function(event){
  event.preventDefault();
  authenticateUser();
  console.log("you a beast");
  }


function authenticateUser() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
     //debugging purpose
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/wrong-password') {
        alert('Sorry, but the password was incorrect.');
      } else {
        alert(errorMessage);
        } 
    });
  }

// var provider = new firebase.auth.FacebookAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    window.location = "/index";
  }
});

  // attempting to make facebook login work 

// auth.currentUser.linkWithPopup(provider);


