import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { USER_PROFILE_PATHS } from './user-profile.const';
import { UserProfileRoutes } from './user-profile.model';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('./user-profile.component').then(
            (c) => c.UserProfileComponent
          ),
        children: [
          {
            path: USER_PROFILE_PATHS[UserProfileRoutes.BASIC_DATA],
            data: {
              breadcrumb: 'Basic data',
            },
            loadComponent: () =>
              import('./basic-data/basic-data.component').then(
                (c) => c.BasicDataComponent
              ),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: USER_PROFILE_PATHS[UserProfileRoutes.BASIC_DATA],
          },
        ],
      },
    ]),
  ],
})
export class UserProfileRoutingModule {}
