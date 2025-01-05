import { Permission } from '@data-access/users';

export interface SidebarActions {
  logout: () => void;
}

export interface SidebarParams {
  isAuthenticated: boolean;
  permissions: Permission[];
}
