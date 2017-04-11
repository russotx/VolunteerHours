// JS for organization page

document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        createUser();
        console.log("click works");
    }

    function createUser () {
        var email = document.getElementById("volunteerEmail").value;
        var password = document.getElementById("volunteerPassword").value;
        console.log(email);
        console.log(password);

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            user.sendEmailVerification();
            logout();
            clear(); //debugging purpose
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }


function logout () {
  firebase.auth().signOut().then(function() {
  }, function(error) {
  console.log(error);
  });
}

function clear () {
    document.getElementById("volunteerPassword").value = "";
    document.getElementById("volunteerEmail").value = "";
}
