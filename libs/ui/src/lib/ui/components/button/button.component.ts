import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  output,
} from '@angular/core';
import { ButtonDesign, ButtonType } from './button.model';
import { Button } from 'primeng/button';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: 'button.component.html',
  styleUrl: 'button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
})
export class ButtonComponent {
  public label = input<string>();
  public icon = input<string>();
  public type = input<ButtonType>('button');
  public design = input<ButtonDesign>('default');
  public isLoading = input(false);
  public disabled = input(false);

  public readonly onClick = output();
}
