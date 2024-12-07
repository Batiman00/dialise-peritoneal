
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
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
        <h1 className={`${poppins.variable} py-8 text-5xl text-neutral-800`}>Resultado</h1>
        <p>
          Esta página fornece uma prescrição personalizada, gerada por inteligência artificial,
           com base nas informações fornecidas no formulário. A prescrição é projetada para atender às necessidades específicas do paciente,
            garantindo um tratamento adequado e eficaz. Preste atenção aos detalhes e revise as informações antes de proceder com o tratamento.
        </p>
        <p>
          É importante ressaltar que <b>esta prescrição não substitui a consulta a um médico</b>. Ela atua como uma ferramenta auxiliar na tomada de 
          decisões sobre o tratamento. Sempre consulte um profissional de saúde qualificado para garantir a segurança e a eficácia do tratamento.
        </p>
        <div className="my-4">
          <h2 className="text-xl font-bold">Detalhes da Prescrição</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parâmetro</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow key="Solução">
                <TableCell>Solução</TableCell>
                <TableCell> 2,5% </TableCell> 
              </TableRow>
              <TableRow key="Volume Total">
                <TableCell>Volume Total</TableCell>
                <TableCell>1 L</TableCell> 
              </TableRow>
              <TableRow key="Frequência">
                <TableCell>Frequência</TableCell>
                <TableCell>4 Ciclos ao dia</TableCell> 
              </TableRow>
              <TableRow key="Ciclos">
                <TableCell>Volume por Ciclo</TableCell>
                <TableCell>20 mL/Kg</TableCell> 
              </TableRow>
              <TableRow key="Tempo total">
                <TableCell> Duração dos Ciclos</TableCell>
                <TableCell>9 horas</TableCell> 
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
