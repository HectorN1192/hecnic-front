import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Email, Invoice } from '@core/dtos';
import { RouteActions } from '@core/enums';
import { InvoiceService, UtilsService } from '@core/services';
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  ModalController,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import {
  FilterYearComponent,
  HeaderPageComponent,
  ModalEmailsComponent,
} from '@shared/components';
import { EuroPipe } from '@shared/pipes';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
import { addIcons } from 'ionicons';
import {
  copyOutline,
  createOutline,
  mailOpenOutline,
  printOutline,
} from 'ionicons/icons';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  imports: [
    IonInput,
    HeaderPageComponent,
    IonContent,
    FilterYearComponent,
    FormsModule,
    HeaderPageComponent,
    IonButton,
    IonCol,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    NgxDatatableModule,
    RouterLink,
    AsyncPipe,
  ],
})
export class InvoiceComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly _invoiceService = inject(InvoiceService);
  private readonly utilsServices = inject(UtilsService);
  private readonly modalController = inject(ModalController);
  private readonly _searchSubject = new Subject<string>();

  private euroPipe = new EuroPipe();

  private yearSelected!: number;

  public sortType = SortType;
  public RouteActions = RouteActions;

  public columns: TableColumn[] = [];
  private _invoiceRows$!: Observable<Invoice[]>;
  public rows$!: Observable<Invoice[]>;

  public years$ = this._invoiceService.getYears();

  public filterInvoice!: string;

  constructor() {
    addIcons({
      createOutline,
      copyOutline,
      printOutline,
      mailOpenOutline,
    });

    this._searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => this.filterInvoices(val));
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'actions',
        name: 'Acciones',
        minWidth: 135,
        cellTemplate: this.actionsTemplate,
      },
      {
        prop: 'number_invoice_format',
        name: 'Numero factura',
        minWidth: 115,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
      },
      {
        prop: 'creation_date',
        name: 'Fecha factura',
        minWidth: 115,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: new DatePipe('es-ES'),
      },
      {
        prop: 'client.name',
        name: 'Cliente',
        minWidth: 300,
        headerClass: 'text-align-center',
      },
      {
        prop: 'construction.name',
        name: 'Obra',
        minWidth: 300,
        headerClass: 'text-align-center',
      },
      {
        prop: 'advance',
        name: 'Anticipo',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.euroPipe,
      },
      {
        prop: 'retention',
        name: 'Retencion',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.euroPipe,
      },
      {
        prop: 'iva',
        name: 'IVA',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.euroPipe,
      },
      {
        prop: 'total_net',
        name: 'Total',
        minWidth: 120,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.euroPipe,
      },
      //{ prop: 'receive', name: "Cobrada", minWidth: 120, headerClass: "text-align-center", cellClass: "text-align-rigth", pipe: new BooleanPipe },
    ];
  }

  ionViewWillEnter() {
    this.filterInvoice = '';
    this.getInvoices(this.yearSelected);
  }

  getInvoices(year: number) {
    this._invoiceRows$ = this._invoiceService
      .getInvoicesByYear(year)
      .pipe(shareReplay(1));
    this.rows$ = this._invoiceRows$;
  }

  filterYear(event: any) {
    this.getInvoices(event);
    this.yearSelected = event;
    this.filterInvoice = '';
  }

  updateFilter(event: any) {
    const val = event?.target?.value;
    this._searchSubject.next(val);
  }

  filterInvoices(val: string) {
    this.rows$ = this._invoiceRows$.pipe(
      map((invoices) =>
        invoices.filter(
          (invoice: Invoice) =>
            invoice.client.name.toLowerCase().includes(val) || !val
        )
      )
    );

    this.table.offset = 0;
  }

  createInvoicePDF(id: number, numberInvoice: string) {
    this._invoiceService.createInvoicePDF(id).subscribe((file) => {
      const blob: any = new Blob([file], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
      //this.utilsServices.downloadPDF(blob, numberInvoice);
    });
  }

  sendInvoicePDF(idInvoice: number, emails: Email[]) {
    this.modalEmail(idInvoice, emails);
  }

  public async modalEmail(idInvoice: number, emails: Email[]) {
    const modal = await this.modalController.create({
      component: ModalEmailsComponent,
      componentProps: { emails },
    });
    modal.onDidDismiss().then((response: OverlayEventDetail<Email[]>) => {
      if (response.data !== undefined) {
        const emails = response.data;
        this._invoiceService
          .sendInvoicePDF(idInvoice, emails)
          .subscribe(() =>
            this.utilsServices.presentSaveToast(true, 'Enviado correctamente')
          );
      }
    });
    modal.present();
  }
}
