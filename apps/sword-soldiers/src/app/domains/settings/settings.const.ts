import { Permission } from '@data-access/users';
import { SettingsTabConfiguration, SettingsRoutes } from './settings.model';
import { PrimeIcons } from 'primeng/api';

export const SETTINGS_PERMISSIONS: Permission[] = [Permission.CREATE_GAME_MAPS];

export const SETTINGS_PATHS: Record<SettingsRoutes, string> = {
  [SettingsRoutes.MAPS]: 'maps',
};

export const SETTINGS_TABS: SettingsTabConfiguration[] = [
  {
    text: 'Maps',
    icon: PrimeIcons.MAP,
    link: SETTINGS_PATHS[SettingsRoutes.MAPS],
  },
];
