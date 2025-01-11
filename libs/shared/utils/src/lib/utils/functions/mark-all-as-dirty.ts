import { FormControl, FormGroup } from '@angular/forms';

export function markAllAsDirty(group: FormGroup): void {
  Object.keys(group.controls).forEach((key) => {
    const control = group.controls[key];

    if (control instanceof FormGroup) {
      markAllAsDirty(control);
    }

    if (control instanceof FormControl) {
      control.markAsDirty();
    }
  });
}
