class Food {

    constructor(x, y, radius) {
        // Create a position vector with the x and y it was given
        this.pos = createVector(x, y);
        // Set our radius to be the value given
        this.radius = radius;
    }

    // Method we will run when we want to render the food object
    show() {
        // Push to create a new enviroment to make changes without changing anything else
        push();
        // Disable the outline
        noStroke();
        // Move our center to the position where we want the food to be
        translate(this.pos.x, this.pos.y);
        // Set the color of our food
        fill(0, 255, 0);
        // Draw an ellipse at the center, which is now where we want the food to be, with the x and y radius to make a circle
        ellipse(0, 0, this.radius, this.radius);
        // Return to our normal enviroment
        pop();
    }

}