import { inject } from '@angular/core';
import { usersStore } from '@data-access/users';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { toSignal } from '@angular/core/rxjs-interop';

export class UserGuards {
  public static shouldCreateUser(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      if (UserGuards.canCreateUser()(route, state)) {
        return createUrlTreeFromSnapshot(route, ['/create-user']);
      }

      return true;
    };
  }

  public static canCreateUser(): CanActivateFn {
    return () => {
      const { user } = inject(usersStore);
      const isAuthenticated = toSignal(inject(AuthService).isAuthenticated$);

      return Boolean(isAuthenticated()) && user() === null;
    };
  }
}
