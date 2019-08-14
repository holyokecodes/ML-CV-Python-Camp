class Fly {
    lifeSpan;
    pos;
    vel;
    acc;
    dna;
    food;
    fitness;
    initDistance;
    hitSomething;

    constructor(lifeSpan, food) {
        this.lifeSpan = lifeSpan;
        this.dna = new DNA(this.lifeSpan);
        this.food = food;
        this.pos = createVector(width / 2, height - 40);
        this.vel = createVector();
        this.acc = createVector();
        this.fitness = 0;
        this.initDistance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.hitSomething = false;
    }

    calcFitness() {
        var distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.fitness = map(distance, 0, width, width, 0)
        if(distance <= 24){
            this.fitness *= 10;
        }

        if(this.hitSomething){
            this.fitness /= 3;
        }

    }

    applyForce(force) {
        this.acc.add(force);
    }

    update(count, wall) {

        var distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        if (distance > 20 && this.pos.y < height && this.pos.y > 0 && this.pos.x > 0 && this.pos.x < width && !wall.hitWall(this.pos.x, this.pos.y)){
            this.applyForce(this.dna.genes[count]);

            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }else{
            this.hitSomething = true;
        }
    }

    show() {
        push();
        noStroke();
        this.calcFitness();
        translate(this.pos.x, this.pos.y);
        fill(255);
        text(this.fitness.toFixed(1), 0, 0);
        rotate(this.vel.heading());
        fill(255, 150);
        rectMode(CENTER);
        rect(0, 0, 25, 15);
        pop();
    }

}