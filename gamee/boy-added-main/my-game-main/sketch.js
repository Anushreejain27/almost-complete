var PLAY = 1;
var END = 2;
var W = 0;
var levelUp =3;
var gameState = W;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound
var levelUpFlag= false;

function preload(){

  trex_running = loadAnimation("girlCollide.png","tile006.png","tile005.png","tile004.png","tile003.png","tile002.png","tile001.png","tile000.png");
  trex_collided = loadAnimation("tile001.png");
  
  groundImage = loadImage("ground2.png");
  bgI = loadImage("nb.jpg")
  level = loadImage("level_up-removebg-preview.png")
  boy =loadImage("boyW.png")
  girll = loadImage("girl.png")
  bb= loadImage("frontpage.png");
  boycollided= loadImage("boyCollide.png")
  girlcollided = loadImage("girlCollide.png")
  nextI = loadImage ("next-removebg-preview.png")
  
  cloudImage = loadImage("cloud.png");
  boyAnimation = loadAnimation("boyCollide.png","1 (2).png","1 (3).png","1 (4).png","1 (5).png","1 (6).png","1 (7).png",)
  obstacle1 = loadImage("ob1.png");
  obstacle2 = loadImage("ob2.png");
  obstacle3 = loadImage("ob3.png");
  obstacle4 = loadImage("ob4.png");
  obstacle5 = loadImage("ob5.png");
  cycI = loadImage("cyc.png.png")
  scoreI = loadImage("score-removebg-preview.png")
  
  restartImg = loadImage("replay-removebg-preview.png")
  gameOverImg = loadImage("game_over-removebg-preview.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")

}

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  textSize(16)
  fill('hwite')
  text(": "+ score, 490,35); 
  
  trex = createSprite(50,displayHeight/2+100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", girlcollided);
  trex.addAnimation("collided2", boycollided);
  trex.visible= false
  
  cyc= createSprite(windowWidth /2, displayHeight/2-200, 10 ,10)
  cyc.addImage(cycI)

  scoreee = createSprite(windowWidth/2 +300, displayHeight/2 -350,30,20);
  scoreee.addImage(scoreI)
  scoreee.scale = 0.3

  levelUP = createSprite(windowWidth /2, displayHeight/2 -100 ,100,100);
  levelUP.addImage(level)
  levelUP.scale = 0.75
  levelUP.visible = false

 // console.log(trex.y)

  trex.scale = 0.8;
   boyy= createSprite(windowWidth/2-300,displayHeight/2+60)
   boyy.addImage(boy)
  boyy.visible=false
  //boyy.scale = 0.53

  girl= createSprite(windowWidth/2+300,displayHeight/2+60)
   girl.addImage(girll)
 girl.visible=false
 // girl.scale = 0.53
  
  ground = createSprite(200,displayHeight- 210,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(windowWidth/2,displayHeight-500);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart = createSprite(windowWidth/2,displayHeight- 400,50,50);
  restart.addImage(restartImg);
  restart.scale = 0.2;

  nextLevel = createSprite(windowWidth/2,displayHeight/2 + 50,50,50);
 nextLevel.addImage(nextI);
  nextLevel.scale = 0.11;
  nextLevel.visible = false;
  
  invisibleGround = createSprite(200,displayHeight -200,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  trex.setCollider("rectangle",0,0,trex.width- 27,trex.height);
  trex.debug = false
  
  score = 0;
  
}

function draw() {
  
  
 
  
  background("white");
    
  
  //displaying score
  
  /*if (gameState ===  WAIT){
    button = createImg('play-removebg-preview.png')
      button.position(displayWidth,displayHeight)
      button.size(200,200)
      button.mouseClicked(startGame)
  }*/
  if(gameState=== W){

    
    //console.log("gameState=WAIT")
    image(bb,0, 0,windowWidth,windowHeight)
    gameOver.visible = false;
    restart.visible = false;
    ground.visible= false
    levelUP.visible = false;
    cyc.visible = true
    nextLevel.visible = false
    
    boyy.visible= true
    girl.visible= true
    if(mousePressedOver(boyy)) {
      gameState= PLAY
      trex.addAnimation("running", boyAnimation);
      boyFlag = true
      girlFlag= false
    }
    if(mousePressedOver(girl)) {
      gameState= PLAY
      trex.addAnimation("running", trex_running);
      girlFlag= true
      boyFlag = false
    }


    }
 //--------------------------------------------PLAY STATE----------------------------------------------  
    else if(gameState === PLAY){
    
    image(bgI,0,0,windowWidth,windowHeight )
    textSize(16)
  fill('hwite')
  text(": "+ score, windowWidth/2 +350,displayHeight/2 -345);
    gameOver.visible = false;
    ground.visible = true;
    restart.visible = false;
   // boyy.scale = 0.5
  // levelUp.visible = false
    boyy.visible= false
    girl.visible= false
    cyc.visible = false
    levelUp.visible = false
    nextLevel.visible= false;
    if(boyFlag=== true){
    trex.scale =0.53
    
    }
    else if(girlFlag === true) {
    trex.scale =1
    
    }
    
    trex.visible= true 
    trex.debug = false
    trex.setCollider("rectangle",0,0,50,trex.height-20)
    console.log(trex.y)
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    //get frame rate is because the frame counts are always in the game even in gamestate over
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 490) {
        trex.velocityY = -15;
    
    }
     if(keyWentDown("space")&& trex.y >= 490) {
       
        jumpSound.play();
    }

     //spawn the clouds
     spawnClouds();
      //spawn obstacles on the ground
    spawnObstacles();
    //spawn obstacles on the ground

    

    if(score===50&& levelUpFlag=== false){
      gameState = levelUp
      levelUpFlag = true 
    }
  
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
   
  
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
//---------------------------------------------LEVEL UP STATE-----------------------------------------------//
else if (gameState === levelUp&& levelUpFlag === true){
  image(bgI,0,0,windowWidth,windowHeight )
    levelUP.visible = true  
    nextLevel.visible = true;
   // restart.visible = true
      cyc.visible = false;
     console.log("END")
     //change the trex animation
      if(girlFlag=== true&& boyFlag=== false){
        trex.changeAnimation("collided", girlcollided);
       // console.log("boyFlag = true",boyFlag)
        }

     else if (boyFlag=== true&& girlFlag=== false){
      trex.changeAnimation("collided2", boycollided);
      console.log("boyFlag = true",boyFlag)
     }
     //allows a var to get clicked...
     if(mousePressedOver(nextLevel)) {
    
      resetLevelUp();
    }

      ground.velocityX = 0;
      trex.velocityY = 0
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    

}

//--------------------------------------END STATE-------------------------------------------------------------//
   else if (gameState === END) {
    image(bgI,0,0,windowWidth,windowHeight )
      gameOver.visible = true;
      restart.visible = true;
      cyc.visible = false;
     console.log("END")
     //change the trex animation
      if(girlFlag=== true&& boyFlag=== false){
        trex.changeAnimation("collided", girlcollided);
       // console.log("boyFlag = true",boyFlag)
        }

     else if (boyFlag=== true&& girlFlag=== false){
      trex.changeAnimation("collided2", boycollided);
      console.log("boyFlag = true",boyFlag)
      }
    
     //allows a var to get clicked...
      if(mousePressedOver(restart)) {
    
      reset();
    }

      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  //------------------------------------------------------------------------------------------------------------//
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  drawSprites();
}
//----------------------------------------DRAW FUNCTION END----------------------------------------------------//
function reset(){
  gameState=W;
  trex.visible = false
  nextLevel.visible = false
gameOver.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
    //trex.changeAnimation("running",trex_running)
  score=0;
   // boyFlag = false
    //girlFlag = false
  if(boyFlag=== true){
    trex.changeAnimation("running", boyAnimation);
    
    }
    else if(girlFlag === true) {
      trex.changeAnimation("running", trex_running);
    
    }
   
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(windowWidth,displayHeight - 220,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
     
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
 
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(windowWidth,displayHeight-600,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    //assign lifetime to the variable
    cloud.lifetime = 10000;
     //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

 function startGame(){
gameState = PLAY
 }
 function resetLevelUp(){
  gameState= PLAY;
 /*trex.visible = true
  nextLevel.visible = false
gameOver.visible=false;
  restart.visible=false;*/
  levelUp.visible = false
  nextLevel.visible = false
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
    //trex.changeAnimation("running",trex_running)
  
   // boyFlag = false
    //girlFlag = false
  if(boyFlag=== true){
    trex.changeAnimation("running", boyAnimation);
    
    }
    else if(girlFlag === true) {
      trex.changeAnimation("running", trex_running);
    
    }

 }













