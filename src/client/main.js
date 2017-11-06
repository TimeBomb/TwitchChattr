let TwitchChatClient = require('../twitchChatClient.js');
const CONFIG = require('../../private.config.js');

// TODO: UX for initial user configuration for user/pass (set up in private.config.js)

// TODO: Multi-channel support leveraging `to`
function newMessage(message, from, to) {
    let $chat = document.getElementById('chat');
    let fullMessage = `${from}: ${message}`;

    $chat.appendChild(document.createTextNode(fullMessage));
    $chat.appendChild(document.createElement('br')); // TODO: CSS and what-not so we don't have to do this
}

let chatClient = new TwitchChatClient({
    username: CONFIG.username,
    password: CONFIG.password,
    debug: true,
    channels: ['#emongg'] // TODO: Remove this when we're configuring...
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