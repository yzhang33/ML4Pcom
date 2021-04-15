let serial;
let outByte;
let latestData = "waiting for data";
let outgoingByte;
// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confidence;
//predictions
let predictions = [];
let gesture = 0;
let prevGesture = 0;
let preDist;

function setup() {
  createCanvas(640, 480);
  //serial 
  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem11301');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
    // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  
  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });
  
  //console.log(predictions);
   
}

function draw(){
  background(0);
  // Draw the video
  image(video, 0, 0);

  drawKeypoints();
  gestureControl();
}

function gestureControl(){
  //console.log(predictions);
  if(predictions && predictions[0] ){
    const prediction = predictions[0];
    const thumbTip = prediction.landmarks[4];
    const indexTip = prediction.landmarks[8];
    
    var distance = dist(thumbTip[0], thumbTip[1],indexTip[0], indexTip[1]);
    
    if(preDist != (distance+10) || preDist != (distance-10)){
      outgoingByte = map(distance,16,198,0,255);
      //console.log(int(outgoingByte));
      preDist = distance;
      if(int(outgoingByte)<=255 || int(outgoingByte)>=0){
        serial.write(int(outgoingByte));
      }
    }
  }
}
// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

  if(predictions && predictions[0] ){
    const prediction = predictions[0];
    const thumbTip = prediction.landmarks[4];
    const indexTip = prediction.landmarks[8];
    
    fill(0,255,0);
    ellipse(thumbTip[0], thumbTip[1], 10, 10);
    ellipse(indexTip[0], indexTip[1], 10, 10);
    //console.log(dist(thumbTip[0], thumbTip[1],indexTip[0], indexTip[1]));
    strokeWeight(4);
    stroke(255,0,0);
    line(thumbTip[0], thumbTip[1],indexTip[0], indexTip[1])
  }
}

function modelReady() {
  console.log("Model ready!");
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
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
  latestData = currentString;
}