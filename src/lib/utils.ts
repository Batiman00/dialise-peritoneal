import { DPFormsFields } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const bodyMetricsFields: Array<DPFormsFields> = [
  {
    type: "select",
    name: "genero",
    label: "Gênero",
    options: [
      { value: "Masculino", label: "Masculino" },
      { value: "Feminino", label: "Feminino" },
      { value: "Outro", label: "Outro" },
    ],
  },
  {
    type: "input",
    name: "peso",
    label: "Peso (Kg)",
    placeholder: "Peso (Kg)",
    inputType: "number",
  },
  {
    type: "input",
    name: "idade",
    label: "Idade",
    placeholder: "Idade (anos)",
    inputType: "number",
  },
  {
    type: "input",
    name: "altura",
    label: "Altura (cm)",
    placeholder: "Altura (cm)",
    inputType: "number",
  },
  {
    type: "select",
    name: "remedio",
    label: "Remédios contínuos",
    options: [
      { value: "Nenhum", label: "Nenhum" },
      { value: "IECA/BRA", label: "IECA/BRA" },
      { value: "Insulina", label: "Insulina" },
      { value: "Furosemida", label: "Furosemida" },
      { value: "Outros", label: "Outros" },
    ],
  },
  {
    type: "checkbox",
    name: "diabetes",
    label: "Paciente tem diabetes?",
  },
  {
    type: "checkbox",
    name: "hipertensao",
    label: "Paciente é hipertenso?",
  },
];

export const LoaboralMetricsFields: Array<DPFormsFields> = [
  {
    type: "input",
    name: "creatinina",
    label: "Creatinina (mg/dL)",
    placeholder: "Creatinina (mg/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "Ureia",
    label: "Ureia (mg/dL)",
    placeholder: "Ureia (mg/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "potassio",
    label: "Potassio (mEq/L)",
    placeholder: "Potassio (mEq/L)",
    inputType: "number",
  },
  {
    type: "input",
    name: "sodio",
    label: "Sodium (mEq/L)",
    placeholder: "Sodium (mEq/L)",
    inputType: "number",
  },
  {
    type: "input",
    name: "hemoglobina",
    label: "Hemoglobina (g/dL)",
    placeholder: "Sodium (g/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "crp",
    label: "CRP (g/dL)",
    placeholder: "CRP (g/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "fosforo",
    label: "Fósforo (mg/dL)",
    placeholder: "Fósforo (mg/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "calcio",
    label: "Cálcio (mg/dL)",
    placeholder: "Cálcio (mg/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "pth",
    label: "PTH (pg/dL)",
    placeholder: "PTH (pg/dL)",
    inputType: "number",
  },
  {
    type: "input",
    name: "bic",
    label: "BIC (mEq/L)",
    placeholder: "BIC (mEq/L)",
    inputType: "number",
  },
  {
    type: "input",
    name: "pressao",
    label: "Pressão sanguínea",
    placeholder: "Pressão sanguínea",
    inputType: "number",
  },
  {
    type: "input",
    name: "batimento",
    label: "Frequência cardíaca",
    placeholder: "Frequência cardíaca",
    inputType: "number",
  },
];