import { Component, OnInit } from '@angular/core';
import { IonCol, IonContent, IonRow } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [HeaderPageComponent, IonCol, IonContent, IonRow],
})
export class ProductDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
