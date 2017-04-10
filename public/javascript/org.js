// JS for organization page

document.getElementById("submit").onclick = function(event){
        event.preventDefault();
        createUser();
        console.log("you a beast");
    }

    function createUser () {
        var email = document.getElementById("volunteerEmail").value;
        var password = document.getElementById("volunteerPassword").value;
        console.log(email);
        console.log(password);

        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            user.sendEmailVerification();
            alert("created"); //debugging purpose
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                console.log(errorCode);
                var errorMessage = error.message;
                alert(errorMessage);
            });
        }