import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { SidebarMenuComponent } from '@ui/components';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { usersStore } from '@data-access/users';
import { SidebarActions, SidebarParams } from '../sidebar/sidebar.model';
import { MENU_ITEMS } from '../sidebar/sidebar.const';

@Component({
  selector: 's-shell',
  standalone: true,
  templateUrl: 'shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    ToastModule,
    SidebarMenuComponent,
    BreadcrumbsComponent,
  ],
})
export class ShellComponent {
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
