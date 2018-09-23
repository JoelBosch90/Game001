class GameBase {
    constructor(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;

        this.entities = [];
        let canvasElement = $("<canvas width='" + this.canvas_width + "' height='" + this.canvas_height + "'></canvas>");
        this.canvas = canvasElement.get(0).getContext("2d");
        canvasElement.appendTo('body');
    }

    start() {
        this._start(this);
    }

    _start(game) {
        let FPS = 60;
        setInterval(function() {
            game.update();
            game.draw();
        }, 1000/FPS);
    }

    update() {
        this._update();
    }

    _update() {
        
    }

    draw() {
        this._draw();
    }

    _draw() {
        /* Draw the empty canvas. */
        this.canvas.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.canvas.fillStyle = "#FFF";
        this.canvas.fillRect(0, 0, this.canvas_width, this.canvas_height);
        
        //console.log(this.entities);
        // this.entities.forEach(function (e) {
        //     e.draw(this.canvas);
        // });
        var arrayLength = this.entities.length;
        for (var i = 0; i < arrayLength; i++) {
            this.entities[i].draw(this.canvas);
        }
    }
}

class Entity {
    constructor(name, x, y, width, height) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class ControlInput {
    constructor() {
        /* Tracks when certain keys are pressed. */
        document.onkeydown = function (e) {
            this[e.key] = false;
        }

        /* Tracks when certain keys are let go of. */
        document.onkeyup = function (e) {
            this[e.key] = false;
        }
    }

    IsKeyPressed(key) {
        if(this[e.key] !== null) {
            return this[e.key];
        }
    }
}

class FourDirectionalPlayerControls {
    constructor(upKey, leftKey, downKey, rightKey, speed) {
        this.upKey = upKey;
        this.leftKey = leftKey;
        this.downKey = downKey;
        this.rightKey = rightKey;
        this.speed = speed;
    }

    Move(player) {
        switch (key) {
            case this.upKey:
                player.x -= 2;
                break;
            case this.leftKey:
                player.y -= 2;
                break;
            case this.downKey:
                player.x += 2;
                break;
            case this.rightKey:
                player.x += 2;
                break;
        } 
    }
}

class Player extends Entity {
    constructor(name, x, y, width, height, shape, controls) {
        super(name, x, y, width, height);
        
        this.controls = controls;
    }
}