import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Connections} from './pages/connections/connections';
import {Error} from './pages/error/error';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'connections',
    component: Connections
  },
  {
    path: '**',
    component: Error
  }
];
