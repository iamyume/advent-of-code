const fs = require('fs')

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const lines = data.split('\r\n');

  const numbers = lines[0].split(',').map(o => parseInt(o));

  const sumReducer = (prevValue, currentValue) => prevValue + currentValue;

  let boards = [];

  let board = [];
  lines.slice(2).forEach(line => {
    if (line.length === 0) {
      boards.push(board);
      board = [];
    } else {
      board.push(line.trim().split(/\s+/).map(o => parseInt(o)))
    }
  });
  boards.push(board);

  const markBoard = (board, number) => {
    loopRow:
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        if (board[r][c] === number) {
          board[r][c] = 0;
          break loopRow;
        }
      }
    }
  };

  const isWinner = (board) => {
    const length = board[0].length;

    for (let i = 0; i < length; i++) {
      if (board[i].reduce(sumReducer) === 0 || board.map(o => o[i]).reduce(sumReducer) === 0) {
        return true
      }
    }

    return false;
  };

  let winningNumber = null;
  let winningBoard = null;
  loop1:
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];

    for (let i2 = boards.length-1; i2 >= 0; i2--) {
      const board = boards[i2];

      markBoard(board, number);

      if (isWinner(board)) {
        winningBoard = board;
        boards.splice(i2, 1);
      }
    }

    if (boards.length === 0) {
      winningNumber = number;
      break;
    }
  }

  let sum = 0;
  winningBoard.forEach(row => {
    sum += row.reduce(sumReducer);
  });
  console.log(`sum = ${sum}\twinning number: ${winningNumber}\tscore: ${sum * winningNumber}`);
});