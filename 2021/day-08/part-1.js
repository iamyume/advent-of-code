const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  let count = 0;
  lines.forEach(line => {
    const parts = line.split(' | ');
    const digits = parts[0].split(' ');
    const display = parts[1].split(' ');

    display.forEach(o => {
      if ([2,3,4,7].indexOf(o.length) > -1) {
        count++;
      }
    });
  });

  console.log(count);
});
