'use client'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Poppins, Roboto } from "next/font/google";
import { Prescription } from "@/types";
import { useSession } from "next-auth/react";

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

export default function ConsultaPrescricoes() {
  const [cpf, setCpf] = useState("");
  const { data: session } = useSession();
  const [prescricoes, setPrescricoes] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setPrescricoes([]);

    try {
      const response = await fetch(`/api/protected/prescriptions?cpf=${cpf}&userId=${session?.user.id}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar as prescrições. Verifique o CPF informado.");
      }
      const data = await response.json();
      setPrescricoes(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className={`${poppins.variable} text-3xl font-bold mb-4`}>Consulta de Prescrições</h1>
      <div className="flex items-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Digite o CPF do paciente"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {prescricoes.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Volume Total</TableHead>
              <TableHead>Ciclo</TableHead>
              <TableHead>Duração</TableHead>
              <TableHead>Calcium</TableHead>
              <TableHead>Potassium</TableHead>
              <TableHead>Glucose</TableHead>
              <TableHead>Insulin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescricoes.map((prescricao) => (
              <TableRow key={prescricao.id}>
                <TableCell>{new Date(prescricao.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{prescricao.TotalVolumeLower} - {prescricao.TotalVolumeUpper} mL</TableCell>
                <TableCell>{prescricao.CycleCountLower} - {prescricao.CycleCountUpper}</TableCell>
                <TableCell>{prescricao.TherapyDurationLower} - {prescricao.TherapyDurationUpper} horas</TableCell>
                <TableCell>{prescricao.SolutionCalciumLower} - {prescricao.SolutionCalciumUpper} mg/L</TableCell>
                <TableCell>{prescricao.SolutionPotassiumLower} - {prescricao.SolutionPotassiumUpper} mg/L</TableCell>
                <TableCell>{prescricao.SolutionGlucoseLower} - {prescricao.SolutionGlucoseUpper} mg/L</TableCell>
                <TableCell>{prescricao.SolutionInsulinLower} - {prescricao.SolutionInsulinUpper} IU/L</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

    </div>
  );
}
