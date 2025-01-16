import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class BudgetDetailComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
