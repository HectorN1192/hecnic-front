import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestRetention, TotalsHome, TotalsMonths } from '@core/dtos';
import { Endpoints, OptionsEndPonits } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { RequestRetentionService } from './request-retention.service';

const cabecera = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _requestRetentionService = inject(RequestRetentionService);
  private readonly _baseUrl = `${environment.url}/${Endpoints.HOME}`;

  getTotals(): Observable<TotalsHome> {
    return this._httpClient.get<TotalsHome>(
      `${this._baseUrl}/${OptionsEndPonits.TOTALS}`,
      cabecera
    );
  }

  getTotalsMonths(): Observable<TotalsMonths[]> {
    return this._httpClient.get<TotalsMonths[]>(
      `${this._baseUrl}/${OptionsEndPonits.TOTALS_MONTHS}`,
      cabecera
    );
  }

  getInvoicesPendingRetention(): Observable<RequestRetention[]> {
    return this._requestRetentionService.getInvoicesPendingRetention();
  }

  sendRequestRetenciton(idRequestRetenciton: number) {
    return this._requestRetentionService.sendRequestRetenciton(
      idRequestRetenciton
    );
  }

  createRequestPendingPDF(idConstruction: number, idRequestRetention: number) {
    return this._requestRetentionService.createRequestPendingPDF(
      idConstruction,
      idRequestRetention
    );
  }
}
