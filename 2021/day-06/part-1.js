const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  const fishes = lines[0].split(',').map(o => parseInt(o));

  const days = 80;

  // console.log(`Initial State:\t${fishes.join()}`);
  for (let i = 1; i <= days; i++) {
    for (let i2 = fishes.length-1; i2 >=0; i2--) {
      fishes[i2]--;
      if (fishes[i2] < 0) {
        fishes[i2] = 6;
        fishes.push(8);
      }
    }
    // console.log(`After ${i} days:\t${fishes.join()}`);
  }

  console.log(fishes.length)
});
