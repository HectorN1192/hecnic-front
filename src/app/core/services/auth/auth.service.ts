import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtModel, UserLogin } from '@core/dtos';
import { Endpoints, OptionsEndPonits } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpClient = inject(HttpClient);
  private readonly urlLogin = `${environment.url}/${Endpoints.AUTH}/${OptionsEndPonits.LOGIN}`;

  public login(user: UserLogin): Observable<JwtModel> {
    return this._httpClient.post<JwtModel>(this.urlLogin, user);
  }
}
