import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private requestCount = 0; // Contador de peticiones activas
  isLoading = signal(false);

  public show() {
    this.requestCount++; // Incrementa cuando se inicia una petición
    this.isLoading.set(true);
  }

  public hide() {
    if (this.requestCount > 0) {
      this.requestCount--; // Decrementa cuando finaliza una petición
    }
    if (this.requestCount === 0) {
      this.isLoading.set(false); // Solo oculta el spinner si no hay peticiones pendientes
    }
  }
}
