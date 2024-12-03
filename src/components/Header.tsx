import Image from 'next/image';

export default function Header() {
    return (
        <header className="pr-4 py-2 w-full text-white text-xs flex md:flex md:flex-grow flex-row-reverse space- bg-cyan-900"> 
        
        <h3 className='mx-3 text-lg font-semibold text-foreground text-white'>Diálise Peritoneal Online</h3>
            <Image
            src="/shield.svg"
            width={42}
            height={47}
            alt="Screenshots of the dashboard project showing desktop version flex-end"
            className='self-end'
        />
      </header>
    );
  }
  