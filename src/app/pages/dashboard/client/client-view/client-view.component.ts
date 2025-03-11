import { AsyncPipe, CurrencyPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ClientTotalsDTO } from '@core/dtos';
import { Client, Construction } from '@core/dtos/';
import { Endpoints, RouteActions } from '@core/enums';
import { ClientService } from '@core/services';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { BooleanPipe, EuroPipe } from '@shared/pipes';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
} from '@swimlane/ngx-datatable';
import { addIcons } from 'ionicons';
import { eyeOutline } from 'ionicons/icons';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
  imports: [
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonBackButton,
    IonRow,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonGrid,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonIcon,
    RouterLink,
    NgxDatatableModule,
    CurrencyPipe,
    AsyncPipe,
  ],
})
export class ClientViewComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  @Input() id!: number;
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _clientService = inject(ClientService);

  sortType = SortType;
  Endpoints = Endpoints;
  RouteActions = RouteActions;

  private moneyPipe = new EuroPipe();
  private booleanpipe = new BooleanPipe();

  public columns: any;

  public client$!: Observable<Client>;
  public totalsClient!: ClientTotalsDTO;
  public constructionsPending!: Construction[];
  public rows!: Construction[];

  searchSubject = new Subject<string>();

  constructor() {
    addIcons({
      eyeOutline,
    });

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => this.filterClients(val));
  }

  ngOnInit() {
    this.client$ = this._clientService.getClientById(this.id);
    this.getTotalsClient(this.id);

    this.columns = [
      {
        prop: 'actions',
        name: 'Acciones',
        maxWidth: 100,
        cellTemplate: this.actionsTemplate,
      },
      { prop: 'name', name: 'Obra', headerClass: 'text-align-center' },
      {
        prop: 'half_retention',
        name: '50% retención',
        maxWidth: 130,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.moneyPipe,
      },
      {
        prop: 'half_retention_receive',
        name: '50% cobrado',
        maxWidth: 130,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.booleanpipe,
      },
      {
        prop: 'total_retention',
        name: 'Total retención',
        maxWidth: 130,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.moneyPipe,
      },
      {
        prop: 'total_retention_receive',
        maxWidth: 130,
        name: 'Total cobrado',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.booleanpipe,
      },
    ];
  }

  getTotalsClient(id: number) {
    this._clientService
      .getTotalsClient(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data) => {
        this.totalsClient = data;
        this.constructionsPending = data.constructions_retentions_pending;
        this.rows = this.constructionsPending;
      });
  }

  updateFilter(event: any) {
    const val = event?.target?.value;
    this.searchSubject.next(val);
  }

  filterClients(val: string) {
    this.rows = this.constructionsPending.filter(
      (construction: Construction) =>
        construction.name.toLowerCase().includes(val) || !val
    );

    this.table.offset = 0;
  }
}
