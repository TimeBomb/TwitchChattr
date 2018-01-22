const tmi = require('tmi.js');
const CHAT_CONFIG = require('../../../app.config.js').CHAT;
const USER_CONFIG = require('../../../private.config.js');

export default () => {
    return new tmi.Client({
        options: {
            debug: CHAT_CONFIG.DEBUG
        },
        connection: {
            reconnect: true,
            secure: true
        },
        identity: {
            username: USER_CONFIG.USERNAME,
            password: USER_CONFIG.PASSWORD
        },
        channels: CHAT_CONFIG.CHANNELS
    });
};