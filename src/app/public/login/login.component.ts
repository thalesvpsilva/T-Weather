import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form!: FormGroup;
  public msgError!: string;
  public showError!: boolean;
  public hide = true;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      user: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  private showErrorMsg(msg: string): void {
    this.msgError = msg;
    this.showError = true;
  }

  public closeErrorMsg(): void {
    this.showError = false;
  }

  public onSubmit(): void {
    this._authService.login(this.form.value)
      .subscribe(v => v 
        ? this._router.navigateByUrl('/weather')
        : this.showErrorMsg('Incorrect username or password.')
      );
  }
}
