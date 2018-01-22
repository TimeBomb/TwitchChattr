import messageFilter from '../lib/messageFilter';
import actions from '../constants/actions';

export const messages = (state = {}, action) => {
    switch (action.type) {
        case actions.RECEIVE_MESSAGE:
            return action.channel; // TODO: Find way to get channel messages
            break;
    }
};