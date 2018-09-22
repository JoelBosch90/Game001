/* This is where we're painting the canvas like we're Rembrandt. Or rather, more like Rothko or Pollock... */

/* Initial canvas variables. */
let CANVAS_WIDTH = 480;
let CANVAS_HEIGHT = 320;
let canvasElement = $("<canvas width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
let canvas;
let gameDifficulty = 1;
let freezeGame = false;
let hitCounter = 0;
let frameCounter = 0;
let ballSpeed = 1.5;
let direction = Math.random() * (0.8 * ballSpeed) + (0.2 * ballSpeed);
let winnerDeclaration = '';
let timePlayedDeclaration = '';

/* Main method that appends the canvas to the HTML and keeps tracks of timing. */
$(document).ready(function() {
    canvas = canvasElement.get(0).getContext("2d");
    canvasElement.appendTo('body');
    canvas.font = "22px Arial";
    canvas.textAlign = "center";

    let FPS = 60;
    setInterval(function() {
        update();
        draw();
    }, 1000/FPS);
});

/* Builds player 1. */
let player1 = {
    opponentName: "Player 2",
    color: "#00A",
    x: 0,
    y: CANVAS_HEIGHT / 2,
    width: 8,
    height: 40,
    down: false,
    up: false,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}

/* Builds player 2. */
let player2 = {
    opponentName: "Player 1",
    color: "#00A",
    x: CANVAS_WIDTH - 8,
    y: CANVAS_HEIGHT / 2,
    width: 8,
    height: 40,
    down: false,
    up: false,
    draw: function() {
      canvas.fillStyle = this.color;
      canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}

/* Builds the ball element. */
let ball = {
    /* Initial ball settings. */
    color: "#333",
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    width: 6,
    height: 6,

    /* Give the ball a random initial direction and speed. */
    xDirection: Math.sqrt(direction) * (Math.round(Math.random()) * 2 -1),
    yDirection: Math.sqrt(1 - direction) * (Math.round(Math.random()) * 2 -1),

    /* Draw the ball. */
    draw: function() {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }
}

/* Tracks when certain keys are pressed. */
document.onkeydown = function (e) {
    switch (e.key) {
        /* Player 1 keys. */
        case 'w':
            player1.up = true;
            break;
        case 's':
            player1.down = true;
            break;

        /* Player 2 keys. */
        case 'ArrowUp':
            player2.up = true;
            break;
        case 'ArrowDown':
            player2.down = true;
            break;
    }
}

/* Tracks when certain keys are let go of. */
document.onkeyup = function (e) {
    switch (e.key) {
        /* Player 1 keys. */
        case 'w':
            player1.up = false;
            break;
        case 's':
            player1.down = false;
            break;

        /* Player 2 keys. */
        case 'ArrowUp':
            player2.up = false;
            break;
        case 'ArrowDown':
            player2.down = false;
            break;
    }
}

/* Updates the position of the different elements on the field. */
function update() {
    frameCounter += 1;

    playerPositions();
    ballPosition();
}

/* Keep track of the players' positions. */
function playerPositions() {
    if (!freezeGame) {
        /* Player 1 position. */
        if (player1.up) {
            player1.y -= 2;
        }
        if (player1.down) {
            player1.y += 2;
        }

        /* Player 2 position. */
        if (player2.up) {
            player2.y -= 2;
        }
        if (player2.down) {
            player2.y += 2;
        }
    }

    /* Keep the players on the field. */
    player1.y = player1.y.clamp(0, CANVAS_HEIGHT - player1.height);
    player2.y = player2.y.clamp(0, CANVAS_HEIGHT - player2.height);
}

/* Determines the ball's position on the field and how it interacts with the walls and players. */
function ballPosition() {
    /* Keep the ball bouncing off the top and bottom of the field. */
    if(ball.y == 0 || ball.y == CANVAS_HEIGHT - ball.height) {
        ball.yDirection = ball.yDirection * -1;
    }

    /* Bounce the ball on the players. */
    if(!freezeGame) {
        if(ball.x <= player1.width) {
            detectPlayerCollision(player1);
        } else if (ball.x >= CANVAS_WIDTH - (ball.width + player2.width)) {
            detectPlayerCollision(player2);
        }
    }

    /* Move the ball! */
    ball.y += ball.yDirection * ballSpeed;
    ball.x += ball.xDirection * ballSpeed;

    /* Keep the ball on the field. */
    ball.y = ball.y.clamp(0, CANVAS_HEIGHT - ball.height);
    ball.x = ball.x.clamp(0, CANVAS_WIDTH - ball.width);
}

function detectPlayerCollision(player) {
    if(ball.y + ball.height >= player.y && ball.y <= player.y + player.height) {
        ball.xDirection = ball.xDirection * -1;
        ballSpeed *= 1.02;
        hitCounter += 1;
    } else {
        declareWinner(player.opponentName);
    }
}

/* Ends the game and appends HTML elements to declare a winner. */
function declareWinner(player) {
    ball.xDirection = 0;
    ball.yDirection = 0;
    freezeGame = true;

    winnerDeclaration = 'Congratulations to ' + player + ' on a great victory!';
    timePlayedDeclaration = 'Time played: ' + Math.round(frameCounter / 60) + ' seconds.';
}

/* Draws the playing fields, the players and the ball. */
function draw() {
    canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.fillStyle = "#FFF";
    canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    player1.draw();
    player2.draw();
    canvas.fillText(hitCounter, CANVAS_WIDTH /2, 20);
    canvas.fillText(winnerDeclaration, CANVAS_WIDTH /2, CANVAS_HEIGHT / 2 - 20);
    canvas.fillText(timePlayedDeclaration, CANVAS_WIDTH /2, CANVAS_HEIGHT / 2 + 20);
    ball.draw();
}

/* Keeps a value between a given minimum and maximum. */
Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
}