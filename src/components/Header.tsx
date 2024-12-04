import Image from 'next/image';
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
    return ( 
        <header className="pr-4 py-2 w-full text-white text-xs flex md:flex md:flex-grow flex-row-reverse space- bg-cyan-900"> 
            <Image
            src="/shield.svg"
            width={45}
            height={50}
            alt="Screenshots of the dashboard project showing desktop version flex-end"
            className='self-end'
        />
        <div className='mr-4 grid grid-rows-2 justify-items-end items-center'>
          <h3 className=' text-lg font-semibold text-foreground text-white'>Diálise Peritoneal Online</h3>
          <p >{session ? `${session?.user?.name} (${session?.user?.email})` : 'Convidado'}</p>
        </div>
      </header>
    );
  }
  