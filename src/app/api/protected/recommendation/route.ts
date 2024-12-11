import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const rawFormData = extractRawFormData(formData);
    const crypto = require('crypto');
    const salt = Array.from(String(formData[9])).reduce((acc: number, char: string) => acc *10 + char.charCodeAt(0), 0);
    const hash = crypto.createHash('sha256'); 
    hash.update(rawFormData.CPF + salt.toString()); 
    const hashedValue = hash.digest('hex');

    const prescription = await prisma.prescription.create({
        data: {
          TotalVolumeUpper: rawFormData.TotalVolumeU,
          CycleCountUpper: rawFormData.CycleCountU,
          TherapyDurationUpper: rawFormData.TherapyDurationU,
          SolutionCalciumUpper: rawFormData.SolutionCalciumU,
          SolutionPotassiumUpper: rawFormData.SolutionPotassiumU,
          SolutionGlucoseUpper: rawFormData.SolutionGlucoseU,
          SolutionInsulinUpper: rawFormData.SolutionInsulinU,

          TotalVolumeLower: rawFormData.TotalVolumeL,
          CycleCountLower: rawFormData.CycleCountL,
          TherapyDurationLower: rawFormData.TherapyDurationL,
          SolutionCalciumLower: rawFormData.SolutionCalciumL,
          SolutionPotassiumLower: rawFormData.SolutionPotassiumL,
          SolutionGlucoseLower: rawFormData.SolutionGlucoseL,
          SolutionInsulinLower: rawFormData.SolutionInsulinL,
          
          ModelVersion: formData[7],
          PacientId: hashedValue,
          userId: formData[9], 
        },
      });

    return NextResponse.json({ message: 'Prescription created successfully', prescription });
  } catch (error) {
    console.error('Error creating prescription:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


function extractRawFormData(formData: any) {
  return {
    TotalVolumeU: parseFloat(formData[0][0]),
    CycleCountU: parseInt(formData[1][0]),
    TherapyDurationU: parseInt(formData[2][0]),
    SolutionCalciumU: parseFloat(formData[3][0]),
    SolutionPotassiumU: parseFloat(formData[4][0]),
    SolutionGlucoseU: parseFloat(formData[5][0]),
    SolutionInsulinU: parseFloat(formData[6][0]),

    TotalVolumeL: parseFloat(formData[0][1]),
    CycleCountL: parseInt(formData[1][1]),
    TherapyDurationL: parseInt(formData[2][1]),
    SolutionCalciumL: parseFloat(formData[3][1]),
    SolutionPotassiumL: parseFloat(formData[4][1]),
    SolutionGlucoseL: parseFloat(formData[5][1]),
    SolutionInsulinL: parseFloat(formData[6][1]),

    CPF: formData[8]?.replace(/\D/g, ''), 
  };
}
