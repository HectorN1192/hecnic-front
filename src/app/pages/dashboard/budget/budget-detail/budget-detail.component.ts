import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Budget, Client, Construction, ItemBudget } from '@core/dtos';
import { Endpoints } from '@core/enums';
import {
  BudgetService,
  ConstructionService,
  ItemBudgetService,
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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { SelectableComponent } from '@shared/components';
import { shareReplay } from 'rxjs';
import { BudgetItemComponent } from '../budget-item/budget-item.component';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
  imports: [
    IonInput,
    IonBackButton,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonModal,
    IonRow,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
    AsyncPipe,
    SelectableComponent,
    BudgetItemComponent,
  ],
})
export class BudgetDetailComponent implements OnInit {
  @Input() id!: number;

  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _utilsServices = inject(UtilsService);
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _budgetService = inject(BudgetService);
  private readonly _constructionService = inject(ConstructionService);
  private readonly _itemBudgetService = inject(ItemBudgetService);
  private readonly _productService = inject(ProductService);

  dateNow: string = new Date().toISOString();

  constructionSelected!: Construction;
  constructions$ = this._constructionService
    .getConstruction()
    .pipe(shareReplay(1));
  products$ = this._productService.getProduct().pipe(shareReplay(1));

  formBudget = this._formbuilder.group({
    id_budget: [0],
    client: [{} as Client, Validators.required],
    construction: [{} as Construction, Validators.required],
    creation_date: [this.dateNow, Validators.required],
    items: this._formbuilder.array([]),
  });

  constructor() {
    this.formBudget.controls.construction.valueChanges.subscribe(
      (construction: Construction | null) => {
        if (construction && construction.client) {
          this.formBudget.controls.client.setValue(construction.client);
        }
      }
    );
  }

  ngOnInit(): void {
    if (this.id) this.getById(this.id);
  }

  getById(id: number) {
    this._budgetService
      .getBudgetById(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (budget) => {
          this.formBudget.patchValue(budget);
          this.constructionSelected = budget.construction!;
          this.completeItems(budget.items);
        },
      });
  }

  completeItems(items?: ItemBudget[]) {
    items?.forEach((item) => {
      this.itemsFormArray.push(this.setItem(item));
    });
  }

  private setItem(item: ItemBudget): FormGroup {
    return this._formbuilder.group({
      id_item_budget: [item.id_item_budget],
      quantity: [item.quantity],
      price: [item.price],
      total: [],
      product: [item.product],
      budget: [item.budget],
    });
  }

  public addItem(): void {
    this.itemsFormArray.push(this.createItem());
  }

  private createItem(): FormGroup {
    return this._formbuilder.group({
      id_item_budget: [''],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      total: ['', Validators.required],
      product: ['', Validators.required],
    });
  }

  public removeItem(index: number, item: any): void {
    const itemBudget: ItemBudget = item.value;
    if (itemBudget.id_item_budget.toString() != '') {
      this._itemBudgetService.deleteItemBudget(itemBudget).subscribe();
    }
    this.itemsFormArray.removeAt(index);
  }

  submit() {
    const budget = this.formBudget.getRawValue() as Budget;
    this._budgetService.saveBudget(budget).subscribe((budget) => {
      this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
      this._router.navigate([Endpoints.BUDGET]);
    });
  }

  public get itemsFormArray(): FormArray {
    return this.formBudget.get('items') as FormArray;
  }

  onConstructionSelected(construction: Construction) {
    this.formBudget.controls.construction.patchValue(construction);
  }
}
