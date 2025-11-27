import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Client, Email, Invoice, SummaryPDF } from '@core/dtos';
import { TrimesterTypesEnum, TrimesterTypesKeyValue } from '@core/enums';
import { ClientService, InvoiceService, UtilsService } from '@core/services';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonItem,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core';
import { ModalEmailsComponent } from '@shared/components';
import { EuroPipe } from '@shared/pipes';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
} from '@swimlane/ngx-datatable';
import {
  catchError,
  concatMap,
  filter,
  from,
  of,
  shareReplay,
  tap,
  timeout,
} from 'rxjs';
import { FilterYearComponent } from '../../../../shared/components/filter-year/filter-year.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  imports: [
    IonButton,
    IonCol,
    IonRow,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonGrid,
    FilterYearComponent,
    AsyncPipe,
    FormsModule,
    NgxDatatableModule,
  ],
})
export class SummaryComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  private readonly _invoiceService = inject(InvoiceService);
  private readonly _modalController = inject(ModalController);
  private readonly _utilsService = inject(UtilsService);
  private readonly _clientService = inject(ClientService);

  private euroPipe = new EuroPipe();

  public sortType = SortType;
  public columns: any;
  public rows: Invoice[] = [];
  public temp: Invoice[] = [];
  public tempPrint: Invoice[] = [];

  clientSelected!: Client;
  clients!: Client[];

  filterInvoices!: string;
  trimesterTypes = TrimesterTypesKeyValue;
  trimester_type: any;

  private yearSelected!: number;
  public years$ = this._invoiceService.getYears().pipe(shareReplay(1));

  ionViewWillEnter() {
    this.trimester_type = TrimesterTypesEnum.TOTAL;
    this.filterInvoices = '';
    this.getSummaryInvoices(this.yearSelected);
    this._clientService.getClient().subscribe((clients) => {
      this.clients = clients.filter(
        (client) => client.name.toLowerCase().indexOf('gestor') > -1
      );
      this.clientSelected = this.clients[0];
    });
  }

  ngOnInit() {
    this.columns = [
      // {
      //   prop: 'actions',
      //   name: 'Acciones',
      //   maxWidth: 120,
      //   cellTemplate: this.actionsTemplate,
      // },
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
    ];
  }

  filterYear(event: any) {
    this.getSummaryInvoices(event);
    this.yearSelected = event;
    this.filterInvoices = '';
    this.trimester_type = TrimesterTypesEnum.TOTAL;
    this.filterTrimester(this.trimester_type);
  }

  getSummaryInvoices(year: number) {
    this._invoiceService
      .getInvoicesByYear(year)
      .subscribe((summatyInvoices) => {
        this.rows = summatyInvoices;
        this.temp = summatyInvoices;
        this.tempPrint = summatyInvoices;
      });
  }

  filterTrimester(event: any) {
    let fechaInicio: Date;
    let fechaFin: Date;

    if (event == TrimesterTypesEnum.TRIMESTER_1) {
      fechaInicio = new Date(this.yearSelected, 0, 1);
      fechaFin = new Date(this.yearSelected, 2, 31);
    } else if (event == TrimesterTypesEnum.TRIMESTER_2) {
      fechaInicio = new Date(this.yearSelected, 3, 1);
      fechaFin = new Date(this.yearSelected, 5, 31);
    } else if (event == TrimesterTypesEnum.TRIMESTER_3) {
      fechaInicio = new Date(this.yearSelected, 6, 1);
      fechaFin = new Date(this.yearSelected, 8, 31);
    } else if (event == TrimesterTypesEnum.TRIMESTER_4) {
      fechaInicio = new Date(this.yearSelected, 9, 1);
      fechaFin = new Date(this.yearSelected, 11, 31);
    } else {
      fechaInicio = new Date(this.yearSelected, 0, 1);
      fechaFin = new Date(this.yearSelected, 11, 31);
    }

    const temp = this.temp.filter(function (d) {
      const dateParts = d.creation_date?.split('-').map(Number);
      if (dateParts && dateParts.length === 3) {
        const [year, month, day] = dateParts;
        const fechaInvoice = new Date(year, month - 1, day);
        return fechaInicio <= fechaInvoice && fechaInvoice <= fechaFin;
      }
      return false;
    });

    this.rows = temp;
    this.tempPrint = temp;
  }

  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.client?.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.tempPrint = temp;
    this.table.offset = 0;
  }

  public async modalEmail(summaryPdf: SummaryPDF, emails: Email[]) {
    const modal = await this._modalController.create({
      component: ModalEmailsComponent,
      componentProps: { emails },
    });
    modal.onDidDismiss().then((response: OverlayEventDetail<Email[]>) => {
      const emails = response.data;
      if (!!emails) {
        summaryPdf.emails = emails;
        this._invoiceService
          .sendSummaryTrimesterPDF(summaryPdf)
          .subscribe(() =>
            this._utilsService.presentSaveToast(true, 'Enviado correctamente')
          );
      } else {
        this._utilsService.presentSaveToast(
          false,
          'Error: ' + 'No ha seleccionado email'
        );
      }
    });
    modal.present();
  }

  sendAgency() {
    let summanryPdf = {
      trimester_type: this.trimester_type,
      invoices: this.tempPrint,
      emails: this.clientSelected.emails,
    };

    this.modalEmail(summanryPdf, summanryPdf.emails);
  }

  createSummaryPDF() {
    this._invoiceService
      .printSummaryTrimesterPDF(this.tempPrint, this.trimester_type)
      .subscribe((file) => {
        const blob: any = new Blob([file], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        //this.utilsServices.downloadPDF(blob, numberInvoice);
      });
  }

  downloadSummaryPDF() {
    from(this.rows)
      .pipe(
        filter((row) => row.id_invoice !== undefined),

        concatMap((row) => {
          console.log('Descargando factura ID:', row.id_invoice);

          return this._invoiceService
            .createInvoicePDF(row.id_invoice ?? 0)
            .pipe(
              timeout(5000), // ⏳ 15 segundos por descarga

              tap((file) => {
                console.log('Factura descargada ID:', row.id_invoice);

                const blob = new Blob([file], { type: 'application/pdf' });
                this._utilsService.downloadPDF(
                  blob,
                  'Factura ' + row.number_invoice_format
                );
              }),

              catchError((err) => {
                console.error(
                  '❌ Error o timeout en factura ID:',
                  row.id_invoice
                );
                return of(null); // ⬅️ evita que se corte la cadena
              })
            );
        })
      )
      .subscribe({
        complete: () => console.log('✔️ Todas las facturas procesadas'),
      });
  }
}
