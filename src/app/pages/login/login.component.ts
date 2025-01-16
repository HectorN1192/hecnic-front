import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Endpoints } from '@core/enums';
import { AuthService, TokenService } from '@core/services/auth';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonMenuButton,
    IonRow,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _tokenService = inject(TokenService);
  private readonly _formBuilder = inject(FormBuilder);

  public formLogin = this._formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    const user = this.formLogin.getRawValue();
    this._authService.login(user).subscribe((data) => {
      this._tokenService.setToken(data.token);
      this._tokenService.setUserName(data.name);
      this._tokenService.setAuthorities(data.authorities);
      this._router.navigate([Endpoints.DASHBOARD]);
    });
  }
}
