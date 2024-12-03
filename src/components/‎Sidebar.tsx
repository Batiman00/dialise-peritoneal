'use client';


import {
  ClipboardPlus,
  Info,
  Table
} from 'lucide-react';

import { useMediaQuery } from 'usehooks-ts';
import { SidebarItems } from '../types';
import { SidebarDesktop } from './SidebarDesktop';
import { SidebarMobile } from './SidebarMobile';
const sidebarItems: SidebarItems = {
  links: [
    { label: 'Sobre', href: '/', icon: Info },
    { label: 'Nova prescrição', href: '/item/prescricao', icon: ClipboardPlus },
    { label: 'Pesquisas', href: '/item/pesquisas', icon: Table}
  ],
};

export function Sidebar() {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
}