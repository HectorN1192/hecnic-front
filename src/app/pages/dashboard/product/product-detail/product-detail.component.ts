import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '@core/dtos';
import { ProductService, UtilsService } from '@core/services';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonButtons,
    IonBackButton,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonTextarea,
  ],
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: any;

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _productService = inject(ProductService);
  private readonly _router = inject(Router);
  private readonly _utilsServices = inject(UtilsService);

  formProduct = this._formBuilder.group({
    id_product: [0],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
  });

  ngOnInit() {
    this._router.url.includes('edit') ? this.getById(Number(this.id)) : null;
  }

  getById(id: number) {
    this._productService.getProductById(id).subscribe((product) => {
      this.formProduct.patchValue(product);
    });
  }

  submit() {
    let product = this.formProduct.getRawValue() as Product;
    product = { ...product, description: product.name };

    this._productService.saveProduct(product).subscribe({
      next: () => {
        this.formProduct.reset();
        this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
      },
      error: (errorService) => {
        this._utilsServices.presentSaveToast(false, 'Error');
        console.log(errorService);
      },
    });

    this._productService.saveProduct(product).subscribe(
      () => {
        this.formProduct.reset();
        this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
      },
      (errorService) => {
        this._utilsServices.presentSaveToast(false, 'Error');
        console.log(errorService);
      }
    );
  }
}
