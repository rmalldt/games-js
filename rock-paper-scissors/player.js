const { getInput } = require('./helper');

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

module.exports = {
  HumanPlayer,
  ComputerPlayer,
};
