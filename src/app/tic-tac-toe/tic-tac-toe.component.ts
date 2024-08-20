import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent {
  constructor() {

  }

  reset = () => {
    start = false;
    availableInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = "";
      player = 1;
      document.getElementById("status")!.innerHTML = "Click Start to Play";
    }

    removeEventListenersToCells();
  }

  addEventListenersToCells = () => {
    const cells = document.getElementsByClassName("cell");

    for (let i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", cellClick);
    }
  }

  player1NameChanged = (event: any) => {
    if (event.target.value != "") {
      document.getElementById("player1Name")!.innerHTML = event.target.value;
    } else {
      console.log("cvc");
      document.getElementById("player1Name")!.innerHTML = "Player 1";
    }
  }

  player2NameChanged = (event: any) => {
    if (event.target.value != "") {
      document.getElementById("player2Name")!.innerHTML = event.target.value;
    } else {
      console.log("cvc");
      document.getElementById("player2Name")!.innerHTML = "Player 2";
    }
  }

  startClicked = () => {
    if (start == false) {
      start = true;
      this.addEventListenersToCells();
      document.getElementById("status")!.innerHTML = switchOrder ? "Player 2's turn" : "Player 1's turn";
      const startImg = document.getElementById("startImg") as HTMLImageElement;
      startImg.src = "assets/reset.svg";
    } else {
      this.reset();
      const startImg = document.getElementById("startImg") as HTMLImageElement;
      startImg.src = "assets/play.svg";
    }
  }

  playerModeSelected = () => {
    if (mode == "singlePlayer") {
      mode = "twoPlayer";
      this.reset();
      this.isVisible = true;
      document.getElementById("player2Name")!.innerHTML = "Player 2";
      //document.getElementById("singlePlayerBtn")!.innerHTML = `<img class="btn-img" src="assets/two-player.svg"  width="80px" alt="Single Player"/>`;
      const btnImg = document.getElementById("playerModeImg") as HTMLImageElement;
      btnImg.src = "assets/two-player.svg";
    } else {
      mode = "singlePlayer";
      this.reset();
      this.isVisible = false;
      document.getElementById("player2Name")!.innerHTML = "PC";
      //document.getElementById("singlePlayerBtn")!.innerHTML = `<img class="btn-img" src="assets/single-player.svg"  width="100px" alt="Sinle Player"/>`;
      const btnImg = document.getElementById("playerModeImg") as HTMLImageElement;
      btnImg.src = "assets/single-player.svg";
    }

  }

  switchClicked = () => {
    this.reset();
    if (switchOrder) {
      switchOrder = false;
      player1Symbol = "X";
      player2Symbol = "O";
      document.getElementById("player1Symbol")!.innerHTML = "X";
      document.getElementById("player2Symbol")!.innerHTML = "O";
      player = 1;
    } else {
      switchOrder = true;
      player1Symbol = "O";
      player2Symbol = "X";
      document.getElementById("player1Symbol")!.innerHTML = "O";
      document.getElementById("player2Symbol")!.innerHTML = "X";
      player = 2;
    }

    console.log(switchOrder);
    console.log("Player 1: " + player1Symbol);
    console.log("Player 2: " + player2Symbol);
  }

  isVisible = false;
}

var player = 1;
var switchOrder = false;
var player1Symbol = "X";
var player2Symbol = "O";
var start = false;
var mode = "singlePlayer";
var availableInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
var player1Score = 0;
var player2Score = 0;

function removeEventListenersToCells() {
  const cells = document.getElementsByClassName("cell");

  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener("click", cellClick);
  }
}

function cellClick(event: any) {
  console.log(start);
  let cell = event.target;
  switch (player) {
    case 1: {
      if (cell.innerHTML == "") {
        cell.innerHTML = player1Symbol;
        if (checkMove()) {
          if (mode == "singlePlayer") {
            document.getElementById("status")!.innerHTML = "PC's turn";
            console.log(cell.id);
            pcMove(cell.id);
            if (checkMove()) {
              document.getElementById("status")!.innerHTML = "Player 1's turn";
            }
          } else {
            player = 2;
            document.getElementById("status")!.innerHTML = "Player 2's turn";
          }
        } else {
          removeEventListenersToCells();
        }
      }
      break;
    }
    case 2: {
      if (cell.innerHTML == "") {
        cell.innerHTML = player2Symbol;
        if (checkMove()) {
          player = 1;
          document.getElementById("status")!.innerHTML = "Player 1's turn";
        } else {
          removeEventListenersToCells();
        }
      }
      break;
    }
    default: {
      console.log("invalid");
      break;
    }
  }
}

function pcMove(cellId: string) {
  console.log("Cell by user: " + cellId);
  const index = availableInputs.indexOf(cellId);
  console.log("Index of user cell: " + index);
  availableInputs.splice(index, 1);
  console.log(availableInputs);

  const randomIndex = Math.floor(Math.random() * availableInputs.length);
  const cellChosen = availableInputs[randomIndex];
  console.log("Cell chosen by PC: " + cellChosen);
  document.getElementById(cellChosen.toString())!.innerHTML = "O";
  availableInputs.splice(randomIndex, 1);
  console.log(availableInputs);
}

function checkMove() {
  let cells = document.getElementsByClassName("cell");

  for (let i = 1; i < 10; i++) {
    switch (i) {
      case 1:
        if (cells[0].innerHTML + cells[1].innerHTML + cells[2].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[0].innerHTML + cells[1].innerHTML + cells[2].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 2:
        if (cells[3].innerHTML + cells[4].innerHTML + cells[5].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[3].innerHTML + cells[4].innerHTML + cells[5].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 3:
        if (cells[6].innerHTML + cells[7].innerHTML + cells[8].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[6].innerHTML + cells[7].innerHTML + cells[8].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 4:
        if (cells[0].innerHTML + cells[3].innerHTML + cells[6].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[0].innerHTML + cells[3].innerHTML + cells[6].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 5:
        if (cells[1].innerHTML + cells[4].innerHTML + cells[7].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[1].innerHTML + cells[4].innerHTML + cells[7].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 6:
        if (cells[2].innerHTML + cells[5].innerHTML + cells[8].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[2].innerHTML + cells[5].innerHTML + cells[8].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 7:
        if (cells[0].innerHTML + cells[4].innerHTML + cells[8].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[0].innerHTML + cells[4].innerHTML + cells[8].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 8:
        if (cells[2].innerHTML + cells[4].innerHTML + cells[6].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 2 wins." : "Player 1 wins.";
          return false;
        } else if (cells[2].innerHTML + cells[4].innerHTML + cells[6].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? "Player 1 wins." : "Player 2 wins.";
          return false;
        }
        break;
      case 9:
        let freeCells = 0;
        for (let j = 0; j < 9; j++) {
          if (cells[j].innerHTML == "") {
            freeCells++;
          }
        }
        if (freeCells == 0) {
          document.getElementById("status")!.innerHTML = "Draw";
          return false;
        }
        break;
      default:
        break;
    }
  }
  return true;
}



