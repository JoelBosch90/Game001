/* This is where we're painting the canvas like we're Rembrandt. Or rather, more like Rothko or Pollock... */

var CANVAS_WIDTH = 480;
var CANVAS_HEIGHT = 320;
let canvas;

$(document).ready(function() {
    canvas = document.getElementById("Game001").getContext("2d");

    var FPS = 60;
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);

    // context.fillRect(0, 0, canvas.width, canvas.height);
    // context.beginPath();
    // context.moveTo(0, 0);
    // context.lineTo(250, 500);
    // context.strokeStyle = "red";
    // context.rect(20,20,150,100);
    // context.stroke();
});

var player = {
    color: "#00A",
    x: 220,
    y: 270,
    width: 32,
    height: 32,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
};

let arrowRight = false;
let arrowLeft = false;


document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowLeft':
            arrowLeft = true;
            break;
        case 'ArrowRight':
            arrowRight = true;
    }
};

document.onkeyup = function (e) {
    arrowRight = false;
    arrowLeft = false;
};

function update() {
    let e;
    e = e || window.event;

    if (arrowLeft) {
        player.x -= 2;
    }

    if (arrowRight) {
        player.x += 2;
    }
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();
}