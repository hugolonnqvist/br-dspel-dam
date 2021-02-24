"use strict";

function generateBoard(board) {
  function createSquare(flag) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(flag ? "black" : "white");
    return square;
  }

  function populateBoard(elements) {
    const boardDiv = document.querySelector(".board");
    elements.forEach((row) => row.forEach((cell) => boardDiv.append(cell)));
  }

  const elements = board.map((row, rowIndex) => {
    let flag = rowIndex % 2;

    return row.map(() => {
      const square = createSquare();
      flag = !flag;
      return square;
    });
  });

  populateBoard(elements);
}

const board = [
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
];

function generatePieces() {
  let square = document.getElementsByClassName("square");

  board.forEach((row, rowIndex) =>
    row.forEach((cell, cellIndex) => {
      let color = null;
      if (cell === 1) {
        color = "white";
      } else if (cell === 2) {
        color = "red";
      }
      if (color) {
        square[
          rowIndex * 8 + cellIndex
        ].innerHTML = `<img class="pawn" src="./images/${color}pawn.png">`;
      }
    })
  );
  /*
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let color = null;
      if (board[i][j] == 2) {
        color = "red";
      } else if (board[i][j] == 1) {
        color = "white";
      }
      if (color) {
        square[
          coordToIndex(i, j)
        ].innerHTML = `<img class="pawn" src="./images/${color}pawn.png">`;
      }
    }
  }*/
}

function coordToIndex(y, x) {
  let boardWidth = 8;
  return y * boardWidth + x;
}
/*
function movePiece(param) {


    let square = document.getElementsByClassName("square");
    let turn = false;
    let once = {
        once: true
    };

    if (!turn) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] == 1) {
                    square[coordToIndex(i, j)].addEventListener("click", function () {

                        
                        square[coordToIndex(i, j) - 7].innerHTML += `<img class="dot" src="./imges/readpawn.png">`;
                        square[coordToIndex(i, j) - 9].innerHTML += `<img class="dot" src="./imges/readpawn.png">`;

                        let possibleMove = document.getElementsByClassName("dot");
                        
                        possibleMove.addEventListener("click", () => {
                            square[]
                        })

                        square[coordToIndex(i, j) - 7].addEventListener("click", () => {
                            square[coordToIndex(i, j) - 7].innerHTML = square[i * 8 + j].innerHTML;
                            square[coordToIndex(i, j)].innerHTML = null;
                            board[i][j] = 0;
                            board[i - 1][j + 1] = 1;
                            turn = !turn;
                            console.log(turn);
                            update();
                        }, once)

                        square[coordToIndex(i, j) - 9].addEventListener("click", () => {
                            square[coordToIndex(i, j) - 9].innerHTML = square[i * 8 + j].innerHTML;
                            square[coordToIndex(i, j)].innerHTML = null;
                            board[i][j] = 0;
                            board[i - 1][j - 1] = 1;
                            turn = !turn; 
                            console.log(turn);
                            update();
                        }, once)


                    }, once);
                }
            }
        }

    } else if (turn) {
        console.log("reds turn");
    }
}*/

generateBoard(board);
generatePieces();
// movePiece();
