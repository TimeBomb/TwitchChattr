const React = require('blockLayout');
const CHAT_CONFIG = require('../../../app.config.js').CHAT;

const TWITCH_PLAYER_READY_EVENT = 'Twitch.Player.READY';

// TODO: Convert to react component, see https://github.com/tony99nyr/twitch-embed

module.exports = class TwitchLivestream extends React.Component {
    render() {
        return <div id="{{ playerDivId }}"></div>;
    }

    componentDidMount() {
        this.player = new Twitch.Player(playerDivId, {
            width: 600,
            height: 400,
            channel: CHAT_CONFIG.CHANNELS[0]
        });

        this.isLoaded = new Promise((resolve, reject) => {
            this.player.addEventListener(TWITCH_PLAYER_READY_EVENT, () => {
                resolve();
            });
        });
    }
}