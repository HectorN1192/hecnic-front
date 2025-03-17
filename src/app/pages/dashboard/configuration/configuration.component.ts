import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ParamsConfiguration } from '@core/dtos';
import { ParamsConfigurationService, UtilsService } from '@core/services';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
} from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  imports: [
    HeaderPageComponent,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    ReactiveFormsModule,
  ],
})
export class ConfigurationComponent {
  private readonly _utilsServices = inject(UtilsService);
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _paramsConfigurationService = inject(
    ParamsConfigurationService
  );

  formParams = this._formbuilder.group({
    id_param: [0],
    excess_cement: [0],
    hours_without_tools: [0],
    hours_with_tools: [0],
    account_number: [''],
    passive_subject: [''],
  });

  ionViewWillEnter() {
    this.getParamsConfiguration();
  }

  getParamsConfiguration() {
    this._paramsConfigurationService.getParamsConfiguration().subscribe({
      next: (params) => {
        console.log(params);
        this.formParams.patchValue(params[0]);
      },
      error: (errorService) => {
        console.log(errorService);
      },
    });
  }

  submit() {
    if (this.formParams.valid) {
      let params = this.formParams.getRawValue() as ParamsConfiguration;
      this._paramsConfigurationService
        .saveParamsConfiguration(params)
        .subscribe({
          next: () => {
            this._utilsServices.presentSaveToast(
              true,
              'Guardado correctamente'
            );
          },
          error: (errorService) => {
            this._utilsServices.presentSaveToast(false, 'Error');
            console.log(errorService);
          },
        });
    }
  }
}
