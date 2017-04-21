const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
app.use(express.static('front'));


/*
app.get('/', function (req, res) {
  res.send('Hello World!');
});*/

const wss = new WebSocket.Server({
    server
});
wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);

    console.log("something is connected");
    // You might use location.query.access_token to authenticate or share sessions

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});
server.listen(80, function listening() {
    console.log('Listening on %d', server.address().port);
});
console.log("server ", server.address());
