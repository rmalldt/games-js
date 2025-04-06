const colors = require('ansi-colors');
const { getInput, rl } = require('./helper');
const { HumanPlayer, ComputerPlayer } = require('./player');

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
    console.log(colors.cyan('*'.padStart(45, '*')));
    console.log(
      colors.bold.bgCyan(
        `${'*'.padEnd(13, ' ')}ROCK PAPER SCISSORS${'*'.padStart(13, ' ')}`
      )
    );
    console.log(colors.cyan('*'.padStart(45, '*')));

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
    console.log('-'.padEnd(30, '-'));
    console.log(
      colors.bgBlueBright(
        `${''.padStart(10)}ROUND - ${round}${''.padStart(11)}`
      )
    );
    console.log('-'.padEnd(30, '-'));
    console.log(`Player move: ${colors.blue(playerMove)}`);
    console.log(`Computer move: ${colors.magenta(computerMove)}`);
    console.log(`Message: ${colors.green(this.message)} `);

    console.log('-'.padEnd(30, '-'));
    console.log(
      colors.bold.yellow(
        `${''.padStart(3)}Player${''.padEnd(3)}|${''.padStart(
          3
        )}Computer${''.padEnd(3)}`
      )
    );
    console.log('-'.padEnd(30, '-'));
    console.log(
      colors.bold.blue(
        `${''.padStart(6)}${this.humanPlayer.score}${''.padEnd(
          5
        )}|${''.padStart(6)}${this.computerPlayer.score}${''.padEnd(5)}`
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

    console.log(`${''.padEnd(10)}${message}${''.padStart(10)}`);
    console.log(
      colors.bgBlueBright(`${''.padEnd(10)}FINAL SCORE${''.padStart(10)}`)
    );
    console.log('-'.padEnd(30, '-'));
    console.log(
      colors.bold.yellow(
        `${''.padStart(3)}Player${''.padEnd(3)}|${''.padStart(
          3
        )}Computer${''.padEnd(3)}`
      )
    );
    console.log('-'.padEnd(30, '-'));
    console.log(
      colors.bold.blue(
        `${''.padStart(6)}${this.humanPlayer.score}${''.padEnd(
          5
        )}|${''.padStart(6)}${this.computerPlayer.score}${''.padEnd(5)}`
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

module.exports = Game;
