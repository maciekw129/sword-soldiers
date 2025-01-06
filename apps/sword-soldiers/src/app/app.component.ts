import { Component, computed, inject, Signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent, SidebarMenuComponent } from '@ui/components';
import { Toast } from 'primeng/toast';
import { AuthService } from '@auth0/auth0-angular';
import { MENU_ITEMS } from './core/sidebar-menu/sidebar-menu.const';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  SidebarActions,
  SidebarParams,
} from './core/sidebar-menu/sidebar-menu.model';
import { usersStore } from '@users/api';
import { NavbarComponent } from './core/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    BreadcrumbsComponent,
    NavbarComponent,
    SidebarMenuComponent,
    Toast,
    NavbarComponent,
  ],
  selector: 's-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly authService = inject(AuthService);
  private readonly usersStore = inject(usersStore);

  public readonly menuItems = MENU_ITEMS;

  private readonly isAuthenticated: Signal<boolean> = toSignal(
    this.authService.isAuthenticated$
  );

  public readonly params: Signal<SidebarParams> = computed(() => ({
    isAuthenticated: this.isAuthenticated(),
    permissions: this.usersStore.permissions(),
  }));

  public readonly actions: SidebarActions = {
    logout: () =>
      this.authService.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      }),
  };
}
