'use client';

import { SidebarButton } from './SidebarButton';
import Link from 'next/link';
import { Separator } from './ui/separator';
import { usePathname } from 'next/navigation';
import { SidebarItems } from '@/types';
import { Button } from './ui/button';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";



interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <aside className='w-[270px] max-w-xs v-full fixed left-0 top-0 z-40 border-r bg-cyan-900 h-lvh'>
      <div className='h-full px-3 py-4 flex flex-col justify-between '>
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
        </div>

        <div className='flex gap-2 flex-col w-full'>
          {session ? (
            <Button  className='' onClick={ () => {signOut({callbackUrl: "/"})}}>Logout</Button>
                     ) : (
              <Button onClick={() => {router.push("/auth/login")}}>Login</Button>
                  )}
            <Separator className=' w-full' />
            <p>Suporte</p>
          </div>
      </div>
    </aside>
  );
}