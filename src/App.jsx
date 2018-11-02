import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
// import { IncomingMessage } from 'http';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'bob' },
      messages: [], // messages coming from the server will be stored here as they arrive
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
      content: `name changed to ${currentName}`,
    };
    this.socket.send(JSON.stringify(notification));
  };

  updateName = (currentName) => {
    console.log(`yr name: ${currentName}`);
    this.setState({
      currentUser: { name: currentName },
    });
  };

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected');
    };
    // receives incoming msgs from
    this.socket.onmessage = (event) => {
      let incomingMessage = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(incomingMessage);
      this.setState({
        messages: newMessages,
      });
      console.log(this.state.messages);
    };

    console.log('componentDidMount <App />');
    // setTimeout(() => {
    //   console.log('Simulating incoming message');
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: this.state.messages.length, username: 'Michelle', content: 'Hello there!' };
    //   const messages = this.state.messages.concat(newMessage);
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages });
    // }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser} addMessage={this.addMessage} updateName={this.updateName} />
      </div>
    );
  }
}

export default App;
