const CONFIG = require('../../../app.config.js').MESSAGE_FILTER;
let getStringSimilarity = require('damerau-levenshtein');

// TODO: Polish this... a lot. This currently isn't much more than a proof of concept.
module.exports = class MessageFilter {
    constructor() {
        this.recentMessages = [];
        this.messagesFiltered = 0;
        let messageFilter = this;

        setInterval(function() {
            messageFilter.recentMessages = [];
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
        var messageFilter = this;
        var isSimilar = this.recentMessages.some(function(recentMessage) {
            if (getStringSimilarity(recentMessage, message).similarity > CONFIG.SIMILARITY_LIMIT) {
                messageFilter.messagesFiltered++;
                // console.warn('TOO SIMILAR:', recentMessage, message, getStringSimilarity(recentMessage, message));
                return true;
            }
        });

        this.recentMessages.push(message);

        return isSimilar;
    }
}