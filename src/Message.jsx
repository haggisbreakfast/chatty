import React, { Component } from 'react';
import MessageList from './MessageList.jsx';

class Message extends Component {
  render() {
    return (
      <div>
        <main className="messages">
          <MessageList />
        </main>
      </div>
    );
  }
}

export default Message;
