let TwitchChatClient = require('./lib/twitchChatClient.js');
let MessageFilter = require('./lib/messageFilter.js');
const CONFIG = require('../../private.config.js');

// TODO: UX for initial user configuration for user/pass (set up in private.config.js)

let messageFilter = new MessageFilter();

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

let chatClient = new TwitchChatClient({
    username: CONFIG.username,
    password: CONFIG.password,
    debug: true,
    channels: ['#vinesauce'] // TODO: Remove this when we have proper channel support; this is only for debugging (set to popular, active channel)
});

chatClient.on("chat", function (channel, userState, message, self) {
    // TODO: When adding support for chatting, make sure to instantly append your own chat messages
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
};