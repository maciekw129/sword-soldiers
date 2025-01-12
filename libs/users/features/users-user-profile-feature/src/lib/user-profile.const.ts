import { NavigationTab } from '@ui/components';
import { PrimeIcons } from 'primeng/api';
import { UserProfileRoutes } from './user-profile.model';

export const USER_PROFILE_PATH = 'user-profile';

export const USER_PROFILE_PATHS: Record<UserProfileRoutes, string> = {
  [UserProfileRoutes.BASIC_DATA]: 'basic-data',
};

export const USER_PROFILE_TABS: NavigationTab[] = [
  {
    text: 'Basic data',
    icon: PrimeIcons.USER_EDIT,
    link: USER_PROFILE_PATHS[UserProfileRoutes.BASIC_DATA],
  },
];
