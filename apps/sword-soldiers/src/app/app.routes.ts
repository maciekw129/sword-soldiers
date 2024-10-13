import { Route } from '@angular/router';
import { UserGuards } from './core/user/user.guards';
import { authGuardFn } from '@auth0/auth0-angular';

export const appRoutes: Route[] = [
  {
    path: 'create-user',
    canActivate: [UserGuards.canCreateUser()],
    loadComponent: () =>
      import('./core/user/create-user/create-user.component').then(
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
          import('./modules/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'user-profile',
        canActivate: [authGuardFn],
        loadComponent: () =>
          import('./modules/user-profile/user-profile.component').then(
            (c) => c.UserProfileComponent
          ),
      },
      {
        path: 'play',
        canActivate: [authGuardFn],
        loadComponent: () =>
          import('./modules/game/game.component').then((c) => c.GameComponent),
      },
    ],
  },
];
