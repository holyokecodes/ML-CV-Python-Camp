class Food {

    constructor(x, yPos, radius) {
        this.pos = createVector(x, yPos);
        this.radius = radius;
    }

    show() {
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(0, 255, 0);
        ellipse(0, 0, this.radius, this.radius);
        pop();
    }

}