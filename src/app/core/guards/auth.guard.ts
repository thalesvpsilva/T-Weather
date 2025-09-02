import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const loggedInGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loggedIn = authService.isLoggedIn();
  return loggedIn || router.createUrlTree(['/login']);
};

export const loggedOutGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const loggedIn = authService.isLoggedIn();
  return !loggedIn || router.createUrlTree(['/weather']);
};
