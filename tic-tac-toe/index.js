const gameBoardElem = document.querySelector('#game-board');

const playerXElem = document.querySelector('.playerX');
const playerOElem = document.querySelector('.playerO');

const r1b1 = document.querySelector('#row-1 .one');
const r1b2 = document.querySelector('#row-1 .two');
const r1b3 = document.querySelector('#row-1 .three');

const r2b1 = document.querySelector('#row-2 .one');
const r2b2 = document.querySelector('#row-2 .two');
const r2b3 = document.querySelector('#row-2 .three');

const r3b1 = document.querySelector('#row-3 .one');
const r3b2 = document.querySelector('#row-3 .two');
const r3b3 = document.querySelector('#row-3 .three');

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
      } else {
        targetElem.textContent = 'O';
        currentPlayer = playerX;
        playerOElem.classList.remove('active');
        playerXElem.classList.add('active');
      }
    }
  });
}

app();
