
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
 
export default function Home() {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className={`${roboto.className} py-10 px-8 text-1xl text-neutral-600`}>
        <h1 className={`${poppins.variable} py-8 text-5xl text-neutral-800`}>Sobre</h1>
        <p>Este projeto propõe o desenvolvimento de um modelo de inteligência artificial para personalizar o 
          tratamento de diálise peritoneal (DP), uma terapia de substituição renal utilizada em pacientes com doença 
          renal crônica. A proposta busca solucionar as limitações das abordagens tradicionais de prescrição de DP, que 
          muitas vezes são padronizadas e não consideram as necessidades individuais dos pacientes.</p>

        <p>Com o uso de IA, o modelo será capaz de integrar uma vasta quantidade de dados clínicos, como 
          características demográficas e resultados de exames, para identificar o regime de tratamento mais 
          adequado para cada paciente. O objetivo é otimizar a prescrição de DP, melhorando os resultados clínicos 
          e a qualidade de vida dos pacientes, além de reduzir complicações e custos associados a tratamentos inadequados.</p>

        <p>O projeto envolve a coleta e preparação de dados de pacientes reais, o treinamento do modelo de IA,
           sua validação junto a especialistas e a disponibilização de uma ferramenta de fácil uso para profissionais 
           da saúde. A IA será ajustada continuamente com base no feedback médico, tornando o tratamento cada vez mais 
           preciso e eficiente.</p>
      </div>
    </div>
  );
}