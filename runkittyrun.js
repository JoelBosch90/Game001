let game;

$(document).ready(function() {
    game = new Game(500, 350);
    game.start(game);
});

class Game extends GameBase {
    constructor(canvas_width, canvas_height){
        super(canvas_width, canvas_height);
    }

    start() {
        this._start(this);

        let playerControls = new FourDirectionalPlayerControls("w","d","s","a");
        let player = new Player("Player 1", 10, 10, 20, 20, playerControls);
        player.draw = function(canvas) {
            canvas.fillStyle = "#00A";
            canvas.fillRect(this.x, this.y, this.width, this.height);
        }
        this.entities.push(player);
    }

    update() {
        this._update();

    }

    draw() {
        this._draw();

    }
}