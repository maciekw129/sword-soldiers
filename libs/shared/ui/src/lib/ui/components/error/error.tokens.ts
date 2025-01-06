import { InjectionToken } from '@angular/core';

export const VALIDATION_ERRORS_CONTENT = new InjectionToken<
  Record<string, string>
>('VALIDATION_ERRORS_CONTENT');
