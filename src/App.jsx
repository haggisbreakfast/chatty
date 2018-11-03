import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import { IncomingMessage } from 'http';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'anonymous' },
      messages: [],
      userCount: 0,
    };
    // create a websocket connection to our server
    this.socket = new WebSocket('ws://localhost:3001');
    this.addMessage = this.addMessage.bind(this);
  }
  // send messgaes to server
  addMessage(content) {
    const newMsg = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content,
    };
    this.socket.send(JSON.stringify(newMsg));
  }
  // sends notification of name change to the server
  nameNotification = (currentName) => {
    const notification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} changed their name to ${currentName}`,
    };
    this.socket.send(JSON.stringify(notification));
  };

  updateName = (currentName) => {
    console.log(`yr name: ${currentName}`);
    this.setState({
      currentUser: { name: currentName },
    });
    this.nameNotification(currentName);
  };

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected');
      // receives incoming msgs from
    };

    this.socket.onmessage = (event) => {
      let parsedData = JSON.parse(event.data);
      switch (parsedData.type) {
        case 'incomingMessage':
          const newMessages = this.state.messages.concat(parsedData);
          this.setState({
            messages: newMessages,
          });
          break;
        case 'incomingNotification':
          const notification = this.state.messages.concat(parsedData);
          this.setState({
            messages: notification,
          });
          break;
        case 'userCount':
          this.setState({
            userCount: parsedData.count,
          });
          console.log('connected:', this.state.userCount);
          break;
      }
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <a className="navbar-users"> # of chatters online: {this.state.userCount}</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser} addMessage={this.addMessage} updateName={this.updateName} />
      </div>
    );
  }
}

export default App;
