
var adjectives = ["adamant", "adroit", "amatory", "animistic", "antic",
"arcadian", "baleful", "bellicose", "bilious", "boorish", "calamitous",
"caustic", "cerulean", "comely", "concomitant", "contumacious", "corpulent",
"crapulous", "defamatory", "didactic", "dilatory", "dowdy", "efficacious",
"effulgent", "egregious", "endemic", "equanimous", "execrable", "fastidious",
"feckless", "fecund", "friable", "fulsome", "garrulous", "guileless",
"gustatory", "heuristic", "histrionic", "hubristic", "incendiary", "insidious",
"insolent", "intransigent", "inveterate", "invidious", "irksome", "jejune",
"jocular", "judicious", "lachrymose", "limpid", "loquacious", "luminous",
"mannered", "mendacious", "meretricious", "minatory", "mordant", "munificent",
"nefarious", "noxious", "obtuse", "parsimonious", "pendulous", "pernicious",
"pervasive", "petulant", "platitudinous", "precipitate", "propitious", "puckish",
"querulous", "quiescent", "rebarbative", "recalcitant", "redolent", "rhadamanthine",
"risible", "ruminative", "sagacious", "salubrious", "sartorial", "sclerotic",
"serpentine", "spasmodic", "strident", "taciturn", "tenacious", "tremulous",
"trenchant", "turbulent", "turgid", "ubiquitous", "uxorious", "verdant", "voluble",
"voracious", "wheedling", "withering", "zealous"];

var nouns = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows",
"laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes",
"glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet",
"exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons",
"jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream",
"ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel",
"carnival", "locomotive", "hot air balloon", "praying mantis", "animator",
"artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer",
"flatter", "stylist", "leadman", "limner", "make-up artist", "model",
"musician", "penciller", "producer", "scenographer", "set decorator",
"silversmith", "teacher", "auto mechanic", "beader", "bobbin boy",
"clerk of the chapel", "filling station attendant", "foreman",
"maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater",
"patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman",
"soaper", "stationary engineer", "wheelwright", "woodworkers"];

function randomEl(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}


var userName = document.getElementById('userName');
userName.value = randomEl(adjectives)+' '+randomEl(nouns);














///////////////////////
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
