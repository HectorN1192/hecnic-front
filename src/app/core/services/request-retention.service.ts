import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestRetention } from '@core/dtos';
import { Endpoints, OptionsEndPonits } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const cabecera = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class RequestRetentionService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.url}/${Endpoints.REQUEST_RETENTION}`;

  getInvoicesPendingRetention(): Observable<RequestRetention[]> {
    return this._httpClient.get<RequestRetention[]>(
      `${this._baseUrl}/${OptionsEndPonits.PENDING}`,
      cabecera
    );
  }

  sendRequestRetenciton(idRequestRetenciton: number) {
    return this._httpClient.post(
      `${this._baseUrl}/${OptionsEndPonits.SEND_REQUEST_RETENTION}`,
      idRequestRetenciton,
      cabecera
    );
  }

  createRequestPendingPDF(
    idConstruction: number,
    idRequestRetention: number
  ): Observable<Blob> {
    return this._httpClient.get(
      `${this._baseUrl}/${OptionsEndPonits.PRINT_REQUEST_RETENTION}/${idRequestRetention}/${idConstruction}`,
      { responseType: 'blob' }
    );
  }
}
