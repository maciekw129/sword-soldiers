import { AuthService } from '@auth0/auth0-angular';
import { UsersService, UsersStore } from '@data-access/users';
import { Router } from '@angular/router';
import { combineLatest, filter, switchMap, take, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@data-access/users';

export const initializeApp = (
  userService: UsersService,
  authService: AuthService,
  userStore: UsersStore,
  router: Router
) => {
  return () =>
    authService.isAuthenticated$.pipe(
      take(1),
      filter(Boolean),
      switchMap(() =>
        combineLatest([
          userService.getCurrentUser$(),
          authService.getAccessTokenSilently(),
        ])
      ),
      tap(([user, token]) => {
        const { permissions } = jwtDecode<TokenPayload>(token);

        userStore.setUser(user);
        userStore.setPermissions(permissions);

        if (user === null) {
          router.navigate(['/create-user']);
        }
      })
    );
};
