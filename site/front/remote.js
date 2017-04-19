document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded launching functions");
    start();

});

function start() {

    loadElement();
    //  keymap();
    gamepadlistener()
};
let cross, triangle, circle, square, dpadleft, dpadtop, dpadright, dpadbottom, l1, l2, l3, r1, r2, r3, share, options, psbutton, touchpad;
let statusli = document.querySelectorAll(".status");

function gamepadlistener() {
    window.addEventListener("gamepadconnected", function(e) {
        var gp = navigator.getGamepads()[0];
        console.log("gamepads: ", gp);
        console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
            gp.index, gp.id,
            gp.buttons.length, gp.axes.length);
            let buttons,axes,buttonsnumber;

        setInterval(gamepadmapping, 250);

        function gamepadmapping() {
          console.log("boutons: ", buttons);
            console.log("lel", gp);
            buttons = gp.buttons;
            axes = gp.axes;
            buttonsnumber = buttons.length;
            for (var i = 0; i < statusli.length; i++) {
                statusli[i].innerHTML = buttons[i].pressed;
            }
            console.log(axes);
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
            console.log("nc: ", axes[4], "nc: ", axes[3]);
        }
    });




}


function loadElement() {


    console.log('element loaded');
    return;
}


function keymap() {
    let Xaxis = cube.offsetTop;
    let Yaxis = cube.offsetLeft;
    let velocity = 0;
    let zone = document.getElementById('testzone');
    console.log("zone: ", zone);
    zone.focus().addEventListener("onkeydown", function(event) {
        if (event.defaultPrevented) {
            velocity = 0;
            return; // Do nothing if the event was already processed
        } else {

            console.log("velocity", velocity);
            if (event.key == 'ArrowUp') {
                cube.style.top = Xaxis-- + velocity++ + "px";
                console.log("arrowUp: ", Xaxis, "velocity", velocity);
            }
            if (event.key == 'ArrowDown') {
                return cube.style.top = Xaxis++ + velocity++ + "px";
                console.log("arrowDown: ", Xaxis, "velocity", velocity);

            }
            if (event.key == 'ArrowLeft') {
                cube.style.left = Yaxis-- + velocity++ + "px";
                console.log("arrowLeft: ", Yaxis, "velocity", velocity);

            }
            if (event.key == 'ArrowRight') {
                cube.style.left = Yaxis++ + velocity++ + "px";
                console.log("arrowRight: ", Yaxis, "velocity", velocity);

            }
            console.log("event: ", event);
            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }
        velocity = 0;
    }, true);

}
