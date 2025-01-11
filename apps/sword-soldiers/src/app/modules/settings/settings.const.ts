import { Permission } from '@users/api';
import { SettingsRoutes } from './settings.model';
import { PrimeIcons } from 'primeng/api';
import { NavigationTab } from '@ui/components';

export const SETTINGS_PERMISSIONS: Permission[] = [Permission.CREATE_GAME_MAPS];

export const SETTINGS_PATHS: Record<SettingsRoutes, string> = {
  [SettingsRoutes.MAPS]: 'maps',
};

export const SETTINGS_TABS: NavigationTab[] = [
  {
    text: 'Maps',
    icon: PrimeIcons.MAP,
    link: SETTINGS_PATHS[SettingsRoutes.MAPS],
  },
];
