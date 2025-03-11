import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeRequestRetention'
})
export class TypeRequestRetentionPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const messagePartial = 'Solicitar el 50%' ;
    const messageTotal = 'Solicitar el Total' ;

    return value == 0 ? messagePartial : messageTotal;
  }

}
