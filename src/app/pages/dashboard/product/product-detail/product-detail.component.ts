import { Component, OnInit } from '@angular/core';
import {
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [
    IonButtons,
    IonCol,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonRow,
    IonTitle,
    IonToolbar,
  ],
})
export class ProductDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
