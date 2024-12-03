'use client';

import { SidebarButton } from './SidebarButton';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { usePathname } from 'next/navigation';
import { SidebarItems } from '@/types';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className='w-[270px] max-w-xs v-full fixed left-0 top-0 z-40 border-r bg-cyan-900 h-lvh'>
      <div className='h-full px-3 py-4'>
        <div className='mt-5'>
          <div className='flex flex-col gap-1 w-full'>
            {props.sidebarItems.links.map((link, index) => (
              <Link key={index} href={link.href}>
                <SidebarButton
                  variant={pathname === link.href ? 'select' : 'ghost'}
                  icon={link.icon}
                  className='w-full'
                >
                  {link.label}
                </SidebarButton>
              </Link>
            ))}
          </div>
          <div className='absolute left-0 bottom-3 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            Suporte
          </div>
        </div>
      </div>
    </aside>
  );
}