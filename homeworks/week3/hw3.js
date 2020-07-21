const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(n) {
  if (n === 1) {
    return false;
  }
  for (let j = 2; j < n; j += 1) {
    if (n % j === 0) {
      return false;
    }
  }
  return true;
}

function solve() {
  const length = Number(lines[0]);
  for (let i = 1; i <= length; i += 1) {
    console.log(isPrime(Number(lines[i])) ? 'Prime' : 'Composite');
  }
}

rl.on('close', () => {
  solve(lines);
});
