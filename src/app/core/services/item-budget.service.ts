import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ItemBudget } from '@core/dtos';
import { Endpoints } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemBudgetService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrl = `${environment.url}/${Endpoints.ITEM_BUDGET}`;

  getItemBudget(): Observable<ItemBudget[]> {
    return this._httpClient.get<ItemBudget[]>(`${this._baseUrl}`);
  }

  getItemBudgetById(id: number): Observable<ItemBudget> {
    return this._httpClient.get<ItemBudget>(`${this._baseUrl}/${id}`);
  }

  saveItemBudget(itemBudget: ItemBudget): Observable<ItemBudget> {
    return this._httpClient.post<ItemBudget>(`${this._baseUrl}`, itemBudget);
  }

  deleteItemBudget(itemBudget: ItemBudget): Observable<null> {
    return this._httpClient.delete<null>(
      `${this._baseUrl}/${itemBudget.id_item_budget}`
    );
  }
}
