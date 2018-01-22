import React from 'react';
import Chat from './Chat';
import MessageRepo from './MessageRepository';
import reducers from '../reducers/index';

const store = createStore(reducers);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MessageRepo />
                <Chat messages={this.store.getState() } />
            </Provider>
        );
    }
}