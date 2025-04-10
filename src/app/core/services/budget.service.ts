import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Budget, Email } from '@core/dtos';
import { Endpoints } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { PdfService } from './pdf/pdf.service';

const cabecera = {
  headers: new HttpHeaders({ 'Content-TYpe': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _pdfService = inject(PdfService);
  private readonly _baseUrl = `${environment.url}/${Endpoints.BUDGET}`;

  getBudgets(): Observable<Budget[]> {
    return this._httpClient.get<Budget[]>(`${this._baseUrl}`);
  }

  getBudgetById(id: number): Observable<Budget> {
    return this._httpClient.get<Budget>(`${this._baseUrl}/${id}`);
  }

  saveBudget(budget: Budget): Observable<Budget> {
    return this._httpClient.post<Budget>(`${this._baseUrl}`, budget);
  }

  deleteBudget(budget: Budget): Observable<null> {
    return this._httpClient.delete<null>(
      `${this._baseUrl}/${budget.id_budget}`
    );
  }

  createBudgetPDF(id: number): Observable<Blob> {
    return this._pdfService.createBudgetPDF(id);
  }

  sendBudgetPDF(id: number, emails: Email[]) {
    return this._pdfService.sendBudgetPDF(id, emails);
  }

  getBudgetsByYear(year: number): Observable<Budget[]> {
    const url = `${this._baseUrl}/year/${year}`;
    return this._httpClient.get<Budget[]>(url, cabecera);
  }

  getYears(): Observable<number[]> {
    const url = `${this._baseUrl}/years`;
    return this._httpClient.get<number[]>(url, cabecera);
  }
}
