const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  let bits = [];
  for (let i = 0; i < lines.length; i++) {
    const value = lines[i];
    for (let i2 = 0; i2 < value.length; i2++) {
      if (i == 0) {
        bits.push(0);
      }
      const bit = parseInt(value[i2]);
      if (bit > 0) {
        bits[i2]++;
      }
      else {
        bits[i2]--;
      }
    }
  }

  let gamma = [], episilon = [];
  for (let i = 0; i < bits.length; i++) {
    gamma.push(bits[i] > 0 ? 1 : 0);
    episilon.push(bits[i] > 0 ? 0 : 1);
  }
  console.log(`gamma: ${gamma.join()}\tepisilon: ${episilon.join()}`);
  gamma = parseInt(gamma.join(''),2);
  episilon = parseInt(episilon.join(''),2);
  console.log(`gamma: ${gamma}\tepisilon: ${episilon}\tpower consumption: ${gamma * episilon}`);
});
