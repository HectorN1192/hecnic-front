import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class ConfigurationComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
