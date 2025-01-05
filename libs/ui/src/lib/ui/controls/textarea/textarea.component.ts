import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BasicFormControl } from '../abstracts/basic-form-control.abstract';
import { Textarea } from 'primeng/textarea';
import { ControlErrorDirective } from '../directives/control-errors.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  templateUrl: 'textarea.component.html',
  styleUrl: 'textarea.component.scss',
  imports: [Textarea, ReactiveFormsModule, ControlErrorDirective, FloatLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent<T> extends BasicFormControl<T> {
  public readonly rows = input<number>(5);
  public readonly autoResize = input<boolean>(true);
}
