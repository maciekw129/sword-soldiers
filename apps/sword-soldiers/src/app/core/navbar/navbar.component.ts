import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@ui/components';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';
import { usersStore } from '@data-access/users';

@Component({
  selector: 's-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
  styleUrl: 'navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ButtonComponent, AsyncPipe],
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly userStore = inject(usersStore);

  public readonly isAuthenticated$ = this.authService.isAuthenticated$;

  public readonly user = this.userStore.user;

  public redirectToLogin(): void {
    this.authService.loginWithRedirect();
  }
}
