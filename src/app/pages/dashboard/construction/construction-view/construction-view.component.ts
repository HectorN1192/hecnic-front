import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Construction, Invoice } from '@core/dtos';
import { ConstructionService } from '@core/services';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BooleanPipe, EuroPipe } from '@shared/pipes';
import {
  NgxDatatableModule,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
@Component({
  selector: 'app-construction-view',
  templateUrl: './construction-view.component.html',
  styleUrls: ['./construction-view.component.scss'],
  imports: [
    IonCol,
    IonInput,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonRow,
    IonButton,
    IonItem,
    EuroPipe,
    BooleanPipe,
    NgxDatatableModule,
  ],
})
export class ConstructionViewComponent implements OnInit {
  @Input() id!: number;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _constructionService = inject(ConstructionService);

  public sortType = SortType;
  public columns!: TableColumn[];
  public invoices: Invoice[] = [];
  private moneyPipe = new EuroPipe();
  private datePipe = new DatePipe('es-ES');

  construction?: Construction;

  constructor() {}

  ngOnInit(): void {
    if (this.id) {
      this.getById(this.id);
      this.getInvoicesConstruction(this.id);
    }

    this.columns = [
      {
        prop: 'number_invoice_format',
        name: 'Numero factura',
        headerClass: 'text-align-center',
      },
      {
        prop: 'creation_date',
        name: 'Fecha de factura',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: this.datePipe,
      },
      {
        prop: 'retention',
        name: 'Retención',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: this.moneyPipe,
      },
      {
        prop: 'total_net',
        name: 'Total factura',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: this.moneyPipe,
      },
    ];
  }

  getById(id: number) {
    this._constructionService
      .getConstructionById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (construction) => {
          this.construction = construction;
        },
      });
  }

  getInvoicesConstruction(id: number) {
    this._constructionService
      .getInvoicesByConstruction(id)
      .subscribe((data) => {
        this.invoices = data;
      });
  }

  updateRetentionsConstruction(idConstruction: number) {
    this._constructionService
      .updateRetentionsConstruction(idConstruction)
      .subscribe((construction) => {
        this.construction = construction;
      });
  }

  receiveTotalRetention(idConstruction: number) {
    this._constructionService
      .receiveTotalRetention(idConstruction)
      .subscribe((data) => (this.construction = data));
  }

  receiveHalfRetention(idConstruction: number) {
    this._constructionService
      .receiveHalfRetention(idConstruction)
      .subscribe((data) => (this.construction = data));
  }
}
