class Dino {

    constructor(playerControlled, brain) {
        this.pos = createVector(width / 4, height - height / 4 - 25); // Ground Position + half height
        this.vel = createVector();
        this.playerControlled = playerControlled;
        this.isAlive = true;
        this.width = 30;
        this.height = 50;
        this.brain = brain;
        this.score = 0;
    }

    update(score, cactus) {

        this.score = score;

        if (!this.playerControlled) {
            this.think(cactus);
        }


        this.vel.y += -0.25; // Gravity

        this.pos.y -= this.vel.y;

        if (this.pos.y >= height - height / 4 - 25) {
            this.pos.y = height - height / 4 - 25;
            this.vel.y = 0;
        }


        // Check Collision
        let cactusWidth = ((cactus.width + cactus.spacing) * cactus.count) - cactus.spacing; // Calculate Full Width of Cactus

        if (this.pos.x + this.width / 2 > cactus.pos.x - cactus.width / 2 && this.pos.x - this.width / 2 < cactus.pos.x + cactusWidth) { // Check X
            if (this.pos.y + this.height / 2 > cactus.pos.y - cactus.height / 2) {
                this.isAlive = false;
            }

        }


    }

    think(cactus) {


        var distancetoCactus = cactus.pos.x - cactus.width / 2 - this.pos.x + this.width / 2

        var action = this.brain.predict([distancetoCactus, cactus.count])

        if (action[0] > action[1]) {
            this.jump();
        } else {
            // Do Nothing
        }
    }

    jump() {
        if (this.pos.y == height - height / 4 - 25) {
            this.vel.y += 7;
        }
    }

    show() {
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        if (this.playerControlled) {
            fill(100, 0, 0, 100);
        }else{
            fill(40, 100);
        }
        rectMode(CENTER);
        rect(0, 0, this.width, this.height);
        pop();
    }
}