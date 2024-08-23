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
    }

    removeEventListenersToCells();
    document.getElementById("status")!.innerHTML = "Click Start to Play";
    const startImg = document.getElementById("startImg") as HTMLImageElement;
    startImg.src = "assets/play.svg";
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
      player1Name = event.target.value;
    } else {
      document.getElementById("player1Name")!.innerHTML = "Player 1";
      player1Name = "Player 1";
    }
  }

  player2NameChanged = (event: any) => {
    if (event.target.value != "") {
      document.getElementById("player2Name")!.innerHTML = event.target.value;
      player2Name = event.target.value;
    } else {
      document.getElementById("player2Name")!.innerHTML = "Player 2";
      player2Name = "Player 2";
    }
  }

  startClicked = () => {
    if (start == false) {
      start = true;
      this.addEventListenersToCells();
      if (mode == "singlePlayer") {
        document.getElementById("status")!.innerHTML = switchOrder ? player2Name + "'s turn" : player1Name + "'s turn";
        if (switchOrder) {
          const randomIndex = Math.floor(Math.random() * availableInputs.length);
          const cellChosen = availableInputs[randomIndex];
          setTimeout(() => {
            document.getElementById(cellChosen.toString())!.innerHTML = "X";
            availableInputs.splice(randomIndex, 1);
            document.getElementById("status")!.innerHTML = player1Name + "'s turn";
          }, 500)
        }
      } else {
        document.getElementById("status")!.innerHTML = switchOrder ? player1Name + "'s turn" : player1Name + "'s turn";
      }
      const startImg = document.getElementById("startImg") as HTMLImageElement;
      startImg.src = "assets/reset.svg";
    } else {
      this.reset();
    }
  }

  playerModeSelected = () => {
    if (mode == "singlePlayer") {
      mode = "twoPlayer";
      this.reset();
      this.isVisible = true;
      document.getElementById("player2Name")!.innerHTML = "Player 2";
      const btnImg = document.getElementById("playerModeImg") as HTMLImageElement;
      btnImg.src = "assets/two-player.svg";
    } else {
      mode = "singlePlayer";
      this.reset();
      this.isVisible = false;
      document.getElementById("player2Name")!.innerHTML = "PC";
      const btnImg = document.getElementById("playerModeImg") as HTMLImageElement;
      btnImg.src = "assets/single-player.svg";
      player2Name = "PC";
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
      if (mode == "twoPlayer") {
        player = 2;
      }
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
var player1Name = "Player 1";
var player2Name = "PC";
var start = false;
var mode = "singlePlayer";
var availableInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

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
            setTimeout(() => {
              pcMove(cell.id);
            }, 500);
          } else {
            player = 2;
            document.getElementById("status")!.innerHTML = player2Name + "'s turn";
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
          document.getElementById("status")!.innerHTML = player1Name + "'s turn";
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
  const index = availableInputs.indexOf(cellId);
  availableInputs.splice(index, 1);

  const randomIndex = Math.floor(Math.random() * availableInputs.length);
  const cellChosen = availableInputs[randomIndex];
  document.getElementById(cellChosen.toString())!.innerHTML = player2Symbol;
  availableInputs.splice(randomIndex, 1);

  if (checkMove()) {
    document.getElementById("status")!.innerHTML = player1Name + "'s turn";
  }
}

function checkMove() {
  let cells = document.getElementsByClassName("cell");

  for (let i = 1; i < 10; i++) {
    switch (i) {
      case 1:
        if (cells[0].innerHTML + cells[1].innerHTML + cells[2].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[0].innerHTML + cells[1].innerHTML + cells[2].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 2:
        if (cells[3].innerHTML + cells[4].innerHTML + cells[5].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[3].innerHTML + cells[4].innerHTML + cells[5].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 3:
        if (cells[6].innerHTML + cells[7].innerHTML + cells[8].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[6].innerHTML + cells[7].innerHTML + cells[8].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 4:
        if (cells[0].innerHTML + cells[3].innerHTML + cells[6].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[0].innerHTML + cells[3].innerHTML + cells[6].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 5:
        if (cells[1].innerHTML + cells[4].innerHTML + cells[7].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[1].innerHTML + cells[4].innerHTML + cells[7].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 6:
        if (cells[2].innerHTML + cells[5].innerHTML + cells[8].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[2].innerHTML + cells[5].innerHTML + cells[8].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 7:
        if (cells[0].innerHTML + cells[4].innerHTML + cells[8].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[0].innerHTML + cells[4].innerHTML + cells[8].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
          return false;
        }
        break;
      case 8:
        if (cells[2].innerHTML + cells[4].innerHTML + cells[6].innerHTML == "XXX") {
          document.getElementById("status")!.innerHTML = switchOrder ? player2Name + " wins." : player1Name + " wins.";
          return false;
        } else if (cells[2].innerHTML + cells[4].innerHTML + cells[6].innerHTML == "OOO") {
          document.getElementById("status")!.innerHTML = switchOrder ? player1Name + " wins." : player2Name + " wins.";
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



