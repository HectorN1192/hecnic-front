import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonRouterLink,
  IonRow,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [
    RouterLink,
    IonButton,
    IonCol,
    IonContent,
    IonInput,
    IonItem,
    IonRouterLink,
    IonRow,
    HeaderPageComponent,
  ],
})
export class ProductComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
