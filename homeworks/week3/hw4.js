const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function isPalindrome(str) {
  let strPalin = '';
  for (let i = str.length - 1; i >= 0; i -= 1) {
    strPalin += str[i];
  }
  if (str === strPalin) {
    console.log('True');
    return;
  }
  console.log('False');
}

function solve() {
  isPalindrome(lines[0]);
}

rl.on('close', () => {
  solve(lines);
});
