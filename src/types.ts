import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface SidebarItems {
  links: Array<{
    label: string;
    href: string;
    icon?: LucideIcon;
  }>;
  extras?: ReactNode;
}

export interface DPFormsFields {
  type: string;
  name: string;
  label: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  placeholder?: string;
  inputType?: string;
}