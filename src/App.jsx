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
      userCount: 0, // messages coming from the server will be stored here as they arrive
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
      content: `${this.state.currentUser.name} name changed to ${currentName}`,
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

      this.socket.onmessage = (event) => {
        let parsedData = JSON.parse(event.data);
        // console.log('userCount', parsedData.count);
        // console.log(this.state.userCount);

        const newMessages = this.state.messages.concat(parsedData);
        this.setState({
          messages: newMessages,
          userCount: parsedData.count,
        });
      };

      // console.log('componentDidMount <App />');
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
          <a className="navbar-users"> # of chatters: {this.state.userCount}</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser} addMessage={this.addMessage} updateName={this.updateName} />
      </div>
    );
  }
}

export default App;
