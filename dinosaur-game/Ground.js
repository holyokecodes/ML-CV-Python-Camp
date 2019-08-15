class Ground {

    constructor() {
        this.pos = createVector(width / 2, height - height / 4);
    }

    show() {
        push();
        noStroke();
        translate(this.pos.x, this.pos.y);
        fill(0);
        rectMode(CENTER);
        rect(0, 0, width, 10);
        pop();
    }


}