// ====== Game state ======
const penguin = document.getElementById("penguin");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");
const bestEl = document.getElementById("best");
const finalScoreEl = document.getElementById("finalScore");
const gameOverEl = document.getElementById("gameOver");

let score = 0;
let best = Number(localStorage.getItem("penguinBest")) || 0;
let isJumping = false;
let isGameOver = false;
let speed = 5;
let obstacleX = -60;
let animationId = null;

bestEl.textContent = best;

// ====== Core logic ======
function jump() {
  if (isJumping || isGameOver) return;
  isJumping = true;
  penguin.classList.add("jump");
  setTimeout(() => {
    penguin.classList.remove("jump");
    isJumping = false;
  }, 500);
}

function resetObstacle() {
  obstacleX = -60;
  obstacle.style.right = "-60px";
}

function gameLoop() {
  if (isGameOver) return;

  obstacleX += speed;
  obstacle.style.right = obstacleX + "px";

  if (obstacleX > 480 && obstacleX < 560 && !isJumping) {
    endGame();
    return;
  }

  if (obstacleX > 700) {
    score++;
    scoreEl.textContent = score;
    resetObstacle();
    if (score % 5 === 0) speed += 0.7;
  }

  animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
  score = 0;
  speed = 5;
  isGameOver = false;
  isJumping = false;
  scoreEl.textContent = 0;
  gameOverEl.classList.add("hidden");
  resetObstacle();
  cancelAnimationFrame(animationId);
  animationId = requestAnimationFrame(gameLoop);
}

function endGame() {
  isGameOver = true;
  cancelAnimationFrame(animationId);
  finalScoreEl.textContent = score;
  if (score > best) {
    best = score;
    localStorage.setItem("penguinBest", best);
    bestEl.textContent = best;
  }
  gameOverEl.classList.remove("hidden");
}

function restartGame() {
  startGame();
}

// ====== Input ======
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();
    jump();
  }
});
document.getElementById("game").addEventListener("click", jump);

// ====== Auto start ======
startGame();

// ====== Export for CI ======
if (typeof module !== "undefined" && module.exports) {
  module.exports = { jump, resetObstacle, startGame, endGame, restartGame };
}