import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroPipe',
  standalone: true,
})
export class EuroPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    var num_parts = value.toString().split('.');
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return num_parts.join(',') + ' €';
  }
}
