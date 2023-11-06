const gridSize = 4;
const totalTiles = gridSize ** 2;
let numbers = Array.from({ length: totalTiles }, (_, i) => i + 1);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initializeGame() {
  numbers = Array.from({ length: totalTiles }, (_, i) => i + 1);
  renderTiles();

  const startButton = document.createElement("button");
  startButton.textContent = "Jugar";
  startButton.addEventListener("click", startGame);
  document.body.appendChild(startButton);
}

function startGame() {
  shuffleArray(numbers);
  renderTiles();
}

function handleTileClick(tileValue) {
  const tileIndex = numbers.indexOf(tileValue);
  const emptyIndex = numbers.indexOf(totalTiles);

  if (isMovable(tileIndex, emptyIndex)) {
    numbers[emptyIndex] = tileValue;
    numbers[tileIndex] = totalTiles;
    renderTiles();
    if (checkWin()) {
      setTimeout(() => alert("¡Ganaste!"), 100);
    }
  }
}

function isMovable(tileIndex, emptyIndex) {
  const row = Math.floor(tileIndex / gridSize);
  const col = tileIndex % gridSize;
  const emptyRow = Math.floor(emptyIndex / gridSize);
  const emptyCol = emptyIndex % gridSize;

  const rowDiff = Math.abs(row - emptyRow);
  const colDiff = Math.abs(col - emptyCol);

  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

function checkWin() {
  return numbers.slice(0, totalTiles - 1).every((value, index) => value === (index + 1));
}

function renderTiles() {
  const gameContainer = document.getElementById("game-container");
  gameContainer.innerHTML = "";

  numbers.forEach((number) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = number === totalTiles ? "" : number;
    if (number !== totalTiles) {
      tile.addEventListener("click", () => handleTileClick(number));
    }
    gameContainer.appendChild(tile);
  });
}

document.getElementById("start-button").addEventListener("click", startGame);
document.addEventListener("DOMContentLoaded", initializeGame);
startGame();