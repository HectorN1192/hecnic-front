import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItemInvoice } from '@core/dtos';
import { Endpoints } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemInvoiceService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.url}/${Endpoints.ITEM_INVOICE}`;

  getItemInvoice(): Observable<ItemInvoice[]> {
    return this._httpClient.get<ItemInvoice[]>(this._baseUrl);
  }

  getItemInvoiceById(id: number): Observable<ItemInvoice> {
    return this._httpClient.get<ItemInvoice>(`${this._baseUrl}/${id}`);
  }

  saveItemInvoice(itemInvoice: ItemInvoice): Observable<ItemInvoice> {
    return this._httpClient.post<ItemInvoice>(`${this._baseUrl}`, itemInvoice);
  }

  deleteItemInvoice(itemInvoice: ItemInvoice): Observable<null> {
    return this._httpClient.delete<null>(
      `${this._baseUrl}/${itemInvoice.id_item_invoice}`
    );
  }
}
