"use strict";
import winner from "./winner.js";
import boardToArray from "./boardToArray.js";
import createBoard from "./createBoard.js";
// import logIn from "../Auth/log-in.js";
import token from "../store.js";

let ticTacToe = () => {
  //Array where board will be store to determine the winner
  var boardStorage = [];
  //Variable to switch everytime the user clicks (O= True, X=False)
  let boolSwitcher = false;
  //Creating the table
  let clickCounter = 0;


  //Click event to each cell in the table
  let listenerToEachTd = () => {
    document.querySelectorAll("#tictactoe td").forEach(e =>
      e.addEventListener("click", function () {
        this.innerText === "" ? //Boolean Switcher, TD text (O= True, X=False)
          ((boolSwitcher = !boolSwitcher),
            boolSwitcher === true ?
            (this.innerText = "X") :
            (this.innerText = "O"),
            clickCounter++,
            //Every time the user clicks, the board parses into a multidimensional array
            boardToArray(boardStorage),
            //Alerting the winner
            (winner(boardStorage))
          ) :
          "";
        console.log(clickCounter);
        //Clearing the board after user clicks, and the winner is determined
        boardStorage = [];
      })
    );
  };
  let winner = (arr) => {
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
        (boolSwitcher = false);
        setTimeout(() => {
          document
            .querySelectorAll("#tictactoe td")
            .forEach(e => (e.innerHTML = ""));
        }, 1000);
        alert(`The winner is : ${arr[index][0]} | Row ${index + 1}`)
      }
      "";
    }
    //Vertical Checking
    if (hztlWinner === false) {
      let vtclChecker = [];
      for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr.length; x++) {
          vtclChecker.push(arr[x][y]);
          vtclChecker.length === arr.length ?
            ((vtclWinner = vtclChecker.every(
                v => v == vtclChecker[0] && vtclChecker[0] !== " "
              )),
              vtclWinner ?
              (clickCounter = 0, alert(`The winner is : ${vtclChecker[0]} | Column ${y + 1}`),
                (boolSwitcher = false),
                setTimeout(() => {
                  document
                    .querySelectorAll("#tictactoe td")
                    .forEach(e => (e.innerHTML = ""));
                }, 1000)) :
              "") :
            "";
        }
        vtclChecker = [];
      }
    }
    //Diagonal Checking
    if (vtclWinner === false) {
      let dgnlChecker = [];
      for (let index = 0; index < arr.length; index++) {
        dgnlChecker.push(arr[index][index]);
        dgnlChecker.length === arr.length ?
          ((dgnlWinner = dgnlChecker.every(
              v => v == dgnlChecker[0] && dgnlChecker[0] !== " "
            )),
            dgnlWinner ?
            (clickCounter = 0, alert(`The winner is : ${dgnlChecker[0]} | Diagonal ${1}`),
              (boolSwitcher = false),
              setTimeout(() => {
                document
                  .querySelectorAll("#tictactoe td")
                  .forEach(e => (e.innerHTML = ""));
              }, 1000)) :
            "") :
          "";
      }
    }
    //Second diagonal Checking
    if (dgnlWinner === false) {
      let secondDgnlChecker = [];
      let y = arr.length - 1;
      for (let x = 0; x < arr.length; ++x) {
        secondDgnlChecker.push(arr[x][y]);
        --y;
        secondDgnlChecker.length === arr.length ?
          ((y = arr.length - 1),
            (secondDgnlWinner = secondDgnlChecker.every(
              v => v == secondDgnlChecker[0] && secondDgnlChecker[0] !== " "
            )),
            secondDgnlWinner ?
            (clickCounter = 0, alert(`The winner is : ${secondDgnlChecker[0]} | Diagonal ${2}`),
              (boolSwitcher = false),
              setTimeout(() => {
                document
                  .querySelectorAll("#tictactoe td")
                  .forEach(e => (e.innerHTML = ""));
              }, 1000)) :
            "") :
          "";
      }
    }
    if (clickCounter == (dimension * dimension) && secondDgnlWinner == false && dgnlWinner == false && vtclWinner == false && dgnlWinner == false) {
      alert("raw");
      clickCounter = 0;
      setTimeout(() => {
        document
          .querySelectorAll("#tictactoe td")
          .forEach(e => (e.innerHTML = ""));
      }, 1000);
    }
  };

  //Showing the board based on the user input
  let showBoard = () => {
    document.getElementById("showBoard").addEventListener("click", function () {
      clickCounter = 0;
      boolSwitcher = false;
      let dimension = document.getElementById("dimension").value;
      if (typeof token.user != 'undefined') {
        createBoard(Number(dimension), listenerToEachTd);
      } else {
        console.log(token);
        console.log("not yet");
      }
    });
  };
  showBoard();
};
export default ticTacToe;
