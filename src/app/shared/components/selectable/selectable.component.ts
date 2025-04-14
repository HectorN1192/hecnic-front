import {
  Component,
  computed,
  effect,
  EventEmitter,
  input,
  Output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TypeSelectableEnum } from '@core/enums';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonSearchbar,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss'],
  standalone: true,
  imports: [
    IonTextarea,
    IonInput,
    IonSearchbar,
    IonItem,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    FormsModule,
  ],
})
export class SelectableComponent<T extends Record<string, any>> {
  TypeSelectable = TypeSelectableEnum;

  items = input<T[]>([]);
  labelKey = input<string>('');
  valueKey = input<string>('');
  placeholder = input<string>('Selecciona una opción');
  selectedValueInput = input<T>();
  type = input<string>(this.TypeSelectable.INPUT);

  @Output() selectionChange = new EventEmitter<T>();

  searchTerm: string = '';
  isModalOpen = false;

  selectedValue = signal<T | undefined>(undefined);

  labelSelected = computed(() => {
    const found = this.items().find(
      (item) =>
        item[this.valueKey() ?? ''] ===
        this.selectedValue()?.[this.valueKey() ?? '']
    );
    return found ? String(found[this.labelKey()]) : '';
  });

  constructor() {
    effect(() => {
      this.selectedValue.set(this.selectedValueInput());
    });
  }

  get filteredItems(): T[] {
    if (!this.searchTerm) return this.items();
    return this.items().filter((item) =>
      String(item[this.labelKey()])
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
    this.searchTerm = '';
  }

  selectItem(item: T): void {
    this.selectedValue.set(item);
    this.selectionChange.emit(item);
    this.setOpen(false);
  }
}
