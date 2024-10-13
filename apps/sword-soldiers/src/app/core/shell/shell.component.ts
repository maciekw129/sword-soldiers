import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ToastModule } from 'primeng/toast';
import { SidebarMenuComponent, SidebarMenuItem } from '@ui/components';
import { PrimeIcons } from 'primeng/api';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 's-shell',
  standalone: true,
  templateUrl: 'shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavbarComponent, ToastModule, SidebarMenuComponent],
})
export class ShellComponent {
  private readonly authService = inject(AuthService);

  private readonly isAuthenticated: Signal<boolean> = toSignal(
    this.authService.isAuthenticated$
  );

  public readonly menuItems: Signal<SidebarMenuItem[]> = computed(() => [
    {
      icon: PrimeIcons.SIGN_OUT,
      text: 'Logout',
      design: 'default',
      action: () => this.logout(),
      enabled: () => this.isAuthenticated(),
    },
    {
      icon: PrimeIcons.HOME,
      text: 'Home',
      link: '/',
    },
    {
      icon: PrimeIcons.USER,
      text: 'My profile',
      link: '/user-profile',
      enabled: () => this.isAuthenticated(),
    },
  ]);

  private logout(): void {
    this.authService.logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }
}
