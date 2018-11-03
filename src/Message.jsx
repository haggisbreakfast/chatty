import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div>
        <div className="message">
          <span className="message-username">{this.props.message.user}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
      </div>
    );
  }
}

export default Message;
