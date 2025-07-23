import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [RouterLink, MatIconButton, MatIcon, AsyncPipe]
})
export class HeaderComponent implements OnInit {

  public logged$!: Observable<boolean>;

  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.logged$ = this._authService.isLogged$;
  }

  public logout(): void {
    this._authService.logout();
  }
}
