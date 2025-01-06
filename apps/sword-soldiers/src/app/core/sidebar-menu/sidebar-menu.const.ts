import { SidebarMenuItem } from '@ui/components';
import { SidebarActions, SidebarParams } from './sidebar-menu.model';
import { PrimeIcons } from 'primeng/api';
import { SETTINGS_PERMISSIONS } from '../../modules/settings/settings.const';

export const MENU_ITEMS: SidebarMenuItem<SidebarActions, SidebarParams>[] = [
  {
    icon: PrimeIcons.SIGN_OUT,
    text: 'Logout',
    design: 'default',
    action: ({ logout }) => logout(),
    enabled: ({ isAuthenticated }) => isAuthenticated,
  },
  {
    icon: PrimeIcons.HOME,
    text: 'Home',
    link: '/',
  },
  {
    icon: PrimeIcons.USER,
    text: 'My profile',
    link: '/user-profile',
    enabled: ({ isAuthenticated }) => isAuthenticated,
  },
  {
    icon: PrimeIcons.WRENCH,
    text: 'Settings',
    link: '/settings',
    enabled: ({ permissions }) =>
      permissions.some((permission) =>
        SETTINGS_PERMISSIONS.includes(permission)
      ),
  },
];
