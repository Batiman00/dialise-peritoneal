'use client'

import { redirect } from "next/navigation";

export async function getRecommendation(formData: FormData) {
    const rawFormData = {
        BMI : formData.get('creatinina'), // CALCULAR
        Creatinine : formData.get('creatinina'),
        Urea : formData.get('Ureia'),
        Potassium : formData.get('potassio'),
        ECW : formData.get('creatinina'),             //*
        UreaClearance : formData.get('creatinina'),  //*
        Hemoglobin : formData.get('hemoglobina'),
        CRP : formData.get('crp'),                   //*
        Phosphorus : formData.get('fosforo'),
        Calcium : formData.get('calcio'),
        PTH : formData.get('pth'),                   //*
        Bicarbonate : formData.get('bic'),
        cpf: formData.get('cpf'),
      }


    console.log(rawFormData)
    console.log("Gerando nova recomendação")
    await sleep(3000);
    redirect('/item/resultado');
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }