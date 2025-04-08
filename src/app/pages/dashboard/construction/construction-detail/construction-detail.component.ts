import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Construction } from '@core/dtos';
import { Endpoints } from '@core/enums';
import { ConstructionService, UtilsService } from '@core/services';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-construction-detail',
  templateUrl: './construction-detail.component.html',
  styleUrls: ['./construction-detail.component.scss'],
  imports: [
    IonContent,
    IonButtons,
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonBackButton,
    IonRow,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonLabel,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    ReactiveFormsModule,
  ],
})
export class ConstructionDetailComponent {
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _constructionService = inject(ConstructionService);
  private readonly _utilsServices = inject(UtilsService);
  private readonly _router = inject(Router);

  startDate: string = new Date().toISOString();

  formConstruction = this._formbuilder.group({
    id_construction: [undefined],
    name: ['', Validators.required],
    address: [''],
    city: [''],
    province: [''],
    postal_code: [''],
    start_date: [new Date().toISOString().split('T')[0]],
    end_date: [new Date().toISOString().split('T')[0]],
    client: [undefined, Validators.required],
  });

  submit() {
    let construction = this.formConstruction.getRawValue() as Construction;
    this._constructionService.saveConstruction(construction).subscribe({
      next: (response) => {
        this._router.navigate([Endpoints.CONSTRUCTION]);
        this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
      },
      error: (error) => {},
    });
  }
}
