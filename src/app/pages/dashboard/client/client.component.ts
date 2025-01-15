import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonRouterLink,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonRow,
    IonCol,
    IonButton,
    IonRouterLink,
    IonItem,
    IonLabel,
    IonInput,
  ],
})
export class ClientComponent implements OnInit {
  public folder: string = 'CLIENTE';

  RouteActions = RouteActions;

  ngOnInit() {}
}

export enum RouteActions {
  CREATE = 'create',
}
