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

let player1 = {
    color: "#00A",
    x: 0,
    y: CANVAS_HEIGHT / 2,
    width: 12,
    height: 32,
    arrowDown: false,
    arrowUp: false,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
};

let player2 = {
    color: "#00A",
    x: CANVAS_WIDTH - 12,
    y: CANVAS_HEIGHT / 2,
    width: 12,
    height: 32,
    w: false,
    s: false,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
};

let ball = {
    color: "#333",
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    width: 6,
    height: 6,
    /* Give the ball a random initial direction and speed. */
    yDirection: 2 * (Math.random() * 2 - 1),
    xDirection: 2 * (Math.random() * 2 - 1),
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}

document.onkeydown = function (e) {
    switch (e.key) {
        case 'w':
            player2.w = true;
            break;
        case 's':
            player2.s = true;
            break;
        case 'ArrowUp':
            player1.arrowUp = true;
            break;
        case 'ArrowDown':
            player1.arrowDown = true;
    }
};

document.onkeyup = function (e) {
    switch (e.key) {
        case 'w':
            player2.w = false;
            break;
        case 's':
            player2.s = false;
            break;
        case 'ArrowUp':
            player1.arrowUp = false;
            break;
        case 'ArrowDown':
            player1.arrowDown = false;
    }
};

function update() {
    playerPositions();
    ballPosition();
}

function playerPositions() {
    if (player1.arrowUp) {
        player1.y -= 2;
    }

    if (player1.arrowDown) {
        player1.y += 2;
    }

    if (player2.w) {
        player2.y -= 2;
    }

    if (player2.s) {
        player2.y += 2;
    }

    /* Keep the players on the field. */
    player1.y = player1.y.clamp(0, CANVAS_HEIGHT - player1.height);
    player2.y = player2.y.clamp(0, CANVAS_HEIGHT - player2.height);
}

function ballPosition() {
    /* Keep the ball bouncing off the top and bottom of the field. */
    if(ball.y == 0 || ball.y == CANVAS_HEIGHT - ball.height) {
        ball.yDirection = ball.yDirection * -1;
    }

    /* Bounce the ball on the players. */
    if(ball.x <= player1.width) {
        if(ball.y >= player1.y && ball.y <= player1.y + player1.height) {
            ball.xDirection = 1;
        }
    } else if (ball.x >= CANVAS_WIDTH - (ball.width + player2.width)) {
        if(ball.y >= player2.y && ball.y <= player2.y + player2.height) {
            ball.xDirection = -1;
        }
    }

    // /* Determine a winner. */
    // if(ball.x == 0 || ball.x == CANVAS_WIDTH - ball.width) {
    //     GAME LOST!;
    // }

    /* Move the ball! */
    ball.y += ball.yDirection;
    ball.x += ball.xDirection;

    /* Keep the ball on the field. */
    ball.y = ball.y.clamp(0, CANVAS_HEIGHT - ball.height);
    ball.x = ball.x.clamp(0, CANVAS_WIDTH - ball.width);
}

function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#FFF";
    canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player1.draw();
    player2.draw();
    ball.draw();
}

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };