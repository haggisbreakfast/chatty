import React, { Component } from 'react';

class ChatBar extends Component {
  // handle message submission
  submitMessage(event) {
    if (event.key === 'Enter') {
      const text = event.target.value;
      this.props.addMessage(text);
      event.target.value = '';
    }
  }
  // handle username submission
  submitName(event) {
    if (event.key === 'Enter') {
      const currentName = event.target.value;
      this.props.updateName(currentName);
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyPress={this.submitName.bind(this)} placeholder="name goes here" />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.submitMessage.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
