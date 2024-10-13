import { ButtonDesign } from '../button/button.model';

export interface SidebarMenuItem {
  icon: string;
  design?: ButtonDesign;
  text?: string;
  link?: string;
  action?: () => void;
  enabled?: () => boolean;
}

export type SidebarPosition = 'left' | 'right';
