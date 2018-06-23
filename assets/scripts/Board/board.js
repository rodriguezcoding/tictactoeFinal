"use strict";

import boardToArray from "./boardToArray.js";
import createBoard from "./createBoard.js";
import config from "../store.js";
import gameState from "./gameState.js";

var boardStorage = []; //Array where board will be store to determine the winner
let boolSwitcher = false; //Variable to switch everytime the user clicks (O= True, X=False)
let gameOver = false;
let clickCounter = 0; //Counter to determine if it is a raw game
let playerX = "X";
let playerO = "O";

let ticTacToe = () => {
  let listenerToEachTd = () => {
    $("#tictactoe td").on("click", event => {
      if (event.target.innerText === "") {
        //Boolean Switcher, TD text (O= True, X=False)
        boolSwitcher = !boolSwitcher;
        boolSwitcher === true ?
          (console.log(`Player X turn`), (event.target.innerText = playerX)) :
          (console.log(`Player O turn`), (event.target.innerText = playerO)),
          clickCounter++;
        boardToArray(boardStorage); //Every time the user clicks, the board parses into a multidimensional array
        winner(boardStorage);
        gameState(boardStorage, gameOver);
      }
      boardStorage = []; //Clearing the board after user clicks, and the winner is determined
    });
  };
  //Showing the board based on the user input
  let showBoard = () => {
    $("#showBoard").on("click", () => {
      clickCounter = 0;
      boolSwitcher = false;
      let dimension = document.getElementById("dimension").value;
      createBoard(Number(dimension), listenerToEachTd);
    });
  };
  showBoard();
};




let winner = arr => {
  var hztlWinner = true;
  let dgnlWinner = true;
  let secondDgnlWinner = true;
  let vtclWinner = true;
  let dimension = Number(document.getElementById("dimension").value);
  //Horizontal Checking
  for (var index = 0; index < arr.length; index++) {
    hztlWinner = arr[index].every(
      v => v == arr[index][0] && arr[index][0] != " "
    );
    if (hztlWinner) {
      clickCounter = 0;
      boolSwitcher = false;
      gameOver = true;
      setTimeout(() => {
        document
          .querySelectorAll("#tictactoe td")
          .forEach(e => (e.innerHTML = ""));
        gameOver = false;
      }, 1000);
      alert(`The winner is : Player ${arr[index][0]} | Row ${index + 1}`);
    }
    ("");
  }
  //Vertical Checking
  if (hztlWinner === false) {
    let vtclChecker = [];
    for (let y = 0; y < arr.length; y++) {
      for (let x = 0; x < arr.length; x++) {
        vtclChecker.push(arr[x][y]);
        if (vtclChecker.length === arr.length) {
          (vtclWinner = vtclChecker.every(
            v => v == vtclChecker[0] && vtclChecker[0] !== " "
          ));
          if (vtclWinner) {
            clickCounter = 0;
            alert(`The winner is : Player ${vtclChecker[0]} | Column ${y + 1}`);
            boolSwitcher = false;
            gameOver = true;
            // console.log(gameOver);
            setTimeout(() => {
              document
                .querySelectorAll("#tictactoe td")
                .forEach(e => (e.innerHTML = ""));
              gameOver = false;
            }, 1000);
          }
        }
      }
      vtclChecker = [];
    }
  }
  //Diagonal Checking
  if (vtclWinner === false) {
    let dgnlChecker = [];
    for (let index = 0; index < arr.length; index++) {
      dgnlChecker.push(arr[index][index]);
      if (dgnlChecker.length === arr.length) {
        dgnlWinner = dgnlChecker.every(v => v == dgnlChecker[0] && dgnlChecker[0] !== " ");
        if (dgnlWinner) {
          clickCounter = 0;
          alert(`The winner is : Player ${dgnlChecker[0]} | Diagonal ${1}`);
          boolSwitcher = false;
          gameOver = true;
          setTimeout(() => {
            document
              .querySelectorAll("#tictactoe td")
              .forEach(e => (e.innerHTML = ""));
            gameOver = false;
          }, 1000);
        }
      }
    }
  }
  //Second diagonal Checking
  if (dgnlWinner === false) {
    let secondDgnlChecker = [];
    let y = arr.length - 1;
    for (let x = 0; x < arr.length; ++x) {
      secondDgnlChecker.push(arr[x][y]);
      --y;
      if (secondDgnlChecker.length === arr.length) {
        y = arr.length - 1;
        (secondDgnlWinner = secondDgnlChecker.every(
          v => v == secondDgnlChecker[0] && secondDgnlChecker[0] !== " "
        ));
        if (secondDgnlWinner) {
          clickCounter = 0;
          alert(
            `The winner is : Player ${secondDgnlChecker[0]} | Diagonal ${2}`
          );
          boolSwitcher = false;
          gameOver = true;
          setTimeout(() => {
            document
              .querySelectorAll("#tictactoe td")
              .forEach(e => (e.innerHTML = ""));
            gameOver = false;
          }, 1000);
        }
      }
    }
  }
  if (
    clickCounter == dimension * dimension &&
    secondDgnlWinner == false &&
    dgnlWinner == false &&
    vtclWinner == false &&
    dgnlWinner == false
  ) {
    gameOver = false;
    alert("raw");
    clickCounter = 0;
    setTimeout(() => {
      document
        .querySelectorAll("#tictactoe td")
        .forEach(e => (e.innerHTML = ""));
      gameOver = false;
    }, 1000);
  }
};

export default ticTacToe;
