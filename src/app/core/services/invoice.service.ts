import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Email, Invoice, SummaryPDF } from '@core/dtos';
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
export class InvoiceService {
  private readonly _httpClient = inject(HttpClient);
  private readonly _pdfService = inject(PdfService);
  private readonly _baseUrl = `${environment.url}/${Endpoints.INVOICE}`;

  getInvoices(): Observable<Invoice[]> {
    return this._httpClient.get<Invoice[]>(`${this._baseUrl}`);
  }

  getInvoiceById(id: number): Observable<Invoice> {
    return this._httpClient.get<Invoice>(`${this._baseUrl}/${id}`);
  }

  saveInvoice(invoice: Invoice): Observable<Invoice> {
    return this._httpClient.post<Invoice>(`${this._baseUrl}`, invoice);
  }

  deleteInvoice(invoice: Invoice): Observable<null> {
    return this._httpClient.delete<null>(
      `${this._baseUrl}/${invoice.id_invoice}`
    );
  }

  getNumberInvoice(): Observable<number> {
    const url = `${this._baseUrl}/number_invoice`;
    return this._httpClient.get<number>(url, cabecera);
  }

  getInvoiceCopyById(id: number): Observable<Invoice> {
    const url = `${this._baseUrl}/copy/${id}`;
    return this._httpClient.get<Invoice>(url, cabecera);
  }

  createInvoicePDF(id: number): Observable<Blob> {
    return this._pdfService.createInvoicePDF(id);
  }

  sendInvoicePDF(id: number, emails: Email[]) {
    return this._pdfService.sendInvoicePDF(id, emails);
  }

  getInvoicesByYear(year: number): Observable<Invoice[]> {
    const url = `${this._baseUrl}/year/${year}`;
    return this._httpClient.get<Invoice[]>(url, cabecera);
  }

  getYears(): Observable<number[]> {
    const url = `${this._baseUrl}/years`;
    return this._httpClient.get<number[]>(url, cabecera);
  }

  printSummaryTrimesterPDF(
    invoices: Invoice[],
    trimesterType: number
  ): Observable<Blob> {
    return this._pdfService.printSummaryTrimesterPDF(invoices, trimesterType);
  }

  sendSummaryTrimesterPDF(summanryPdf: SummaryPDF) {
    return this._pdfService.sendSummaryTrimesterPDF(summanryPdf);
  }

  downloadSummaryTrimesterPDF(
    invoices: Invoice[],
    trimesterType: number
  ): Observable<Blob> {
    return this._pdfService.printSummaryTrimesterPDF(invoices, trimesterType);
  }
}
