"use strict";

(() => {
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
        if (cell !== 0) {
          const color = cell === 1 ? "grey" : "red";
          square[rowIndex * 8 + cellIndex].classList.add(`${color}`);
        }
      })
    );
  }

  //Function for moving the pieces
  function moveSqaure(square) {
    let squares = document.getElementsByClassName("square");
    let possibleMoves = [9, 7, 18, 14];

    //Moves a piece, switch the turn and checks for possible kings
    function move(moveToId, color) {
      squares[moveToId].classList.add(`${color}`);
      square.classList.remove(`${color}`);
      makePieceKing(squares, moveToId);
      turn = !turn;
      checkForWin();
    }

    //If true red moves, if false grey moves
    if (turn) {
      //Reds turn
      movePiece(
        possibleMoves.map((v) => v * -1),
        "red",
        "grey"
      );
    } else {
      //Greys turn
      movePiece(possibleMoves, "grey", "red");
    }

    //Function which checks if a move is possible and if it is sets an eventlistener on that square
    function ordinaryMoves(
      squares,
      square,
      moves,
      moveLeft,
      moveRight,
      allyColor,
      enemyColor
    ) {
      if (
        squares[square.id - moves[0]].classList.contains(allyColor) === false &&
        squares[square.id - moves[0]].classList.contains(enemyColor) === false
      ) {
        squares[square.id - moves[0]].addEventListener("click", moveLeft, {
          once: true,
        });
      }

      if (
        squares[square.id - moves[1]].classList.contains(allyColor) === false &&
        squares[square.id - moves[1]].classList.contains(enemyColor) === false
      ) {
        squares[square.id - moves[1]].addEventListener("click", moveRight, {
          once: true,
        });
      }
    }

    //Function which checks if a jump move is possible and if it is sets an eventlistener on that square
    function jumpOverPieceMoves(
      squares,
      square,
      moves,
      jumpOverPiece1,
      jumpOverPiece2,
      allyColor,
      enemyColor
    ) {
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

    //Checks for a possible king and then creates it
    function makePieceKing(squares, moveToId) {
      console.log(square.id);
      if (
        squares[moveToId].classList.contains("red") &&
        moveToId > squares.length - 8
      ) {
        squares[moveToId].classList.add("king");
      }
      if (squares[moveToId].classList.contains("grey") && moveToId < 8) {
        squares[moveToId].classList.add("king");
      }
    }

    function kingMoves(square, squares, moveKing) {
      let possibleKingMoves = [9, 8, 7, 1, -1, -7, -8, -9];

      if (square.classList.contains("king")) {
        possibleKingMoves.forEach((possibleMove) => {
          squares[square.id - possibleMove].onclick = moveKing(possibleMove);
        });
      }
    }

    //The function for moving the pieces
    function movePiece(moves, allyColor, enemyColor, possibleKingMoves) {
      if (square.classList.contains(allyColor)) {
        function moveKing(possibleMove) {
          move(square.id - possibleMove, allyColor);
        }

        function moveLeft() {
          move(square.id - moves[0], allyColor);
          squares[square.id - moves[1]].removeEventListener("click", moveRight);
        }

        function moveRight() {
          move(square.id - moves[1], allyColor);
          squares[square.id - moves[0]].removeEventListener("click", moveLeft);
          //makePieceKing(squares, square);
        }

        function jumpOverPiece1() {
          move(square.id - moves[2], allyColor);
          squares[square.id - moves[0]].classList.remove(enemyColor);
          enemyColor === "red" ? redPiecesLeft-- : greyPiecesLeft--;
          //makePieceKing(squares, square);
          squares[square.id - moves[3]].removeEventListener(
            "click",
            jumpOverPiece2
          );
        }

        function jumpOverPiece2() {
          move(square.id - moves[3], allyColor);
          squares[square.id - moves[1]].classList.remove(enemyColor);
          enemyColor === "red" ? redPiecesLeft-- : greyPiecesLeft--;
          //makePieceKing(squares, square);
          squares[square.id - moves[2]].removeEventListener(
            "click",
            jumpOverPiece1
          );
        }

        kingMoves(square, squares, possibleKingMoves, moveKing);

        ordinaryMoves(
          squares,
          square,
          moves,
          moveLeft,
          moveRight,
          allyColor,
          enemyColor
        );

        jumpOverPieceMoves(
          squares,
          square,
          moves,
          jumpOverPiece1,
          jumpOverPiece2,
          allyColor,
          enemyColor
        );
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
})();
