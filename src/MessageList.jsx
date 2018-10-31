import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const allmessages = this.props.messages.map((message) => {
      return <Message message={message} key={message.id} />;
    });
    return (
      <div>
        <main className="messageList">{allmessages}</main>
      </div>
    );
  }
}

export default MessageList;
