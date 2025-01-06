import {
  TokenPayload,
  UsersHttpService,
  usersStore,
  UsersStore,
} from '@users/data-access';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { combineLatest, filter, switchMap, take, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

export const INITIALIZE_USER_DEPS = [
  UsersHttpService,
  AuthService,
  usersStore,
  Router,
];

export const initializeUser = (
  userService: UsersHttpService,
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
