const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  const bitLength = lines[0].length;

  // get oxygen lines
  let oLines = [...lines];
  for (let i = 0; i < bitLength; i++) {
    let ones = [], zeroes = [];
    for (let i2 = 0; i2 < oLines.length; i2++) {
      const line = oLines[i2];
      if (parseInt(line[i]) > 0) {
        ones.push(line);
      }
      else {
        zeroes.push(line);
      }
    }
    oLines = ones.length >= zeroes.length ? ones : zeroes;
    if (oLines.length === 1) {
      break;
    }
  }

  console.log(oLines);

  // get co lines
  let coLines = [...lines];
  for (let i = 0; i < bitLength; i++) {
    let ones = [], zeroes = [];
    for (let i2 = 0; i2 < coLines.length; i2++) {
      const line = coLines[i2];
      if (parseInt(line[i]) > 0) {
        ones.push(line);
      }
      else {
        zeroes.push(line);
      }
    }
    coLines = zeroes.length <= ones.length ? zeroes : ones;
    if (coLines.length === 1) {
      break;
    }
  }

  const o2 = parseInt(oLines[0],2);
  const co2 = parseInt(coLines[0],2);
  console.log(`o2: ${o2}\tco2: ${co2}\tlife support rating: ${o2 * co2}`);
});
