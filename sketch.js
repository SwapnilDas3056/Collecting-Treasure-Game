var path, player, cash, diamonds, jewellery, sword;
var pathImg, playerImg, cashImg, diamondsImg, jewelleryImg, swordImg;
var cashGroup, diamondsGroup, jewelleryGroup, swordGroup;
var treasureCollection = 0;
var PLAY = 1;
END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("Road.png");
  playerImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jewelleryImg = loadImage("jewel.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {
  //create the canvas
  createCanvas(400, 600);

  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating player running
  player = createSprite(70, 530, 20, 20);
  player.addAnimation("SahilRunning", playerImg);
  player.scale = 0.08;

  //create the groups
  cashGroup = new Group();
  diamondsGroup = new Group();
  jewelleryGroup = new Group();
  swordGroup = new Group();
}

function draw() {
  background(0);

  //create the edge sprites
  edges = createEdgeSprites();

  //make it so that the players collide with the edges
  player.collide(edges);

  if (gameState === PLAY) {
    //make the x position of the player equal to that of the mouse
    player.x = World.mouseX;

    //make a scrolling background
    if (path.y > 600) {
      path.y = height / 2;
    }

    //call the funcitons
    createCash();
    createDiamonds();
    createJewellery();
    createSword();

    if (cashGroup.isTouching(player)) {
      cashGroup.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsGroup.isTouching(player)) {
      diamondsGroup.destroyEach();
      treasureCollection = treasureCollection + 150;

    } else if (jewelleryGroup.isTouching(player)) {
      jewelleryGroup.destroyEach();
      treasureCollection = treasureCollection + 100;
    } else {
      if (swordGroup.isTouching(player)) {
        swordGroup.destroyEach();
        gameState = END;
      }
    }
  } else if(gameState === 0){
    player.x = 200;
    player.y = 300;
    player.addAnimation("SahilRunning",endImg);
    player.scale = 0.75;
    
    path.velocityY = 0;
    
    cashGroup.destroyEach();
    cashGroup.setVelocityYEach(0);
    
    diamondsGroup.destroyEach();
    diamondsGroup.setVelocityYEach(0);
    
    jewelleryGroup.destroyEach();
    jewelleryGroup.setVelocityYEach(0);
    
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach(0);
  }

  //draw the sprites
  drawSprites();

  //add the score text
  textSize(20);
  fill("white");
  stroke("black");
  strokeWeight(5);
  text("Treasure: " + treasureCollection, 150, 50);
}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 200;
    cashGroup.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 200;
    diamondsGroup.add(diamonds);
  }
}

function createJewellery() {
  if (World.frameCount % 80 == 0) {
    var jewellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jewellery.addImage(jewelleryImg);
    jewellery.scale = 0.13;
    jewellery.velocityY = 3;
    jewellery.lifetime = 200;
    jewelleryGroup.add(jewellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 200;
    swordGroup.add(sword);
  }
}