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
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
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
export class ClientViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
