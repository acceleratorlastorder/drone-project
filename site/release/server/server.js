let date = new Date();
let theDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ": ";
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false
};

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
var user = {};
var dronesocket, clientsocket;
let connectedUser = 0;
let lastSentArray = null;
// drone = 777, client = 888
wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  console.log(getDate(), " something is connected ws :", req['headers']['user-agent']);
  var id = req['headers']['user-agent'];
  var socketkey = req.headers['sec-websocket-key'];
  if (id != "NodeMCU") {
    console.log(getDate(), " Connection from: ", id);
    //Create a client ID later
    user.client = ws;
  } else {
    console.log(getDate(), " Connection from: ", id);
    user.drone = ws;
  }
  connectedUser = Object.keys(user).length;
  ws.send('hello we have at this moment ' + connectedUser + ' visitor ' + (connectedUser === 1 ? " and it's you!" : ""));
  // You might use location.query.access_token to authenticate or share sessions
  ws.on('message', function incoming(message) {
    date = new Date();
    console.log(getDate(), " got message from: ", id);
    console.log(getMillisecondsStr(date), ' received: ', message);
    if (id != "NodeMCU") {
      lastSentArray = message;
      sendTo("drone", message, ws);
    } else {
      sendTo("client", message, ws);
    }
  });
  ws.on('close', function () {
    socketkey = req.headers['sec-websocket-key'];
    console.log('connection with the client ', socketkey, ' closed');
    if (id != "NodeMCU") {
      user.client = null;
      console.log(getDate(), " client disconected !");
    } else {
      sendTo("client", 'drone disconnected', ws);
      console.log(getDate(), " Drone disconnected!");
      user.drone = null;
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

function sendTo(who, message, ws) {
  if (who === "client") {
    if (user.client) {
      user.client.send(message);
    } else {
      console.log(getDate(), " no client connected yet");
    }
  } else {
    if (user.drone) {
      user.drone.send(message);
    } else {
      console.log(getDate(), " no drone connected");
      ws.send(getDate() + " drone not connected yet");
    }
  }
}

function recoveryOnLostConnection() {
  //maybe implent it into the drone C code
  setInterval(function () {
    if (lastSentArray[3] > 0) {
      lastSentArray = [lastSentArray[0], lastSentArray[1], lastSentArray[2], (lastSentArray[3] -= 0.01)]
    } else {
      lastSentArray = null;
      console.log("drone is safe to touch");
    }
  }, 60);
}
/*****************************************************WEB SOCKET PART END*****************************************************/
server.listen(8080, function listening() {
  console.log(getDate(), " Listening on", server.address().port);
});
console.log(getDate(), " server ", server.address());
