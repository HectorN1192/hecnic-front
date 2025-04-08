import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-selectable',
  templateUrl: './selectable.component.html',
  styleUrls: ['./selectable.component.scss'],
  standalone: true,
  imports: [
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
  @Input() items: T[] = [];
  @Input() labelKey!: string;
  @Input() valueKey!: string;
  @Input() placeholder: string = 'Selecciona una opción';
  @Input() selectedValue?: T;

  @Output() selectionChange = new EventEmitter<T>();

  searchTerm: string = '';
  isModalOpen = false;

  get filteredItems(): T[] {
    if (!this.searchTerm) return this.items;
    return this.items.filter((item) =>
      String(item[this.labelKey])
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
    this.searchTerm = '';
  }

  selectItem(item: T): void {
    this.selectedValue = item[this.valueKey];
    this.selectionChange.emit(item);
    this.setOpen(false);
  }

  getSelectedLabel(): string {
    const found = this.items.find(
      (item) => item[this.valueKey] === this.selectedValue
    );
    return found ? String(found[this.labelKey]) : '';
  }
}
