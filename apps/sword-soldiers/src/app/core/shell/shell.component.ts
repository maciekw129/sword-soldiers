import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 's-shell',
  standalone: true,
  templateUrl: 'shell.component.ts.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class ShellComponent {}
