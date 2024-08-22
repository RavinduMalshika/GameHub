import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GameHub';

  constructor() {
  }

  themeChanged(event: any) {
    switch (event.target.value) {
      case "0":
        document.documentElement.setAttribute('data-theme', "light");
        document.getElementById("themeSelector")!.classList.remove("theme-selector-dark");
        document.getElementById("themeSelector")!.classList.add("theme-selector-light");
        break;
      case "1":
        document.documentElement.setAttribute('data-theme', "dark");
        document.getElementById("themeSelector")!.classList.remove("theme-selector-light");
        document.getElementById("themeSelector")!.classList.add("theme-selector-dark");
        console.log(document.getElementById("themeSelector"));
        break;
      default:
        console.log("invalid");
        break;
    }
  }

  openExternalLink(url: string) {
    window.open(url, '_blank');
  }
}
