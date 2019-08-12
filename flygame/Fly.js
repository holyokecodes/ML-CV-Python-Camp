class Fly {
    lifeSpan = 400;
    pos = createVector(width / 2, height);
    vel = createVector();
    acc = createVector();
    dna = new DNA(this.lifeSpan);
    count = 0;

    applyForce(force) {
        this.acc.add(force);
    };

    update() {
        this.applyForce(this.dna.genes[this.count]);
        this.count++;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    };

    show() {
        push();
        noStroke();
        fill(255, 150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 15);
        pop();
    };

}