var PLAY = 1;
var END = 0;
var gameState = PLAY;
var x1 = 0;
var x2;
var ground, ground_image
var girl, girl_running, girl_collided, girlImage
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var garbageGroup, garbage1, garbage2, garbage3, garbage4, garbage5, garbage6, garbage7,garbage8, garbage9, garbage10,garbage11,garbage12 ,garbage13
var jumpSound, dieSound, checkpointSound, sweepersound;
var score, scoreImage, scoreBoard;
var gameOver, restart, gameOverImage, restartImage;
var level = 1, levelImage, levelBoard;
var invisible_sky, invisible_ground
var winText, winText_img

function preload() {
  ground_image = loadImage("inner home img `1.jpg");
  girl_running = loadAnimation("boy lv1.png");
  obstacle2 = loadImage("tea table.png");
  obstacle3 = loadImage("chair.png");
  obstacle1 = loadImage("table1.png");
  garbage1 = loadImage("x.png");
  garbage2 = loadImage("gitar.png");
  garbage3 = loadImage("duck.png");
  garbage4 = loadImage("car.png");
  garbage5 = loadImage("block.png")
  garbage6 = loadImage("toy-car.png")
  garbage7 = loadImage("trian.png")
  garbage8 = loadImage("durm.png")
  garbage9= loadImage("bear.png")
  garbage10 = loadImage("ball.png")
  garbage11 = loadImage("army man.png")
  garbage12 = loadImage("doll.png")
  garbage13 = loadImage("top.png")
  winText_img = loadImage("win.png");
  gameOverImage = loadImage("go1.png");
  restartImage = loadImage("RS1.png");
  girl_collided = loadImage("Idle1.png");
  girlImage = loadImage("Idle1.png");

  scoreImage = loadImage("Score.png");

  levelImage = loadImage("Level1.png");
}

function setup() {

  createCanvas(windowWidth, windowHeight);



  x2 = width;
  ground = createSprite(0, 0, 600, 1000);

  ground.addImage("ground_image", ground_image);

  ground.x = 689
  ground.y = 264
  // girl = createSprite(300, 470, 600, -20);
  girl = createSprite(300, 470, 400, 400);
  girl.addAnimation("girl_running", girl_running);
  girl.addImage("girl_collided", girl_collided);
  girl.addImage("girlImage", girlImage);

  girl.scale = 0.4;
  girl.x = 200
  girl.y = 300
  // girl.velocityX=2;
  //girl.debug = true;
  girl.setCollider("circle", 0, 0, 200);


  winText = createSprite(windowWidth / 2, windowHeight / 2);
  winText.addImage(winText_img);
  winText.scale = 0.55;
  winText.visible = false;


  invisible_ground = createSprite(400, 650, 2000, 10);
  invisible_ground.visible = false;
  invisible_sky = createSprite(200, 10, 3000, 6);
  invisible_sky.visible = false;


  gameOver = createSprite(windowWidth / 2, windowHeight / 2);
  gameOver.addImage(gameOverImage);

  restart = createSprite(windowWidth / 2, windowHeight / 2 - 150, 200, 200);
  restart.addImage(restartImage);
  restart.scale = 0.60;

  scoreBoard = createSprite(100, 80);
  scoreBoard.addImage(scoreImage);
  scoreBoard.scale = 0.50;

  levelBoard = createSprite(0.9 * windowWidth, 85);
  levelBoard.addImage(levelImage);
  levelBoard.scale = 0.50;

  obstaclesGroup = new Group();
  garbageGroup = new Group();


  score = 0;
}









window.addEventListener("keydown", my_keydown);

function my_keydown(e) {
    keyPressed = e.keyCode;
    console.log(keyPressed);
    if (keyPressed == '38') {
        up();
        console.log("up");
    }
    if (keyPressed == '40') {
        down();
        console.log("down");
    }
    if (keyPressed == '37') {
        left();
        console.log("left");
    }
    if (keyPressed == '39') {
        right();
        console.log("right");
    }
}

function up() {
    if (girl.y>= 300) {
        girl.y= girl.y- 10;
        console.log("When up arrow is pressed,  x = " + player_x + " | y = " + player_y);
              check();
    }
}

function down() {
    if (girl.y<= 500) {
        girl.y= girl.y+ 10;

      
    }
}
function left() {
    if (girl.x>= 0) {
      girl.x = girl.x - 10;

      
    }
}

function right() {
    if (girl.x <= 1050) {
        girl.x = girl.x + 10;

      
    }
}

function draw() {
  girl.collide(invisible_ground);
  girl.collide(invisible_sky);


  if (scoreBoard === 100) {
    winText.visible = true;
    gameState = "WIN";

  }
  if (gameState === "WIN") {
    button = createButton('LEVEL 2');
    button.position(300, 300);
    button.mousePressed(goToNextLevel);

  }
  if (gameState === PLAY) {
    gameOver.visible = false;
    restart.visible = false;
    winText.visible = false;

    spawnToys()
    spawnToys2()
    spawnToys3() 
    spawnHurdles();


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }


    if ((keyDown("space") && girl.y >= 380)) {
      girl.velocityY = -12;

    }



    if (girl.isTouching(obstaclesGroup)) {
      gameState = END;

    }



    for (var i = 0; i < garbageGroup.length; i++) {

      if (girl.isTouching(garbageGroup.get(i))) {
        garbageGroup.get(i).destroy();
        score = score + 10;

      }
    }

  }

  if (score > 100) {
    window.location = ("LEVEL 2.html")
  }

  else if (gameState === END) {
    gameOver.visible = true;

    restart.visible = true;
    ground.velocityX = 0;
    girl.velocityY = 0
    girl.changeImage("girlImage", girlImage);



    if (mousePressedOver(restart)) {
      reset();
    }
  }


  drawSprites();
  fill("black");
  textSize(25);
  text("Score:" + score, 40, 85);
  text("Level : " + level, 0.87 * windowWidth, 85);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
 window.location=("LEVEL 1.html")
  obstaclesGroup.destroyEach();

  score = 0;
}


function spawnHurdles() {
  if (frameCount % 150 === 0) {

    //generate random obstacles
    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1: {

        var obstacle = createSprite(1100, 450, 30, 40);

        obstacle.addImage(obstacle2);


        obstacle.setCollider("circle", 0, 0, 1);

        obstacle.lifetime = 200;  
        obstaclesGroup.add(obstacle);

        break;
      }
      case 2: {

        var obstacle = createSprite(400, 550, 30, 40);


        obstacle.addImage(obstacle1);

        obstacle.setCollider("circle", 0, 0, 1);

        obstacle.lifetime = 200;  
        obstaclesGroup.add(obstacle);

        break;
      }
      case 3: {

        var obstacle = createSprite(700, 460, 30, 40);
         
        obstacle.addImage(obstacle3);
     
        obstacle.setCollider("circle", 0, 0, 1);

        obstacle.lifetime = 200;   
        obstaclesGroup.add(obstacle);

        break;
      }
    }
  }

}
function spawnToys3() {

  if (frameCount % 60 === 0) {

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 6: {
         
        var garbages = createSprite(870, 560, 30, 40);
        garbages.addImage(garbage12);
        garbages.scale = 0.90;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
    }
 
  }
  };

function spawnToys() {
  if (frameCount % 60 === 0) {

    //generate random obstacles
    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1: {
        var garbages = createSprite(900, 450, 0, 0);
        garbages.addImage(garbage1);
        garbages.scale = 0.90;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
      case 2: {
      
        var garbages = createSprite(350, 500, 30, 40);
        garbages.addImage(garbage2);
        garbages.scale = 0.90;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
      case 3: {
       
        var garbages = createSprite(550, 460, 30, 40);
        garbages.addImage(garbage3);
        garbages.scale = 0.80;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
      case 4: {
       
        var garbages = createSprite(650, 450, 30, 40);

        garbages.addImage(garbage4);
        garbages.scale = 0.90;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
      case 5: {
      
        var garbages = createSprite(500, 560, 30, 40);
        garbages.addImage(garbage5);
        garbages.scale = 0.90;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
      case 6: {
       
        var garbages = createSprite(700, 560, 30, 40);
        garbages.addImage(garbage6);
        garbages.scale = 0.90;

        //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
        garbages.setCollider("circle", 0, 0, 70);
        break;
      }
    }
    //assign scale and lifetime to the obstacle           
    garbages.lifetime = 300;
    //add each obstacle to the group  
    garbageGroup.add(garbages)  
  }
  };

  function spawnToys2() {
    if (frameCount % 60 === 0) {
  
      //generate random obstacles
      var rand = Math.round(random(1, 6));
      switch (rand) {
        case 1: {
          var garbages = createSprite(400, 400, 10, 40);
          garbages.addImage(garbage7);
          garbages.scale = 0.90;
  
          //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
          garbages.setCollider("circle", 0, 0, 70);
          break;
        }
        case 2: {
        
          var garbages = createSprite(950, 600, 30, 40);
          garbages.addImage(garbage8);
          garbages.scale = 0.90;
  
          //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
          garbages.setCollider("circle", 0, 0, 70);
          break;
        }
        case 3: {
         
          var garbages = createSprite(550, 760, 30, 40);
          garbages.addImage(garbage9);
          garbages.scale = 0.80;
  
          //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
          garbages.setCollider("circle", 0, 0, 70);
          break;
        }
        case 4: {
         
          var garbages = createSprite(650, 750, 30, 40);
  
          garbages.addImage(garbage10);
          garbages.scale = 0.90;
  
          //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
          garbages.setCollider("circle", 0, 0, 70);
          break;
        }
        case 5: {
        
          var garbages = createSprite(1000, 460, 30, 40);
          garbages.addImage(garbage11);
          garbages.scale = 0.90;
  
          //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
          garbages.setCollider("circle", 0, 0, 70);
          break;
        }
        case 6: {
         
          var garbages = createSprite(870, 560, 30, 40);
          garbages.addImage(garbage12);
          garbages.scale = 0.90;
  
          //garbages.debug = true //by doing this you will be able to see the collider and later comment it in final code
          garbages.setCollider("circle", 0, 0, 70);
          break;
        }
      }
     
      //assign scale and lifetime to the obstacle           
      garbages.lifetime = 300;
      //add each obstacle to the group  
      garbageGroup.add(garbages)  
    }
    };
  
  