const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  const fishes = lines[0].split(',').map(o => parseInt(o));

  const days = 256;

  const counts = Array(9).fill(0);

  fishes.forEach(o => {
    counts[o]++;
  });

  // console.log(`Initial State:\t${fishes.join()}`);
  for (let i = 1; i <= days; i++) {
    console.log(`Day ${i}\t${counts.join()}`);
    const spawnCount = counts.shift();
    counts.push(spawnCount)
    counts[6] += spawnCount;
  }

  const fishNum = counts.reduce((prevValue, currentValue) => prevValue + currentValue);
  console.log(fishNum)
});
