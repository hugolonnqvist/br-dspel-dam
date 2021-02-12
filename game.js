"use strict";


function createBoard() {
    let board = document.querySelector(".board");
    let counter = 0;
    let flag = false;

    for (let i = 0; i < 100; i++) {
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
        board.append(square[i]);
        if (counter === 10) {
            flag = !flag;
            counter = 0;
        }
    }
}


let block = document.getElementsByClassName("square");

function generatePieces() {
    let blackSquare = document.getElementsByClassName("square black");

    for (let i = 0; i < 50; i++) {
        if (i >= 0 && i< 20) {
            blackSquare[i].style.color = "white";
            blackSquare[i].innerHTML = "O";
            console.log(blackSquare[i]);
        }
        else if (i >= 30 && i <= 50) {
            blackSquare[i].style.color = "white";
            blackSquare[i].innerHTML = "O"
        }
    }
}

createBoard();
generatePieces();

/*
for (let i = 0; i < squares.length; i++) {
    if (i % 2 === 0) {
        if ((i >= 10 && i < 20) || ( i>= 30 && i < 40) || (i >= 70 && i < 80) || (i >= 90 && i < 100)) {
            squares[i].innerHTML = "o";
        }
    }
    else if (i % 2 !== 0) {
        if ((i < 10) || (i >= 20 && i < 30) || (i >= 80 && i < 90) || i >= 60 && i < 70) {
            squares[i].innerHTML = "o";

        }
    }
}*/