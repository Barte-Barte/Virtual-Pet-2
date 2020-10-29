var dog,dogImg,dogImg1,milkImg;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("happydog.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(800, 500);

  var greeting = createElement('h3');
  var greeting1 = createElement('h3');
 
 //button to feed the dog
 feedButton = createButton("Feed your dog");
 feedButton.position(700, 95);
 feedButton.mousePressed(feedDog);

 //To wriite name of the dog
 input = createInput ("Fill your Dog's Name"); 
 input.position (500, 95); 

 var name = input.value();

 input1 = createInput ("Fill opinion about your dog"); 
 input1.position (850, 470);
 var opinion = input1.value();

 var button = createButton("submit");
 button.position(850, 500);
 
 //button to add food for the dog
 addButton = createButton("Buy Milk Bottles");
 addButton.position(820, 95);
 addButton.mousePressed(addFood);

 button.mousePressed(function(){
   input.hide();
   addButton.hide();
   feedButton.hide();
   //create comment
   comment = createSprite(490,210);
   comment.scale = 0.7;
   comment.addImage("opinion", opinionImg);
   greeting.html("Thank you😀😄 ");
   greeting.position(800, 150);
   greeting1.html("Meet you soon");
   greeting1.position(805, 195);
})

  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed the Dog Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
  

//increment foodS, updateFoodStock using foodS
function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}


//change dog image, deduct foodS, updateFoodStock using foodS, set lastFed
function feedDog(){
  if(foodS > 0){
    dog.changeAnimation("dog2", happyDog);
    foodS-1;
    foodObj.updateFoodStock(foodS);
    lastFed = hour();
    foodObj.updateLastFed(lastFed);
  }
}
