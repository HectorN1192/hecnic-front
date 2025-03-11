import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'booleanPipe', standalone: true })
export class BooleanPipe implements PipeTransform {
  transform(value: any) {
    return value ? 'Si' : 'No';
  }
}
