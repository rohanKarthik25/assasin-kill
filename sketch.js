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

var wall,wall2,wall3;
var hook,hook2,hook3;

var rope,ground;
var hero,heroImg;
var hero_con;
var hero_con_2;
var hero_con_3;
var rope2,rope3;

var guard,guardImg;
var guard2,guard2Img;

var nostar,nostarImg;
var got1,got1Img;
var allStars

var bg_img;
var door;
//var star,star2,starImg;
//var emptyStar,one_Star,two_Star;
//var displayStar;

var button,button2,button3;
var down_arrow,right_arrow;

var fr;

function preload()
{
  bg_img = loadImage('bgWall.jpeg');
  heroImg = loadImage('ezio.png');
  guardImg = loadImage('guard2.png');
  guard2Img = loadImage('guard.png');

  nostarImg = loadImage('empty.png')
  got1 = loadImage('one_star.png')
  allStars = loadImage('stars.png')
}
function setup() 
{
  createCanvas(800,800);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //window
  //window = createImg('window.png')
  //window.position(100,150);
  //window.size(100,100);

  //no star icon
  nostar = createSprite(200,25,150,50)
  nostar.addImage(nostarImg,'none');
  nostar.scale = 0.25
  

  //btn 1
  button = createImg('cut_btn.png');
  button.position(25,-10);
  button.size(50,50);
  button.mouseClicked(drop);


   //btn 2
   button2 = createImg('cut_btn.png');
   button2.position(760,-5);
   button2.size(50,50);
   button2.mouseClicked(drop2);

  //add downarrow
   down_arrow = createImg("down_arrow.png")
   down_arrow.position(350,25);
   down_arrow.size(50,50)
   down_arrow.mouseClicked(assasinate);

   //add rightarrow
   right_arrow = createImg("rightbutton.png")
   right_arrow.position(400,5);
   right_arrow.size(100,100)
   right_arrow.mouseClicked(assasinate2);

   rope = new Rope(12,{x:30,y:5});
   rope2 = new Rope(10,{x:790,y:5});


  door = createImg('door.png');
  door.position(600,650);
  door.size(200,150);
  /*
  star = createSprite(310,75,20,20);
  star.addImage(starImg);
  star.scale = 0.02;

  star2 = createSprite(150,375,20,20);
  star2.addImage(starImg);
  star2.scale = 0.02;

  displayStar = createSprite(50,50,50,50);
  displayStar.scale = 0.2;
  displayStar.addAnimation('empty',emptyStar);
  displayStar.addAnimation('one',one_Star);
  displayStar.addAnimation('two',two_Star)
  displayStar.changeAnimation('empty');*/

  ground = new Ground(400,height,width,20);

  //right wall
  wall = new Ground(800,400,1,height);

  //left wall
  wall2 = new Ground(0,400,1,height);

  //top wall
  wall3 = new Ground(500,0,height,3);

  //hook 
  hook = new Ground(25,10,75,5);
  //hook2
  hook2 = new Ground(775,625,100,20);
  //hook3 
  hook3 = new Ground(795,15,25,20);
  
  hero = Bodies.circle(400,80,25);
  Matter.Composite.add(rope.body,hero);

  //guard
  guard = createSprite(770,480,30,70);
  guard.addImage(guardImg);
  guard.scale = 0.45

  //guard 2
  guard2 = createSprite(60,650,30,70);
  guard2.addImage(guard2Img);
  guard2.scale = 0.45


  hero_con = new Link(rope,hero);
  hero_con_2 = new Link(rope2,hero);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);

  push();
  imageMode(CENTER);
  if(hero!=null){
    image(heroImg,hero.position.x,hero.position.y,275,200);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();
  wall.show();
  wall2.show();
  wall3.show();
  hook.show();
  hook2.show();
  hook3.show();

  drawSprites();

  if(collide(hero,guard)==true)
  {
    guard.visible = false;
    nostar.addImage(got1);
    if(collide(hero,guard2)){
      nostar.addImage(allStars);
    }
  }

  if(collide(hero,guard2)==true)
  {
    guard2.visible = false;
    nostar.addImage(got1);
    if(collide(hero,guard2) == true){
      nostar.addImage(allStars);
    }
    

  }

}

function drop()
{
  //cut_sound.play();
  rope.break();
  hero_con.dettach();
  hero_con = null; 
}

function drop2()
{
  //cut_sound.play();
  rope2.break();
  hero_con_2.dettach();
  hero_con_2 = null;
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=60)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}
function assasinate(){
  Matter.Body.applyForce(hero,{x:0,y:0},{x:0,y:0.05})
}
function assasinate2(){
  Matter.Body.applyForce(hero,{x:0,y:0},{x:0.05,y:0.05})
}

