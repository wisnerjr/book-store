import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumValue'
})
export class EnumValuePipe implements PipeTransform {

  transform(values, args:string[]) : any {
    let listValue = [];
    for (let value in values) {
      listValue.push(value);
    }
    return listValue;
  }

}
