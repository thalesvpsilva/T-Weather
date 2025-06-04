import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, delay, filter, map, of, take, tap } from 'rxjs';

import { IAuthPayload } from 'src/app/shared/contracts/auth/IAuthPayload';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private _router: Router,
    private _sessionStorageService: SessionStorageService
  ) { }

  public login(payload: IAuthPayload): Observable<boolean> {
    return of(payload)
      .pipe(
        take(1),
        delay(1000),
        map(login => login.user == 'admin' && login.password == '123456'),
        tap((success) => {
          if (success) {
            this._sessionStorageService.setToken('t-weather-token');
            this.isLogged$.next(true);
          }
        })
      );
  }
  
  public logout(): void {
    this._sessionStorageService.clear();
    this.isLogged$.next(false);
    this._router.navigateByUrl('/login');
  }
  
  public checkLogin(): boolean {
    const token = !!this._sessionStorageService.getToken();
    this.isLogged$.next(token);
    return token;
  }
}
