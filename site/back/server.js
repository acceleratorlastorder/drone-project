const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
app.use(express.static('front'));
app.use(function(req, res, next) {
    console.log("visitor couldn't find the page with that path ", req.originalUrl, " IP of the visitor: ", req.ip);
    res.sendFile('front/404.html', {
        root: __dirname
    });
});



/*****************************************************WEB SOCKET PART START*****************************************************/

const wss = new WebSocket.Server({
    server
});
var user = [];
wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    connectedUser++;
    console.log("something is connected ws :", ws);
    var id = ws.upgradeReq['headers']['user-agent'];
    if (id == "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:52.0) Gecko/20100101 Firefox/52.0") {
        console.log("Connection from: ", id);
    }
    if (id == "NodeMCU") {
        console.log("Connection from: ", id);
    }

    ws.send('hello we have at this moment ' + connectedUser + ' visitor');
    // You might use location.query.access_token to authenticate or share sessions
    ws.on('message', function incoming(message) {
        console.log('received: ', message); //  ws.upgradeReq['headers']['user-agent']
        var socketkey = ws.upgradeReq.headers['sec-websocket-key'];
        if (ws.upgradeReq['headers']['user-agent'] == "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:52.0) Gecko/20100101 Firefox/52.0") {
            console.log("got message from: ", id);
        }
        if (ws.upgradeReq['headers']['id'] == "Drone") {
            console.log("got message from: ", id);
        }
    });

    ws.on('close', function() {
        var id = w.upgradeReq.headers['sec-websocket-key'];
        console.log('connection with the client ', id, ' closed');
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
