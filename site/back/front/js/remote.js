document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded launching functions");
    start();

});

function start() {
    gamepadlistener()
};

let inputbutton = document.getElementById("button");
inputbutton.addEventListener('click', settheinterval, false);
let inputvalue,status;
let info = document.getElementById("info");
let interval = 500;
let cross, triangle, circle, square, dpadleft, dpadtop, dpadright, dpadbottom, l1, l2, l3, r1, r2, r3, share, options, psbutton, touchpad;
let statusli = document.querySelectorAll(".status");



function settheinterval() {

    inputvalue = document.getElementById("input").value;
    interval = inputvalue;
    info.innerHTML = "interval is = " + inputvalue + " ms";

}

function createJSON(buttons, axes) {
    status = JSON.stringify({
      buttons,axes
    });


/*
    status = JSON.stringify({
        buttonstatus: [buttons],
        axestatus: axes
    });
*/
    console.log("status: ", status);
    return status;
};


function gamepadlistener() {
    window.addEventListener("gamepadconnected", function(e) {
        var gp = navigator.getGamepads()[0];
        console.log("gamepads: ", gp);
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gp.index, gp.id,
            gp.buttons.length, gp.axes.length);
        let buttons, axes, buttonsnumber;

        setInterval(gamepadmapping, interval);

        function gamepadmapping() {
          createJSON(buttons, axes);
          sendData(status);
            buttons = gp.buttons;
            axes = gp.axes;
            buttonsnumber = buttons.length;
            for (var i = 0; i < buttons.length; i++) {
                statusli[i].innerHTML = buttons[i].pressed;
            }
            for (var i = 0; i < 8; i++) {
                statusli[i + 18].innerHTML = axes[i];
            }
        }
    })
}



var host = window.document.location.host.replace(/:.*/, '');
console.log("host: ", host, "full address is then ", 'ws://' + host + ':8080');
var ws = new WebSocket('ws://' + host + ':8080');

ws.onmessage = function(event) {
    console.log("message received event: ", event);
};

function sendIdentityJSON(identityJSONtoparse) {
    let id = JSON.parse(identityJSONtoparse);
}

function sendData(dataToSend) {
    console.log("dataToSend: ", dataToSend);

    ws.send(dataToSend);
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




/*    console.log(axes);
console.log("carré: ", buttons[0].pressed);
console.log("croix: ", buttons[1].pressed);
console.log("rond: ", buttons[2].pressed);
console.log("triangle: ", buttons[3].pressed);
console.log("L1: ", buttons[4].pressed);
console.log("R1: ", buttons[5].pressed);
console.log("L2: ", buttons[6].pressed);
console.log("R2: ", buttons[7].pressed);
console.log("share: ", buttons[8].pressed);
console.log("option: ", buttons[9].pressed);
console.log("L3: ", buttons[10].pressed);
console.log("R3: ", buttons[11].pressed);
console.log("PS boutton: ", buttons[12].pressed);
console.log("pad tactile: ", buttons[13].pressed);
console.log("nc: ", buttons[14].pressed);
console.log("nc: ", buttons[15].pressed);
console.log("nc: ", buttons[16].pressed);
console.log("nc: ", buttons[17].pressed);
console.log("nc: ", axes[0], "nc: ", axes[1]);
console.log("nc: ", axes[2], "nc: ", axes[5]);
console.log("nc: ", axes[4], "nc: ", axes[3]);*/
