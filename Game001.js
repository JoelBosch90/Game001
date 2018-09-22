/* This is where we're painting the canvas like we're Rembrandt. Or rather, more like Rothko or Pollock... */

$(document).ready(function() {

let canvas = document.getElementById("Game001");
let context = canvas.msGetInputContext("2D");

context.moveTo(0, 0);
context.lineTo(250, 500);
});