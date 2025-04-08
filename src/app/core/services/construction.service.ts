import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Construction, Invoice } from '@core/dtos';
import { Endpoints, OptionsEndPonits } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

const cabecera = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ConstructionService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.url}/${Endpoints.CONSTRUCTION}`;

  getConstruction(): Observable<Construction[]> {
    return this._httpClient.get<Construction[]>(this._baseUrl);
  }

  getConstructionById(id: number): Observable<Construction> {
    return this._httpClient.get<Construction>(`${this._baseUrl}/${id}`);
  }

  saveConstruction(construction: Construction): Observable<Construction> {
    return this._httpClient.post<Construction>(this._baseUrl, construction);
  }

  deleteConstruction(construction: Construction): Observable<null> {
    return this._httpClient.delete<null>(
      `${this._baseUrl}/${construction.id_construction}`
    );
  }

  receiveTotalRetention(idConstruction: number): Observable<Construction> {
    const baseUrl = `${this._baseUrl}/${idConstruction}/${OptionsEndPonits.RECIEVETOTALRETENTION}`;
    return this._httpClient.patch<Construction>(baseUrl, cabecera);
  }

  receiveHalfRetention(idConstruction: number): Observable<Construction> {
    const baseUrl = `${this._baseUrl}/${idConstruction}/${OptionsEndPonits.RECIEVEHALFRETENTION}`;
    return this._httpClient.patch<Construction>(baseUrl, cabecera);
  }

  getInvoicesByConstruction(idConstruction: number): Observable<Invoice[]> {
    const baseUrl = `${this._baseUrl}/${idConstruction}/${OptionsEndPonits.INVOICES}`;
    return this._httpClient.get<Invoice[]>(baseUrl, cabecera);
  }

  getPermitChangeEndDate(idConstruction: number): Observable<Boolean> {
    const baseUrl = `${this._baseUrl}/${idConstruction}/${OptionsEndPonits.PERMIT_CHANGE_END_DATE}`;
    return this._httpClient.get<Boolean>(baseUrl, cabecera);
  }

  updateRetentionsConstruction(
    idConstruction: number
  ): Observable<Construction> {
    const baseUrl = `${this._baseUrl}/${idConstruction}/${OptionsEndPonits.UPDATE_RETENTIONS}`;
    return this._httpClient.get<Construction>(baseUrl, cabecera);
  }
}
