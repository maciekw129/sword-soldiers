import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ui/components';
import { RouterLink } from '@angular/router';
import { MAPS_PATHS } from './maps-settings.const';
import { MapsRoutes } from './maps-settings.model';

@Component({
  standalone: true,
  templateUrl: 'maps-settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, RouterLink],
})
export class MapsSettingsComponent {
  public readonly mapsPaths = MAPS_PATHS;
  public readonly createMapPath = this.mapsPaths[MapsRoutes.CREATE];
}
