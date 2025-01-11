import { BasicFormControl } from '../abstracts/basic-form-control.abstract';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ControlErrorDirective } from '../directives/control-errors.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'ui-input-number',
  standalone: true,
  templateUrl: 'input-number.component.html',
  imports: [ControlErrorDirective, ReactiveFormsModule, InputNumberModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent extends BasicFormControl<number> {
  public readonly min = input<number>();
  public readonly max = input<number>();
  public readonly suffix = input('');
  public readonly prefix = input('');
  public readonly minFractionDigits = input<number>();
  public readonly maxFractionDigits = input<number>();
  public readonly showButtons = input(false);
}
