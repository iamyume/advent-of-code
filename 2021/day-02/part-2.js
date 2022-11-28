const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  let posX = 0;
  let posY = 0;
  let aim = 0;
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(' ');
    const direction = parts[0];
    const value = parseInt(parts[1]);

    switch(direction) {
      case 'forward':
        posX += value;
        posY += aim * value;
        break;
      case 'up':
        aim -= value;
        break;
      case 'down':
        aim += value;
        break;
    }
  }

  console.log(`pos x = ${posX}, pos y = ${posY}, multiply = ${posX * posY}`);
});
