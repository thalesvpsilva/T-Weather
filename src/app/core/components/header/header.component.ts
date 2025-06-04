import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
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
