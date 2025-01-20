const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Setting up static file serving');
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

console.log('Creating WebSocket server');
const wss = new WebSocket.Server({ server });

const clients = [];

wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");


    clients.push(ws);
    console.log('Client connected, total clients:', clients.length);

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
        console.log('Client disconnected, total clients:', clients.length);
    });


    // const index = clients.indexOf(ws);
    // if (index > -) {
    //     clients.splice(index, 1);
    // }


    ws.send('Connection successful');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});