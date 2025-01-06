import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-link',
  standalone: true,
  templateUrl: 'link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class LinkComponent {
  public readonly href = input<string>();
  public readonly routerLink = input<string>();

  public readonly onClick = output();
}
