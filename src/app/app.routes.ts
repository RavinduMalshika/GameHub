import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { ChessComponent } from './chess/chess.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        title: 'Welcome to Game Hub'
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'tic-tac-toe',
        component: TicTacToeComponent,
        title: 'Tic Tac Toe'
    },
    {
        path: 'chess',
        component: ChessComponent,
        title: 'Chess'
    }
];

export default routes;
