import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-filter-year',
  templateUrl: './filter-year.component.html',
  styleUrls: ['./filter-year.component.scss'],
  imports: [IonItem, IonLabel, IonSelect, IonSelectOption, FormsModule],
})
export class FilterYearComponent {
  private readonly _formBuilder = inject(FormBuilder);

  years = input<number[] | null>([]);
  changeYear = output<number>();

  filter = signal<number>(new Date().getFullYear());

  constructor() {
    effect(() => {
      const yearSelected = this.filter();
      this.filterYear(yearSelected);
    });
  }

  filterYear(yearSelected: number) {
    this.changeYear.emit(yearSelected);
  }
}
