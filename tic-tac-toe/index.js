import { winningCombo } from './winning-combo.js';

const gameBoardElem = document.querySelector('#game-board');

const playerXElem = document.querySelector('.playerX');
const playerOElem = document.querySelector('.playerO');

const r0b0 = document.querySelector('#row-0 .zero');
const r0b1 = document.querySelector('#row-0 .one');
const r0b2 = document.querySelector('#row-0 .two');

const r1b0 = document.querySelector('#row-1 .zero');
const r1b1 = document.querySelector('#row-1 .one');
const r1b2 = document.querySelector('#row-1 .two');

const r2b0 = document.querySelector('#row-2 .zero');
const r2b1 = document.querySelector('#row-2 .one');
const r2b2 = document.querySelector('#row-2 .two');

function app() {
  console.log('Loading Game...');

  const playerX = 'X';
  const playerO = 'Y';
  let currentPlayer = playerX;

  switchPlayer(playerX, playerO, currentPlayer);
}

function switchPlayer(playerX, playerO, currentPlayer) {
  gameBoardElem.addEventListener('click', e => {
    const targetElem = e.target;

    if (targetElem.nodeName === 'BUTTON') {
      console.log('Current Player: ', currentPlayer);
      if (currentPlayer === playerX) {
        targetElem.textContent = 'X';
        currentPlayer = playerO;
        playerXElem.classList.remove('active');
        playerOElem.classList.add('active');
        checkMoves();
      } else {
        targetElem.textContent = 'O';
        currentPlayer = playerX;
        playerOElem.classList.remove('active');
        playerXElem.classList.add('active');
        checkMoves();
      }
    }
  });
}

function checkMoves() {
  const gameboardStatus = [
    [r0b0.textContent, r0b1.textContent, r0b2.textContent],
    [r1b0.textContent, r1b1.textContent, r1b2.textContent],
    [r2b0.textContent, r2b1.textContent, r2b2.textContent],
  ];

  console.log(gameboardStatus);

  // TODO
  // 1. Compare user input on every turn to check the winner
}

app();
