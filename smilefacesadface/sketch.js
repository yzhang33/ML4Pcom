let serial;
let outByte;
let latestData = "waiting for data";
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/cqT_mB-h0/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confidence;
  // Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}


function setup() {
  createCanvas(320, 260);
  //serial 
  serial = new p5.SerialPort();

  serial.list();
  serial.open('/dev/tty.usbmodem1101');

  serial.on('connected', serverConnected);

  serial.on('list', gotList);

  serial.on('data', gotData);

  serial.on('error', gotError);

  serial.on('open', gotOpen);

  serial.on('close', gotClose);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo(); 
 
}

function draw(){
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    confidence = results[0].confidence;
    //console.log(results[0].label);
    if(label == "thumbs up" && confidence > 0.9){
      outByte = 1;
    }else if(label == "thumbs down" && confidence > 0.9){
      outByte = 2;
    }
    serial.write(outByte);
    // Classifiy again!
    classifyVideo();
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
function voiceReady(){
  console.log("voice ready");
}

function onFileload(){
    console.log("book loaded");
}
function onJokeload(){
  console.log("joke loaded");
}

