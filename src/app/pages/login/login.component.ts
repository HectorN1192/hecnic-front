import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private readonly _destroyRef = inject(DestroyRef);
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
    if (user.name) {
      this._authService
        .login(user)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((data) => {
          this._tokenService.setToken(data.token);
          this._tokenService.setUserName(data.name);
          this._tokenService.setAuthorities(data.authorities);
          this._router.navigate([Endpoints.DASHBOARD]);
        });
    } else {
      this._router.navigate([Endpoints.DASHBOARD]);
    }
  }
}
