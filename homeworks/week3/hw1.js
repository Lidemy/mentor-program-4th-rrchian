const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});


function printStar(n) {
  let str = '';
  for (let i = 1; i <= n; i += 1) {
    str += '*';
    console.log(str);
  }
}

function solve() {
  printStar(lines[0]);
}

rl.on('close', () => {
  solve(lines);
});
