import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationTabsComponent } from '@ui/components';
import { USER_PROFILE_PATH, USER_PROFILE_TABS } from './user-profile.const';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  templateUrl: './user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavigationTabsComponent, RouterOutlet],
})
export class UserProfileComponent {
  public readonly userProfilePath = USER_PROFILE_PATH;
  public readonly userProfileTabs = USER_PROFILE_TABS;
}
