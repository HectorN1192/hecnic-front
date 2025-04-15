import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Budget,
  Client,
  Construction,
  Invoice,
  ItemInvoice,
  Product,
} from '@core/dtos';
import { Endpoints, InvoiceTypesKeyValue, RouteActions } from '@core/enums';
import {
  BudgetService,
  ConstructionService,
  InvoiceService,
  ItemInvoiceService,
  ProductService,
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
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SelectableComponent } from '@shared/components';
import { shareReplay } from 'rxjs';
import { InvoiceItemComponent } from '../invoice-item/invoice-item.component';
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  imports: [
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonRow,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
    IonSelectOption,
    IonSelect,
    AsyncPipe,
    SelectableComponent,
    InvoiceItemComponent,
  ],
})
export class InvoiceDetailComponent implements OnInit {
  @Input() id!: number;

  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _utilsServices = inject(UtilsService);
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _invoiceService = inject(InvoiceService);
  private readonly _budgetService = inject(BudgetService);
  private readonly _constructionService = inject(ConstructionService);
  private readonly _itemInvoiceService = inject(ItemInvoiceService);
  private readonly _productService = inject(ProductService);

  invoiceTypes = InvoiceTypesKeyValue;

  dateNow: string = new Date().toISOString();

  constructionSelected!: Construction;
  constructions$ = this._constructionService
    .getConstruction()
    .pipe(shareReplay(1));

  products$ = this._productService.getProduct().pipe(shareReplay(1));

  formInvoice = this._formbuilder.group({
    invoice_type: [this.invoiceTypes[0].value, Validators.required],
    number_invoice_format: [''],
    id_invoice: [null as number | null],
    client: [{} as Client, Validators.required],
    construction: [null as Construction | null, Validators.required],
    number_invoice: [null as number | null, Validators.required],
    total: [0],
    total_last: [0],
    advance: [0],
    retention: [0],
    retention_percent: [0],
    iva: [0],
    iva_percent: [0],
    pay_soon: [0],
    pay_soon_percent: [0],
    observation: [''],
    creation_date: [this.dateNow, Validators.required],
    items: this._formbuilder.array([]),
  });

  constructor() {
    this.formInvoice.controls.construction.valueChanges.subscribe(
      (construction: Construction | null) => {
        if (construction && construction.client) {
          this.formInvoice.controls.client.setValue(construction.client);
        }
      }
    );
  }

  ngOnInit() {
    this.getNumberInvoiceFormat();
    const mode = this._activatedRoute.snapshot.data['mode'];

    if (this.id) {
      if (mode === RouteActions.EDIT) {
        this.getEdit(this.id);
      } else if (mode === RouteActions.COPY) {
        this.getCopy(this.id);
      } else if (mode === RouteActions.CREATE_INOVICE_BUDGET) {
        this.createInvoiceByBudget(this.id);
      }
    } else {
      this.addItem();
      this.getNumberInvoiceFormat();
    }
  }

  getEdit(id: number) {
    this._invoiceService.getInvoiceById(id).subscribe((invoice) => {
      this.formInvoice.patchValue(invoice);
      this.constructionSelected = invoice.construction!;
      this.completeItems(invoice.items);
    });
  }

  completeItems(items?: ItemInvoice[]) {
    items?.forEach((item) => {
      this.itemsFormArray.push(this.setItem(item));
    });
  }

  private setItem(item: ItemInvoice): FormGroup {
    return this._formbuilder.group({
      id_item_invoice: [item.id_item_invoice],
      unit_origin: [item.unit_origin],
      unit_last: [item.unit_last],
      unit_total: [item.unit_total],
      price: [item.price],
      product: [item.product],
      invoice: [item.invoice],
      not_contract: [item.not_contract],
    });
  }

  getCopy(id: number) {
    this._invoiceService.getInvoiceById(id).subscribe((invoice) => {
      this.setInvoiceCopy(invoice);
      this.constructionSelected = invoice.construction!;
    });
  }

  setInvoiceCopy(lastInvoice: Invoice) {
    lastInvoice.creation_date = undefined;
    lastInvoice.id_invoice = undefined;
    const newInvoice: Invoice = lastInvoice;
    newInvoice.total_last = lastInvoice.total_origin;
    this.completeItemsCopy(lastInvoice.items, newInvoice);
  }

  completeItemsCopy(items?: ItemInvoice[], newInvoice?: Invoice) {
    if (!items || !newInvoice) return;

    items.forEach((item) => {
      const newItem = {
        id_item_invoice: undefined,
        unit_origin: (item.unit_last ?? 0) + (item.unit_total ?? 0),
        unit_last: (item.unit_last ?? 0) + (item.unit_total ?? 0),
        unit_total: 0,
        price: item.price,
        product: item.product,
        invoice: item.invoice,
        not_contract: item.not_contract,
      };

      newInvoice.items = newInvoice.items || [];
      newInvoice.items.push(newItem);
      this.itemsFormArray.push(this.setItem(newItem));
    });
    this.formInvoice.patchValue(newInvoice);
    this.getNumberInvoiceFormat();
  }

  createInvoiceByBudget(idBudget: number) {
    this._budgetService.getBudgetById(idBudget).subscribe((budget) => {
      this.getNumberInvoiceFormat();
      this.setInvoiceByBudget(budget);
    });
  }

  setInvoiceByBudget(budget: Budget) {
    let invoice: Invoice = {};
    invoice.construction = budget.construction;
    invoice.client = budget.client;
    this.constructionSelected = invoice.construction!;

    invoice.items = [];

    budget.items?.forEach((item) => {
      let itemInvoice = {
        product: item.product,
        unit_origin: item.quantity,
        unit_last: 0,
        unit_total: item.quantity + 0,
        price: item.price,
        not_contract: false,
      } as ItemInvoice;

      invoice.items?.push(itemInvoice);
    });

    this.formInvoice.patchValue(invoice);
    this.completeItems(invoice.items);
  }

  submit() {
    const invoice = this.formInvoice.getRawValue() as Invoice;
    this._invoiceService.saveInvoice(invoice).subscribe((invoice) => {
      this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
      this._router.navigate([Endpoints.DASHBOARD, Endpoints.INVOICE]);
    });
  }

  onConstructionSelected(construction: Construction) {
    this.formInvoice.controls.construction.patchValue(construction);
  }

  getNumberInvoiceFormat() {
    this._invoiceService.getNumberInvoice().subscribe(
      (num) => {
        this.formInvoice.controls.number_invoice.setValue(num);
        this.formInvoice.controls.number_invoice_format.setValue(
          this.setNumberInvoice(num)
        );
      },
      (errorService) => {
        console.log(errorService);
      }
    );
  }

  setNumberInvoice(num: number) {
    let text = num.toString();
    for (let index = 0; 3 > text.length; index++) {
      text = '0' + text;
    }
    return `${text}-${new Date().getFullYear()}`;
  }

  /*Gestion de items*/
  private createItem(notContract: boolean = false): FormGroup {
    return this._formbuilder.group({
      id_item_invoice: [null as number | null],
      unit_origin: [0, Validators.required],
      unit_last: [0, Validators.required],
      unit_total: [0, Validators.required],
      product: [null as Product | null, Validators.required],
      price: [0, Validators.required],
      not_contract: [notContract, Validators.required],
    });
  }

  public addItem(): void {
    this.itemsFormArray.push(this.createItem());
  }

  public removeItem(index: number, item: any): void {
    const itemInvoice: ItemInvoice = item.value;
    if (itemInvoice.id_item_invoice?.toString() != '') {
      this._itemInvoiceService.deleteItemInvoice(itemInvoice).subscribe();
    }
    this.itemsFormArray.removeAt(index);
  }

  public addItemNotContract(): void {
    this.itemsFormArray.push(this.createItem(true));
  }

  public get itemsFormArray(): FormArray {
    return this.formInvoice.controls.items as FormArray;
  }
}
