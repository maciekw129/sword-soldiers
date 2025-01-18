import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getLabel', standalone: true })
export class getLabelPipe implements PipeTransform {
  transform<T, K extends keyof T>(value: T, key: K): T[K] {
    return value[key];
  }
}
