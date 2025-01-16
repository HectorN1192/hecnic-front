import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class InvoiceDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
