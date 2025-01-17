import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
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
  IonRow,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  briefcaseOutline,
  documentOutline,
  hammerOutline,
  homeOutline,
  newspaperOutline,
  personCircleOutline,
  settingsOutline,
} from 'ionicons/icons';
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
    IonRow,
  ],
})
export class DashboardComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  appPages: { title: string; link: string; icon: string }[] = [];

  ngOnInit() {
    this.appPages =
      this._activatedRoute.snapshot.routeConfig?.children
        ?.filter((child) => child.path !== '**')
        .map((child) => ({
          title: child.title?.toString() ?? '',
          link: child.path ?? '',
          icon: child.data?.['icon'] ?? '',
        })) ?? [];
  }

  constructor() {
    addIcons({
      briefcaseOutline,
      documentOutline,
      hammerOutline,
      homeOutline,
      newspaperOutline,
      personCircleOutline,
      settingsOutline,
    });
  }
}
