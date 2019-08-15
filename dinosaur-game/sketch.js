const GROUND = 200;
const DINO_HEIGHT = 50;
const DINO_WIDTH = 50;
const DINO_X = 200;
const CACTUS_HEIGHT = 200;
const CACTUS_WIDTH = 25;
const GRAVITY = 0.3;
const JUMP = -10;
const SPEED = 3;
let gameOver = false;
let dino, cacti;
let nextCactus = 60; // frames
let score = 0;


function setup() {

    tf.setBackend('cpu');
    // Optionally use spritesheet images
    let dino_run_frames = loadSpriteSheet('trex-spritesheet.png',
    [
        {
            'name': 'run_1', 
            'frame': { 'x': 0, 'y': 100, 'width': 50, 'height': 50 }
        },
        {
            'name': 'run_2', 
            'frame': { 'x': 50, 'y': 100, 'width': 50, 'height': 50 }
        }
    ]);
    dino_run = loadAnimation(dino_run_frames);

    let dino_dead_frames = loadSpriteSheet('trex-spritesheet.png',
    [
        { 
            'name':'dead', 
            'frame': { 'x': 55, 'y': 20, 'width': 70, 'height': 50 }
        },
    ]);
    dino_dead = loadAnimation(dino_dead_frames);

    // Create the canvas 
    createCanvas(800,GROUND + DINO_HEIGHT);
    // Set background color
    background(0);

    ground = createSprite(width/2, GROUND + DINO_HEIGHT, width, DINO_HEIGHT)
    
    // There will be several cacti. Store them in a Group.
    cacti = new Group();

    // Dino starting position
    dino = createSprite(200, GROUND - DINO_HEIGHT, DINO_WIDTH, DINO_HEIGHT);
    dino.addAnimation('run', dino_run);
    dino.addAnimation('dead', dino_dead);
    // this doesn't seem to work?
    dino.frameDelay = 8;

    // Set text size and fill for score display
    textSize(32);
    fill(255);
}
  
function draw() {

    if (!gameOver) {
        dino.changeAnimation('run');
        // Gravity always happens
        dino.velocity.y += GRAVITY;

        //spawn cacti every 60 to 180 frames
        if(frameCount%nextCactus == 0) {
            // Choose a random height for each cactus
            let cactusScale = random(0.2, 0.5);
            let cactus = createSprite(width, GROUND - CACTUS_HEIGHT*cactusScale/2 + DINO_HEIGHT/2, CACTUS_WIDTH, CACTUS_HEIGHT*cactusScale);
            cactus.addImage(loadImage('cactus100x207.png'));
            cactus.scale = cactusScale;
            // cactus.debug = true;
            cacti.add(cactus);
            // pick a random number for the next cactus frame
            nextCactus += round(random(60,180))
        }
  
        for(var i = 0; i<cacti.length; i++) {
            if (cacti[i].collide(dino)) {
                dino.changeAnimation('dead');
                dino.velocity.y = 0;
                gameOver = true
            }
            // Move cactus across screen
            if (cacti[i].position.x > 0) {
                cacti[i].position.x -= SPEED;
                // Add to score if you get past the cactus
                // and it hasn't already been scored
                if (cacti[i].position.x < DINO_X && !cacti[i].scored) {
                    score += 1;
                    cacti[i].scored = true;
                }
            } else {
                // Remove the cactus when it is off the screen
                cacti[i].remove();
            }
        }
        // Don't fall below the ground
        if (dino.position.y >= GROUND) {
            dino.position.y = GROUND
            dino.velocity.y = 0;
        }
        // Jump when SPACE key pressed
        // if you are on the ground
        if (keyDown('SPACE') && dino.position.y == GROUND) {
            dino.velocity.y = JUMP;
        }

        // Debug displays collision boxes
        // dino.debug = true;
    }
    background(0);
    text(score, 50, 50)
    drawSprites();
}