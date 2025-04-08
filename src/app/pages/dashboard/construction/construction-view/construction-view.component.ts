import { Component, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
@Component({
  selector: 'app-construction-view',
  templateUrl: './construction-view.component.html',
  styleUrls: ['./construction-view.component.scss'],
  imports: [
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ConstructionViewComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
