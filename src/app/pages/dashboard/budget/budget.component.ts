import { Component, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderPageComponent } from '@shared/components';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  imports: [HeaderPageComponent, IonContent],
})
export class BudgetComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
