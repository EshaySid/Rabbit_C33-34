const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

//g=ground
var g;

//r=rope
var r;
var r2;
var r3;

//f=fruit
var f;

//l=link
var l;
var l2;
var l3;

var backgroundImg;
var omNom;
var fruitImg;
var omNomSprite;
var crossButton1;
var crossButton2;
var crossButton3;

var blink, eat, sad;

//es=eating sound, rCut = rope cut
var air, cut, es, rCut, bgsound;

var balloon;

var mute;

function preload(){
  backgroundImg=loadImage("./Assets/background.png");
  omNom=loadImage("./Assets/omNom-backgroundless.png");
  fruitImg=loadImage("./Assets/melon.png");
  blink=loadAnimation("./Assets/blink_1.png","./Assets/blink_2.png", "./Assets/blink_3.png");
  eat=loadAnimation("./Assets/eat_0.png","./Assets/eat_1.png","./Assets/eat_2.png","./Assets/eat_3.png","./Assets/eat_4.png");
  sad=loadAnimation("./Assets/sad_1.png","./Assets/sad_2.png","./Assets/sad_3.png");
  air=loadSound("./Sounds/air.wav");
  cut=loadSound("./Sounds/Cutting Through Foliage.mp3");
  es=loadSound("./Sounds/eating_sound.mp3");
  bgsound=loadSound("./Sounds/sound1.mp3");
  rCut=loadSound("./Sounds/rCut.mp3");
  blink.playing=true;
  eat.playing=true;
  sad.playing=true;
}

function setup() {
  createCanvas(600, 700);
  engine = Engine.create();
  world = engine.world;

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);

  crossButton1=createImg("./Assets/cut_btn.png");
  crossButton1.position(100,30);
  crossButton1.size(50,50);

  crossButton1.mouseClicked(dropFruit);

  crossButton2=createImg("./Assets/cut_btn.png");
  crossButton2.position(275,30);
  crossButton2.size(50,50);

  crossButton2.mouseClicked(dropFruit2);

  crossButton3=createImg("./Assets/cut_btn.png");
  crossButton3.position(370,100);
  crossButton3.size(50,50);

  crossButton3.mouseClicked(dropFruit3);

/*   balloon=createImg("./Assets/balloon.png");
  balloon.position(20,200);
  balloon.size(80,80);

  balloon.mouseClicked(force); */


  mute=createImg("./Assets/mute.png");
  mute.position(450,50);
  mute.size(75,75);
  mute.mouseClicked(sound);

  //composite is agroup where many physics bodies are added (rope fruit)
  g = new Ground(300, 690, 600, 10);
  fruit = Bodies.circle(300,300,20);
  World.add(world, fruit);
  
  r=new Rope(4,{x:105,y:30});
  Matter.Composite.add(r.body,fruit)
  l=new Link(r.body,fruit);

  r2=new Rope(5,{x:300, y:30});
  l2=new Link(r2.body,fruit);

  r3=new Rope(6,{x:400, y:100});
  l3=new Link(r3.body, fruit);

  omNomSprite=createSprite(500,605,80,80);
  omNomSprite.addAnimation("Blink",blink);
  omNomSprite.addAnimation("Eat",eat);
  omNomSprite.addAnimation("Sad",sad);
  omNomSprite.scale=0.25;

  omNomSprite.changeAnimation("Blink");
  blink.frameDelay=20;
  eat.frameDelay=20;
  sad.frameDelay=20;

}

function draw() {
  background(backgroundImg);
  Engine.update(engine);
 
  if(fruit!==null){
    imageMode(CENTER);
    image(fruitImg,fruit.position.x,fruit.position.y,70,70);
  }


  g.Display();
 
  r.show();
  r2.show();
  r3.show();

 c=collide(fruit, omNomSprite);
 if(c===true){

  omNomSprite.changeAnimation("Eat");
 }
  drawSprites();
}

function dropFruit(){
  rCut.play();
  r.break();
  l.detach();
  l=null;
}

  function dropFruit2(){
    rCut.play();
    r2.break();
    l2.detach();
    l2=null;
  }

    function dropFruit3(){
      rCut.play();
      r3.break();
      l3.detach();
      l3=null;
    }


function collide(fruit, omNomSprite){
if(fruit!==null){
  var d=dist(fruit.position.x, fruit.position.y, omNomSprite.x, omNomSprite.y)

    if(d<148){
      World.remove(world, fruit);
      fruit=null;
      return true;
      
    }

    else{
      return false;
    }
  }
}

function force(){
  Matter.Body.applyForce(fruit,{x:0, y:0}, {x:0.02, y:0})
  air.play();
}

function sound(){
  if(bgsound.isPlaying()){
    bgsound.stop();
  }

  else{
    bgsound.play();
  }
}
