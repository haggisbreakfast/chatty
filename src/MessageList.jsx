import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const allmessages = this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return <Message message={message} key={message.id} />;
      } else if (message.type === 'incomingNotification') {
        return <div className="message system">{message.content}</div>;
      }
    });
    return <main className="messageList">{allmessages}</main>;
  }
}

export default MessageList;
