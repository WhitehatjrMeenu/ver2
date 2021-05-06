var road,roadImg;
var player,plImg,plImg2,plImg3,plImg4,plImg5,plImg6;
var mud,mudImg;
var npc,img1,img2,img3,img4,img5,img6,img7,img8;
var npcGroup,mudGroup;
var setImg,giveQue;
var pavement1,pavement2;
var score = 0;
var lifeline = 5;
var visible;
var quiz;
var que;
var c,r1,r2,r3,e1,e2,e3,g1,g2,g3;
var destroyer;
var op1,op2;
var i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18;
var quizEnable;
//var form, player, game;

function preload(){
  roadImg = loadImage("images/track.png");
  mudImg = loadImage("images/mud.png");
  plImg = loadImage("imgs/vehicle1_2.png");
  plImg2 = loadImage("imgs/vehicle2_2.png");
  plImg3 = loadImage("imgs/vehicle3_2.png");
  plImg4 = loadImage("imgs/vehicle4_2.png");
  plImg5 = loadImage("imgs/vehicle5_2.jpg");
  plImg6 = loadImage("imgs/vehicle6_2.png");
  img1 = loadImage("imgs/npc1.png");
  img2 = loadImage("imgs/npc2.png");
  img3 = loadImage("imgs/npc3.png");
  img4 = loadImage("imgs/npc4.png");
  img5 = loadImage("imgs/npc5.png");
  img6 = loadImage("imgs/npc6.png");
  img7 = loadImage("imgs/npc7.png");
  img8 = loadImage("imgs/npc8.png");
  c = loadImage("questions/caution.png");
  r1 = loadImage("questions/riddle_1.png");
  r2 = loadImage("questions/riddle_2.png");
  r3 = loadImage("questions/riddle_3.png");
  e1 = loadImage("questions/math_equation_1.png");
  e2 = loadImage("questions/math_equation_2.png");
  e3 = loadImage("questions/math_equation_3.png");
  g1 = loadImage("questions/gk_1.png");
  g2 = loadImage("questions/gk_2.png");
  g3 = loadImage("questions/gk_3.png");
  i1 = loadImage("questions/op_eq_1_1.png");
  i2 = loadImage("questions/op_eq_1_2.png");
  i3 = loadImage("questions/op_eq_2_1.png");
  i4 = loadImage("questions/op_eq_2_2.png");
  i5 = loadImage("questions/op_eq_3_1.png");
  i6 = loadImage("questions/op_eq_3_2.png");
  i7 = loadImage("questions/op_gk_1_1.png");
  i8 = loadImage("questions/op_gk_1_2.png");
  i9 = loadImage("questions/op_gk_2_1.png");
  i10 = loadImage("questions/op_gk_2_2.png");
  i11 = loadImage("questions/op_gk_3_1.png");
  i12 = loadImage("questions/op_gk_3_2.png");
  i13 = loadImage("questions/op_ri_1_1.png");
  i14 = loadImage("questions/op_ri_1_2.png");
  i15 = loadImage("questions/op_ri_2_1.png");
  i16 = loadImage("questions/op_ri_2_2.png");
  i17 = loadImage("questions/op_ri_3_1.png");
  i18 = loadImage("questions/op_ri_3_2.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  /*game = new Game();
  game.getState();
  game.start();*/

  npcGroup = createGroup();
  mudGroup = createGroup();
  quizGroup =new Group();
 YGroup = new Group();
 NGroup = new Group();


  /*avement1 = createSprite(90,-windowHeight*3,180,windowHeight*7);
  pavement1.visible = true;

  pavement2 = createSprite(windowWidth-90,-windowHeight*3,180,windowHeight*7);
  pavement2.visible = true;*/

  /*road=createSprite(displayWidth/2,displayHeight/2,displayWidth,displayHeight);
  road.addImage(roadImg);
  road.velcoityY=0.2;
*/
  player = createSprite(displayWidth/2,displayHeight-100);
  player.addImage(plImg);
  player.scale = 0.6;

  

 /* que.visible=false;
  op1.visible=false;
  op2.visible=false;*/
}

function draw()
 {
      background("black");
    
    console.log(displayHeight);
   

  image(roadImg,0,-displayHeight*20,displayWidth,displayHeight*21);
  camera.y = player.y-200;

  destroyer = createSprite(windowWidth/2,player.y + 100,windowWidth,20); 
  destroyer.visible = false;

    spawnQuiz();

    if( player.isTouching(YGroup) )
  {
    score=score+25;
   destroyQuery();
  }
  if( player.isTouching(NGroup)  )
  {
    score=score-20;
    
    destroyQuery();
  }

  console.log("playery "+player.y)
  if(keyDown("right")){
    player.x = player.x+5;
  }

  if(keyDown("left")){
    player.x = player.x-5;
  }

  if(keyDown("up")){
    console.log("upkey")
    player.y = player.y-5;
    spawnMud();
    spawnNPCs();
  }

  if(keyDown("down")){
    player.y = player.y+2;
  }

  if(score >= 100){
    player.addImage(plImg2);
    player.scale = 0.4;
  }

  if(score >= 200){
    player.addImage(plImg3);
    player.scale = 0.6;
  }

  if(score >= 300){
    player.addImage(plImg4);
    player.scale = 0.75;
  }

  if(score >= 400){
    player.addImage(plImg5);
    player.scale = 0.4;
  }

  if(score >= 500){
    player.addImage(plImg6);
    player.scale = 2.0;
    camera.y = player.y;
  }

  if(npcGroup.isTouching(player)){
    score = score - 20;
    npcGroup.destroyEach();
    lifeline -= 1;
  }

  if(npcGroup.isTouching(destroyer)){
    npcGroup.destroyEach();
    score = score + 10;
  }

 // player.collide(pavement1);
  //player.collide(pavement2);

  drawSprites();

  textSize(25);
  fill("White");
  text("Score : "+score,10,player.y - 250);
  text("Lifelines : "+lifeline,10,player.y - 200);
}

function spawnMud(){
  if(frameCount % 600 === 0){
    mud = createSprite(random(250,windowWidth-250),player.y - 500);
    mud.addImage(mudImg);
    mud.scale = 0.18;
    mud.y = mud.y + 5;
    mud.depth = player.depth-1; 
    mudGroup.add(mud);
  }
}

function spawnNPCs(){
  if(frameCount % 200 === 0){
    npc = createSprite(random(250,windowWidth-400),player.y - 500);
    npc.velocityY = 3.5;
    setImg = Math.round(random(1,8));
    switch(setImg){
      case 1 : npc.addImage(img1);
      break;
      case 2 : npc.addImage(img2);
      break;
      case 3 : npc.addImage(img3);
      break;
      case 4 : npc.addImage(img4);
      break;
      case 5 : npc.addImage(img5);
      break;
      case 6 : npc.addImage(img6);
      break;
      case 7 : npc.addImage(img7);
      break;
      case 8 : npc.addImage(img8);
      break;
      default : break;
      }
      npc.scale = 0.8;
      npcGroup.add(npc);
  }
}

function query(){
    /*quiz = createSprite(windowWidth/2,player.y - 500);
    quiz.addImage(c);*/

    que = createSprite(windowWidth/2,player.y - 500);
    giveQue = Math.round(random(1,9));

    op1 = createSprite(windowWidth/2-70,player.y - 400);
    op2 = createSprite(windowWidth/2+70,player.y - 400);

    //quiz.y -= 3.5;
   /* que.y -= 3.5;
    op1.y -= 3.5;
    op2.y -= 3.5;*/
}

function destroyQuery(){
   
  que.destroy();
  op1.destroy();
  op2.destroy();


  console.log("Question destroyed");
}

function spawnQuiz()
{

  if(frameCount===400 || frameCount ==3400)

  {
  que = createSprite(windowWidth/2,camera.y-500);
  giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-400);
  op2 = createSprite(windowWidth/2+70,camera.y-400);

        que.addImage(r1);
        op1.addImage(i13);
        op2.addImage(i14);  

        quizGroup.add(que);
        YGroup.add(op2);
        NGroup.add(op1);
  }
 else if (frameCount===800)
 {
        que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

      op1 = createSprite(windowWidth/2-70,camera.y-400);
      op2 = createSprite(windowWidth/2+70,camera.y-400);
        que.addImage(r2);
        op1.addImage(i15);
        op2.addImage(i16);
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===1200)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-400);
  op2 = createSprite(windowWidth/2+70,camera.y-400);
        que.addImage(r2);
        op1.addImage(i15);
        op2.addImage(i16);
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  }

  

  

               
     

     
    

  
