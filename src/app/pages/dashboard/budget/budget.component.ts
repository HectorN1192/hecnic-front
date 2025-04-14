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
import { Budget, Email } from '@core/dtos';
import { Endpoints, RouteActions } from '@core/enums';
import { BudgetService, UtilsService } from '@core/services';
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
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  imports: [
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
export class BudgetComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _budgetService = inject(BudgetService);
  private readonly _utilsServices = inject(UtilsService);
  private readonly _modalController = inject(ModalController);
  private readonly _searchSubject = new Subject<string>();

  private euroPipe = new EuroPipe();

  private yearSelected!: number;

  public sortType = SortType;
  public RouteActions = RouteActions;

  public columns: TableColumn[] = [];
  private _budgetRows$!: Observable<Budget[]>;
  public rows$!: Observable<Budget[]>;

  public years$ = this._budgetService.getYears().pipe(shareReplay(1));

  public filterBudget!: string;

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
      .subscribe((val) => this.filterBudgets(val));
  }

  ngOnInit(): void {
    this.columns = [
      {
        prop: 'actions',
        name: 'Acciones',
        maxWidth: 135,
        cellTemplate: this.actionsTemplate,
      },
      {
        prop: 'client.name',
        name: 'Cliente',
        headerClass: 'text-align-center',
      },
      {
        prop: 'construction.name',
        name: 'Obra',
        headerClass: 'text-align-center',
      },
      {
        prop: 'creation_date',
        name: 'Fecha factura',
        maxWidth: 120,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: new DatePipe('es-ES'),
      },
      {
        prop: 'iva',
        name: 'IVA',
        maxWidth: 120,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.euroPipe,
      },
      {
        prop: 'total_net',
        name: 'Total',
        maxWidth: 120,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this.euroPipe,
      },
    ];
  }

  ionViewWillEnter() {
    this.filterBudget = '';
    // this.getBudgets(this.yearSelected);
  }

  getBudgets(year: number) {
    this._budgetRows$ = this._budgetService
      .getBudgetsByYear(year)
      .pipe(shareReplay(1));
    this.rows$ = this._budgetRows$;
  }

  filterYear(event: any) {
    this.getBudgets(event);
    this.yearSelected = event;
    this.filterBudget = '';
  }

  updateFilter(event: any) {
    const val = event?.target?.value;
    this._searchSubject.next(val);
  }

  filterBudgets(val: string) {
    this.rows$ = this._budgetRows$.pipe(
      map((budgets) =>
        budgets.filter(
          (budget: Budget) =>
            budget.client?.name.toLowerCase().includes(val) || !val
        )
      )
    );

    this.table.offset = 0;
  }

  createInvoiceByBudget(idBudget: number) {
    this._router.navigate([
      Endpoints.DASHBOARD,
      Endpoints.INVOICE,
      RouteActions.CREATE_INOVICE_BUDGET,
      idBudget,
    ]);
  }

  createBudgetPDF(id: number, numberBudget: string) {
    this._budgetService
      .createBudgetPDF(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((file) => {
        const blob: any = new Blob([file], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        //this.utilsServices.downloadPDF(blob, numberBudget);
      });
  }

  sendBudgetPDF(idBudget: number, emails: Email[]) {
    this.modalEmail(idBudget, emails);
  }

  public async modalEmail(idBudget: number, emails: Email[]) {
    const modal = await this._modalController.create({
      component: ModalEmailsComponent,
      componentProps: { emails },
    });
    modal.onDidDismiss().then((response: OverlayEventDetail<Email[]>) => {
      if (response.data !== undefined) {
        const emails = response.data;
        this._budgetService
          .sendBudgetPDF(idBudget, emails)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(() =>
            this._utilsServices.presentSaveToast(true, 'Enviado correctamente')
          );
      }
    });
    modal.present();
  }
}
