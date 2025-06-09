import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatIconButton, MatIcon, MatFormField, MatLabel, MatInput, MatSuffix, MatButton]
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
