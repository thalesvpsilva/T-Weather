import { Routes } from '@angular/router';

import { loggedInGuard, loggedOutGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './public/not-found/not-found.component';

export const APP_ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    {
      path: 'login',
      loadComponent: () => import('./public/login/login.component').then(c => c.LoginComponent),
      canMatch: [loggedOutGuard]
    },
    {
      path: 'weather',
      loadChildren: () => import('./private/private.routes').then(r => r.PRIVATE_ROUTES),
      canMatch: [loggedInGuard]
    },
    {
      path: '**',
      // loadComponent: () => import('./public/not-found/not-found.component').then(c => c.NotFoundComponent),
      component: NotFoundComponent
    }
    

];