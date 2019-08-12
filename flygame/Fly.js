class Fly {
    lifeSpan;
    pos;
    vel;
    acc;
    dna;
    food;
    fitness;
    initDistance;

    constructor(lifeSpan, food) {
        this.lifeSpan = lifeSpan;
        this.dna = new DNA(this.lifeSpan);
        this.food = food;
        this.pos = createVector(width / 2, height - 40);
        this.vel = createVector();
        this.acc = createVector();
        this.fitness = 0;
        this.initDistance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
    }

    calcFitness() {
        var distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.fitness = map(distance, this.initDistance, 0, 0, 10000)
        if(distance <= 20){
            this.fitness *= 10;
        }
        if(this.pos.y >= height){
            this.fitness = -5000;
        }

        if(this.pos.x <= 0 || this.pos.x >= width){
            this.fitness = -5000;
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update(count) {

        var distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        if (distance > 20 && this.pos.y < height && this.pos.x > 0 && this.pos.x < width){
            this.applyForce(this.dna.genes[count]);

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }
    }

    show() {
        push();
        noStroke();
        fill(255, 150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 15);
        pop();
    }

}