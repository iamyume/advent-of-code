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
      if (i > 0 && parseInt(lines[i]) > parseInt(lines[i-1])) {
          increaseCount++;
      }
  }
  console.log(increaseCount)
})
