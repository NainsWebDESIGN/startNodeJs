import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todos'
})
export class Todos implements PipeTransform {

  transform(value: any) {
    return (value !== "Server Error") ? value : [];
  }

}
