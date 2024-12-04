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
import { useEffect, useState } from "react";


const sidebarItems: SidebarItems = {
  links: [
    { label: 'Sobre', href: '/', icon: Info },
    { label: 'Nova prescrição', href: '/item/prescricao', icon: ClipboardPlus },
    { label: 'Pesquisas', href: '/item/pesquisas', icon: Table}
  ],
};

export default function SidebarButton() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;
  //const isDesktop = useMediaQuery('(min-width: 640px)', {
  //  initializeWithValue: false,
  //});

  return <SidebarDesktop sidebarItems={sidebarItems} />;

  //if (isDesktop) {
  //  return <SidebarDesktop sidebarItems={sidebarItems} />;
  //}

  return <SidebarMobile sidebarItems={sidebarItems} />;
}