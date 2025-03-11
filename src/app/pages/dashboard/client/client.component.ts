import { AsyncPipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Client } from '@core/dtos';
import { RouteActions } from '@core/enums';
import { ClientService } from '@core/services';
import {
  AlertController,
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
import { debounceTime, distinctUntilChanged, map, of, Subject } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  private readonly _alertController = inject(AlertController);
  clientService = inject(ClientService);

  RouteActions = RouteActions;
  sortType = SortType;

  clientsRows$ = of<Client[]>([]);
  rows$ = this.clientsRows$;

  public columns: any;

  searchSubject = new Subject<string>();

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

    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntilDestroyed(),
        map((val) => val.toLowerCase())
      )
      .subscribe((val) => this.filterClients(val));
  }

  ionViewWillEnter() {
    this.getClients();
  }

  getClients() {
    this.clientsRows$ = this.clientService.getClient();
    this.rows$ = this.clientsRows$;
  }

  updateFilter(event: any) {
    const val = event?.target?.value;
    this.searchSubject.next(val);
  }

  filterClients(val: string) {
    this.rows$ = this.clientsRows$.pipe(
      map((clients) =>
        clients.filter(
          (client: Client) => client.name.toLowerCase().includes(val) || !val
        )
      )
    );

    this.table.offset = 0;
  }

  async presentAlertDelete(client: Client) {
    console.log('deleteClient', client);
    const alert = await this._alertController.create({
      header: 'Borrar!',
      subHeader: '¿Quieres borrar el cliente?',
      message: client.name,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteClient(client);
          },
        },
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {},
        },
      ],
    });
    await alert.present();
  }

  deleteClient(client: Client) {
    this.clientService.deleteClient(client).subscribe({
      next: () => {
        this.rows$ = this.rows$.pipe(
          map((rows) => rows.filter((c) => c.id_client !== client.id_client))
        );
      },
      error: (errorService) => {
        console.log(errorService);
      },
    });
  }
}
