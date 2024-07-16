import Image from 'next/image';
import { Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="pl-2 py-2 w-full bg-indigo-600 text-white text-xs flex"> 
            <Menu size={48} />
            <Image
            src="/shield.svg"
            width={42}
            height={47}
            alt="Screenshots of the dashboard project showing desktop version"
        />
      </header>
    );
  }
  