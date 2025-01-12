import { Route } from '@angular/router';
import { UsersGuards } from '@users/api';
import { authGuardFn } from '@auth0/auth0-angular';
import { SETTINGS_PERMISSIONS } from './modules/settings/settings.const';
import { APP_PATHS } from './app.const';
import { AppRoute } from './app.model';

export const appRoutes: Route[] = [
  {
    path: 'create-user',
    canActivate: [UsersGuards.canCreateUser()],
    loadComponent: () =>
      import('@users/create-user-feature').then((c) => c.CreateUserComponent),
  },
  {
    path: '',
    canActivate: [UsersGuards.shouldCreateUser()],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./modules/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'user-profile',
        data: {
          breadcrumb: 'User profile',
        },
        canActivate: [authGuardFn],
        loadChildren: () =>
          import('@users/user-profile-feature').then(
            (m) => m.UserProfileRoutingModule
          ),
      },
      {
        path: 'play',
        data: {
          breadcrumb: 'Play',
        },
        canActivate: [authGuardFn],
        loadComponent: () =>
          import('./modules/game/game.component').then((c) => c.GameComponent),
      },
      {
        path: APP_PATHS[AppRoute.SETTINGS],
        data: {
          breadcrumb: 'Settings',
        },
        canActivate: [
          authGuardFn,
          UsersGuards.permission(SETTINGS_PERMISSIONS),
        ],
        loadChildren: () =>
          import('./modules/settings/settings-routing.module').then(
            (m) => m.SettingsRoutingModule
          ),
      },
    ],
  },
];
