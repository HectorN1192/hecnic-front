import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class InvoiceComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
