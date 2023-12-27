function createPlayer() {
  let points = 0;
  const getPoints = () => points;
  const addPoint = () => points++;
  const initializePoints = () => (points = 0);
  return { getPoints, addPoint, initializePoints };
}

(function gameBoard() {
  let board = ["", "", "", "", "", "", "", "", ""];
  getBoard = () => board;
  setValue = (player, position, cell) => {
    board[position] = player ? "X" : "O";
    cell.textContent = board[position];
  };
  initializeBoard = () => (board = ["", "", "", "", "", "", "", "", ""]);
  return { getBoard, setValue, initializeBoard };
})();

function checkGame() {
  const board = getBoard();
  const check1 = board[0] + board[1] + board[2];
  const check2 = board[3] + board[4] + board[5];
  const check3 = board[6] + board[7] + board[8];
  const check4 = board[0] + board[3] + board[6];
  const check5 = board[1] + board[4] + board[7];
  const check6 = board[2] + board[5] + board[8];
  const check7 = board[0] + board[4] + board[8];
  const check8 = board[2] + board[4] + board[6];

  if (
    check1 === "XXX" ||
    check2 === "XXX" ||
    check3 === "XXX" ||
    check4 === "XXX" ||
    check5 === "XXX" ||
    check6 === "XXX" ||
    check7 === "XXX" ||
    check8 === "XXX"
  ) {
    return 1;
  }
  if (
    check1 === "OOO" ||
    check2 === "OOO" ||
    check3 === "OOO" ||
    check4 === "OOO" ||
    check5 === "OOO" ||
    check6 === "OOO" ||
    check7 === "OOO" ||
    check8 === "OOO"
  ) {
    return 2;
  }
  return false;
}

function displayController(
  player1,
  player2,
  whoPlay,
  playAgainBtn,
  resetGameBtn
) {
  let boardElement = {};
  let whoPlayNow = whoPlay;
  let movesCount = 1;
  const container = document.querySelector(".game-container");
  const player1Point = document.querySelector(".player-1").querySelector("h2");
  const player2Point = document.querySelector(".player-2").querySelector("h2");
  const whoPlayText = document.querySelector(".who-play");

  function clearEventListeners(element) {
    const clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
  }

  function onClickCell(position) {
    setValue(whoPlayNow, position, boardElement[`cell-${position}`]);
    const result = checkGame();
    if (result || movesCount >= 9) {
      if (result === 1) {
        whoPlayText.textContent = "Player 1 won";
        player1.addPoint();
        player1Point.textContent = player1.getPoints();
      }
      if (result === 2) {
        whoPlayText.textContent = "Player 2 won";
        player2.addPoint();
        player2Point.textContent = player2.getPoints();
      }
      container.insertBefore(playAgainBtn, resetGameBtn);
      for (let i = 0; i < 9; i++) {
        boardElement[`cell-${i}`] = document.getElementById(`cell-${i}`);
        clearEventListeners(boardElement[`cell-${i}`]);
      }
      return;
    }
    whoPlayNow = !whoPlayNow;
    whoPlayText.textContent = whoPlayNow ? "Player 1 play" : "Player 2 play";
    movesCount++;
  }

  whoPlayText.textContent = "Player 1 play";
  player1Point.textContent = player1.getPoints();
  player2Point.textContent = player2.getPoints();

  for (let i = 0; i < 9; i++) {
    boardElement[`cell-${i}`] = document.getElementById(`cell-${i}`);
    boardElement[`cell-${i}`].textContent = "";
    boardElement[`cell-${i}`].addEventListener("click", () => onClickCell(i), {
      once: true,
    });
  }
}

(function playGame() {
  const player1 = createPlayer();
  const player2 = createPlayer();
  const whoPlay = true;
  const playAgainBtn = document.createElement("button");
  const resetGameBtn = document.createElement("button");
  const container = document.querySelector(".game-container");

  playAgainBtn.className = "play-again";
  playAgainBtn.textContent = "Play again";
  playAgainBtn.addEventListener("click", () => {
    initializeBoard();
    container.removeChild(playAgainBtn);
    displayController(player1, player2, whoPlay, playAgainBtn, resetGameBtn);
  });

  resetGameBtn.className = "reset-game";
  resetGameBtn.textContent = "Reset Game";
  resetGameBtn.addEventListener("click", () => {
    initializeBoard();
    player1.initializePoints();
    player2.initializePoints();
    if (container.contains(playAgainBtn)) {
      container.removeChild(playAgainBtn);
    }
    displayController(player1, player2, whoPlay, playAgainBtn, resetGameBtn);
  });
  container.appendChild(resetGameBtn);
  displayController(player1, player2, whoPlay, playAgainBtn, resetGameBtn);
})();
