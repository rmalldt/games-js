import { winningCombinations } from './winning-combo.js';

// DOM elements
const playerXElem = document.querySelector('.players .playerX');
const playerOElem = document.querySelector('.players .playerO');
const gameBoardElem = document.querySelector('#game-board');
const resultParaElem = document.querySelector('.result p');
const resetBtnElem = document.querySelector('.result button');

// Game states
const playerX = 'X';
const playerO = 'O';
const gameBoard = gameBoardElem.children;
let currentPlayer = playerX;
let gameOn = true;

// Initialize Game
function initGame() {
  for (let i = 0; i < 9; i++) {
    const button = document.createElement('button');
    button.append('');
    gameBoardElem.appendChild(button);
  }

  gameBoardElem.addEventListener('click', startGame);
  resetBtnElem.addEventListener('click', resetGame);
}

function startGame(e) {
  const targetSquare = e.target;

  if (gameOn) {
    if (targetSquare.nodeName === 'BUTTON' && targetSquare.textContent === '') {
      targetSquare.textContent = currentPlayer;
      playerXElem.classList.toggle('active');
      playerOElem.classList.toggle('active');
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    }

    const result = getResult();
    if (result) {
      displayResult(result);
    }
  }
}

function getResult() {
  let winner = null;
  const board = [...gameBoard].map(square => square.textContent);

  winningCombinations.forEach(combination => {
    const firstSquare = board[combination[0]];
    const secondSquare = board[combination[1]];
    const thirdSquare = board[combination[2]];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = { player: firstSquare, combination: combination };
    }
  });

  if (winner) {
    return winner;
  } else if (!winner && !board.includes('')) {
    return 'draw';
  } else {
    return null;
  }
}

function displayResult(result) {
  gameOn = false;
  const resultStr =
    result !== 'draw' ? `Player ${result.player} wins!` : `It's a tie!`;

  resultParaElem.textContent = resultStr;
}

function resetGame() {
  if (!gameOn) {
    [...gameBoard].forEach(square => (square.textContent = ''));

    gameOn = true;
  } else {
    alert('Please complete the current round.');
  }
}

function app() {
  initGame();
}
app();
