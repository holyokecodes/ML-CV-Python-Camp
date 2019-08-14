const lifeSpan = 600; // How many frames should the flies live
const popSize = 500; // How many flies should there be
const rewardMultiplier = 10; // If they find the food how much should their reward be multiplied
const punishmentDivider = 3; // If they hit something what should their new fraction be 3 = 1/3
const mutationRate = 0.35; // What percentage of their genes should be mutated

function setup() {
    createCanvas(640, 480) // Don't want the canvas to be too big
    count = 0; // Set our inital frame counter

    // Create a new population with all the parameters
    population = new Population(lifeSpan, popSize, rewardMultiplier, punishmentDivider);
}

function draw() {
    background(0); // Black background
    population.run(count); // Run the population at the current frame count
    count++; // Increment frame count

    // Check if we have reached end of the flies life
    if (count == lifeSpan) {
        population.evaluate(); // Check all of their fitness levels
        var newFlies = population.generateNewPopulation(mutationRate); // Select a new fly population
        population = new Population(lifeSpan, popSize, rewardMultiplier, punishmentDivider, newFlies); // Set our population to this new one
        count = 0; // Reset the frame counter
    }
}