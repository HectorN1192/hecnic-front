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
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
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
export class ClientDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
