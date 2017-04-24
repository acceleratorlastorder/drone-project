$(document).ready(function() {
    console.log("jquery is ready, i will stop using it soon dw ;)");
    automaticslider();
});
$('#buttoncontainer .1').click(function() {
    slideranimation(0);
});
$('#buttoncontainer .2').click(function() {
    slideranimation(1);
})
$('#buttoncontainer .3').click(function() {
    slideranimation(2);
})

function slideranimation(x) {
  if (x == 0) {
    $('.imgcontainer .pic1').animate( { "left": "0%" }, "slow" );
    $('.imgcontainer .pic2').animate( { "left": "100%" }, "slow" );
    $('.imgcontainer .pic3').animate( { "left": "200%" }, "slow" );
  } else if (x == 1) {
    $('.imgcontainer .pic1').animate( { "left": "-100%" }, "slow" );
    $('.imgcontainer .pic2').animate( { "left": "0%" }, "slow" );
    $('.imgcontainer .pic3').animate( { "left": "100%" }, "slow" );
  }else {
    $('.imgcontainer .pic1').animate( { "left": "-200%" }, "slow" );
    $('.imgcontainer .pic2').animate( { "left": "-100%" }, "slow" );
    $('.imgcontainer .pic3').animate( { "left": "0%" }, "slow" );
  }
}
let turn = 0;
function automaticslider() {
    if (turn == 3) {
        turn = 0
        slideranimation(turn);
    }
    slideranimation(turn);
    turn++
    setTimeout(automaticslider, 5000);
}
