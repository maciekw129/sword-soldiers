import { Route } from '@angular/router';
import { UserGuards } from './domains/user/user.guards';
import { authGuardFn } from '@auth0/auth0-angular';
import { SETTINGS_PERMISSIONS } from './domains/settings/settings.const';
import { APP_PATHS } from './app.const';
import { AppRoute } from './app.model';

export const appRoutes: Route[] = [
  {
    path: 'create-user',
    canActivate: [UserGuards.canCreateUser()],
    loadComponent: () =>
      import('./domains/user/create-user/create-user.component').then(
        (c) => c.CreateUserComponent
      ),
  },
  {
    path: '',
    canActivate: [UserGuards.shouldCreateUser()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'user-profile',
        data: {
          breadcrumb: 'User profile',
        },
        canActivate: [authGuardFn],
        loadComponent: () =>
          import('./domains/user/user-profile/user-profile.component').then(
            (c) => c.UserProfileComponent
          ),
      },
      {
        path: 'play',
        data: {
          breadcrumb: 'Play',
        },
        canActivate: [authGuardFn],
        loadComponent: () =>
          import('./domains/game/game.component').then((c) => c.GameComponent),
      },
      {
        path: APP_PATHS[AppRoute.SETTINGS],
        data: {
          breadcrumb: 'Settings',
        },
        canActivate: [authGuardFn, UserGuards.permission(SETTINGS_PERMISSIONS)],
        loadChildren: () =>
          import('./domains/settings/settings-routing.module').then(
            (m) => m.SettingsRoutingModule
          ),
      },
    ],
  },
];
