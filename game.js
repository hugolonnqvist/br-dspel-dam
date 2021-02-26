"use strict";

let turn = true;
let greyPiecesLeft = 12;
let redPiecesLeft = 12;

function generateBoard(board) {
  function createSquare(idNumber) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.id = idNumber;
    square.addEventListener("click", () => moveSqaure(square));
    return square;
  }

  function populateBoard(elements) {
    const boardDiv = document.querySelector(".board");
    elements.forEach((row) => row.forEach((cell) => boardDiv.append(cell)));
  }

  let idNumber = 0;
  const elements = board.map((row, rowIndex) => {
    return row.map(() => {
      const square = createSquare(idNumber++);
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
        color = "grey";
      } else if (cell === 2) {
        color = "red";
      }
      if (color) {
        square[rowIndex * 8 + cellIndex].classList.add(`${color}`);
      }
    })
  );
}

function moveSqaure(square) {
  let squares = document.getElementsByClassName("square");
  let possibleMoves = [9, 7, 18, 14];

  function move(moveToId, color) {
    squares[moveToId].classList.add(`${color}`);
    square.classList.remove(`${color}`);
    console.log("I moved");
    turn = !turn;
    checkForWin();
  }

  if (turn) {
    movePiece(
      possibleMoves.map((v) => v * -1),
      "red",
      "grey"
    );
  } else {
    movePiece(possibleMoves, "grey", "red");
  }

  function movePiece(moves, allyColor, enemyColor) {
    if (square.classList.contains(allyColor)) {
      function move1() {
        move(square.id - moves[0], allyColor);
        squares[square.id - moves[1]].removeEventListener("click", move2);
      }

      function move2() {
        move(square.id - moves[1], allyColor);
        squares[square.id - moves[0]].removeEventListener("click", move1);
      }

      function jumpOverPiece1() {
        move(square.id - moves[2], allyColor);
        squares[square.id - moves[0]].classList.remove(enemyColor);
        enemyColor === "red" ? redPiecesLeft-- : greyPiecesLeft--;
        squares[square.id - moves[3]].removeEventListener(
          "click",
          jumpOverPiece2
        );
      }

      function jumpOverPiece2() {
        move(square.id - moves[3], allyColor);
        squares[square.id - moves[1]].classList.remove(enemyColor);
        enemyColor === "red" ? redPiecesLeft-- : greyPiecesLeft--;
        squares[square.id - moves[2]].removeEventListener(
          "click",
          jumpOverPiece1
        );
      }

      //Oordinary moves
      if (
        squares[square.id - moves[0]].classList.contains(allyColor) === false &&
        squares[square.id - moves[0]].classList.contains(enemyColor) === false
      ) {
        squares[square.id - moves[0]].addEventListener("click", move1, {
          once: true,
        });
      }

      if (
        squares[square.id - moves[1]].classList.contains(allyColor) === false &&
        squares[square.id - moves[1]].classList.contains(enemyColor) === false
      ) {
        squares[square.id - moves[1]].addEventListener("click", move2, {
          once: true,
        });
      }

      //Jump over moves
      if (squares[square.id - moves[0]].classList.contains(enemyColor)) {
        if (
          squares[square.id - moves[2]].classList.contains(enemyColor) ===
            false &&
          squares[square.id - moves[2]].classList.contains(allyColor) === false
        ) {
          squares[square.id - moves[2]].addEventListener(
            "click",
            jumpOverPiece1,
            {
              once: true,
            }
          );
        }
      }

      if (squares[square.id - moves[1]].classList.contains(enemyColor)) {
        if (
          squares[square.id - moves[3]].classList.contains(enemyColor) ===
            false &&
          squares[square.id - moves[3]].classList.contains(allyColor) === false
        ) {
          squares[square.id - moves[3]].addEventListener(
            "click",
            jumpOverPiece2,
            {
              once: true,
            }
          );
        }
      }
    }
  }
}

function checkForWin() {
  if (redPiecesLeft === 0) {
    alert("GREY WON!");
  } else if (greyPiecesLeft === 0) {
    alert("RED WON!");
  }
}

//Previose code
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

generateBoard(board);
generatePieces();
