var population;
var food;
var count;
var lifeSpan;

function setup() {
    createCanvas(640, 480)
    count = 0;
    lifeSpan = 200;
    population = new Population(lifeSpan);
}

function draw() {
    background(0);
    population.run(count);
    count++;

    if (count == lifeSpan) {
        population.evaluate();
        var newFlies = population.generateNewPopulation(0.1);
        population = new Population(lifeSpan, newFlies);
        count = 0;
    }
}