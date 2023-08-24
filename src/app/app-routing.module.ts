import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { alreadyLoggedGuard, authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './public/not-found/not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    canMatch: [alreadyLoggedGuard]
  },
  {
    path: 'weather',
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule),
    canMatch: [authGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
