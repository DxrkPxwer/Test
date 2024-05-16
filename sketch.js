var PLAY = 1;
var END = 0;
var curState = playState

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var backgroundImg;
var score = 0;
var jumpSound, collidedSound;

var gameOver, restart;

function preload(){

    //i hate preloads goddam.

    jumpSound = loadSound("assets/sounds/jump.wav")
    collidedSound = loadSound("assets/sounds/collided.wav")

    backgroundImg = loadImage("assets/imgaes/sky.png");
    sunAnimation = loadImage("assets/images/sunshine yaya.png")
    
    trex_running = loadAnimation("assets/images/Dine saw/1.png", "assets/images/Dine saw/2.png")
    trex_collided = loadAnimation("assets/images/Dine saw/smol.png")

    groundImage = loadImage("assets/images/ground.png")
    
    cloudImage = loadImage("assets/images/cloud.png")

    obstacle1 = loadImage("assets/images/cactus/caactus1.png")
    obstacle2 = loadImage("assets/images/cactus/caactus2.png")
    obstacle3 = loadImage("assets/images/cactus/caactus3.png")
    obstacle4 = loadImage("assets/images/cactus/caactus4.png")

    gameOver = loadImage("assets/images/gaem aver.png")
    restart = loadImage("assets/images/reset.png")

    //i hope this works or else ill smash me phon!!1!!111!!!

};

function setup(){
    createCanvas(600, 200)
    sun = createSprite(width - 50, 100, 10, 10);
    sun.addAnimation('sun', sunAnimation);
    sun.Scale = 0.1

    trex = createSprite(50, height - 70, 20, 50)
    
    trex.addAnimation("running", trex_running)
    trex.addAnimation("collided", trex_collided)
    trex.Scale = 0.08
    //testing purposes
    trex.debug = true

    invisibleGround = createSprite(width / 2, height - 10, width, 125);
    invisibleGround.shapeColor = "#f4cbaa";

    ground = createSprite(width / 2, height - 10, width, 125)
    ground.addImage("ground", groundImage)
    ground.velocityX = -(6 + 3 * score / 100);

    gameOver = createSprite(width / 2, height / 2 - 50)
    gameOver.addImage(gameOver);

    restart = createSprite(width / 2, height / 2 - 50)
    restart.addImage(restart)

    gameOver.Scale = 0.5;
    restart.Scale = 0.1;

    gameOver.visible = false //relatable
    restart.visible = false

    
    cloudsGroup = new Group();
    obstacleGroup = new Group();

    score = 0;
}

function draw(){
    trex.debug = true;


    background(backgroundImg)
    textSize(20);
    fill("black")
    TextFont("Comic Sans MS");
    Text("Score: " + score, 30, 50);

    if (curState == playState){
        score = score + Math.round(getFramerate() / 60)
        ground.velocityX = 1(6 + 3 * score / 100);

        if (keyDown("SPACE") && trex.y >= height - 120){
            jumpSound.play();
            trex.VelocityY = -10;
        }
        trex.velocityY = trex.velocityY + 0.8

        if (ground.x < 0)
        {
            ground.x = ground.width / 2;
        }

        trex.collide(invisibleGround);
        spawnClouds();
        spawnObstacles();

        if (obstacleGroup.isTouching(trex))
        {
            collidedSound.play()
            curState = END
        }
    }
    else if (curState === END){
        gameOver.visible = true;
        restart.visible = true;

        //set velocity for stuff

        ground.velocityX = 0;
        trex.velocityY = 0;
        obstacleGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)

        //change da forking dinasaw animation
        trex.changeAnimation("collided", trex_collided)

        //uhhh it sets obstacles lifetime?????
        obstacleGroup.setLifetimeEach(-1);//blud's got banned from existence
        cloudsGroup.setLifetimeEach(-1);//this mf neither

        if (keyDown("SPACE"))
        {
            reset();//makes everything have amnesia and restart it over and over again
        }
    }


    drawSprites();//it draws sprites. WEEEEEEEEEEEEEEEEEEE
    
}

//NOT A NEW FUNCTION-
function spawnClouds(){
    if(frameCount % 60 === 0 ){
        var cloud = createSprite(width + 20, height - 300, 40, 10);
        cloud.y = Math.round(random(100 ,220));//hell nah!!111!
        cloud.addImage(cloudImage)//holy cow!!!!!
        cloud.scale = 0.5;
        cloud.velocityX = -3;//do you want holy poop hehehehehehe - Bambi

        //who
        cloud.lifetime = 300

        //depth
        cloud.depth = trex.depth//hhhhuuuuuuuuuuuuu
        trex.depth = trex.depth + 1//i can't know sh
        //i gave him clouds, holy moly :0
        cloudsGroup.add(cloud)
    }
}

//AGAIN??????????????????????????????????????????????????????????

function spawnObstacles(){//she friday on my night till i funkin'
    if(frameCount % 60 === 0)
    {
        var obstacle = createSprite(600, height - 95, 20, 30);
        obstacle.setCollider('circle', 8, 8, 45)
        obstacle.debug = true

        obstacle.velocityX = -(6 + 3 * score / 100);

        //generating obstacles (my fav part)

        var rand = Math.round(random(1,2))
        switch(rand){
            case 1:
                obstacle.addImage(obstacle1)
                break;//mah phone
            case 2:
                obstacle.addImage(obstacle2)
                break;
            default:
                break;
        }

        //i honestly love commenting stuff, but this sh is for scaling and lifetime to da obstacles
        obstacle.scale = 0.3;
        obstacle.lifetime = 300;
        obstacle.depth = trex.depth
        trex.depth += 1;//math is confusing af
        obstacleGroup.add(obstacle)
    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;

    obstacleGroup.destroyEach();
    cloudsGroup.destroyEach();

    trex.changeAnimation("running", trex_running);

    score = 0;
}

//finish