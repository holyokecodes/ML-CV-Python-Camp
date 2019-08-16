
let dinos = [];
const DINO_COUNT = 50;
let ground;
let cactus;
var score = 0;
var generation = 1;

function setup() {
    tf.setBackend('cpu');
    createCanvas(640, 480);
    ground = new Ground();
    selection = new Selection();
    firstGeneration();
    cactus = new Cactus();
}

function draw() {
    background(255);
    score += 1;
    push();
    fill(0);
    textSize(30);
    text("Generation: " + String(generation), 30, 40)
    text("Score: " + String(score), 30, 70)
    pop();

    if (cactus.pos.x >= -30) {
        cactus.update();
        cactus.show();
    } else {
        cactus = new Cactus();
    }

    ground.show();

    var allDead = true;

    for (let i = 0; i < dinos.length; i++) {
        if (dinos[i].isAlive) {
            allDead = false;
            dinos[i].update(score, cactus);
            dinos[i].show();
        }
    }

    if (allDead) {
        newGeneration();
    }

    if(score > 2000){ // Upper limit so it will continue evolving
        newGeneration();
    }
}

function firstGeneration() {
    score = 0;
    cactus = new Cactus();
    dinos = [];

    for(let i = 0; i < DINO_COUNT; i++){
        dinos.push(new Dino(false, new NeuralNetwork(2, 3, 2)))
    }
}

function newGeneration() {
    score = 0;
    generation++;
    cactus = new Cactus();

    dinos = selection.createNewGeneration(DINO_COUNT, dinos, 0.25); // I don't think mutation is working

    // Player Controlled Dino
    //dinos.push(new Dino(true));

}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        for (let i = 0; i < dinos.length; i++) {
            if (dinos[i].playerControlled) {
                dinos[i].jump();
            }
        }
    }
}