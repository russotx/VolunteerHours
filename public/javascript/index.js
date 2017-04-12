document.getElementById("logout").onclick = function(event){
  event.preventDefault();
  logout();
  }

// var provider = new firebase.auth.FacebookAuthProvider();




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


