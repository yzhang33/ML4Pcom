let serial;
let latestData = "waiting for data";
let target;
let highScore=0;
let gameEnd=false;

//sound
let bgm;
let flex;
let hit;
let over;

function preload(){
  bgm = loadSound('assets/bgm.mp3');
  flex = loadSound('assets/flex.mp3');
  hit = loadSound('assets/hit.mp3');
  over = loadSound('assets/over.mp3');
}

function setup() {
  createCanvas(640, 640);
  
  target = new Target();
  //serial 
  serial = new p5.SerialPort();
  serial.open('/dev/tty.usbmodem1101');
 serial.on('list', gotList);
  //serial.list();
  serial.on('connected', serverConnected);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
  
  button = createButton('restart');
  button.mousePressed(resetVariables);
  button.hide();
  button.position(width/2-50, height/2);
  
  bgm.loop();
}

function draw(){
  background(220);
  fill(255,0,0);
  textSize(20);
  text("Score: " + target.score, 10, 20);
  text("High Score: " + highScore, 500, 20);
  if(target.radius >= 0){
    target.show();
    target.update();
    if(latestData == 100){
      target.hit();
      hit.play();
      latestData = 0;
    }
    if(latestData == 200){
      console.log("update")
      target.updateRadius();
      //flex.volume(0.5);
      flex.play();
      latestData = 0;
    }

  }else{
    radius = 0;
    gameEnd=true;
    if(target.score > highScore){
      highScore = target.score;
    }
  }
  if(gameEnd){
    gameEnd = false;
    textSize(32);
    text("Game Ended!\n"+"Your score:"+ target.score, width/4+50, height/4+10);
    if(target.score >= highScore){
      text("You got a high score "+ highScore+"!", width/4, height/4+90);
    }
    bgm.stop();
    over.play();
    button.show();
    noLoop();
    //resetVariables()
  }

}

function resetVariables(){
    target.score = 0;
    target.radius = 500;
    button.hide();
    bgm.loop();
    loop();
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    console.log(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.read();
  if (!currentString) return;
  //console.log(currentString);
  if(currentString!=10 && currentString!=13){
    latestData = currentString;
    console.log(latestData);
  }
  
}






