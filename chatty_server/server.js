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

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.onmessage = function(event) {
    // event.data = JSON.parse(event.data);
    let msg = JSON.parse(event.data);
    let message = {
      user: msg.username,
      content: msg.content,
      id: uuidv4(),
    };

    wss.clients.forEach(function each(client) {
      // if (client.readyState === WebSocket.OPEN) {
      let messagetoSend = JSON.stringify(message);
      client.send(messagetoSend);
    });
  };

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
