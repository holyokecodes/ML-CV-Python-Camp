var population;

function setup() {
    createCanvas(640, 480)
    population = new Population();
}

function draw() {
    background(0);
    population.run();
}