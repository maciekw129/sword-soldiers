import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SETTINGS_TABS } from './settings.const';
import { RouterOutlet } from '@angular/router';
import { APP_PATHS } from '../../app.const';
import { AppRoute } from '../../app.model';
import { NavigationTabsComponent } from '@ui/components';

@Component({
  standalone: true,
  templateUrl: 'settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, NavigationTabsComponent],
})
export class SettingsComponent {
  public readonly settingsTabs = SETTINGS_TABS;
  public readonly settingsPath = APP_PATHS[AppRoute.SETTINGS];
}
