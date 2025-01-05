import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BasicFormControl } from '../abstracts/basic-form-control.abstract';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorDirective } from '../directives/control-errors.directive';
import { InputTextType } from './input-text.model';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'ui-input-text',
  standalone: true,
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    ControlErrorDirective,
    FloatLabel,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputTextComponent<T> extends BasicFormControl<T> {
  public readonly type = input<InputTextType>('text');
}
