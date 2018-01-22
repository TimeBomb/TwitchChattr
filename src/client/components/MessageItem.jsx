import React from 'react';

export default class MessageItem extends React.Component {
    static propTypes = {
        message: PropTypes.string.isRequired
    };

    render() {
        return (
            <li class="message-item">
                <span class="message">
                    {message}
                </span>
            </li>
        );
    }
}