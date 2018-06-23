let date = new Date();
let theDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ": ";

const options = {year: "numeric", month: "numeric", day: "numeric",
           hour: "numeric", minute: "numeric", second: "numeric",
           hour12: false};

function getMillisecondsStr(date) {
  return getDate(date) + "." + date.getMilliseconds() + ": ";
}

function getDate(date) {
  return new Intl.DateTimeFormat("fr", options).format(date ? date : new Date());
}
const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const app = express();
const server = http.createServer(app);
app.use(express.static('front'));
app.use(function (req, res, next) {
  console.log(theDate, " visitor couldn't find the page with that path ", req.originalUrl, " IP of the visitor: ", req.ip);
  res.sendFile('front/404.html', { root: __dirname });
});
/*****************************************************WEB SOCKET PART START*****************************************************/
const wss = new WebSocket.Server({ server });
var user = [];
var droneindex, dronesocket, clientindex, clientsocket;
let connectedUser = 0;
// drone = 777, client = 888
wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  console.log(getDate(), " something is connected ws :", req['headers']['user-agent']);
  var id = req['headers']['user-agent'];
  var socketkey = req.headers['sec-websocket-key'];
  if (id != "NodeMCU") {
    console.log(getDate(), " Connection from: ", id);
    clientsocket = { client: ws };
    user.push(clientsocket);
    clientindex = user.indexOf(clientsocket);
    console.log(getDate(), " clientindex: ", clientindex);
  } else {
    console.log(getDate(), " Connection from: ", id);
    dronesocket = { drone: ws };
    user.push(dronesocket);
    droneindex = user.indexOf(dronesocket);
    console.log(getDate(), " droneindex: ", droneindex);
  }
  connectedUser = user.length;
  ws.send('hello we have at this moment ' + connectedUser + ' visitor');
  // You might use location.query.access_token to authenticate or share sessions
  ws.on('message', function incoming(message) {
    date = new Date();
    console.log(getDate(), " got message from: ", id);
    console.log(getMillisecondsStr(date), ' received: ', message);
    if (id != "NodeMCU") {
      sendTo(1, message, clientindex, droneindex, ws);
    } else {
      sendTo(0, message, clientindex, droneindex, ws);
    }
  });
  ws.on('close', function () {
    socketkey = req.headers['sec-websocket-key'];
    console.log('connection with the client ', socketkey, ' closed');
    if (id != "NodeMCU") {
      user.splice(clientindex, 1);
      console.log(getDate(), " client disconected !");
    } else {
      sendTo(0, 'drone disconnected', clientindex, droneindex, ws);
      console.log(getDate(), " Drone disconnected!");
      user.splice(droneindex, 1);
    }
  });
});

function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;
  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }
  if (typeof item === "object" && item !== null) {
    return true;
  } else {
    return false;
  }
}

function sendTo(who, message, clientindex, droneindex, ws) {
  // who  1 = drone, 0 = client
  if (who == 0) {
    if (clientindex == -1 || clientindex == undefined) {
      console.log(getDate(), " no client connected yet");
    } else {
      user[clientindex].client.send(message);
    }
  } else {
    if (droneindex == -1 || droneindex == undefined) {
      console.log(getDate(), " no drone connected");
      ws.send(getDate() + " drone not connected yet");
    } else {
      console.log("drone index: ", droneindex);
      user[droneindex].drone.send(message);
    }
  }
}
/*****************************************************WEB SOCKET PART END*****************************************************/
server.listen(8080, function listening() {
  console.log(getDate(), " Listening on", server.address().port);
});
console.log(getDate(), " server ", server.address());
