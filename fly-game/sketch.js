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