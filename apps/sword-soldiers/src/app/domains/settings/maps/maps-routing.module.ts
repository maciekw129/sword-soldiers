import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MAPS_PATHS } from './maps.const';
import { MapsRoutes } from './maps.model';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./maps.component').then((c) => c.MapsComponent),
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
export class MapsRoutingModule {}
