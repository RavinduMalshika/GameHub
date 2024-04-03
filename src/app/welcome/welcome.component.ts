import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  animations: [
    trigger('togglePanel', [
      state('signIn', style({
        transform: 'translateX(50%)'
      })),
      state('signUp', style({
        transform: 'translateX(-50%)'
      })),
      transition('signIn <=> signUp', [
        animate('500ms 100ms ease-out', )
      ])
    ]),
  ]
})

export class WelcomeComponent {
  isSignIn = true;

  signUpToggle() {
    this.isSignIn = false;
  }

  signInToggle() {
    this.isSignIn = true;
  }
}
