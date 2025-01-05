import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ui/components';
import { RouterLink } from '@angular/router';
import { MAPS_PATHS } from './maps.const';
import { MapsRoutes } from './maps.model';

@Component({
  standalone: true,
  templateUrl: 'maps.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, RouterLink],
})
export class MapsComponent {
  public readonly mapsPaths = MAPS_PATHS;
  public readonly createMapPath = this.mapsPaths[MapsRoutes.CREATE];
}
