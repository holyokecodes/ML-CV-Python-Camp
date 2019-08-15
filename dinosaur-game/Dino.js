class Dino {

    constructor(playerControlled) {
        this.pos = createVector(width / 4, height - height / 4 - 25); // Ground Position + half height
        this.vel = createVector();
        this.playerControlled = playerControlled;
    }

    update() {

        this.vel.y += -0.25; // Gravity

        this.pos.y -= this.vel.y;

        if (this.pos.y >= height - height / 4 - 25) {
            this.pos.y = height - height / 4 - 25;
            this.vel.y = 0;
        }
    }

    jump() {
        if(this.pos.y == height - height / 4 - 25){
            this.vel.y += 7;
        }
    }

    show() {
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(40, 100);
        rectMode(CENTER);
        rect(0, 0, 30, 50);
        pop();
    }
}