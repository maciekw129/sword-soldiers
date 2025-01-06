import { Permission } from '@users/api';

export interface SidebarActions {
  logout: () => void;
}

export interface SidebarParams {
  isAuthenticated: boolean;
  permissions: Permission[];
}
