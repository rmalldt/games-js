const Game = require('./game');

// Start the App
async function app() {
  const game = new Game();
  await game.run();
}

app();
