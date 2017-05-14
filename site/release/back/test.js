let date = new Date();
let theDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ": ";
let theDateWithMicroseconds = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds() + ":";
const express = require('express');
const http = require('http');
const url = require('url');
const app = express();
const server = http.createServer(app);
app.use(express.static('front'));
app.use(function(req, res, next) {
    console.log(theDate, " visitor couldn't find the page with that path ", req.originalUrl, " IP of the visitor: ", req.ip);
    res.sendFile('front/404.html', {
        root: __dirname
    });
});




server.listen(80, function listening() {
    console.log(theDate, ' Listening on %d', server.address().port);
});
console.log(theDate, " server ", server.address());
