let game;

$(document).ready(function() {
    game = new Game(500, 400);
    game.start(game);
});

class Game extends GameBase {
    constructor(canvas_width, canvas_height){
        super(canvas_width, canvas_height);
    }

    start() {
        this._start(this);
        this.playingField = new PlayingField(1500, 1500); // Moet nog gebruikt worden om de speler binnen het spelveld te houden.
        
        let player = new Player("Player 1", 240, 190, 20, 20, new FourDirectionalPlayerControls("w","d","s","a", 2));
        player.draw = function(canvas) {
            canvas.fillStyle = "#00A";
            canvas.fillRect(this.x, this.y, this.width, this.height);
        }
        this.viewPort = player; // Aangeven dat de camera deze speler moet volgen.
        this.entities.push(player);

        let map = new Map(1500, 1500); // Map maakt objecten voor het veld die getekent moeten worden.
        this.entities = this.entities.concat(map.entities);
    }

    update() {
        this._update();

    }

    draw() {
        this._draw();

    }
}

class Map {
    constructor() {
        this.entities = [];
        this.entities = this.entities.concat(this.createWalls());
    }

    createWalls() {
        let wallEntities = [];
        let wall1 = new Entity("wall 1", 0, 300, 1200, 4);
        wall1.draw = function(canvas) {
            canvas.beginPath();
            canvas.moveTo(this.x,this.y);
            canvas.lineTo(this.x + this.width,this.y);
            canvas.stroke();
        }
        wallEntities.push(wall1);

        return wallEntities;
    }
}