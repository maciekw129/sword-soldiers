import { Directive, input } from '@angular/core';
import { CustomFormControl } from './custom-form-control.abstract';

@Directive()
export abstract class BasicFormControl<T> extends CustomFormControl<T> {
  public label = input('');
  public note = input('');
  public fluid = input(true);
}
