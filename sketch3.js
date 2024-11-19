<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pose Estimation for Left Hip Flexion</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Pose Estimation Web Application: Left Hip Flexion</h1>
    <video id="video" autoplay playsinline></video>
    <canvas id="output"></canvas>
    <button id="reset-button">Reset Counter</button> <!-- New Reset Button -->
    <audio id="beep-sound" src="beep.mp3"></audio> <!-- Optional beep sound -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection"></script>
    <script src="script.js"></script>
</body>
</html>
