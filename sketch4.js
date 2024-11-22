const video = document.getElementById('video');
const canvas = document.getElementById('output');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('reset');

let counter = 0; // Counter for repetitions
let stage = "up"; // Initial stage

async function setupCamera() {
    video.width = 640;
    video.height = 480;
    canvas.width = 640;
    canvas.height = 480;

    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadAndRunOpenPose() {
    const detector = await poseDetection.createDetector(
        poseDetection.SupportedModels.BlazePose,
        {
            runtime: 'tfjs',
            enableSmoothing: true,
            modelType: 'full',
        }
    );

    async function detectPose() {
        const poses = await detector.estimatePoses(video);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        poses.forEach((pose) => {
            if (pose.keypoints) {
                pose.keypoints.forEach((keypoint) => {
                    if (keypoint.score > 0.5) {
                        const { x, y } = keypoint;
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = 'red';
                        ctx.fill();
                    }
                });

                // Get keypoints for right hip flexion
                const hip = pose.keypoints.find(k => k.name === 'right_hip');
                const knee = pose.keypoints.find(k => k.name === 'right_knee');
                const ankle = pose.keypoints.find(k => k.name === 'right_ankle');

                if (hip && knee && ankle) {
                    const angle = calculateAngle(hip, knee, ankle);

                    // Display the angle on the canvas
                    ctx.fillStyle = 'white';
                    ctx.font = '18px Arial';
                    ctx.fillText(`Knee Angle: ${Math.round(angle)}°`, knee.x, knee.y - 20);

                    // Counting logic
                    if (angle > 160) {
                        stage = "down";
                    }
                    if (angle < 30 && stage === "down") {
                        stage = "up";
                        counter++;
                    }

                    // Display counter and stage
                    ctx.fillStyle = 'yellow';
                    ctx.font = '24px Arial';
                    ctx.fillText(`Reps: ${counter}`, 10, 30);
                    ctx.fillText(`Stage: ${stage}`, 10, 60);
                }
            }
        });

        requestAnimationFrame(detectPose);
    }

    detectPose();
}

function calculateAngle(a, b, c) {
    const radians =
        Math.atan2(c.y - b.y, c.x - b.x) -
        Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    if (angle > 180.0) angle = 360 - angle;
    return angle;
}

// Reset button functionality
resetButton.addEventListener('click', () => {
    counter = 0;
    stage = "up";
});

setupCamera().then(loadAndRunOpenPose);
