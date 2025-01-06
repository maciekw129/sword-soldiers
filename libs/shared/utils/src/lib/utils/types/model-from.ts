import { AbstractControl, FormGroup } from '@angular/forms';

export type ModelFrom<T extends Record<keyof T, AbstractControl>> = ReturnType<
  FormGroup<T>['getRawValue']
>;
