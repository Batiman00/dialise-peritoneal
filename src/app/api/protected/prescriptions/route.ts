import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cpf = searchParams.get("cpf");
  const userId = searchParams.get("userId") as String;

  if (!cpf) {
    return NextResponse.json(
      { error: "CPF é obrigatório para a busca." },
      { status: 400 }
    );
  }

  try {
    const isCpfValid = /^[0-9]{11}$/.test(cpf);
    if (!isCpfValid) {
      return NextResponse.json(
        { error: "CPF inválido. Certifique-se de que contém 11 dígitos numéricos." },
        { status: 400 }
      );
    }
    const crypto = require('crypto');
    const salt = Array.from(String(userId)).reduce((acc: number, char: string) => acc *10 + char.charCodeAt(0), 0);
    const hash = crypto.createHash('sha256'); 
    hash.update(cpf + salt.toString()); 
    const hashedValue = hash.digest('hex');

    const prescricoes = await prisma.prescription.findMany({
      where: {
        PacientId: hashedValue,
      },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        TotalVolumeLower: true,
        TotalVolumeUpper: true,
        CycleCountLower: true,
        CycleCountUpper: true,
        TherapyDurationLower: true,
        TherapyDurationUpper: true,
        SolutionCalciumLower: true,
        SolutionCalciumUpper: true,
        SolutionPotassiumLower: true,
        SolutionPotassiumUpper: true,
        SolutionGlucoseLower: true,
        SolutionGlucoseUpper: true,
        SolutionInsulinLower: true,
        SolutionInsulinUpper: true,
      },
    });

    if (!prescricoes || prescricoes.length === 0) {
      return NextResponse.json(
        { message: "Nenhuma prescrição encontrada para este CPF." },
        { status: 404 }
      );
    }

    return NextResponse.json(prescricoes);
  } catch (error) {
    console.error("Erro ao buscar prescrições:", error);
    return NextResponse.json(
      { error: "Erro interno ao buscar prescrições. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
