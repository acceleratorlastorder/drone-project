let date = new Date();
let theDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ": ";
let theDateWithMicroseconds = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds() + ":";
const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
app.use(express.static('front'));
app.use(function(req, res, next) {
    console.log(theDate, " visitor couldn't find the page with that path ", req.originalUrl, " IP of the visitor: ", req.ip);
    res.sendFile('front/404.html', {
        root: __dirname
    });
});
/*****************************************************WEB SOCKET PART START*****************************************************/
const wss = new WebSocket.Server({
    server
});
var user = [];
var droneindex, dronesocket, clientindex, clientsocket;
let connectedUser = 0;
// drone = 777, client = 888
wss.on('connection', function connection(ws) {
    const location = url.parse(ws.upgradeReq.url, true);
    console.log(theDate, " something is connected ws :", ws.upgradeReq['headers']['user-agent']);
    var id = ws.upgradeReq['headers']['user-agent'];
    if (id !== "NodeMCU") {
        console.log(theDate, " Connection from: ", id);
        clientsocket = {
            client: ws
        };
        user.push(clientsocket);
        clientindex = user.indexOf(clientsocket);
        console.log(theDate, " clientindex: ", clientindex);
    } else {
        console.log(theDate, " Connection from: ", id);
        dronesocket = {
            drone: ws
        };
        user.push(dronesocket);
        droneindex = user.indexOf(dronesocket);
        console.log(theDate, " droneindex: ", droneindex);
    }
    connectedUser = user.length;
    ws.send('hello we have at this moment ' + connectedUser + ' visitor');
    // You might use location.query.access_token to authenticate or share sessions
    ws.on('message', function incoming(message) {
        date = new Date();
        theDateWithMicroseconds = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds() + ":";
        console.log(theDateWithMicroseconds, ' received: ', message); //  ws.upgradeReq['headers']['user-agent']
        var socketkey = ws.upgradeReq.headers['sec-websocket-key'];
        if (ws.upgradeReq['headers']['user-agent'] == "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.0) Gecko/20100101 Firefox/52.0") {
            console.log(theDate, " got message from: ", id);
            sendTo(1, message);
        }
        if (ws.upgradeReq['headers']['id'] == "Drone") {
            console.log(theDate, " got message from: ", id);
            //    ws.send("envoyé depuis node mcu" + message)

            sendTo(0, message);
        }
    });
    ws.on('close', function() {
        var id = ws.upgradeReq.headers['sec-websocket-key'];
        console.log('connection with the client ', id, ' closed');
        if (id == "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:52.0) Gecko/20100101 Firefox/52.0") {
            user.splice(clientindex, 1);
            console.log(theDate, " client disconected !");
        }
        if (id == "NodeMCU") {
            sendTo(0, 'drone disconnected')
            console.log(theDate, " Drone disconnected!");
            user.splice(droneindex, 1);
        }

    });
});



function isJson(item) {
    item = typeof item !== "string" ?
        JSON.stringify(item) :
        item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}



function sendTo(who, message) {
    // who  1 = drone, 0 = client
    if (who == 0) {
        if (clientindex == -1 || clientindex == undefined) {
            console.log(theDate, " no client connected yet");
        } else {
            user[clientindex].client.send(message)
        }
    } else {
        if (droneindex == -1 || droneindex == undefined) {
            console.log(theDate, " no drone connected yet");
            ws.send(theDate + " drone not connected yet")
        } else {
            console.log('drone index: ', droneindex);
            user[droneindex].drone.send(message)
        }
    }
}
/*****************************************************WEB SOCKET PART END*****************************************************/
server.listen(8080, function listening() {
    console.log(theDate, ' Listening on %d', server.address().port);
});
console.log(theDate, " server ", server.address());
