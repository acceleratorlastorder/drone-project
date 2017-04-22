const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
app.use(express.static('front'));





/*****************************************************WEB SOCKET PART START*****************************************************/

const wss = new WebSocket.Server({
    server
});
wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    connectedUser++;
    console.log("something is connected ws :");
    // You might use location.query.access_token to authenticate or share sessions
    ws.on('message', function incoming(message) {
        console.log('received: %s', message, "from: ", ws);
    });
    ws.send('hello we have at this moment ' + connectedUser + ' visitor');

    ws.on('close', function() {
        console.log('connection with the client closed');
        connectedUser--;
    });
});
/*****************************************************WEB SOCKET PART END*****************************************************/

server.listen(8080, function listening() {
    console.log('Listening on %d', server.address().port);
});
console.log("server ", server.address());

let connectedUser = 0;


let espmessage, clientmessage;
