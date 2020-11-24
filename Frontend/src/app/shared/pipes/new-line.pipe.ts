import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(value: String): String {
   return value.split('\\n').join('<br />')
    // return value.replace('\\n', '<br />');
  }

}
