import { Component, input } from '@angular/core';
import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.scss'],
  imports: [IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar],
})
export class HeaderPageComponent {
  title = input.required();
}
