import { AsyncPipe, DatePipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Construction } from '@core/dtos';
import { RouteActions } from '@core/enums';
import { ConstructionService } from '@core/services';
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
import { BooleanPipe, EuroPipe } from '@shared/pipes';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline } from 'ionicons/icons';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
} from 'rxjs';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss'],
  imports: [
    HeaderPageComponent,
    IonContent,
    HeaderPageComponent,
    IonButton,
    IonCol,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonRow,
    AsyncPipe,
    NgxDatatableModule,
    RouterLink,
    FormsModule,
  ],
})
export class ConstructionComponent {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _alertController = inject(AlertController);
  private readonly _constructionService = inject(ConstructionService);
  private readonly _searchSubject = new Subject<string>();

  private _constructionRows$!: Observable<Construction[]>;
  public rows$!: Observable<Construction[]>;
  public columns!: TableColumn[];

  public RouteActions = RouteActions;
  public sortType = SortType;

  booleanpipe = new BooleanPipe();
  moneyPipe = new EuroPipe();
  datePipe = new DatePipe('es_ES');

  filterConstruction!: string;

  constructor() {
    addIcons({
      createOutline,
      eyeOutline,
      trashOutline,
    });

    this._searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => this.filterClients(val));
  }

  ionViewWillEnter() {
    this.filterConstruction = '';
    this.getConstructions();
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'actions',
        minWidth: 120,
        maxWidth: 130,
        name: 'Acciones',
        cellTemplate: this.actionsTemplate,
      },
      {
        prop: 'name',
        minWidth: 350,
        name: 'Obra',
        headerClass: 'text-align-center',
      },
      {
        prop: 'client.name',
        maxWidth: 350,
        name: 'Cliente',
        headerClass: 'text-align-center',
      },
      {
        prop: 'half_retention',
        maxWidth: 120,
        name: '50% retención',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.moneyPipe,
      },
      {
        prop: 'half_retention_receive',
        maxWidth: 120,
        name: '50% cobrado',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.booleanpipe,
      },
      {
        prop: 'total_retention',
        maxWidth: 120,
        name: 'Total retención',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.moneyPipe,
      },
      {
        prop: 'total_retention_receive',
        maxWidth: 120,
        name: 'Total cobrado',
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.booleanpipe,
      },
      {
        prop: 'end_date',
        name: 'Fecha fin',
        maxWidth: 120,
        headerClass: 'text-align-center',
        pipe: this.datePipe,
      },
    ];
  }

  getConstructions() {
    this._constructionRows$ = this._constructionService.getConstruction();
    this.rows$ = this._constructionRows$;
  }

  deleteConstruction(construction: Construction) {
    this._constructionService
      .deleteConstruction(construction)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.getConstructions();
        },
      });
  }

  async presentAlertDelete(construction: Construction) {
    const alert = await this._alertController.create({
      header: 'Borrar!',
      subHeader: '¿Quieres borrar la obra?',
      message: construction.name,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteConstruction(construction);
          },
        },
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
      ],
    });

    await alert.present();
  }

  updateFilter(event: any) {
    const val = event?.target?.value;
    this._searchSubject.next(val);
  }

  filterClients(val: string) {
    this.rows$ = this._constructionRows$.pipe(
      map((construction) =>
        construction.filter(
          (construction: Construction) =>
            construction?.name?.toLowerCase().includes(val) || !val
        )
      )
    );

    this.table.offset = 0;
  }
}
