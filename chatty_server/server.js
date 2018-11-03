const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  let clientCountObject = {
    type: 'userCount',
    count: wss.clients.size,
  };
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(clientCountObject));
  });

  // receiving messages from client
  ws.onmessage = function(event) {
    // event.data = JSON.parse(event.data);
    // console.log(event.data);

    let msg = JSON.parse(event.data);
    let message = {
      user: msg.username,
      content: msg.content,
      id: uuidv4(),
      type: msg.type,
    };

    // let messageType;
    switch (message.type) {
      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      case 'postNotification':
        message.type = 'incomingNotification';
        break;
    }

    wss.clients.forEach(function each(client) {
      // if (client.readyState === WebSocket.OPEN) {
      let messagetoSend = JSON.stringify(message);
      client.send(messagetoSend);
    });
  };
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(clientCountObject));
      console.log(clientCountObject.type);
    });
  });
});
