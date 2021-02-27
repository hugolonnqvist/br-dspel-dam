"use strict";

(() => {
  let turn = true;

  function onClick(e) {
    const active = document.querySelector(".active");
    const color = turn ? "red" : "grey";
    if (e.target.classList.contains(color)) {
      document
        .querySelectorAll(".active,.possibleMove,.possibleJumpMove")
        .forEach((c) => {
          c.classList.remove("active", "possibleMove", "possibleJumpMove");
        });
      e.target.classList.add("active");
      showMoves(e.target, color);
      illegalMoves();
    }

    if (active !== null) {
      movePieces(e.target);
    }
  }

  function generateBoard(board) {
    function createSquare(idNumber) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.id = idNumber;
      square.addEventListener("click", onClick);
      return square;
    }

    function populateBoard(elements) {
      const boardDiv = document.querySelector(".board");
      elements.forEach((row) => row.forEach((cell) => boardDiv.append(cell)));
    }

    let idNumber = 0;
    const elements = board.map((row) => {
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

  function illegalMoves(illegalSquaresList) {
    let squares = document.getElementsByClassName("square");
    let illegalSquares = [];
    let flag = true;

    for (let i = 0; i < squares.length; i++) {
      if (flag) {
        illegalSquares.push(squares[i]);
      }
      flag = !flag;

      if ((i + 1) % 8 === 0) {
        flag = !flag;
      }
    }

    return illegalSquares.id;
  }

  function showMoves(activeSquare, color) {
    const squares = document.getElementsByClassName("square");
    const enemyColor = color === "red" ? "grey" : "red";
    let possibleMoves;
    if (activeSquare.classList.contains("king")) {
      possibleMoves = [9, 7, -9, -7];
    } else {
      possibleMoves = color === "red" ? [-9, -7] : [9, 7];
    }

    possibleMoves.forEach((move) => {
      if (activeSquare.id - move > 0 && activeSquare.id - move < 64) {
        if (
          !squares[activeSquare.id - move].classList.contains("red") &&
          !squares[activeSquare.id - move].classList.contains("grey")
        ) {
          squares[activeSquare.id - move].classList.add("possibleMove");
        }
      }
      if (activeSquare.id - move * 2 > 0 && activeSquare.id - move * 2 < 64) {
        if (
          squares[activeSquare.id - move].classList.contains(enemyColor) &&
          !squares[activeSquare.id - move * 2].classList.contains("red") &&
          !squares[activeSquare.id - move * 2].classList.contains("grey")
        ) {
          squares[activeSquare.id - move * 2].classList.add("possibleJumpMove");
        }
      }
    });
  }

  function checkForKing(square, color) {
    if (square.id > 55 && color === "red") {
      square.classList.add("king");
    } else if (square.id < 8 && color === "grey") {
      square.classList.add("king");
    }
  }

  function movePieces(square) {
    const allSquares = document.getElementsByClassName("square");
    const activeSquare = document.querySelector(".active");
    const color = activeSquare.classList.contains("red") ? "red" : "grey";
    const enemyColor = color === "red" ? "grey" : "red";
    const possibleMoves = document.querySelectorAll(".possibleMove");
    const possibleJumpMove = document.querySelectorAll(".possibleJumpMove");

    function move() {
      if (activeSquare.classList.contains("king")) {
        square.classList.add("king");
        activeSquare.classList.remove("king");
      }
      square.classList.add(color);
      activeSquare.classList.remove("active");
      activeSquare.classList.remove(color);
      possibleMoves.forEach((c) => c.classList.remove("possibleMove"));
      possibleJumpMove.forEach((c) => c.classList.remove("possibleJumpMove"));
      checkForKing(square, color);
      checkForWin();
      turn = !turn;
    }

    function takeEnemyPiece() {
      allSquares[
        activeSquare.id - (activeSquare.id - square.id) / 2
      ].classList.remove(enemyColor);
    }

    if (square.classList.contains("possibleMove")) {
      move();
    }
    if (square.classList.contains("possibleJumpMove")) {
      move();
      takeEnemyPiece();
      if (
        allSquares[
          activeSquare.id - (activeSquare.id - square.id) / 2
        ].classList.contains("king")
      ) {
        allSquares[
          activeSquare.id - (activeSquare.id - square.id) / 2
        ].classList.remove("king");
      }
    }
  }

  function checkForWin() {
    if (document.querySelectorAll(".red").length === 0) {
      document.querySelector();
    } else if (document.querySelectorAll(".grey").length === 0) {
    }
  }

  generateBoard(board);
  generatePieces();
})();
