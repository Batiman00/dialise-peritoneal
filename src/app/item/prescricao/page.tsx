
import { Separator } from "@radix-ui/react-separator";
import { Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
 
export default function FormsPage() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className={`${roboto.className} py-10 px-8 text-1xl text-neutral-600`}>
        <h1 className={`${poppins.variable} py-8 text-5xl text-neutral-800`}>Nova prescrição</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam a justo viverra, molestie quam vitae, consectetur ligula. Curabitur molestie scelerisque augue at convallis. Vestibulum pellentesque, erat id cursus dignissim, lacus enim rutrum quam, sed porttitor massa quam eget ex. In sed arcu eu metus dictum accumsan vel id tortor. </p>
        <Separator/>
        <p>Forms</p>
      </div>
    </div>
  );
}