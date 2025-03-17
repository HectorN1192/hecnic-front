import { AsyncPipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '@core/dtos';
import { RouteActions } from '@core/enums';
import { ProductService } from '@core/services';
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonRouterLink,
  IonRow,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
import { EuroPipe } from '@shared/pipes';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
  TableColumn,
} from '@swimlane/ngx-datatable';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
} from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    RouterLink,
    IonButton,
    IonCol,
    IonContent,
    IonRouterLink,
    IonRow,
    IonIcon,
    IonItem,
    IonInput,
    HeaderPageComponent,
    NgxDatatableModule,
    AsyncPipe,
    FormsModule,
  ],
})
export class ProductComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  private readonly _productService = inject(ProductService);
  private readonly _alertController = inject(AlertController);

  private readonly _searchSubject = new Subject<string>();
  private readonly _moneyPipe = new EuroPipe();

  private _productRows$!: Observable<Product[]>;

  public columns: TableColumn[] = [];
  public rows$!: Observable<Product[]>;

  public RouteActions = RouteActions;
  public sortType = SortType;
  public filterProduct!: string;

  constructor() {
    addIcons({
      createOutline,
      trashOutline,
    });

    this._searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => this.filterProducts(val));
  }

  ionViewWillEnter() {
    this._productRows$ = this._productService.getProduct();
    this.rows$ = this._productRows$;
    this.filterProduct = '';
  }

  ngOnInit() {
    this.columns = [
      {
        prop: 'actions',
        name: 'Acciones',
        maxWidth: 100,
        cellTemplate: this.actionsTemplate,
      },
      { prop: 'name', name: 'Producto', headerClass: 'text-align-center' },
      {
        prop: 'price',
        name: 'Precio',
        maxWidth: 200,
        headerClass: 'text-align-center',
        cellClass: 'text-align-rigth',
        pipe: this._moneyPipe,
      },
    ];
  }

  async presentAlertDelete(product: Product) {
    const alert = await this._alertController.create({
      header: 'Borrar!',
      subHeader: '¿Quieres borrar el producto?',
      message: product.name,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteProduct(product);
          },
        },
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
      ],
    });
    await alert.present();
  }

  deleteProduct(product: Product) {
    this._productService.deleteProduct(product).subscribe({
      next: () => {
        this.rows$ = this.rows$.pipe(
          map((products) =>
            products.filter((p) => p.id_product !== product.id_product)
          )
        );
      },
      error: () => {
        console.error('Error');
      },
    });
  }

  updateFilter(event: any) {
    const val = event?.target?.value;
    this._searchSubject.next(val);
  }

  filterProducts(val: string) {
    this.rows$ = this._productRows$.pipe(
      map((products) =>
        products.filter(
          (product: Product) => product.name.toLowerCase().includes(val) || !val
        )
      )
    );

    this.table.offset = 0;
  }
}
