import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomFormControl } from '../abstracts/custom-form-control.abstract';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ControlErrorDirective } from '../directives/control-errors.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectButtonsOption } from './select-buttons.model';

@Component({
  selector: 'ui-select-buttons',
  standalone: true,
  templateUrl: 'select-buttons.component.html',
  styleUrl: 'select-buttons.component.scss',
  imports: [SelectButtonModule, ReactiveFormsModule, ControlErrorDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectButtonsComponent<T> extends CustomFormControl<T> {
  public options = input.required<SelectButtonsOption<T>[]>();
}
