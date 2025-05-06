let video;
let handPose;
let hands = [];
let guideImages = [];
let gestures = ["eleimg", "pick","conch","antler"];
let gestureMatched = false;
let detectedGesture = "";
let currentGesture = 0;
let count=0;
let deer=false, elephant=false, flowerp =false, snake=false;
let deerimg, snakeimg, flowerimg, flower2img;
let flowervid, snakevid, deervid, antlervid, snakeflowervid,deerflowervid, dsflowervid;
let deervid2, snakevid2, deersnake, snakedeer;
let deer1 = false, snake1 = false, flower = false; 
let deer2 =false, snake2=false, play1=false;
let conchb=false;
let antlers = false;
let elepic, pick, antlerpic, snake2tarot, d2tarot, sdtarot;
let lotusleft, lotusright, conch, conchleft, conchright;
let gameState = 0;
let beginButton, startButton, playButton;
let button;
let player = 1;
let timer = 10;
let lastSwitchTime = 0;
let comboGesture = "lotus";

let p;

let bg1, bg2;
let satoshireg, satoshib, satoshit;
let ritualComplete = false;

let gestureMatchedTimerStarted = false;

function preload() {
  for (let i = 0; i < gestures.length; i++) {
    guideImages[i] = loadImage(gestures[i] + ".png"); 
  }
  handPose = ml5.handPose({ flipped: true });
  satoshireg = loadFont('Satoshi.otf');
  satoshib = loadFont('Satoshib.otf');
  satoshit = loadFont('Satoshit.otf');
  deerimg = loadImage('deer.png');
  snakeimg = loadImage('snake.png');
  elepic = loadImage('eleimg.png');
  pick = loadImage('pick.png');
  flowerimg = loadImage('lotus.png');
  flower2img = loadImage('flower2.png');
  antlerpic= loadImage('antler.png');
  lotusleft= loadImage('lotusleft.png');
  lotusright= loadImage('lotusright.png');
  conch = loadImage('conch.png');
  conchleft =loadImage('conchleft.png');
  conchright =loadImage('conchright.png');
  snake2tarot= loadImage('s2tarot.png');
  d2tarot= loadImage('ddtarot.png');
  sdtarot=loadImage('dstarot.png');
  
  bg1 =loadImage('bg1.png');
  bg2 =loadImage('bg2.png');
  flowervid = createVideo('flower.mp4');

  snakevid = createVideo('snake1.mp4');
  deervid = createVideo('deer1.mp4');
  deervid2= createVideo('deer2.mp4');
  deersnake= createVideo('deersnake.mp4');
  snakedeer= createVideo('snakedeer.mp4');
  dsflowervid= createVideo('dsflower.mp4');
  deerflowervid=createVideo('d2flower.mp4');
  snakevid2 = createVideo('snakes2.mp4');
  snakeflowervid = createVideo('snakeflower.mp4');
  flowervid.hide(); snakevid.hide(); deervid.hide(); deervid2.hide(); snakevid2.hide(); snakeflowervid.hide(); deerflowervid.hide(); dsflowervid.hide(); deersnake.hide(); snakedeer.hide();
}

function setup() {
  createCanvas(1120, 630);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);

  beginButton = createButton("Begin Ritual");
  beginButton.position(width / 2 - 60, height / 2);
  beginButton.mousePressed(() => {
    gameState = 1;
    beginButton.hide();
  });

  startButton = createButton("Practice");
  startButton.position(width / 2 - 50, height - 80);
  startButton.mousePressed(() => {
    gameState = 2;
    startButton.hide();
    lastSwitchTime = millis();
  });
  startButton.hide();

  playButton = createButton("Start the Ritual");
  playButton.position(width / 2 - 50, height - 80);
  playButton.mousePressed(() => {
    gameState = 3;
    playButton.hide();
    lastSwitchTime = millis();
  });
  playButton.hide();
  
  
 
}

function draw() {
  background('#b96371');
  //image(video, 0, 0, 1, 1);
  
  switch (gameState) {
    case 0:
      drawTitleScreen();
      
      break;
    case 1:
      drawLoreScreen();
      break;
    case 2:
      drawPracticeMode();
      break;
    case 3:
      drawGameplay1();
      break;
    case 4:
      clicktocontinue()
      break;
    case 5:
      console.log(gameState);
      drawGameplay2();
      break;
    case 6:
      console.log(gameState);
      clicktocontinue();
      break;
    case 7:
      console.log(gameState);
      drawGameplay3();
      break;
    case 8:
      console.log(gameState);
      clicktocontinue();
      break;
    case 9:
      console.log(gameState);
      drawGameplay4();
      break;
    case 10: 
      push();
      noStroke();
      fill(255);
    textAlign(CENTER);
    textSize(40);
    text("Ritual Complete", width / 2, 50);
    textSize(20);
    text("The spirits have been awakened. Now make a sign together and record it as a symbol of your collaboration", width / 2,100);
      pop();
       button = createButton('make a record'); 
      button.mousePressed(() => {
      takesnap(); button.hide();});
       button.position(width / 2 - 50, height - 80);
      drawFinalScreen();
      break;
  }
}





function drawTitleScreen() {
  background('#00004f');
  image(bg1,width/2,height/2,1120,630)
  imageMode(CENTER)
//   image(bg1,width/2+15,height/2,1120,630)
  textFont(satoshib)
  fill(200)
  textAlign(CENTER);
  textSize(40);
  text("The Gesture Keepers", width / 2, height / 2 - 50);
  textFont(satoshit)
  textSize(20);
  text("A ritual of connection and transformation.", width / 2, height / 2 - 20);
}

function drawLoreScreen() {
  background('#00004f');
  textAlign(CENTER);
  textSize(20);
  if(count>=1 && count<2){
  text(`The two of you have been chosen as the Gesture Keepers.\nYou must learn and perform ancient signs to awaken the spirits.\n\n
\n click to continue`, width/2, height/2-100);}
  else if(count>=2 && count<3){
    push();
    imageMode(CORNER)
    image(bg2, 0, 0, 1120, 630);
    pop();
    text(`Place one hand each on the table in front of you. You will be prompted to make your gesture\n\n
\n click to continue`, width/2, height/2-100);
  }
  else if(count>=3){
    text(`Make sure to put your hand down after making your gesture`, width/2, height/2-100);
      startButton.show();
  }

}
function drawPracticeMode() {
  background(255); // optional clean background
  
  imageMode(CORNER);
  image(video, width/2-275, 100, width / 2, (width / 2) * 0.75);

  fill(2);
  textSize(24);
  textAlign(CENTER);
  text("Practice making gestures at the right moment", width / 2, 50);
  text("Player 1", 150, 150);
  text("Player 2", 950, 150);

  // Now decide where to draw the gesture image
  imageMode(CENTER);
  let num1= random(0,4)
  let layoutType = currentGesture % 4; 

  if (layoutType === 0) {
   
    image(elepic, 150, height / 2, 300, 200);
  } else if (layoutType === 1) {
  
    image(pick, width - 150, height / 2, 300, 200);
  } else if (layoutType === 2) {
  
    image(conchleft, 150, height / 2, 300, 200);
     image(conchright, width - 150, height / 2, 300, 200);
  }
else if (layoutType === 3) {
  
    image(deerimg, 150, height / 2, 300, 200);
     image(pick, width - 150, height / 2, 300, 200);
  }
  if (gestureMatched) {
    fill(0, 200, 0);
    text("That's right!", width / 2,  85);

    if (!gestureMatchedTimerStarted) {
      gestureMatchedTimerStarted = true;
      setTimeout(() => {
        gestureMatched = false;
        detectedGesture = "";
        currentGesture = (currentGesture + 1) % gestures.length;
        gestureMatchedTimerStarted = false;
      }, 1000);
    }
  }

  playButton.show();
}


function drawGameplay1() {
            imageMode(CORNER);
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text(`Player 1 — Make your move!`, width / 2, 50);
   
  // let currentTime = millis();
  // let timeLeft = timer - Math.floor((currentTime - lastSwitchTime) / 1000);
 image(video, 150, 100, width / 2, (width / 2) * 0.75);

    let xIcon = width / 2 +150;
    let yOffset = 100;
    
    image(deerimg, xIcon, yOffset, 250, 175);
    image(snakeimg, xIcon, yOffset + 200, 250, 175);
   
  

  animation();
}

function drawGameplay2(){
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text(`Player 2 — Make your move!`, width / 2, 50);
  
  image(video, width - width / 2 - 50, 100, width / 2, (width / 2) * 0.75);
         imageMode(CORNER);
    let xIcon = width / 2 -375;
    let yOffset = 100;
    
    image(deerimg, xIcon, yOffset, 250, 175);
    image(snakeimg, xIcon, yOffset + 200, 250, 175);
  
  animation();
}

function drawGameplay3(){
    image(video, width / 4, 100, width / 2, (width / 2) * 0.75);
  push();
      imageMode(CENTER);
      image(lotusleft, 150, height / 2, 300, 200);
     image(lotusright, width - 150, height / 2, 300, 200);
    pop();
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("Final Ritual — Combine your energy!", width / 2, 50);
   
    image(flower2img, width/2-100, height-100, 125, 100)
    
  animation();
  
}

function drawGameplay4(){
   imageMode(CENTER);
  if(p===1){
    image(snake2tarot, width/2,height/2,1120,630)

  }
  else if(p===2){
    image(d2tarot,width/2,height/2,1120,630); 
  }
  else if(p===3){
    image(sdtarot,width/2,height/2,1120,630);
  }
     // image(conchleft, 150, height / 2, 300, 200);
     // image(conchright, width - 150, height / 2, 300, 200);
 

  
}

function clicktocontinue(){
  text('click to continue',width/2, height/2);
  console.log(gameState);
}
function mousePressed(){
  if(gameState===1){
    count++;
  }
  if (gameState===4){
    gameState=5;
  }
  else if (gameState===6){
    gameState=7;
  }
    else if (gameState===8){
    gameState=9;
  }
    else if (gameState===9){
    gameState=10;
  }
}

function takesnap() {
  saveCanvas('hand_snapshot', 'png'); // Save the canvas as a PNG image
}

function drawFinalScreen() {

   if (hands.length > 0) {
        for (let hand of hands) {
      if (hand.confidence > 0.1) {
         button.show();
        let points = [];
        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];
          points.push(createVector(keypoint.x, keypoint.y));
        }

      
        stroke("#191331"); 
        strokeWeight(19); 
        fill("#191331");


        let connections = [
          [0, 1], [1, 2], [2, 3], [3, 4], 
          [0, 5], [5, 6], [6, 7], [7, 8],
          [0, 9], [9, 10], [10, 11], [11, 12], 
          [0, 13], [13, 14], [14, 15], [15, 16], 
          [0, 17], [17, 18], [18, 19], [19, 20] 
        ];

        for (let connection of connections) {
          let start = points[connection[0]];
          let end = points[connection[1]];
          line(start.x, start.y, end.x, end.y);
        }

        
        beginShape();
   
        let palmIndices = [0, 1, 5, 9, 13, 17]; 
        
        
        vertex(points[1].x, points[1].y);

       
        for (let i = 0; i < palmIndices.length; i++) {
          let pt = points[palmIndices[i]];
          vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
      }
    }
 // background(0);
  // 
}}




function gotHands(results) {
  hands = results;
  if (hands.length > 0) {
     for (let i = 0; i < hands.length; i++) {
    detectGesture(hands[i]);
  }
}
}

function detectGesture(hand) {
  let index = hand.index_finger_tip;
  let thumb = hand.thumb_tip;
  let middle = hand.middle_finger_tip;
  let ring = hand.ring_finger_tip;
  let pinky = hand.pinky_finger_tip;
  let wrist = hand.wrist;
  let knuckle = hand.index_finger_mcp;
  let knuckle2 = hand.thumb_cmc;
  let pip = hand.index_finger_pip;
  let pinkyknuckle = hand.pinky_finger_mcp;

  let d1 = dist(middle.x, middle.y, thumb.x, thumb.y);
  let d2 = dist(middle.x, middle.y, ring.x, ring.y);
  let d3 = dist(ring.x, ring.y, index.x, index.y);
  let d4 = dist(knuckle.x, knuckle.y, knuckle2.x, knuckle2.y);
  let d5 = dist(ring.x, ring.y, pinky.x, pinky.y);

  let d6 = dist(index.x, index.y, middle.x, middle.y);
  let d7 = dist(thumb.x, thumb.y, pinkyknuckle.x, pinkyknuckle.y);

  let recognizedGesture = "";
  

  if (d1 < 15 && d2 < 15 && index.y < middle.y && d5 > 17) {
    recognizedGesture = "deer";
    if (gameState===3 || gameState===4){
    deer1 = true;}
     else if (gameState===5 || gameState===6){
    deer2 = true;}
    play1=true;
  } 
    if (d2 < 15 && d3 < 15 && d5 < 17 && pinky.y < thumb.y) {
    recognizedGesture = "snake";
    if (gameState===3 || gameState===4){
    snake1 = true;}
    if (gameState===5 || gameState===6){
      snake2 = true;
    }
    play1=true;
  } 
  else if (d1 > 15 && d2 > 15 && d3 > 15 && d4 < 52) {
    if (gameState===7 ){
      flower = true; play1=true;
    console.log('lalal')}
  }
  
  else if(thumb.y<knuckle.y)
      {
         if (gameState===9){
           conchb=true; play1=true;
         }
      }
  
if (gameState===2){
  //   if (d1 < 15 && d2 < 15 && index.y < middle.y && d5 > 17) {
  //   recognizedGesture = "deer";
  //   if (gameState === 3) deer = true;
  // }  
    if (index.y > thumb.y) {
    // && d2 < 15 && wrist.y < index.y
    recognizedGesture = "eleimg";
    //if (gameState === 3) elephant = true;
  } else if (d2 < 15 && d3 < 15 && d5 < 17 && thumb.y < pinky.y) {
    recognizedGesture = "snake";
    //if (gameState === 3) snake = true;
  } else if (d1 > 15 && d2 > 15 && d3 > 15 && d4 < 52) {
    recognizedGesture = "lotus";
    //if (gameState === 3) flowerp = true;
  } 
    else if (d7<15){
      recognizedGesture = "antler";
     //if (gameState === 3)  antlers=true;
}
  else if( d1<15 && d6<15 && d5<100){
     recognizedGesture = "pick";
     
  }
  else if(thumb.y<knuckle.y){
    recognizedGesture = "conch";
  }


  if ((gameState === 2) && recognizedGesture === gestures[currentGesture]) {
    gestureMatched = true;
  }
  detectedGesture = recognizedGesture;
}}

function animation() {
  if (deer1 === true && play1===true && gameState===3 ) {
    deervid.show(); deervid.size(width, height); deervid.position(0, 0); deervid.play();
    deervid.onended(() => { deervid.hide(); }); play1 = false; gameState++;
  }  
  else if (snake1 === true && play1===true && (gameState===3)) {
    snakevid.show(); snakevid.size(width, height); snakevid.position(0, 0); snakevid.play();
    snakevid.onended(() => { snakevid.hide(); }); play1 = false;
    gameState++;
  } 
  else if (deer1 === true && deer2===true && play1===true && gameState===5) {
   deervid2.show(); deervid2.size(width, height); deervid2.position(0, 0); deervid2.play();
    deervid2.onended(() => { deervid2.hide(); }); //flower = false;
    gameState++; play1=false;
    //
  }
  else if (snake1 === true && snake2===true && play1===true && (gameState===5)) {
   snakevid2.show(); snakevid2.size(width, height); snakevid2.position(0, 0); snakevid2.play();
    snakevid2.onended(() => { snakevid2.hide(); }); //flower = false;
    gameState++; play1=false;
    //
  }
   else if ((snake2 === true && deer1===true) && play1===true && (gameState===5)) {
   deersnake.show(); deersnake.size(width, height); deersnake.position(0, 0); deersnake.play();
    deersnake.onended(() => { deersnake.hide(); }); //flower = false;
    gameState++; play1=false;
    //
  }
  else if ((snake1 === true && deer2===true) && play1===true && (gameState===5)) {
   snakedeer.show(); snakedeer.size(width, height); snakedeer.position(0, 0); snakedeer.play();
    snakedeer.onended(() => { snakedeer.hide(); }); //flower = false;
    gameState++; play1=false;
    //
  }
  else if(gameState===7 && flower===true && snake1===true && snake2===true && play1===true){
    snakeflowervid.show(); snakeflowervid.size(width, height); snakeflowervid.position(0, 0); snakeflowervid.play();
    snakeflowervid.onended(() => { snakeflowervid.hide(); }); //flower = false;
    gameState++; play1=false;
    p=1;
  }
    else if(gameState===7 && flower===true && deer1===true && deer2===true && play1===true){
    deerflowervid.show(); deerflowervid.size(width, height); deerflowervid.position(0, 0); deerflowervid.play();
    deerflowervid.onended(() => { deerflowervid.hide(); }); //flower = false;
    gameState++; play1=false;
    p=2;
  }
    else if(gameState===7 && flower===true && ((snake1 === true && deer2===true)||(snake2 === true && deer1===true)) && play1===true){
    dsflowervid.show(); dsflowervid.size(width, height); dsflowervid.position(0, 0); dsflowervid.play();
    dsflowervid.onended(() => { dsflowervid.hide(); }); //flower = false;
    gameState++; play1=false;
      p=3;
  }
  //  else if(gameState===9 && conchb===true && ((snake1 === true && deer2===true)||(snake2 === true && deer1===true)) && play1===true){
  //   dsflowervid.show(); dsflowervid.size(width, height); dsflowervid.position(0, 0); dsflowervid.play();
  //   dsflowervid.onended(() => { dsflowervid.hide(); }); //flower = false;
  //   gameState++; play1=false;
  // }
  // else if(gameState===9 && conchb===true && snake1===true && snake2===true && play1===true){
  //   snakeflowervid.show(); snakeflowervid.size(width, height); snakeflowervid.position(0, 0); snakeflowervid.play();
  //   snakeflowervid.onended(() => { snakeflowervid.hide(); }); //flower = false;
  //   gameState++; play1=false;
  // }
  //   else if(gameState===9 && conchb===true && deer1===true && deer2===true && play1===true){
  //   deerflowervid.show(); deerflowervid.size(width, height); deerflowervid.position(0, 0); deerflowervid.play();
  //   deerflowervid.onended(() => { deerflowervid.hide(); }); //flower = false;
  //   gameState++; play1=false;
  // }
}
