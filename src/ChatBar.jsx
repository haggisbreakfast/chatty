import React, { Component } from 'react';

class ChatBar extends Component {
  submit(event) {
    if (event.key === 'Enter') {
      const text = event.target.value;
      this.props.addMessage(text);
      event.target.value = '';
    }
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.user.name} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onKeyPress={this.submit.bind(this)}
        />
      </footer>
    );
  }
}

export default ChatBar;
