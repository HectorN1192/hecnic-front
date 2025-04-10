import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Email } from '@core/dtos';
import {} from '@ionic/angular';
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-emails',
  templateUrl: './modal-emails.component.html',
  styleUrls: ['./modal-emails.component.scss'],
  imports: [
    IonList,
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonFooter,
    IonCheckbox,
    ReactiveFormsModule,
  ],
})
export class ModalEmailsComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _modalController = inject(ModalController);

  public emails: Email[] = [];
  public formEmailArray = this._formBuilder.array([]);

  constructor() {
    addIcons({
      closeOutline,
    });
  }

  ngOnInit() {
    this.emails.forEach((email) =>
      this.formEmailArray.push(new FormControl(email))
    );
  }

  sendEmail() {
    const emailsSelected: Email[] = this.formEmailArray
      .getRawValue()
      .map((checked, index) => (checked ? this.emails[index] : null))
      .filter((value) => value !== null);
    this._modalController.dismiss(emailsSelected);
  }

  closeModal() {
    this._modalController.dismiss();
  }
}
