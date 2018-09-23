class GameBase {
    constructor(canvas_width, canvas_height) {
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.playingField = new PlayingField(this.canvas_width, this.canvas_height);

        this.entities = [];
        let canvasElement = $("<canvas width='" + this.canvas_width + "' height='" + this.canvas_height + "'></canvas>");
        this.canvas = canvasElement.get(0).getContext("2d");
        canvasElement.appendTo('body');
    }

    start() {
        this._start(this);
    }

    _start(game) {
        this.controlInput = new ControlInput();

        let FPS = 60;
        this.interval = setInterval(function() {
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
        
        var arrayLength = this.entities.length;
        for (var i = 0; i < arrayLength; i++) {
            if(this.entities[i].draw != null) {
                this.entities[i].draw(this.canvas);
            }
            if(this.entities[i].controls != null) {
                this.entities[i].controls.move(this.controlInput, this.entities[i]);
            }
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
        let controlInput = this;
        /* Tracks when certain keys are pressed. */
        document.onkeydown = function (e) {
            controlInput[e.key] = true;
        }

        /* Tracks when certain keys are let go of. */
        document.onkeyup = function (e) {
            controlInput[e.key] = false;
        }  
    }
    
    IsKeyPressed(key) {
        if(this[key] !== null) {
            return this[key];
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

    move(controlInput, player) {
        if(controlInput.IsKeyPressed(this.upKey)) {
            player.y -= 2;
        }
        if(controlInput.IsKeyPressed(this.leftKey)){
            player.x += 2;
        }
        if(controlInput.IsKeyPressed(this.downKey)){
            player.y += 2;
        }
        if(controlInput.IsKeyPressed(this.rightKey)){
            player.x -= 2;
        }
    }
}

class Player extends Entity {
    constructor(name, x, y, width, height, controls) {
        super(name, x, y, width, height);
        
        this.controls = controls;
    }
}

class PlayingField {
    constructor(width, height) {
        this.height = height;
        this.width = width;
    }
}