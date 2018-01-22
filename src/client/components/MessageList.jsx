import React from 'react';

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.array.isRequired
    };

    render() {
        return (
            <ul class="messages">
                {messages.map(message =>
                    <MessageItem message={message}> />
                )}
            </ul>;
        );
    }
}