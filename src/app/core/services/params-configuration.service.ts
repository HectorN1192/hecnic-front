import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Endpoints } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { ParamsConfiguration } from './../dtos/modelDTO';

@Injectable({
  providedIn: 'root',
})
export class ParamsConfigurationService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.url}/${Endpoints.PARAMS_CONFIGURATION}`;

  getParamsConfiguration(): Observable<ParamsConfiguration[]> {
    return this._httpClient.get<ParamsConfiguration[]>(this._baseUrl);
  }

  saveParamsConfiguration(
    params: ParamsConfiguration
  ): Observable<ParamsConfiguration> {
    return this._httpClient.post<ParamsConfiguration>(this._baseUrl, params);
  }
}
