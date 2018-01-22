const CONFIG = require('../../../app.config.js').MESSAGE_FILTER;
const getStringSimilarity = require('damerau-levenshtein');

module.exports = class MessageFilter {
    constructor() {
        this.recentMessages = [];
        this.messagesFiltered = 0;

        // TODO: Clean this up or implement this better, so if we leave a channel, this interval doesn't keep triggering
        setInterval(() => {
            this.recentMessages = []; // TODO: Make sure `this` is correct `this`
        }, CONFIG.RECENT_MESSAGES_EXPIRATION_MS);
    }

    getMessagesFiltered() {
        return this.messagesFiltered;
    }

    /*
     * This function leverages the Damerau–Levenshtein distance to determine if a message is similar enough to any recently sent messages.
     * TODO: If this doesn't get more complex, may want to rename this method to isMessageSimilar for simplicity/readability's sake.
     * @string message The message you're checking against. Will be appended to the recentMessages array.
     * returns boolean If message should be filtered, i.e. if it is similar (true) or not (false)
     */
    filterMessage(message) {
        var isSimilar = this.recentMessages.some((recentMessage) => {
            if (getStringSimilarity(recentMessage, message).similarity > CONFIG.SIMILARITY_LIMIT) {
                this.messagesFiltered++; // TODO: Check that `this` is the correct `this`
                if (config.DEBUG) {
                    console.warn('TOO SIMILAR:', recentMessage, message, getStringSimilarity(recentMessage, message));
                }
                return true;
            }
        });

        this.recentMessages.push(message);

        return isSimilar;
    }
}