"use strict";

class Pawn {
    constructor(img, xCord, yCord) {
        this.img = img;
        this.xCord = xCord;
        this.yCord = yCord;
    }
}

let squares = document.getElementsByClassName("square");

function generateBoard() {
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            if ((i + j) % 2 === 0){
                squares[].innerHTML = "x";
            }
                
        }
    }
}

generateBoard();


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