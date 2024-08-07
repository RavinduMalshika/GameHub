import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.css'
})
export class GameCardComponent {
  @Input() 
  title!: string;

  @Input()
  thumbnail!: string;

  @Input()
  path!: string;
}
