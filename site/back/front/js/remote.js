document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded launching functions");
    start();
});

function start() {
    gamepadlistener()
};

var gamepadTimeout;
let inputbutton = document.getElementById("button");
inputbutton.addEventListener('click', settheinterval, false);
let inputvalue, status;
let info = document.getElementById("info");
let interval = 500;
//let cross, triangle, circle, square, dpadleft, dpadtop, dpadright, dpadbottom, l1, l2, l3, r1, r2, r3, share, options, psbutton, touchpad;
let statusli = document.querySelectorAll(".status");
let limessage = document.getElementById("limessage");
let buffer = [];
var roll, pitch, yaw, throttle;

function settheinterval() {
    window.clearInterval(gamepadTimeout);
    inputvalue = document.getElementById("input").value;
    interval = inputvalue;
    info.innerHTML = "interval is = " + inputvalue + " ms";
}

function createJSON(roll, pitch, yaw, throttle) {
    status = JSON.stringify([
        parseFloat(roll.toFixed(6), 10),
        parseFloat(pitch.toFixed(6), 10),
        parseFloat(yaw.toFixed(6), 10),
        parseFloat(throttle.toFixed(6), 10)
    ]);
    return status;
};

function gamepadlistener() {
    window.addEventListener("gamepaddisconnected", function(e) {
        console.log("Contrôleur n°%d déconnecté : %s", e.gamepad.index, e.gamepad.id);
        window.clearInterval(gamepadTimeout);
    });
    window.addEventListener("gamepadconnected", function(e) {
        var gp = navigator.getGamepads()[0];
        //  console.log("gamepads: ", gp);
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", gp.index, gp.id, gp.buttons.length, gp.axes.length);
        let buttons, axes, buttonsnumber;
        gamepadTimeout = window.setInterval(gamepadmapping, interval);

        function gamepadmapping() {
            throttle = ((gp.axes[3] + 1) + (gp.axes[4] + 1)) / 4;
            roll = (gp.axes[2] + 1) / 2;
            pitch = (gp.axes[1] + 1) / 2;
            yaw = (gp.axes[0] + 1) / 2;
            //shorterFloat();
            //createJSON(roll, pitch, yaw, throttle);
            //  buffer.push(status);
            //          if (isStatusHaschanged()) {
            sendData(createJSON(roll, pitch, yaw, throttle));
            //        } else {
            buttons = gp.buttons;
            axes = gp.axes;
            buttonsnumber = buttons.length;
            for (var i = 0; i < buttons.length; i++) {
                statusli[i].innerHTML = buttons[i].pressed;
            }
            for (var i = 0; i < 8; i++) {
                statusli[i + 18].innerHTML = axes[i];
            }
            //      }
            /*    if (buffer[1] == undefined) {
                    console.log("nope");
                } else {
                    buffer.pop();
                }*/
        }
    })
}

function makeJSONFixedLength() {


}

function isStatusHaschanged() {
    if (buffer[1] == undefined) {
        return false;
    } else {
        if (buffer[0] == buffer[1]) {
            console.log("nochange");
            return false;
        } else {
            return true;
        }
    }
}
// 6 chiffres après la virgule max
function shorterFloat() {
    let something = 1000000;
    let somethingelse = 0.000001;
    //i know it's not good but that's to only way to get a json that have always the same length :) or not
    roll += somethingelse;
    pitch += somethingelse;
    yaw += somethingelse;
    throttle += somethingelse;

    roll = Math.round(roll * something) / something;
    pitch = Math.round(pitch * something) / something;
    yaw = Math.round(yaw * something) / something;
    throttle = Math.round(throttle * something) / something;



}
var testultime = [0.513746, 0.498054, 0.501976, 0.000000];


var host = window.document.location.host.replace(/:.*/, '');
console.log("host: ", host, "full address is then ", 'ws://' + host + ':8080');
var ws = new WebSocket('ws://' + host + ':8080');

ws.onmessage = function(event) {
    console.log("message received event: ", event.data);
    limessage.innerHTML = event.data;
};
/*
function sendIdentityJSON(identityJSONtoparse) {
    let id = JSON.parse(identityJSONtoparse);
}
*/
function sendData(dataToSend) {
    console.log("dataToSend: ", dataToSend, "length of dataToSend: ", dataToSend.length);
    ws.send(dataToSend);
    console.log("sent");
}

function sendtesultime() {
    var test = JSON.stringify(testultime);



    console.log("status ", test, "length ", test.length);
    for (var i = 0; i < test.length; i++) {
        test[i]
    }

    sendData(test);
}

function getInputValue() {
    let inputValue = input.value;
    return inputValue;
}

let identity = {}

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
