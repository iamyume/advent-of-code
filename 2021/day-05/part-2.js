const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const lines = data.split('\r\n');

  const points = [];

  let maxX = 0;
  let maxY = 0;

  lines.forEach(line => {
    const pts = line.split(' -> ');
    const pt1 = pts[0].split(',').map(o => parseInt(o));
    const pt2 = pts[1].split(',').map(o => parseInt(o));

    maxX = Math.max(maxX, pt1[0], pt2[0]);
    maxY = Math.max(maxY, pt1[1], pt2[1]);
    points.push([
      pt1,
      pt2
    ])
  });

  const matrix = Array.from(Array(maxX + 1), () => new Array(maxY + 1));

  points.forEach(o => {
    const pt1 = o[0];
    const pt2 = o[1];

    if (pt1[0] == pt2[0]) {
      let x = pt1[0];
      for (let y = Math.min(pt1[1], pt2[1]); y <= Math.max(pt1[1], pt2[1]); y++) {
        if (matrix[x][y] == null) {
          matrix[x][y] = 1;
        }
        else {
          matrix[x][y]++;
        }
      }
    }
    else if (pt1[1] == pt2[1]) {
      let y = pt1[1];
      for (let x = Math.min(pt1[0], pt2[0]); x <= Math.max(pt1[0], pt2[0]); x++) {
        if (matrix[x][y] == null) {
          matrix[x][y] = 1;
        }
        else {
          matrix[x][y]++;
        }
      }
    }
    else {
      let x = pt1[0];
      let y = pt1[1];
      while (x != pt2[0] && y != pt2[1]) {
        if (matrix[x][y] == null) {
          matrix[x][y] = 1;
        }
        else {
          matrix[x][y]++;
        }
        x += pt1[0] < pt2[0] ? 1 : -1;
        y += pt1[1] < pt2[1] ? 1 : -1;
      }
      if (matrix[x][y] == null) {
        matrix[x][y] = 1;
      }
      else {
        matrix[x][y]++;
      }
    }
  });

  let score = 0;
  matrix.flat().forEach(o => {
    if (o > 1) {
      score++;
    }
  })
  console.log(score);
});
