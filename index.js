const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


const server = http.createServer(app);


const wss = new WebSocket.Server({ server });

// Store the list of connected clients
const clients = [];

wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");

    // Add the new connection to our list
    clients.push(ws);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        // Broadcast the message to all clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        // Remove the client from the array when it disconnects
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });

    // Send a welcome message on new connection
    ws.send('Connection successful');
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});