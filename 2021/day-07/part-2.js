const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  const crabs = lines[0].split(',').map(o => parseInt(o));

  const max = Math.max(...crabs);

  const crabCount = Array(max+1).fill(0);

  crabs.forEach(o => {
    crabCount[o]++;
  });

  let fuel = 0;
  let optimalPosition;
  let optimalFuel = Infinity;

  for (let pos = 0; pos < crabCount.length; pos++) {
    let fuel = 0;
    crabCount.forEach((o,i) => {
      let n = Math.abs(i-pos);
      fuel += o * ((n * (n+1)) / 2);
    });
    if (fuel < optimalFuel) {
      optimalFuel = fuel;
      optimalPosition = pos;
    }
  }

  console.log(optimalPosition);
  console.log(optimalFuel);
});
