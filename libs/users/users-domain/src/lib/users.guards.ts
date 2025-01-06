import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  createUrlTreeFromSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { Permission, usersStore } from '@users/data-access';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';
import { hasAnyPermission } from './functions/has-any-permission';

export class UsersGuards {
  public static shouldCreateUser(): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      if (UsersGuards.canCreateUser()(route, state)) {
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

  public static permission(requiredPermissions: Permission[]): CanActivateFn {
    return () => {
      const { permissions } = inject(usersStore);

      return hasAnyPermission(permissions(), requiredPermissions);
    };
  }
}
