let score = 0;
let errors = 0;
let beeCount = 0;
let gameInterval;
let spawnInterval;
let gameTimerInterval;
let startTime;
let beeSpeed = 2000; // Default speed in milliseconds
let beeNumber = 5; // Default number of bees
let gameTime = 0;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);

function startGame() {
    beeNumber = parseInt(document.getElementById("beeNumber").value) || 5;
    beeSpeed = parseInt(document.getElementById("beeSpeed").value) || 2000;
    resetGame();
    document.getElementById("startButton").style.display = "none";
    document.getElementById("stopButton").style.display = "inline";

    for (let i = 0; i < beeNumber; i++) {
        spawnBees();
    }
    gameInterval = setInterval(spawnBees, beeSpeed); // Controls bee spawning frequency
    gameTimerInterval = setInterval(updateTimer, 1000); // Timer updates every second
}

function resetGame() {
    score = 0;
    errors = 0;
    beeCount = 0;
    gameTime = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("reactionTime").innerText = 0;
    document.getElementById("errors").innerText = errors;
    document.getElementById("beeCount").innerText = beeCount;
    document.getElementById("gameTimer").innerText = gameTime;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    clearInterval(gameTimerInterval);
    document.getElementById("gameArea").innerHTML = "";
}

function spawnBees() {
    const gameArea = document.getElementById("gameArea");
    const bee = document.createElement("div");
    bee.className = "bee";
    bee.style.top = `${Math.random() * (gameArea.offsetHeight - 40)}px`;
    bee.style.left = `${Math.random() * (gameArea.offsetWidth - 40)}px`;

    // Add updated bee image
    const beeImage = document.createElement("img");
    beeImage.src = "https://t4.ftcdn.net/jpg/05/86/40/81/240_F_586408183_1bYuLfonSdgYLd8FiJ6z9opw8y4pU1LU.jpg";
    bee.appendChild(beeImage);

    beeCount++;
    document.getElementById("beeCount").innerText = beeCount;

    bee.addEventListener("click", () => hitBee(bee));
    startTime = new Date().getTime();

    gameArea.appendChild(bee);

    spawnInterval = setTimeout(() => {
        if (document.body.contains(bee)) {
            gameArea.removeChild(bee);
            errors++;
            document.getElementById("errors").innerText = errors;
        }
    }, beeSpeed); // Bee lifespan before disappearing
}

function hitBee(bee) {
    const reactionTime = new Date().getTime() - startTime;
    document.getElementById("reactionTime").innerText = reactionTime;
    score++;
    document.getElementById("score").innerText = score;
    bee.remove();
}

function stopGame() {
    clearInterval(gameInterval);
    clearInterval(gameTimerInterval);
    clearTimeout(spawnInterval);
    document.getElementById("startButton").style.display = "inline";
    document.getElementById("stopButton").style.display = "none";
}

function updateTimer() {
    gameTime++;
    document.getElementById("gameTimer").innerText = gameTime;
}
