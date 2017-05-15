var host = window.document.location.host.replace(/:.*/, '');
console.log("host: ", host, "full address is then ", 'ws://' + host + ':8080');
var ws = new WebSocket('ws://' + host + ':8080');


ws.onmessage = function(event) {
    console.log("message received event: ", event);

    ws.send("hello i'm the client :) ");
};

function sendIdentityJSON(identityJSONtoparse) {
    let id = JSON.parse(identityJSONtoparse);
}
let hostdiv, input, button;
input = document.getElementById('input');
button = document.getElementById('button');
button.addEventListener('click', sendInputValue, false);

hostdiv = document.getElementById('host');
hostdiv.innerHTML = 'http://' + host + ':8080';


function sendInputValue() {
    console.log("this: ", this, " inputValue: ", getInputValue());

    ws.send(getInputValue());
    console.log("sent");
}

function getInputValue() {
    let inputValue = input.value;
    return inputValue;
}


//      document.getElementById('heapTotal').innerHTML = memuse.heapTotal;
//    document.getElementById('heapUsed').innerHTML = memuse.heapUsed;

let identity = {


}
