var database = firebase.database();
var messagesRef = database.ref('messages');

var form = document.getElementById('message-form');
var message = document.getElementById('message');
var messages = document.getElementById('messages');

// Initialize Chat
function chat() {
  // Save message on form submit.

  // Load previous chat messages.

  // Focus on the input
}

// Load chat message history and listen for new messages.
function loadMessages() {

};

// Save a new message on the Firebase DB.
function saveMessage(e){

};

// Display a message in the UI.
function displayMessage(text) {
  var node = document.createElement("li");
  var textnode = document.createTextNode(text);
  node.appendChild(textnode);
  messages.appendChild(node);
  messages.scrollTop = messages.scrollHeight;
};

chat();
