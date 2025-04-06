const readline = require('readline');

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

module.exports = {
  getInput,
  rl,
};
