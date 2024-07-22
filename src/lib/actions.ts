'use client'

import { redirect } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export async function getRecommendation() {
    //parseamento
    console.log("Gerando nova recomendação")
    await sleep(3000);
    redirect('/item/resultado');
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }