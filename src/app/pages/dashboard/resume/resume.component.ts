import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RequestRetention } from '@core/dtos';
import { Endpoints, RouteActions } from '@core/enums';
import { HomeService } from '@core/services';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
import { BooleanPipe, TypeRequestRetentionPipe } from '@shared/pipes';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
import { addIcons } from 'ionicons';
import { eyeOutline, mailOutline } from 'ionicons/icons';
import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss'],
  imports: [
    IonIcon,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonToolbar,
    IonTitle,
    CurrencyPipe,
    AsyncPipe,
    RouterLink,
    HeaderPageComponent,
    NgxDatatableModule,
  ],
})
export class ResumeComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  private readonly _homeService = inject(HomeService);

  private typeRequestRetentionPipe = new TypeRequestRetentionPipe();
  private booleanPipe = new BooleanPipe();

  public RouterAction = RouteActions;
  public Endpoints = Endpoints;
  public sortType = SortType;

  public totalsHome$ = this._homeService.getTotals().pipe(shareReplay(1));
  public totalsMonths$ = this._homeService
    .getTotalsMonths()
    .pipe(shareReplay(1));

  public columns: TableColumn[] = [];
  public rows$: Observable<RequestRetention[]> = this._homeService
    .getInvoicesPendingRetention()
    .pipe(shareReplay(1));

  constructor() {
    addIcons({
      eyeOutline,
      mailOutline,
    });
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'actions',
        name: 'Acciones',
        maxWidth: 100,
        cellTemplate: this.actionsTemplate,
      },
      {
        prop: 'construction.name',
        minWidth: 390,
        name: 'Obra',
        headerClass: 'text-align-center',
      },
      {
        prop: 'type_request_retention',
        maxWidth: 200,
        name: 'Tipo de solicitud',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: this.typeRequestRetentionPipe,
      },
      {
        prop: 'request_date',
        maxWidth: 150,
        name: 'Fecha de solicitud',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: new DatePipe('es-Es'),
      },
      {
        prop: 'requested',
        maxWidth: 150,
        name: 'Solicitado',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: this.booleanPipe,
      },
      {
        prop: 'receive_payment',
        maxWidth: 150,
        name: 'Cobrado',
        headerClass: 'text-align-center',
        cellClass: 'text-align-center',
        pipe: this.booleanPipe,
      },
    ];
  }

  // getInvoicesPendingRetention() {
  //   this._homeService.getInvoicesPendingRetention().subscribe( data => {this.rows = data;  });
  // }

  sendRequestRetenciton(row: RequestRetention) {
    // if (!row.requested) {
    //   this._homeService.sendRequestRetenciton(row.id_request_retention).subscribe(() =>  this.getInvoicesPendingRetention());
    // }
    this.createRequestRetentionPDF(
      row.construction.id_construction,
      row.id_request_retention
    );
  }

  createRequestRetentionPDF(
    idConstruction?: number,
    idRequestRetention?: number
  ) {
    if (!idConstruction || !idRequestRetention) return;

    this._homeService
      .createRequestPendingPDF(idConstruction, idRequestRetention)
      .subscribe((file) => {
        const blob: any = new Blob([file], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        //this.utilsServices.downloadPDF(blob, numberInvoice);
      });
  }
}
