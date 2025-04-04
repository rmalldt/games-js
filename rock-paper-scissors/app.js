const readline = require('readline');
const colors = require('ansi-colors');

/**
 * Read line from standard input (keyboard).
 * Link: https://stackoverflow.com/questions/61394928/get-user-input-through-node-js-console
 */
const rl = readline.createInterface({
  input: process.stdin, // get input from keyboard
  output: process.stdout, // output to the console
});

function getInput(question) {
  return new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
}

/**
 * Abstract class Player
 * This class cannot be instantiated but is open for extension.
 * Link: https://stackoverflow.com/questions/597769/how-do-i-create-an-abstract-base-class-in-javascript
 */
class Player {
  score = 0;
  static moves = ['rock', 'paper', 'scissors'];

  constructor(name) {
    if (this.constructor === Player) {
      throw new Error(
        'Cannot instantiate Player class. Player is an abstract class.'
      );
    }

    this.name = name;
  }

  // Abstract method
  getMove() {
    throw new Error("Method 'getMove' must be implemented.");
  }

  incrementScore() {
    this.score += 1;
  }
}

/**
 * Class HumanPlayer
 * Concrete class extends class Player.
 */
class HumanPlayer extends Player {
  constructor(name) {
    super(name);
  }

  // Override
  // Get user input from the keyboard.
  async getMove() {
    let move = await getInput('Enter your move: ');

    while (!Player.moves.includes(move)) {
      console.log("Invalid input! Please select 'rock', 'paper' or 'scissors'");
      move = await getInput('Enter your move: ');
    }

    return move;
  }
}

/**
 * Class ComputerPlayer
 * Concrete class extends class Player.
 */
class ComputerPlayer extends Player {
  constructor() {
    super('Computer');
  }

  // Override
  // Generate the computer move.
  getMove() {
    const index = Math.floor(Math.random() * Player.moves.length);
    return Player.moves[index];
  }
}

/**
 * Class Game
 */
class Game {
  // Properties
  humanPlayer;
  computerPlayer;
  numOfRounds = 0;
  message;

  // Run the game
  async run() {
    await this.initGame();
    await this.startGame();
  }

  async initGame() {
    // Welcome message
    console.log(colors.cyan('*********************************************'));
    console.log(
      colors.bold.bgCyan('*            ROCK PAPER SCISSORS            *')
    );
    console.log(colors.cyan('*********************************************'));

    // Instantiate Players
    if (!this.computerPlayer) {
      this.computerPlayer = new ComputerPlayer();
    }

    if (!this.humanPlayer) {
      const playerName = await getInput('Enter your name: ');
      this.humanPlayer = new HumanPlayer(playerName.trim());
    }

    // Set number of rounds
    this.numOfRounds = await this.getRounds();
  }

  async startGame() {
    let round = 1;
    while (round <= this.numOfRounds) {
      // Get player moves
      const playerMove = await this.humanPlayer.getMove();
      const computerMove = this.computerPlayer.getMove();

      // Compare players moves
      switch (true) {
        case playerMove === computerMove:
          this.message = 'Draw!';
          break;

        // Case: HumanPlayer wins
        case playerMove === 'rock' && computerMove === 'scissors':
        case playerMove === 'paper' && computerMove === 'rock':
        case playerMove === 'scissors' && computerMove === 'paper':
          this.humanPlayer.incrementScore();
          this.message = 'Player scored!';
          break;

        // Case: Computer wins
        case playerMove === 'rock' && computerMove === 'paper':
        case playerMove === 'paper' && computerMove === 'scissors':
        case playerMove === 'scissors' && computerMove === 'rock':
          this.computerPlayer.incrementScore();
          this.message = 'Computer scored!';
          break;

        default:
          this.message = 'Invalid inputs!';
          break;
      }

      // Display round information
      this.displayRoundInfo(round, playerMove, computerMove);
      round++;
    }

    // Display final result
    this.displayFinalScore();
  }

  async getRounds() {
    let round = await getInput(
      'Enter number of rounds (default is 3 and max is 9): '
    );

    round = parseInt(round, 10);
    if (!round || round < 3 || round > 9) {
      round = 3;
    }

    return round;
  }

  displayRoundInfo(round, playerMove, computerMove) {
    console.log('');
    console.log('------------------------------');
    console.log(colors.bgBlueBright(`           ROUND - ${round}          `));
    console.log('------------------------------');
    console.log(`Player move: ${colors.blue(playerMove)}`);
    console.log(`Computer move: ${colors.magenta(computerMove)}`);
    console.log(`Message: ${colors.green(this.message)} `);

    console.log(colors.bold('------------------------------'));
    console.log(colors.bold.yellow('    Player     |   Computer   '));
    console.log(colors.bold('------------------------------'));
    console.log(
      colors.bold.blue(
        `    ${this.humanPlayer.score}          |   ${this.computerPlayer.score}    `
      )
    );
    console.log('');
  }

  async displayFinalScore() {
    let message;
    if (this.humanPlayer.score > this.computerPlayer.score) {
      message = colors.bold.green('You Won!');
    } else if (this.humanPlayer.score < this.computerPlayer.score) {
      message = colors.bold.red('You Lost!');
    } else {
      message = colors.bold.yellow("It's a Tie");
    }

    console.log(`          ${message}           `);
    console.log(colors.bgBlueBright(`          FINAL SCORE          `));
    console.log(colors.bold('------------------------------'));
    console.log(colors.bold.yellow('    Player     |   Computer   '));
    console.log(colors.bold('------------------------------'));
    console.log(
      colors.bold.blue(
        `    ${this.humanPlayer.score}          |   ${this.computerPlayer.score}    `
      )
    );

    const playAgain = await getInput('Do your want to play again? Y/n: ');

    if (playAgain.trim().toLowerCase() === 'y') {
      this.resetGame();
      this.run();
    } else {
      console.log('SEE YOU SOON!');
      rl.close();
    }
  }

  // Reset Game
  resetGame() {
    this.humanPlayer.score = 0;
    this.computerPlayer.score = 0;
    this.numOfRounds = 0;
    this.message = null;
  }
}

// Start the App
async function app() {
  const game = new Game();
  await game.run();
}

app();
