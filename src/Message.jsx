import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.message.user}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default Message;

/* //// for later:

      <div>
        <div className="message">
          <span className="message-username">Anonymous1</span>
          <span className="message-content"> {this.props.message.content}</span>
        </div>
        <div className="message system">Anonymous1 changed their name to nomnom.</div>
      </div>
*/
