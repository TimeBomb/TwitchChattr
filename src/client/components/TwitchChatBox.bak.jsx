const React = require('React');
const TwitchChatClient = require('./lib/twitchChatClient.js');
const MessageFilter = require('./lib/messageFilter.js');

// TODO: UX for initial user configuration for user/pass (set up in private.config.js)

let messageFilter = new MessageFilter();


window.onload = function() {
    newMessage('Connecting...', 'Server');
    chatClient.connect();
    initLivestream();
};

// TODO: Convert fully to React component; will require messages in state then passed in here
module.exports = class TwitchChatBox extends React.Component {
    render() {
        return <div></div>;
    }
    
    // TODO: Multi-channel support leveraging `to`
    newMessage(message, from, to) {
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

    componentDidMount() {
        this.chatClient = new TwitchChatClient();
        
        this.chatClient.on("chat", function (channel, userState, message, self) {
            // TODO: When adding support for chatting, make sure to instantly append your own chat messages
            // Don't see your own messages that were already instantly appended
            if (self) {
                return;
            }
            this.newMessage(message, userState['display-name'], channel);
        });
        
        this.chatClient.on('connected', function() {
            this.newMessage('Connected!', 'Server');
        })
    }
}