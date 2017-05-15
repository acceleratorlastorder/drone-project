
let start = function() {
  let picture404errorname = ['404mario.jpg', '404peugeot.jpg'];
  let main = document.getElementById('main');
  let result;
  let random = Math.random();
  if (random < 0.5) {
    result = picture404errorname[0];
  } else {
    result = picture404errorname[1];
  }
  console.log("random: ", random, main);


  main.innerHTML = "<img src=' "+ window.location.origin + "/pictures/" + result + "' alt=\"can't get the picture but anyway it was just a custom 404 page with a cool image so you understand it's a 404 page :)\"/>";

}
// TODO: create a function that can take the length of the array and make a random on it ex if length = 2 as the max value of math random is 1 then x = 1/length so 1/2 = 0.5, then if (random > 0 &&  random < x)  still thinking about higher number than 2 XD


document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM loaded launching functions");
  start();

});
