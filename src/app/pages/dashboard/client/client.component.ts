import { AsyncPipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteActions } from '@core/enums';
import { ClientService } from '@core/services';
import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonRow,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
import {
  DatatableComponent,
  NgxDatatableModule,
  SortType,
} from '@swimlane/ngx-datatable';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  imports: [
    AsyncPipe,
    HeaderPageComponent,
    IonButton,
    IonCol,
    IonContent,
    IonIcon,
    IonInput,
    IonItem,
    IonRow,
    NgxDatatableModule,
    RouterLink,
  ],
})
export class ClientComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table!: DatatableComponent;
  @ViewChild('actions', { static: true })
  private actionsTemplate!: TemplateRef<any>;

  RouteActions = RouteActions;
  sortType = SortType;
  clientService = inject(ClientService);

  clientsRows$ = this.clientService.getClient();
  public columns: any;

  ngOnInit(): void {
    this.columns = [
      {
        prop: 'actions',
        name: 'Acciones',
        maxWidth: 120,
        cellTemplate: this.actionsTemplate,
      },
      {
        prop: 'name',
        name: 'Cliente',
        minWidth: 300,
        headerClass: 'text-align-center',
      },
    ];
  }

  constructor() {
    addIcons({
      createOutline,
      eyeOutline,
      trashOutline,
    });
  }
}
