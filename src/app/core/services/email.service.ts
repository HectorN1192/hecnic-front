import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Email } from '@core/dtos';
import { Endpoints } from '@core/enums';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = `${environment.url}/${Endpoints.EMAIL}`;

  deleteEmail(email: Email): Observable<null> {
    return this.httpClient.delete<null>(`${this.baseUrl}/${email.id_client}`);
  }
}
