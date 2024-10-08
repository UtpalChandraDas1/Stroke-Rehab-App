let handpose;
let video;
let predictions = [];
let canvas2;
let prevtop = null;
let prevleft = null;
let leftArr = [];
let topArr = [];
let leftAvg, topAvg;
let colr = 0;
let colb = 255;
let colg = 0;
let pointerX, pointerY, knuckle, ring;

function setup() {
  createCanvas(640, 480);
  canvas2 = createGraphics(width, height);
  makesquares();
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict", (results) => {
    predictions = results;
  });

  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  image(canvas2, 0, 0);

  drawKeypoints();
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    canvas2.strokeWeight(10);
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      if (j == 8) {
        pointerX = keypoint[0];
        pointerY = keypoint[1];
      } else if (j == 14) {
        knuckle = keypoint[1];
      } else if (j == 16) {
        ring = keypoint[1];
      }
    }
    if (knuckle < ring) {
      fill(0);
      ellipse(pointerX, pointerY, 10, 10);
      if (pointerX < width - 70) {
        getaverages();
        canvas2.stroke(colr, colg, colb);
        if (leftArr.length > 2 && prevleft > 0) {
          canvas2.line(prevleft, prevtop, leftAvg, topAvg);
          prevleft = leftAvg;
          prevtop = topAvg;
        } else {
          prevleft = pointerX;
          prevtop = pointerY;
        }
      } else {
        if (pointerY < 70) {
          colr = 255;
          colg = 0;
          colb = 0;
        } else if (pointerY > 70 && pointerY < 140) {
          colr = 0;
          colg = 255;
          colb = 0;
        } else if (pointerY > 140 && pointerY < 210) {
          colr = 0;
          colg = 0;
          colb = 255;
        } else if (pointerY > 210 && pointerY < 280) {
          makesquares();
        }
      }
    } else {
      fill(255);
      ellipse(pointerX, pointerY, 10, 10);
      leftArr.length = 0;
      topArr.length = 0;
      leftAvg = 0;
      topAvg = 0;
      prevleft = pointerX;
      prevtop = pointerY;
    }
  }
}

function getaverages() {
  if (leftArr.length > 5) {
    leftArr.splice(0, 1);
    topArr.splice(0, 1);
  }
  if (pointerX > 0) {
    leftArr.push(pointerX);
    topArr.push(pointerY);
  }
  let leftSum = 0;
  let topSum = 0;
  for (let i = 0; i < leftArr.length; i++) {
    leftSum += leftArr[i];
    topSum += topArr[i];
  }
  leftAvg = leftSum / leftArr.length;
  topAvg = topSum / topArr.length;
}

function makesquares() {
  canvas2.background(255);
  canvas2.clear();
  canvas2.fill(255, 0, 0);
  canvas2.rect(width, 0, -70, 70);
  canvas2.fill(0, 255, 0);
  canvas2.rect(width, 70, -70, 70);
  canvas2.fill(0, 0, 255);
  canvas2.rect(width, 140, -70, 70);
  canvas2.fill(0, 0, 0);
  canvas2.rect(width, 210, -70, 70);
  canvas2.stroke(255, 0, 0);
  canvas2.strokeWeight(10);
  canvas2.line(width - 5, 215, width - 65, 275);
}
