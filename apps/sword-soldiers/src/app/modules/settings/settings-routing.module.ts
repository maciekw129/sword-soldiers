import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SETTINGS_PATHS } from './settings.const';
import { SettingsRoutes } from './settings.model';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () =>
          import('./settings.component').then((c) => c.SettingsComponent),
        children: [
          {
            path: SETTINGS_PATHS[SettingsRoutes.MAPS],
            data: {
              breadcrumb: 'Maps',
            },
            loadChildren: () =>
              import('@game-maps/maps-settings-feature').then(
                (m) => m.MapsSettingsRoutingModule
              ),
          },
        ],
      },
    ]),
  ],
})
export class SettingsRoutingModule {}
