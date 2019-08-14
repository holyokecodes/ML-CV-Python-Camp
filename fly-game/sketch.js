var population;
var food;
var count;
var lifeSpan;
var popSize;

function setup() {
    createCanvas(640, 480)
    count = 0;
    lifeSpan = 600;
    popSize = 500;
    population = new Population(lifeSpan, popSize);
}

function draw() {
    background(0);
    population.run(count);
    count++;

    if (count == lifeSpan) {
        population.evaluate();
        var newFlies = population.generateNewPopulation(0.35);
        population = new Population(lifeSpan, popSize, newFlies);
        count = 0;
    }
}