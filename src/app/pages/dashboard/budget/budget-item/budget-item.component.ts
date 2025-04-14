import { Component, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '@core/dtos';
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonItemSliding,
  IonLabel,
  IonRow,
} from '@ionic/angular/standalone';
import { SelectableComponent } from '@shared/components';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-budget-item',
  templateUrl: './budget-item.component.html',
  styleUrls: ['./budget-item.component.scss'],
  imports: [
    IonItemSliding,
    IonCol,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
    IonGrid,
    IonIcon,
    ReactiveFormsModule,
    SelectableComponent,
  ],
})
export class BudgetItemComponent implements OnInit {
  formItem = input<any>();

  products = input<Product[] | null>();

  deleteItem = output();

  constructor() {
    addIcons({
      trashOutline,
    });
  }

  ngOnInit() {
    this.setTotalItem(this.formItem());

    this.formItem()?.controls.product.valueChanges.subscribe(
      (product: Product) =>
        this.formItem()?.controls.price.setValue(product.price)
    );
    this.formItem()?.controls.price.valueChanges.subscribe((price: number) =>
      this.formItem()?.controls.total.setValue(
        price * (this.formItem()?.controls.quantity.value ?? 0)
      )
    );
    this.formItem()?.controls.quantity.valueChanges.subscribe(
      (quantity: number) =>
        this.formItem()?.controls.total.setValue(
          quantity * (this.formItem()?.controls.price.value ?? 0)
        )
    );
  }

  setTotalItem(formItem: any) {
    formItem?.controls.total.setValue(
      formItem?.controls.quantity.value * formItem?.controls.price.value
    );
  }

  deteleItem() {
    this.deleteItem.emit();
  }

  onProductSelected(product: Product) {
    this.formItem().controls.product.patchValue(product);
  }
}
