import { Route } from '@angular/router';
import { UserGuards } from './domains/user/user.guards';
import { authGuardFn } from '@auth0/auth0-angular';

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
    ],
  },
];
