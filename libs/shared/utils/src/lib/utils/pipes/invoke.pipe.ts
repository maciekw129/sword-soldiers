import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoke',
  standalone: true,
})
export class InvokePipe implements PipeTransform {
  transform<T>(callback: (...args: unknown[]) => T, ...args: unknown[]): T {
    return callback(...args);
  }
}
