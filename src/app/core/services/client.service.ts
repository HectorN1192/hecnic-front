import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client, ClientTotalsDTO } from '@core/dtos';
import { Endpoints, OptionsEndPonits } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.url}/${Endpoints.CLIENT}`;

  getClient(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.baseUrl);
  }

  getClientById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(`${this.baseUrl}/${id}`);
  }

  saveClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.baseUrl, client);
  }

  deleteClient(client: Client): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${client.id_client}`);
  }

  getTotalsClient(idClient: number): Observable<ClientTotalsDTO> {
    const url = `${this.baseUrl}/${idClient}/${OptionsEndPonits.INVOICES}`;
    return this.httpClient.get<ClientTotalsDTO>(url);
  }
}
