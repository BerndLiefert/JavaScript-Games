const CANVAS = document.createElement("canvas");
const CONTEXT = CANVAS.getContext("2d");

CANVAS.width = 512;
CANVAS.height = 512;
CANVAS.id = "stage";

const TILE_SIZE = 16;

const CENTER = {
    x: Math.floor(CANVAS.width / 2 / TILE_SIZE) * TILE_SIZE,
    y: Math.floor(CANVAS.height / 2 / TILE_SIZE) * TILE_SIZE
};

const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const LEFT = 37;

class Game {
    constructor() {
        this.snake = new Snake(CENTER.x, CENTER.y, 3);
        this.timer = 0;
        this.keys = [];
        document.addEventListener("keydown", e => this.keys[e.keyCode] = true);
        document.addEventListener("keyup", e => this.keys[e.keyCode] = false);
    }

    draw() {
        this.clearScreen();

        CONTEXT.fillStyle = "pink";
        CONTEXT.fillRect(this.snake.x, this.snake.y, TILE_SIZE, TILE_SIZE);
        CONTEXT.fillStyle = "black";

        for (let i = 0; i < this.snake.body.length; i++) {
            CONTEXT.fillRect(this.snake.body[i].x, this.snake.body[i].y, TILE_SIZE, TILE_SIZE);
        }
    }

    clearScreen() {
        CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    }

    update() {
        if (this.timer > 10)
            this.timer == 0;

        this.timer++;

        if (this.keys[UP] && this.snake.dir != 2)
            this.snake.dir = 0;

        if (this.keys[RIGHT] && this.snake.dir != 3)
            this.snake.dir = 1;

        if (this.keys[DOWN] && this.snake.dir != 0)
            this.snake.dir = 2;

        if (this.keys[LEFT] && this.snake.dir != 1)
            this.snake.dir = 3;

        if (this.timer % 10 == 0) {
            this.snake.removeItem();
            this.snake.addItem(this.snake.x, this.snake.y);

            if (this.snake.dir == 0)
                this.snake.y -= TILE_SIZE;

            if (this.snake.dir == 1)
                this.snake.x += TILE_SIZE;

            if (this.snake.dir == 2)
                this.snake.y += TILE_SIZE;

            if (this.snake.dir == 3)
                this.snake.x -= TILE_SIZE;
        }


        this.draw();

        if (this.running)
            requestAnimationFrame(this.update.bind(this));
    }

    run() {
        document.querySelector("main").appendChild(CANVAS);
        this.running = true;
        this.update();
    }

    stop() {
        this.running = false;
    }
}

class Snake {
    constructor(x, y, bodyLength) {
        this.body = [];
        this.x = x;
        this.y = y;

        /*
         * 0 up
         * 1 right
         * 2 down
         * 3 left
         */
        this.dir = 3;

        for (let i = 1; i <= bodyLength; i++) {
            this.body.push({
                x: this.x + TILE_SIZE * i,
                y: this.y
            });
        }
    }

    removeItem() {
        this.body.pop();
    }

    addItem(x, y) {
        this.body.unshift({
            x: x,
            y: y
        })
    }
}

let game = new Game();
