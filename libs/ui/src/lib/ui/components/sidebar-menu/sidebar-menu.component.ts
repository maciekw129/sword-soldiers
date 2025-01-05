import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SidebarMenuItem, SidebarPosition } from './sidebar-menu.model';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'ui-sidebar-menu',
  standalone: true,
  templateUrl: 'sidebar-menu.component.html',
  styleUrl: 'sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, RouterLink, TooltipModule],
})
export class SidebarMenuComponent<
  A = Record<string, () => unknown>,
  P = unknown
> {
  public items = input.required<SidebarMenuItem<A, P>[]>();
  public actions = input<A>();
  public params = input<P>();
  public position = input<SidebarPosition>('right');
}
