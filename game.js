"use strict";

function coordinateToIndex(x, y) {
    return y * boardWidth + x;
}



function createBoard() {
    let board = document.querySelector(".board");
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
        board.append(square[i]);
        if (counter === 8) {
            flag = !flag;
            counter = 0;
        }
    }
}


function generatePieces() {
    let blackSquare = document.getElementsByClassName("square black");

    for (let i = 0; i < 12; i++) {
        blackSquare[i].innerHTML = `<img class="pawn" src="./imges/readpawn.png">`;
        blackSquare[i + 20].innerHTML = `<img class="pawn" src="./imges/readpawn.png">`;
    }

    let piece = document.getElementsByClassName("pawn");
   
    for (let i = 0; i < piece.length; i++) {
        piece[i].addEventListener("click",() => {
        //Highlighta rutorna som pjäsen kan flytta till
        })
    }
}

function movePieces() {
    
}

createBoard();
generatePieces();
movePieces();


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