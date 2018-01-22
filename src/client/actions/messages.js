import actions from '../constants/actions';

export const receiveMessage(channel) => {
    type: actions.RECEIVE_MESSAGE,
    channel
};