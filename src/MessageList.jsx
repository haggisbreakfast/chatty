import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log(this.props.messages);
    const allmessages = this.props.messages.map(message => {
      return <Message message={message} />;
    });
    return (
      <div>
        <main className="messageList">{allmessages}</main>
      </div>
    );
  }
}

export default MessageList;
