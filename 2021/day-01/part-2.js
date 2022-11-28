const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  let increaseCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const window1 = parseInt(lines[i-1]) + parseInt(lines[i-2]) + parseInt(lines[i-3]);
    const window2 = parseInt(lines[i]) + parseInt(lines[i-1]) + parseInt(lines[i-2]);
    if (i > 2 && window2 > window1) {
          increaseCount++;
      }
  }
  console.log(increaseCount)
})
