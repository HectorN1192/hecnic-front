import { Component, input, OnInit, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '@core/dtos';
import { TypeSelectableEnum } from '@core/enums';
import {
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonItemSliding,
  IonRow,
} from '@ionic/angular/standalone';
import { SelectableComponent } from '@shared/components';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
@Component({
  selector: 'app-invoice-item',
  templateUrl: './invoice-item.component.html',
  styleUrls: ['./invoice-item.component.scss'],
  imports: [
    IonItemSliding,
    IonCol,
    IonInput,
    IonItem,
    IonRow,
    IonGrid,
    IonIcon,
    ReactiveFormsModule,
    SelectableComponent,
  ],
})
export class InvoiceItemComponent implements OnInit {
  TypeSelectable = TypeSelectableEnum;

  formItem = input<any>();

  products = input<Product[] | null>();

  deleteItem = output();

  constructor() {
    addIcons({
      trashOutline,
    });
  }

  ngOnInit() {
    this.formItem().controls.product.valueChanges.subscribe(
      (product: Product) =>
        this.formItem().controls.price.setValue(product.price)
    );

    this.formItem().controls.unit_origin.valueChanges.subscribe(
      (origen: number) => {
        this.formItem().controls.unit_total.setValue(
          origen - this.formItem().controls.unit_last.value
        );
      }
    );
  }

  deteleItem() {
    this.deleteItem.emit();
  }

  onProductSelected(product: Product) {
    this.formItem().controls.product.patchValue(product);
  }
}
