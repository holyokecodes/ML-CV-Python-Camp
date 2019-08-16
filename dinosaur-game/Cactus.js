class Cactus {
    constructor() {
        this.count = random(0, 3);
        this.speed = 5;
        this.pos = createVector(width + 30, height - height / 4 - 25);
        this.width = 30;
        this.spacing = 5;
        this.height = 50;
    }

    update() {
        this.pos.x -= this.speed;
    }

    show() {
        for (let i = 0; i < this.count; i++) {
            push();
            noStroke();
            translate(this.pos.x + (this.width + this.spacing) * i, this.pos.y);
            fill(0, 200, 0, 100);
            rectMode(CENTER);
            rect(0, 0, this.width, this.height);
            pop();
        }
    }
}