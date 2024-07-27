import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { VALIDATION_ERRORS_CONTENT } from './error.tokens';

@Component({
  selector: 'ui-error',
  standalone: true,
  templateUrl: 'error.component.html',
  styleUrl: 'error.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class ErrorComponent {
  public readonly error = input('');
  public readonly validationErrorsContent = input<Record<string, string>>({});

  private readonly defaultValidationErrorsContent = inject(
    VALIDATION_ERRORS_CONTENT
  );

  public errorText = computed(() => {
    const combinedValidationErrorsContent = {
      ...this.defaultValidationErrorsContent,
      ...this.validationErrorsContent(),
    };

    return (
      combinedValidationErrorsContent[this.error()] ??
      combinedValidationErrorsContent['default']
    );
  });
}
