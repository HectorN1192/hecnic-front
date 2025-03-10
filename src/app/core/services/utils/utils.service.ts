import { Injectable } from '@angular/core';

import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toastController: ToastController) {}

  getNamesDateTime() {
    return [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
  }

  async presentSaveToast(
    success: boolean,
    message: string,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message: message,
      color: success ? 'primary' : 'danger',
      duration: 3000,
      position: position,
    });
    await toast.present();
  }

  downloadPDF(file: Blob, filename: string) {
    const blob: any = new Blob([file], { type: 'application/pdf' });
    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
