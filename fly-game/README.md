# Fly Game

Start with our fly class and setup its position and drawing

```javascript
constructor(){
  this.pos = createVector(width/2, height - 40);
}


show(){
  push();
  noStroke();
  translate(this.pos.x, this.pos.y);
  fill(255, 150);
  rectMode(CENTER);
  rect(0, 0, 25, 15);
  pop();
}
```

Now we can get the basics of our sketch file
```javascript
const LIFE_SPAN = 600; // How many frames should the flies live
const POP_SIZE = 500; // How many flies should there be
const REWARD_MULTI = 10; // If they find the food how much should their reward be multiplied
const PUNISH_DIV = 3; // If they hit something what should their new fraction be 3 = 1/3
const MUTATION_RATE = 0.1; // What percentage of their genes should be mutated

let count = 0; // Set our inital frame counter

function setup(){
  createCanvas(640, 480);
}

function draw(){
  background(0);
  count++;
  
  if(count == LIFE_SPAN){
    count = 0;
  }
}
```

We can preview our fly by creating a fly object and then running show
```javascript
fly = new Fly();
fly.show();
```

And we can run this using `python -m http.server`

Ctrl (CMD) Shift R will force refresh chrome

Now we need to work on getting our flies to move

To do this we need to write our DNA file
```javascript
class DNA {

    constructor(length) {

        // Empty list for our genes
        this.genes = [];

        // Loop for the length we want
        for (var i = 0; i < length; i++) {
            // Set the gene at that index to a random vector
            this.genes[i] = p5.Vector.random2D();
            // Lower the magnitude of the vector to a reasonable amount
            this.genes[i].setMag(0.1);
        }
    }

    // Method to generate DNA with two parents
    generateMergedDNA(mutationRate, parentA, parentB) {

        // Our empty new sequence of genes
        var sequence = [];

        // Loop over the length of the parents dna
        for (var i = 0; i < parentA.dna.genes.length; i++) {

            // Choose a random parent
            var p = int(random())

            // Depending on the parent selected, use parentA or parentB for the gene in the new sequence
            sequence.push(p ? parentA.dna.genes[i] : parentB.dna.genes[i]);

            // Generate a random value between 0 and 1.
            var shouldMutate = random()

            // Check if our mutation rate is larger than the generated rate
            if (mutationRate > shouldMutate) {
                // If it is then we mutate by reseting the gene to a random value

                sequence[i] = p5.Vector.random2D();
                sequence[i].setMag(0.1);
            }

        }

        // Assign our dna genes to be the new sequence we created
        this.genes = sequence;
    }

}
```
Before we can test this we need to update our fly

Add this to the constructor
```javascript
constructor(lifeSpan){
  this.dna = new DNA(this.lifeSpan);
}
```

And write a new update method
```javascript
update(count){
  this.applyForce(this.dna.genes[count]);
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
}
```

And we can test this by changing our previous test code to
```javascript
fly.update(count);
```

Now lets add our food
```javascript
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
```

And we can test this just like the fly

And we can make our wall

```javascript
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
```

And again test it

Now we are ready to finish up our full program

To do this we need to finish our fly
```javascript
class Fly {

    constructor(lifeSpan, reward, punishment, food) {
        this.lifeSpan = lifeSpan;
        this.dna = new DNA(this.lifeSpan);
        this.food = food;
        this.pos = createVector(width / 2, height - 40);
        this.vel = createVector();
        this.acc = createVector();
        this.reward = reward;
        this.punishment = punishment;
        this.fitness = 0;
        this.initDistance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.hitSomething = false;
    }

    calcFitness() {
        var distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        this.fitness = map(distance, 0, width, width, 0)
        if(distance <= this.food.radius){
            this.fitness *= this.reward;
        }

        if(this.hitSomething){
            this.fitness /= this.punishment;
        }

    }

    applyForce(force) {
        this.acc.add(force);
    }

    update(count, wall) {

        var distance = dist(this.pos.x, this.pos.y, this.food.pos.x, this.food.pos.y);
        if (distance > this.food.radius && this.pos.y < height && this.pos.y > 0 && this.pos.x > 0 && this.pos.x < width && !wall.hitWall(this.pos.x, this.pos.y)){ // MAGIC
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
```

And then write our Population file

```javascript
class Population {

    constructor(lifeSpan, popSize, reward, punishment, newPopulation) {

        this.flies = [];
        this.popSize = popSize;
        this.food = new Food(width / 2, 50, 30);
        this.wall = new Wall(width/2, height - height/3, 300, 30)
        this.matingPool = [];
        this.reward = reward;
        this.lifeSpan = lifeSpan;
        this.punishment = punishment;

        if (newPopulation === undefined) {
            for (var i = 0; i < this.popSize; i++) {
                this.flies[i] = new Fly(this.lifeSpan, this.reward, this.punishment, this.food);
            }
        } else {
            this.flies = newPopulation;
        }
    }

    evaluate() {

        var maxFit = 0;

        for (var i = 0; i < this.popSize; i++) {
            
            this.flies[i].calcFitness();

            if(this.flies[i].fitness > maxFit){
                maxFit = this.flies[i].fitness;
            }
        }

        for(var i = 0; i < this.popSize; i++){

            var matingCount = int((this.flies[i].fitness/maxFit).toFixed(4) * 40); // MAGIC

            for(var j = 0; j < matingCount; j++){
                this.matingPool.push(this.flies[i])
            }
        }
    }

    generateNewPopulation(mutationRate) {
        var newFlies = [];

        for (var i = 0; i < this.popSize; i++) {

            var newFly = new Fly(this.lifeSpan, this.reward, this.punishment, this.food);


            var randomA = int(random(0, this.matingPool.length));
            var randomB = int(random(0, this.matingPool.length));

            var parentA = this.matingPool[randomA];
            var parentB = this.matingPool[randomB];

            newFly.dna.generateMergedDNA(mutationRate, parentA, parentB);

            newFlies.push(newFly);
        }

        return newFlies;
    }


    run(count) {
        this.food.show();
        this.wall.show();
        for (var i = 0; i < this.popSize; i++) {
            this.flies[i].update(count, this.wall);
            this.flies[i].show();
        }
    }
}
```

And finally rebuild our sketch.js
```javascript
const LIFE_SPAN = 600; // How many frames should the flies live
const POP_SIZE = 500; // How many flies should there be
const REWARD_MULTI = 10; // If they find the food how much should their reward be multiplied
const PUNISH_DIV = 3; // If they hit something what should their new fraction be 3 = 1/3
const MUTATION_RATE = 0.1; // What percentage of their genes should be mutated

let count = 0; // Set our inital frame counter

function setup() {
    createCanvas(640, 480) // Don't want the canvas to be too big

    // Create a new population with all the parameters
    population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULTI, PUNISH_DIV);
}

function draw() {
    background(0); // Black background
    population.run(count); // Run the population at the current frame count
    count++; // Increment frame count

    // Check if we have reached end of the flies life
    if (count == LIFE_SPAN) {
        population.evaluate(); // Check all of their fitness levels
        var newFlies = population.generateNewPopulation(MUTATION_RATE); // Select a new fly population
        population = new Population(LIFE_SPAN, POP_SIZE, REWARD_MULTI, PUNISH_DIV, newFlies); // Set our population to this new one
        count = 0; // Reset the frame counter
    }
}
```

Now our program should be working

We can customize it, or try some new things like putting images for the fly with
```javasciprt
img = loadImage('assets/laDefense.jpg');
image(img, x, y, w, h);
```
