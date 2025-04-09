import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client, Construction } from '@core/dtos';
import { Endpoints } from '@core/enums';
import {
  ClientService,
  ConstructionService,
  UtilsService,
} from '@core/services';
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
import { SelectableComponent } from '@shared/components';
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
    SelectableComponent,
    AsyncPipe,
  ],
})
export class ConstructionDetailComponent implements OnInit {
  @Input() id!: number;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _constructionService = inject(ConstructionService);
  private readonly _clientService = inject(ClientService);
  private readonly _utilsServices = inject(UtilsService);
  private readonly _router = inject(Router);

  dateNow: string = new Date().toISOString();
  clientSelected!: Client;

  clients$ = this._clientService.getClient();

  formConstruction = this._formbuilder.group({
    id_construction: [null as number | null],
    name: ['', Validators.required],
    address: [''],
    city: [''],
    province: [''],
    postal_code: [''],
    start_date: [this.dateNow],
    end_date: [this.dateNow],
    client: [{} as Client | undefined, Validators.required],
  });

  ngOnInit(): void {
    if (this.id) this.getById(this.id);
  }

  getById(id: number) {
    this._constructionService
      .getConstructionById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (construction) => {
          this.formConstruction.patchValue(construction);
          this.clientSelected = construction.client!;
        },
      });
  }

  submit() {
    let construction = this.formConstruction.getRawValue() as Construction;
    this._constructionService
      .saveConstruction(construction)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this._router.navigate([Endpoints.DASHBOARD, Endpoints.CONSTRUCTION]);
          this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
        },
      });
  }

  onClientSelected(client: Client) {
    this.formConstruction.controls.client.patchValue(client);
  }
}
