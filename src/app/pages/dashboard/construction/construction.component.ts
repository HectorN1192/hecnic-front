import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class ConstructionComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
