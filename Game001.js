/* This is where we're painting the canvas like we're Rembrandt. Or rather, more like Rothko or Pollock... */

$(document).ready(function() {
    
    let canvas = document.getElementById("Game001");
    let context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(250, 500);
    context.strokeStyle = "red";
    context.stroke();

});