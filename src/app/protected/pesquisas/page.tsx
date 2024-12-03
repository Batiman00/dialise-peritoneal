
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Poppins, Roboto } from "next/font/google";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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
          Esta página fornece as últimas 50 pesquisas feitas pelo usuário.
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
                <TableCell>4 vezes ao dia</TableCell> 
              </TableRow>
              <TableRow key="Ciclos">
                <TableCell>Ciclos</TableCell>
                <TableCell>20 mL/Kg</TableCell> 
              </TableRow>
              <TableRow key="Tempo total">
                <TableCell>Ciclos</TableCell>
                <TableCell>9 horas</TableCell> 
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}