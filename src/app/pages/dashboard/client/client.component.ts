import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteActions } from '@core/enums';
import {
  IonButton,
  IonCol,
  IonContent,
  IonInput,
  IonItem,
  IonRow,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [
    IonContent,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonInput,
    RouterLink,
    HeaderPageComponent,
  ],
})
export class ClientComponent implements OnInit {
  public folder: string = 'CLIENTE';

  RouteActions = RouteActions;

  ngOnInit() {}
}
