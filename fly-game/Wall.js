class Wall {

    pos;
    w;
    h;

    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
    }

    hitWall(flyX, flyY){
        if(flyX > this.pos.x - this.w/2 && flyX < this.pos.x + this.w/2 && flyY > this.pos.y - this.h/2 && flyY < this.pos.y + this.h/2){
            return true;
        }else{
            return false;
        }
    }

    show() {
        push();
        noStroke();
        fill(255, 150, 0);
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }

}