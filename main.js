var database = firebase.database();
var messagesRef = database.ref('messages');

var provider = new firebase.auth.GoogleAuthProvider();
var user = null;
var token = null;
var email = null;


///// html form, messages, and message selectors
var form = document.getElementById('message-form');
var message = document.getElementById('message');
var messages = document.getElementById('messages');

// Initialize Chat
function chat() {


  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    user = result.user;

    alert(user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
});

  // Save message on form submit.
  form.onsubmit = function(e){
    e.preventDefault(e);
    saveMessage(e);
  }
  // Load previous chat messages.
  loadMessages();
  // Focus on the input
  message.focus();
}

// Load chat message history and listen for new messages.
function loadMessages() {
  messagesRef.off();// reset any promises
  // whenever any child added to messages we waant to do something
  messagesRef.on('child_added', function(data){
    var key = data.key;
    var val = data.val();

    displayMessage(val);
  });

};

// Save a new message on the Firebase DB.
function saveMessage(e){
  messagesRef.push({ text: message.value }).then(function(){
    message.value = '';
    message.focus();
  });
};

// Display a message in the UI.
function displayMessage(e) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(e.text);
  node.appendChild(textnode);
  messages.appendChild(node);
  messages.scrollTop = messages.scrollHeight;
};

chat();
