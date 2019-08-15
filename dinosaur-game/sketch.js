
let dinos = [];
let ground;

function setup() {
    createCanvas(640, 480);
    ground = new Ground();
    dinos.push(new Dino(true));
}

function draw() {
    background(255);
    ground.show();
    for (let i = 0; i < dinos.length; i++) {
        dinos[i].update();
        dinos[i].show();
    }
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