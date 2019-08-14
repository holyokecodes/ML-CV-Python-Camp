class Wall {

    // Like the food initiate our object with the positional data we need 
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.w = w;
        this.h = h;
    }

    // Method to detect if the fly has collided with the wall
    hitWall(flyX, flyY){
        // Check if the flies position is within the bounds of the wall
        if(flyX > this.pos.x - this.w/2 && flyX < this.pos.x + this.w/2 && flyY > this.pos.y - this.h/2 && flyY < this.pos.y + this.h/2){
            // If so we have hit the wall
            return true;
        }else{
            // Otherwise we haven't
            return false;
        }
    }

    // Method to render our wall
    show() {
        push();
        noStroke();
        fill(255, 150, 0);
        translate(this.pos.x, this.pos.y);
        // We want to draw the wall from the center, instead of the top left
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
        pop();
    }

}