import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule],
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
    ])
  ]
})

export class WelcomeComponent {
  homePath = "/home";
  isSignIn = true;

  signUpToggle() {
    this.isSignIn = false;
  }

  signInToggle() {
    this.isSignIn = true;
  }
}
