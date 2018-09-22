/* This is where we're painting the canvas like we're Rembrandt. Or rather, more like Rothko or Pollock... */

let CANVAS_WIDTH = 480;
let CANVAS_HEIGHT = 320;
let canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
let canvas;

$(document).ready(function() {
    canvas = canvasElement.get(0).getContext("2d");
    canvasElement.appendTo('body');

    let FPS = 60;
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
});

let player = {
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
let arrowDown = false;
let arrowUp = false;

document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            arrowUp = true;
            break;
        case 'ArrowDown':
            arrowDown = true;
            break;
        case 'ArrowLeft':
            arrowLeft = true;
            break;
        case 'ArrowRight':
            arrowRight = true;
    }
};

document.onkeyup = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            arrowUp = false;
            break;
        case 'ArrowDown':
            arrowDown = false;
            break;
        case 'ArrowLeft':
            arrowLeft = false;
            break;
        case 'ArrowRight':
            arrowRight = false;
    }
};

function update() {
    let e;
    e = e || window.event;

    if (arrowLeft) {
        player.x -= 2;
    }

    if (arrowDown) {
        player.y += 2;
    }

    if (arrowRight) {
        player.x += 2;
    }

    if (arrowUp) {
        player.y -= 2;
    }

    player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
    player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#FFF";
    canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw();
}

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };