import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    const allmessages = this.props.messages.map((message) => {
      // distinguish b/w messages and notifications
      if (message.type === 'incomingMessage') {
        return <Message message={message} key={message.id} />;
        // display notifications as message system
      } else if (message.type === 'incomingNotification') {
        return <div className="message system">{message.content}</div>;
      }
    });
    return <main className="messageList">{allmessages}</main>;
  }
}

export default MessageList;
