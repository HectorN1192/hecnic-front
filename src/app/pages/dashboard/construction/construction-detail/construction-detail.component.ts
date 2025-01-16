import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';
@Component({
  selector: 'app-construction-detail',
  templateUrl: './construction-detail.component.html',
  styleUrls: ['./construction-detail.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class ConstructionDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
