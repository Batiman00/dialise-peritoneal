'use client'
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Poppins, Roboto } from "next/font/google";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from "react";

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
});

interface PrescricaoTableProps {
  // responseData type can be modified depending on the structure of the data
  responseData: any[];
}

function PrescricaoTable() {
  const searchParams = useSearchParams();
  const [responseData, setResponseData] = useState<any[]>([]);

  useEffect(() => {
    const data = searchParams.get('responseData');
    if (data) {
      try {
        setResponseData(JSON.parse(data));
      } catch (error) {
        console.error("Failed to parse responseData:", error);
      }
    }
  }, [searchParams]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Parâmetro</TableHead>
          <TableHead>Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow key="Volume Total">
          <TableCell>Volume Total</TableCell>
          <TableCell>Entre {responseData?.[0]?.[0]} a {responseData?.[0]?.[1]} mL</TableCell> 
        </TableRow>
        <TableRow key="Cycle Count">
          <TableCell>Cycle Count</TableCell>
          <TableCell>Entre {responseData?.[1]?.[0]} a {responseData?.[1]?.[1]}</TableCell> 
        </TableRow>
        <TableRow key="Duração da terapia">
          <TableCell>Duração da terapia</TableCell>
          <TableCell>Entre {responseData?.[2]?.[0]} a {responseData?.[2]?.[1]}</TableCell> 
        </TableRow>
        <TableRow key="Concentração de cálcio">
          <TableCell>Concentração de cálcio</TableCell>
          <TableCell>Entre {responseData?.[3]?.[0]} a {responseData?.[3]?.[1]}</TableCell> 
        </TableRow>
        <TableRow key="Concentração de potássio">
          <TableCell>Concentração de potássio</TableCell>
          <TableCell>Entre {responseData?.[4]?.[0]} a {responseData?.[4]?.[1]}</TableCell> 
        </TableRow>
        <TableRow key="Concentração de glicose">
          <TableCell>Concentração de glicose</TableCell>
          <TableCell>Entre {responseData?.[5]?.[0]} a {responseData?.[5]?.[1]}</TableCell> 
        </TableRow>
        <TableRow key="Concentração de insulina">
          <TableCell>Concentração de insulina</TableCell>
          <TableCell>Entre {responseData?.[6]?.[0]} a {responseData?.[6]?.[1]}</TableCell> 
        </TableRow>
      </TableBody>
    </Table>
  );
}

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
          <Suspense fallback={<div>Loading...</div>}>
            <PrescricaoTable />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
