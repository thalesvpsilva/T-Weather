import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, delay, map, of, take, tap } from 'rxjs';

import { IAuthPayload } from '../../shared/contracts/auth/IAuthPayload';
import { SessionStorageService } from '../../shared/services/session-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly _router = inject(Router);
  private readonly _sessionStorageService = inject(SessionStorageService);

  constructor() { }

  public login(payload: IAuthPayload): Observable<boolean> {
    return of(payload)
      .pipe(
        take(1),
        delay(1000),
        map(login => login.user == 'admin' && login.password == '123456'),
        tap((success) => {
          if (success) {
            this._sessionStorageService.setToken('t-weather-token');
            this.isLoggedIn$.next(true);
          }
        })
      );
  }
  
  public logout(): void {
    this._sessionStorageService.clear();
    this.isLoggedIn$.next(false);
    this._router.navigateByUrl('/login');
  }
  
  public isLoggedIn(): boolean {
    const isLogged = !!this._sessionStorageService.getToken();
    this.isLoggedIn$.next(isLogged);
    return isLogged;
  }
}
