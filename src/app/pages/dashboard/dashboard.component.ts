import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  Routes,
} from '@angular/router';
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    IonRouterOutlet,
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
  ],
})
export class DashboardComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  appPages: Routes = [];

  ngOnInit() {
    this.appPages =
      this._activatedRoute.snapshot.routeConfig?.children?.filter(
        (child) => child.path !== '**'
      ) ?? [];
  }
}
