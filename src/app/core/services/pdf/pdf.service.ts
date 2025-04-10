import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Email, Invoice, SummaryPDF } from '@core/dtos';
import { Endpoints, OptionsEndPonits } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _baseUrlInvoive = `${environment.url}/${Endpoints.INVOICE}`;
  private readonly _baseUrlBudget = `${environment.url}/${Endpoints.BUDGET}`;

  createInvoicePDF(id: number): Observable<Blob> {
    return this._httpClient.get(
      `${this._baseUrlInvoive}/${OptionsEndPonits.PRINT_INVOICE_PDF}/${id}`,
      { responseType: 'blob' }
    );
  }

  sendInvoicePDF(id: number, emails: Email[]) {
    return this._httpClient.post(
      `${this._baseUrlInvoive}/${OptionsEndPonits.SEND_INVOICE_PDF}/${id}`,
      emails
    );
  }

  createBudgetPDF(id: number): Observable<Blob> {
    return this._httpClient.get(
      `${this._baseUrlBudget}/${OptionsEndPonits.PRINT_BUDGET_PDF}/${id}`,
      { responseType: 'blob' }
    );
  }

  sendBudgetPDF(id: number, emails: Email[]) {
    return this._httpClient.post(
      `${this._baseUrlBudget}/${OptionsEndPonits.SEND_BUDGET_PDF}/${id}`,
      emails
    );
  }

  printSummaryTrimesterPDF(invoices: Invoice[], trimesterType: number) {
    return this._httpClient.post(
      `${this._baseUrlInvoive}/${OptionsEndPonits.PRINT_SUMMARY_TRIMESTER_PDF}/${trimesterType}`,
      invoices,
      { responseType: 'blob' }
    );
  }

  sendSummaryTrimesterPDF(summanryPdf: SummaryPDF) {
    return this._httpClient.post(
      `${this._baseUrlInvoive}/${OptionsEndPonits.SEND_SUMMARY_TRIMESTER_PDF}`,
      summanryPdf
    );
  }

  downloadSummaryTrimesterPDF(invoices: Invoice[], trimesterType: number) {
    return this._httpClient.post(
      `${this._baseUrlInvoive}/${OptionsEndPonits.DOWNLOAD_SUMMARY_TRIMESTER_PDF}/${trimesterType}`,
      invoices,
      { responseType: 'blob' }
    );
  }
}
