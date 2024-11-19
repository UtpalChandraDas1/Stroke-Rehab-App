const video = document.getElementById('video');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('reset-button'); // New Reset Button

let counter = 0;  // Counter for repetitions
let stage = "up"; // Initial stage
let previousAngles = [];

// Reset Button Event Listener
resetButton.addEventListener('click', () => {
    counter = 0;
    stage = "up";
    previousAngles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    alert('Counter and stage have been reset.');
});

async function setupCamera() {
    video.width = 640;
    video.height = 480;
    canvas.width = 640;
    canvas.height = 480;

    const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => resolve(video);
    });
}

async function loadAndEstimatePoses() {
    const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER
    };
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

    async function detectPose() {
        const poses = await detector.estimatePoses(video);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        poses.forEach(pose => {
            if (pose.keypoints) {
                pose.keypoints.forEach(keypoint => {
                    if (keypoint.score > 0.7) {
                        const {x, y} = keypoint;
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = 'red';
                        ctx.fill();
                    }
                });

                if (pose.keypoints.length >= 11) {
                    const hip = pose.keypoints[11];
                    const knee = pose.keypoints[13];
                    const ankle = pose.keypoints[15];

                    if (hip && knee && ankle) {
                        const angle = calculateAngle(hip, knee, ankle);
                        const smoothedAngle = calculateSmoothedAngle(angle);

                        ctx.fillStyle = 'white';
                        ctx.font = '18px Arial';
                        ctx.fillText(`Angle: ${Math.round(smoothedAngle)}`, knee.x, knee.y - 20);

                        if (smoothedAngle > 160) stage = "down";
                        if (smoothedAngle < 60 && stage === 'down') {
                            stage = "up";
                            counter++;
                        }

                        ctx.fillStyle = 'yellow';
                        ctx.font = '24px Arial';
                        ctx.fillText(`Reps: ${counter}`, 10, 30);
                        ctx.fillText(`Stage: ${stage}`, 10, 60);
                    }
                }
            }
        });

        requestAnimationFrame(detectPose);
    }

    detectPose();
}

function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
}

function calculateSmoothedAngle(angle) {
    previousAngles.push(angle);
    if (previousAngles.length > 10) previousAngles.shift();
    const sum = previousAngles.reduce((acc, curr) => acc + curr, 0);
    return sum / previousAngles.length;
}

setupCamera().then(loadAndEstimatePoses);
