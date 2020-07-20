const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

function solve() {
  const line = lines[0];
  const input = line.split(' '); // ['5','200']
  // 從 min 到 max
  for (let i = Number(input[0]); i <= Number(input[1]); i += 1) {
    const str = i.toString();
    const digit = Array.from(str);
    let value = 0;
    for (let j = 0; j < digit.length; j += 1) {
      value += Number(digit[j]) ** digit.length;
    }
    if (value === i) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
