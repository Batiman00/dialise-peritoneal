import DialiseForms from "@/components/DialiseForms";
import { Separator } from "@radix-ui/react-separator";
import { Poppins, Roboto } from "next/font/google";
import { Suspense } from "react";

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

function Loading(){
  return(<div className="z-1 bg-white w-full v-full absolute">
      <div className="z-1 bg-cyan-700 absolute flex center-itens">
      Loading...
      </div>
    </div>
  )
}
 
export default function FormsPage() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className={`${roboto.className} py-10 px-8 text-1xl text-neutral-600`}>
        <h1 className={`${poppins.variable} py-8 text-5xl text-neutral-800`}>Nova prescrição</h1>
        <p>Preencha as informações abaixo para criar uma nova prescrição.
           É fundamental que todos os campos sejam preenchidos com atenção, pois isso assegura que o paciente receba um tratamento personalizado e eficaz.
            Sua precisão nesta etapa é essencial para a saúde e o bem-estar do paciente.</p>
         <Separator/>
        <Suspense fallback={<Loading/>}>
      <Separator />
          <DialiseForms/>
        </Suspense>
      </div>
    </div>
  );
}