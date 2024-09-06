let video;
let poseNet;
let poses = [];
let count = 0;
let stage = 'down';  // Initial stage

function setup() {
  createCanvas(640, 480).parent('video-container');
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  video.hide();

  // Attach event listener to the reset button
  document.getElementById('resetButton').addEventListener('click', resetCount);
}

function modelReady() {
  console.log('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  
  // Draw skeleton and keypoints
  drawKeypoints();
  drawSkeleton();
  
  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Extract coordinates
    let hip = pose.lefttHip;
    let knee = pose.leftKnee;
    let ankle = pose.leftAnkle;

    if (hip && knee && ankle) {
      // Calculate the angle
      let angle = calculateAngle(hip, knee, ankle);

      // Display the angle on the canvas
      fill(255);
      noStroke();
      textSize(32);
      text(angle.toFixed(2), knee.x, knee.y);

      // Count if the angle follows the required pattern
      if (angle > 160) {
        stage = 'down';
      }
      
      if (angle < 60 && stage === 'down') {
        stage = 'up';
        count++;
        updateCount();
      }
    }
  }
}

function calculateAngle(a, b, c) {
  let radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return angle;
}

function updateCount() {
  document.getElementById('count').innerText = count;
}

function resetCount() {
  count = 0;
  stage = 'down';
  updateCount();
}

// Draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// Draw the skeleton
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
