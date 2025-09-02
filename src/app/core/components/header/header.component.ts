import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [RouterLink, MatIconButton, MatIcon, AsyncPipe]
})
export class HeaderComponent implements OnInit {

  public loggedIn$!: Observable<boolean>;
  private readonly _authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.loggedIn$ = this._authService.isLoggedIn$;
  }

  public logout(): void {
    this._authService.logout();
  }
}
