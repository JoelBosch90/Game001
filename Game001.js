/* This is where we're painting the canvas like we're Rembrandt. Or rather, more like Rothko or Pollock... */

$(document).ready(function() {

let canvas = $("#Game001");
let context = canvas.getContext("2D");
context.fillRect(0, 0, canvas.width, canvas.height);
context.beginPath();
context.moveTo(0, 0);
context.lineTo(250, 500);

});