import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

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
    // this.addMessage = this.addMessage.bind(this);
  }
  // send messagaes to server
  addMessage = (content) => {
    const newMsg = {
      type: 'postMessage',
      username: this.state.currentUser.name,
      content: content,
    };
    this.socket.send(JSON.stringify(newMsg));
  };
  // sends notification of name change to the server
  nameNotification = (currentName) => {
    const notification = {
      type: 'postNotification',
      content: `${this.state.currentUser.name} changed their name to ${currentName}`,
    };
    this.socket.send(JSON.stringify(notification));
  };
  // updates state when user enters new name
  updateName = (currentName) => {
    this.setState({
      currentUser: { name: currentName },
    });
    this.nameNotification(currentName);
  };

  // loads below once component mounted to DOM
  componentDidMount() {
    // when connection with websockets is open..
    this.socket.onopen = () => {
      console.log('Connected');
    };
    // handle incoming messages from websocket server
    this.socket.onmessage = (event) => {
      let parsedData = JSON.parse(event.data);
      // distinguish b/w dif message types and update state
      switch (parsedData.type) {
        case 'incomingMessage':
          // merge new message content
          const newMessages = this.state.messages.concat(parsedData);
          this.setState({
            messages: newMessages,
          });
          break;
        case 'incomingNotification':
          // merge incoming notifications
          const notification = this.state.messages.concat(parsedData);
          this.setState({
            messages: notification,
          });
          break;
        case 'userCount':
          // update count when user connects and disconnects
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
