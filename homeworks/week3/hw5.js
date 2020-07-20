const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

/* eslint-disable consistent-return */
function result(a, b, rule) {
  const strA = a.toString();
  const strB = b.toString();
  if (strA === strB) {
    return 'DRAW';
  }
  if (rule === '1') {
    if (strA.length === strB.length) {
      return strA > strB ? 'A' : 'B';
    }
    return strA.length > strB.length ? 'A' : 'B';
  }
  if (rule === '-1') {
    if (strA.length === strB.length) {
      return strA < strB ? 'A' : 'B';
    }
    return strA.length < strB.length ? 'A' : 'B';
  }
}
/* eslint-disable consistent-return */

function solve() {
  // 總共有幾組
  for (let i = 1; i <= Number(lines[0]); i += 1) {
    // 每一組的規則及數字
    const [a, b, rule] = lines[i].split(' ');
    console.log(result(a, b, rule));
  }
}

rl.on('close', () => {
  solve(lines);
});
