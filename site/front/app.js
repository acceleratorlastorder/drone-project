document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM loaded launching functions");
    start();
});

let topgate = document.querySelector(".gate.top");
let bottomgate = document.querySelector(".gate.bottom");
let title = document.querySelector(".title");
function start() {
    setTimeout(animation, 1000);
}

function animation() {
    console.log("animations started");
/*    topgate.style.animationName = "goingup";
    bottomgate.style.animationName = "goingdown";
    title.style.animationName = "leavingthescreennicely";
*/
}
