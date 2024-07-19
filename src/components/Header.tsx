import Image from 'next/image';

export default function Header() {
    return (
        <header className="pr-4 py-2 w-full text-white text-xs flex md:flex md:flex-grow flex-row-reverse space- bg-cyan-900"> 
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
  