import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/‎Sidebar';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Diálise Peritoneal Online',
  description: 'IA de recomendação de diálise peritoneal',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt'>
      <body className={inter.className} >
      <Header/>
        <Sidebar /> 
        <main className='mx-5 mt-16 sm:ml-[300px] sm:mt-3'>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}