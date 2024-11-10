let score = 0;
let errors = 0;
let beeCount = 0;
let gameInterval;
let spawnInterval;
let startTime;
let beeSpeed = 2000; // Default speed in milliseconds
let beeNumber = 5; // Default number of bees

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame); // Stop button event listener

function startGame() {
    beeNumber = parseInt(document.getElementById("beeNumber").value) || 5;
    beeSpeed = parseInt(document.getElementById("beeSpeed").value) || 2000;
    resetGame();
    for (let i = 0; i < beeNumber; i++) {
        spawnBees();
    }
    gameInterval = setInterval(spawnBees, beeSpeed); // Controls bee spawning frequency
}

function stopGame() {
    clearInterval(gameInterval);
    clearTimeout(spawnInterval);
    alert("Game Stopped!");
}

function resetGame() {
    score = 0;
    errors = 0;
    beeCount = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("reactionTime").innerText = 0;
    document.getElementById("errors").innerText = errors;
    document.getElementById("beeCount").innerText = beeCount;
    clearInterval(gameInterval);
    clearTimeout(spawnInterval);
    document.getElementById("gameArea").innerHTML = "";
}

function spawnBees() {
    const gameArea = document.getElementById("gameArea");
    const bee = document.createElement("div");
    bee.className = "bee";
    bee.style.top = `${Math.random() * (gameArea.offsetHeight - 40)}px`;
    bee.style.left = `${Math.random() * (gameArea.offsetWidth - 40)}px`;

    // Add bee image
    const beeImage = document.createElement("img");
    beeImage.src = "https://via.placeholder.com/40"; // Temporary placeholder image or replace with a valid URL
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
