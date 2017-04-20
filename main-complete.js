var database = firebase.database();
var messagesRef = database.ref('messages');

var form = document.getElementById('message-form');
var message = document.getElementById('message');
var messages = document.getElementById('messages');

// Initialize Chat
function chat() {
  // Saves message on form submit.
  form.onsubmit = function(e){
    e.preventDefault();
    saveMessage(e);
  }

  // Load previous chat messages.
  loadMessages();

  // Focus on the input
  message.focus();
}

// Load chat message history and listen for new messages.
function loadMessages() {
  messagesRef.off();
  messagesRef.on('child_added', function(data) {
    var val = data.val();
    displayMessage(val.text);
  });
};

// Save a new message on the Firebase DB.
function saveMessage(e){
  e.preventDefault();
  messagesRef.push({text: message.value}).then(function() {
    // Clear message text field and focus on it.
    message.value = '';
    message.focus();
  });
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
