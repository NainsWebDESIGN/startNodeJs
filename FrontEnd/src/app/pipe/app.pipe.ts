import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todos'
})
export class Todos implements PipeTransform {

  transform(value: any) {
    // console.log(value);
    return (value !== "Server Error") ? value : [];
  }

}

@Pipe({
  name: 'asObject'
})
export class AsObject implements PipeTransform {

  transform(value, key?: string) {
    if (!value) return "undefined";
    return value[key];
  }

}
