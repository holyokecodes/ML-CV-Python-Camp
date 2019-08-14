const lifeSpan = 600;
const popSize = 500;
const rewardMultiplier = 10;
const punishmentDivider = 3;
const mutationRate = 0.35;

function setup() {
    createCanvas(640, 480)
    count = 0;
    population = new Population(lifeSpan, popSize, rewardMultiplier, punishmentDivider);
}

function draw() {
    background(0);
    population.run(count);
    count++;

    if (count == lifeSpan) {
        population.evaluate();
        var newFlies = population.generateNewPopulation(mutationRate);
        population = new Population(lifeSpan, popSize, rewardMultiplier, punishmentDivider, newFlies);
        count = 0;
    }
}