"use strict";

//function coordinateToIndex(x, y) {
//    let boardWidth = 8;
//   return y * boardWidth + x - 1;
//}
//

let board = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];


function generateBoard() {
    let boardDiv = document.querySelector(".board");
    let counter = 0;
    let flag = false;

    for (let i = 0; i < 64; i++) {
        let square = [];
        square[i] = document.createElement("div");

        if (flag) {
            square[i].classList.add("square");
            square[i].classList.add("black");
            counter++;
            flag = !flag;

        } else {
            square[i].classList.add("square");
            square[i].classList.add("white");
            counter++;
            flag = !flag;
        }
        boardDiv.append(square[i]);
        if (counter === 8) {
            flag = !flag;
            counter = 0;
        }
    }
}


function genPieces() {
    let square = document.getElementsByClassName("square");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] == 2) {
                square[i * 8 + j].innerHTML = `<img class="pawn" src="./imges/readpawn.png">`;
            }
            else if (board[i][j] == 1) {
                square[i * 8 + j].innerHTML = `<img class="pawn" src="./imges/whitepawn.png">`;
            }
        }
    }
}


generateBoard();
genPieces();
