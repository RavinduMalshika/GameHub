import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  animations: [
    trigger('togglePanelX', [
      state('signIn', style({
        transform: 'translateX(50%)'
      })),
      state('signUp', style({
        transform: 'translateX(-50%)'
      })),
      transition('signIn <=> signUp', [
        animate('500ms 100ms ease-out',)
      ])
    ]),
    trigger('togglePanelY', [
      state('signIn', style({
        transform: 'translateY(50%)'
      })),
      state('signUp', style({
        transform: 'translateY(-50%)'
      })),
      transition('signIn <=> signUp', [
        animate('500ms 100ms ease-out',)
      ])
    ])
  ]
})

export class WelcomeComponent {
  homePath = "/home";
  isSignIn = true;
  isHorizontal = true;
  isMobile = false;
  screenSize: number;

  constructor() {
    this.screenSize = window.innerWidth;
    this.getScreenSize();
    window.addEventListener('resize', () => {
      this.getScreenSize();
    })
  }

  signUpToggle() {
    this.isSignIn = false;
  }

  signInToggle() {
    this.isSignIn = true;
  }

  getScreenSize() {
    this.screenSize = window.innerWidth;
    if(this.screenSize > 425) {
      this.isHorizontal = true;
      this.isMobile = false;
    } else {
      this.isHorizontal = false;
      this.isMobile = true;
    }
  }
}

