import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client, Email } from '@core/dtos';
import { ClientService, EmailService, UtilsService } from '@core/services';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss'],
  imports: [
    ReactiveFormsModule,
    IonButtons,
    IonButton,
    IonCol,
    IonContent,
    IonHeader,
    IonBackButton,
    IonRow,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonLabel,
    IonIcon,
  ],
})
export class ClientDetailComponent implements OnInit {
  @Input() id!: number;

  private readonly _formbuilder = inject(FormBuilder);
  private readonly _clientService = inject(ClientService);
  private readonly _emailService = inject(EmailService);
  private readonly _utilsServices = inject(UtilsService);

  formClient = this._formbuilder.group({
    id_client: [0],
    name: ['', Validators.required],
    cif: [''],
    address: [''],
    phone: [''],
    province: [''],
    city: [''],
    postal_code: [''],
    emails: this._formbuilder.array([]),
  });

  constructor() {
    addIcons({
      trashOutline,
    });
  }

  ngOnInit(): void {
    console.log('ID: ', this.id);
    this.getById(this.id);
  }

  getById(id: number) {
    this._clientService.getClientById(id).subscribe(
      (client: Client) => {
        this.formClient.patchValue(client);
        this.completeEmails(client.emails);
      },
      (errorService) => {
        console.log(errorService);
      }
    );
  }

  /*Gestion de emails*/
  completeEmails(emails: Email[]) {
    emails.forEach((email) => {
      this.emailsFormArray.push(this.setEmail(email));
    });
  }

  private createEmail(): FormGroup {
    return this._formbuilder.group({
      id_email: [''],
      email: ['', Validators.email],
      id_client: [this.id],
    });
  }

  private setEmail(email: Email): FormGroup {
    return this._formbuilder.group({
      id_email: [email.id_email],
      email: [email.email, Validators.email],
      id_client: [email.id_client],
    });
  }

  public addEmail(): void {
    this.emailsFormArray.push(this.createEmail());
  }

  public removeEmail(email: Email, index: number): void {
    this.emailsFormArray.removeAt(index);
    if (email.id_email) {
      this._emailService
        .deleteEmail(email)
        .subscribe(() =>
          this._utilsServices.presentSaveToast(true, 'Borrado correctamente')
        );
    }
  }

  public get emailsFormArray(): FormArray {
    return this.formClient.controls.emails as FormArray;
  }

  submit() {
    if (this.formClient.valid) {
      let client = this.formClient.getRawValue() as Client;
      console.log(client);
      this._clientService.saveClient(client).subscribe({
        next: (client) => {
          this.formClient.patchValue(client);
          this._utilsServices.presentSaveToast(true, 'Guardado correctamente');
        },
        error: (errorService) => {
          this._utilsServices.presentSaveToast(false, 'Error');
          console.log(errorService);
        },
      });
    }
  }
}
