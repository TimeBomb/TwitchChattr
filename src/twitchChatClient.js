let tmi = require('tmi.js');
const CONFIG = require('../app.config.js');

module.exports = class TwitchChatClient {
    /*
     * @object options An object containing configurations for connecting to Twitch IRC
     * @string options.username Required
     * @string options.password Required
     * @array options.channels Optional; can be specified later
     */
    constructor(options) {
        if (!options || !options.username || !options.password) {
            console.log(options);
            throw new Error('Username and password must be specified.');
        }

        this.chatClient = new tmi.Client({
            options: {
                debug: CONFIG.CHAT.DEBUG
            },
            connection: {
                reconnect: true,
                secure: true
            },
            identity: {
                username: options.username,
                password: options.password
            },
            channels: options.channels
        });
        return this.chatClient; // TODO: If necessary, provide nicer API in this IRC object
    }
}