let video;
let poseNet;
let poses = [];
let count = 0;
let stage = 'down';  // Initial stage

function setup() {
  createCanvas(640, 480);
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
  
  // For one pose only (use a for loop for multiple poses!)
  if (poses.length > 0) {
    let pose = poses[0].pose;

    // Extract coordinates
    let shoulder = pose.rightShoulder;
    let elbow = pose.rightElbow;
    let wrist = pose.rightWrist;

    if (shoulder && elbow && wrist) {
      // Calculate the angle
      let angle = calculateAngle(shoulder, elbow, wrist);

      // Display the angle on the canvas
      fill(255);
      noStroke();
      textSize(32);
      text(angle.toFixed(2), elbow.x, elbow.y);

      // Count if the angle follows the required pattern
      if (angle > 160) {
        stage = 'down';
      }
      
      if (angle < 30 && stage === 'down') {
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
