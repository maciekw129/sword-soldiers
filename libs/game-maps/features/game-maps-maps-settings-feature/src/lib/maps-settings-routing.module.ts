import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAPS_PATHS } from './maps-settings.const';
import { MapsRoutes } from './maps-settings.model';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./maps-settings.component').then(
            (c) => c.MapsSettingsComponent
          ),
      },
      {
        path: MAPS_PATHS[MapsRoutes.CREATE],
        data: {
          breadcrumb: 'Create',
        },
        loadComponent: () =>
          import('./create-map/create-map.component').then(
            (c) => c.CreateMapComponent
          ),
      },
    ]),
  ],
})
export class MapsSettingsRoutingModule {}
