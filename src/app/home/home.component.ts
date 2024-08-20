import { Component } from '@angular/core';
import { GameCardComponent } from '../game-card/game-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ticTacToe = "Tic Tac Toe";
  ticTacToeThumbnail = "assets/TicTacToe.jpeg";
  ticTacToePath = "/tic-tac-toe";
  chess = "Chess";
  chessThumbnail = "assets/Chess.jpeg";
  chessPath = "/chess";
}
