import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ShellComponent } from './core/shell/shell.component';

@Component({
  standalone: true,
  imports: [RouterModule, ShellComponent],
  selector: 's-root',
  templateUrl: './app.component.html',
})
export class AppComponent {}
