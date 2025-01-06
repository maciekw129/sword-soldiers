import { ButtonDesign } from '../button/button.model';

export interface SidebarMenuItem<A = unknown, P = unknown> {
  icon: string;
  design?: ButtonDesign;
  text?: string;
  link?: string;
  action?: (actions: A) => void;
  enabled?: (params: P) => boolean;
}

export type SidebarPosition = 'left' | 'right';
