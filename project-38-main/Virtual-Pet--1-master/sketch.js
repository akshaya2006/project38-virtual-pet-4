//Create variables here
var dog, sadDog, happyDog, garden, washroom, livingroom, milkBottle, database;
var foodS, foodStock;
var fedTime, lastFed, currentTime;
var feed, addFood;
var foodObj;
var gameState, readState;

function preload() {
  sadDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happy dog.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");
  livingroom = loadImage("images/Living Room.png");
  milkBottle = loadImage("images/milk.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();

  dog = createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);
 
}

function draw() {
  background("yellow");

  foodObj.display();
  writeStock(foodS);

  if (foodS == 0){
    dog.addImage(happyDog);
    milkBottle.visible=false;
  } else{
    dog.addImage(sadDog);
    milkBottle.visible=true;
  }

  var gameStateRef=database.ref("gameState");
  gameStateRef.on("value",function(data){
    gameState=data.val();

  })
if (gameState===1){
  dog.addImage(happyDog);
  dog.scale=0.175;
  dog.y = 250;
}

if (gameState===2){
  dog.addImage(sadDog);
  dog.scale=0.175;
  milkBottle.visible = false;
  dog.y = 250;
}

var Bath=createButton("I want to take bath");
Bath.position(580,125);
if (Bath.mousePressed(function(){
  gameState = 3;
  database.ref('/').update({'gameState':gameState});
}));

if (gameState===3){
  dog.addImage(washroom);
  dog.scale=1;
  milkBottle.visible = false;
}


var Sleep=createButton("I am very sleepy");
Sleep.position(710,125);
if (Sleep.mousePressed(function(){
  gameState=4;
  database.ref('/').update({'gameState':gameState});
}));

if (gameState===4){
  dog.addImage(bedroom);
  dog.scale = 1;
  milkBottle.visible = false;
}

var Play=createButton("Lets play");
Play.position(500,160);
if (Play.mousePressed(function(){
    gameState=5;
    database.ref('/'.update({'gameState':gameState}));
}));
if (gameState===5){
  dog.addImage(livingroom);
  dog.scale =1;
  milkBottle.visible = false;
}


var PlayInGarden=createButton("Lets play in park");
PlayInGarden.position(585,160);
if (PlayInGarden.mousePressed(function(){
    gameState=6;
    database.ref('/'.update({'gameState':gameState}));
}));
if (gameState===6){
  dog.addImage(garden);
  dog.scale =1;
  milkBottle.visible = false;
}


  drawSprites();
  textSize(17);
  fill("black");
  text("Milk Bottle Remaining" +foodS,170,440);
}

function readStock(data) {

  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
