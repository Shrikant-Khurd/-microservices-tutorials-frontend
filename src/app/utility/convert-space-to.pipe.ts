import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertSpaceTo'
})
export class ConvertSpaceToPipe implements PipeTransform {

  transform(value: string, args: string):string {
    return value.replace(' ', args);
  }

}
