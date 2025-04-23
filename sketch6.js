let score = 0;
let errors = 0;
let MosquitoCount = 0;
let gameInterval;
let spawnInterval;
let gameTimerInterval;
let startTime;
let MosquitoSpeed = 2000; // Default speed in milliseconds
let MosquitoNumber = 5; // Default number of Mosquitos
let gameTime = 0;

document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);

function startGame() {
    MosquitoNumber = parseInt(document.getElementById("MosquitoNumber").value) || 5;
    MosquitoSpeed = parseInt(document.getElementById("MosquitoSpeed").value) || 2000;
    resetGame();
    document.getElementById("startButton").style.display = "none";
    document.getElementById("stopButton").style.display = "inline";

    for (let i = 0; i < MosquitoNumber; i++) {
        spawnMosquitos();
    }
    gameInterval = setInterval(spawnMosquitos, MosquitoSpeed); // Controls Mosquito spawning frequency
    gameTimerInterval = setInterval(updateTimer, 1000); // Timer updates every second
}

function resetGame() {
    score = 0;
    errors = 0;
    MosquitoCount = 0;
    gameTime = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("reactionTime").innerText = 0;
    document.getElementById("errors").innerText = errors;
    document.getElementById("MosquitoCount").innerText = MosquitoCount;
    document.getElementById("gameTimer").innerText = gameTime;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    clearInterval(gameTimerInterval);
    document.getElementById("gameArea").innerHTML = "";
}

function spawnMosquitos() {
    const gameArea = document.getElementById("gameArea");
    const Mosquito = document.createElement("div");
    Mosquito.className = "Mosquito";
    Mosquito.style.top = `${Math.random() * (gameArea.offsetHeight - 40)}px`;
    Mosquito.style.left = `${Math.random() * (gameArea.offsetWidth - 40)}px`;

    // Add updated Mosquito image
    const MosquitoImage = document.createElement("img");
    MosquitoImage.src = "https://pngtree.com/freepng/cartoon-mosquito_6944825.html";
    Mosquito.appendChild(MosquitoImage);

    MosquitoCount++;
    document.getElementById("MosquitoCount").innerText = MosquitoCount;

    Mosquito.addEventListener("click", () => hitMosquito(Mosquito));
    startTime = new Date().getTime();

    gameArea.appendChild(Mosquito);

    spawnInterval = setTimeout(() => {
        if (document.body.contains(Mosquito)) {
            gameArea.removeChild(Mosquito);
            errors++;
            document.getElementById("errors").innerText = errors;
        }
    }, MosquitoSpeed); // Mosquito lifespan before disappearing
}

function hitMosquito(Mosquito) {
    const reactionTime = new Date().getTime() - startTime;
    document.getElementById("reactionTime").innerText = reactionTime;
    score++;
    document.getElementById("score").innerText = score;
    Mosquito.remove();
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
