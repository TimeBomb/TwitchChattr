let TwitchChatClient = require('./lib/twitchChatClient.js');
let MessageFilter = require('./lib/messageFilter.js');
let TwitchLivestream = require('./lib/twitchLivestream.js');
const CONFIG = require('../../private.config.js');
const CHAT_CONFIG = require('../../app.config.js').CHAT;

// TODO: UX for initial user configuration for user/pass (set up in private.config.js)

let messageFilter = new MessageFilter();

function initLivestream() {
    new TwitchLivestream('player');
}

// TODO: Multi-channel support leveraging `to`
function newMessage(message, from, to) {
    if (messageFilter.filterMessage(message)) {
        let $messagesFiltered = document.getElementById('messagesFiltered');
        $messagesFiltered.innerText = messageFilter.getMessagesFiltered();
        return;
    }

    let $chat = document.getElementById('chat');
    let fullMessage = `${from}: ${message}`;

    $chat.appendChild(document.createTextNode(fullMessage));
    $chat.appendChild(document.createElement('br')); // TODO: CSS and what-not so we don't have to do this

    $chat.scrollTop = $chat.scrollHeight - $chat.clientHeight; // Scroll to bottom; TODO: Find a better space for this. And organize the rest of this file while you're at it.
}

let chatClient = new TwitchChatClient();

chatClient.on("chat", function (channel, userState, message, self) {
    // TODO: When adding support for chatting, make sure to instantly append your own chat messages
    // Don't see your own messages that were already instantly appended
    if (self) {
        return;
    }
    newMessage(message, userState['display-name'], channel);
});

chatClient.on('connected', function() {
    newMessage('Connected!', 'Server');
})

window.onload = function() {
    newMessage('Connecting...', 'Server');
    chatClient.connect();
    initLivestream();
};