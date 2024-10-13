import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SidebarMenuItem, SidebarPosition } from './sidebar-menu.model';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ui-sidebar-menu',
  standalone: true,
  templateUrl: 'sidebar-menu.component.html',
  styleUrl: 'sidebar-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, RouterLink, TooltipModule, NgClass],
})
export class SidebarMenuComponent {
  public items = input.required<SidebarMenuItem[]>();
  public position = input<SidebarPosition>('right');
}
