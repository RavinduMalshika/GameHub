import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
        title: 'Welcome to Game Hub'
    }
];

export default routes;
