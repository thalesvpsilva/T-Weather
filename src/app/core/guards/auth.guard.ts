import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLogged = authService.checkLogin();
  return isLogged || router.createUrlTree(['/login']);
};

export const alreadyLoggedGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isLogged = authService.checkLogin();
  return !isLogged || router.createUrlTree(['/weather']);
};
