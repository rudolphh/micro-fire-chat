var database = firebase.database();
var messagesRef = database.ref('messages');

var form = document.getElementById('message-form');
var message = document.getElementById('message');
var messages = document.getElementById('messages');

// Initialize Chat
function chat() {
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
