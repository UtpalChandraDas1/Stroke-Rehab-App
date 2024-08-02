let video;
let poseNet;
let poses = [];
let count = 0;
let stage = 'down';  // Initial stage

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  // Attach event listener to the reset button
  document.getElementById('resetButton').addEventListener('click', resetCount);
}

function modelReady() {
  console.log('PoseNet Ready');
}

function draw() {
  background(255); // Clear the background
  translate(width, 0); // Move the origin to the right edge of the canvas
  scale(-1, 1); // Flip the canvas horizontally
  image(video, 0, 0, width, height); // Draw the video

  if (poses.length > 0) {
    let pose = poses[0].pose;
    let landmarks = pose.keypoints;

    try {
      let shoulder = [landmarks[6].position.x, landmarks[6].position.y]; // RIGHT_SHOULDER
      let elbow = [landmarks[8].position.x, landmarks[8].position.y]; // RIGHT_ELBOW
      let wrist = [landmarks[10].position.x, landmarks[10].position.y]; // RIGHT_WRIST

      let angle = calculateAngle(shoulder, elbow, wrist);

      fill(255, 255, 255);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(angle.toFixed(2), elbow[0], elbow[1]);

      // Counting logic
      if (angle > 160) {
        stage = 'down';
      }
      
      if (angle < 30 && stage === 'down') {
        stage = 'up';
        count++;
        updateCount();
      }
    } catch (error) {
      console.error(error);
    }

    drawSkeleton(poses);
  }
}

function calculateAngle(a, b, c) {
  let radians = Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) {
    angle = 360.0 - angle;
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

function drawSkeleton(poses) {
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
