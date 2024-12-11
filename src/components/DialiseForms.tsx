"use client";
import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Checkbox } from "./ui/checkbox";
import { bodyMetricsFields, LoaboralMetricsFields } from "@/lib/utils";
import { DPFormsFields } from "@/types";
import { redirect, useRouter } from "next/navigation";

const formSchema = z
  .object({
    cpf: z.string().min(11, "CPF deve ter pelo menos 11 caracteres"),
    idade: z.coerce.number().int().gt(0),
    peso: z.coerce.number().gt(0),
    altura: z.coerce.number().int().gt(0),
    genero: z.enum(["Masculino", "Feminino", "Outro"]),
    diabetes: z.coerce.boolean(),
    hipertensao: z.coerce.boolean(),
    remedio: z.enum(["Nenhum", "IECA/BRA", "Insulina", "Furosemida", "Outros"]),
    creatinina: z.coerce.number().gt(0),
    ureia: z.coerce.number().gt(0),
    potassio: z.coerce.number().gt(0),
    sodio: z.coerce.number().gt(0),
    hemoglobina: z.coerce.number().gt(0),
    crp: z.coerce.number().gt(0),
    fosforo: z.coerce.number().gt(0),
    calcio: z.coerce.number().gt(0),
    pth: z.coerce.number().gt(0),
    bic: z.coerce.number().gt(0),
    bmi: z.coerce.number().gt(0),
    ecw: z.coerce.number().gt(0),
    ureaClearance: z.coerce.number().gt(0),
  });

  function ButtonForms({ isSubmitting }: { isSubmitting: boolean }) {
    return (
      <Button type="submit" className="w-full bg-cyan-600 mt-8">
        {isSubmitting ? "Gerando..." : "Gerar"}
      </Button>
    );
  }



export default function DialiseForms() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>, session: any) {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
  
    const rawFormData = {
      BMI: parseFloat(formData.get("bmi") as string) || null,
      Creatinine: parseFloat(formData.get("creatinina") as string) || null,
      Urea: parseFloat(formData.get("ureia") as string) || null,
      Potassium: parseFloat(formData.get("potassio") as string) || null,
      ECW: parseFloat(formData.get("ecw") as string) || null,
      UreaClearance: parseFloat(formData.get("ureaClearance") as string) || null,
      Hemoglobin: parseFloat(formData.get("hemoglobina") as string) || null,
      CRP: parseFloat(formData.get("crp") as string) || null,
      Phosphorus: parseFloat(formData.get("fosforo") as string) || null,
      Calcium: parseFloat(formData.get("calcio") as string) || null,
      PTH: parseFloat(formData.get("pth") as string) || null,
      Bicarbonate: parseFloat(formData.get("bic") as string) || null,
    };
  
    try {
      const response = await fetch("https://dpa-api.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawFormData),
      });
  
      if (!response.ok) {
        throw new Error("Erro ao consultar DPA API");
      }
  
      const data = await response.json();
  
      if (data.response.length > 0 ) {
        const responseData = data.response;
  
        if (session?.user) {
          responseData.push(data.version);
          responseData.push(formData.get("cpf"));
          responseData.push(session.user.id);
  
          const registerResponse = await fetch("/api/protected/recommendation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(responseData),
          });
  
          if (!registerResponse.ok) {
            throw new Error("Erro ao registrar prescrição");
          }
        }
        router.push(`/item/resultado?responseData=${encodeURIComponent(JSON.stringify(responseData.slice(0, 7)))}`);
      }
    } catch (error) {
      alert("Erro ao comunicar com a API");
    }finally{
      setIsSubmitting(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
      idade: 0,
      peso: 0,
      altura: 0,
      genero: "Masculino",
      diabetes: false,
      hipertensao: false,
      remedio: "Nenhum",
      creatinina: 0,
      ureia: 0,
      potassio: 0,
      sodio: 0,
      hemoglobina: 0,
      crp: 0,
      fosforo: 0,
      calcio: 0,
      pth: 0,
      bic: 0,
      bmi: 0,
      ecw: 0,
      ureaClearance: 0,
    },
  });

  function renderField(field: DPFormsFields, form: UseFormReturn<any>) {
    switch (field.type) {
      case "input":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={field.placeholder}
                    type={field.inputType || "text"}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "select":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={field.placeholder || "Selecione"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "checkbox":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex items-end space-x-2">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between ph-24 pt-10">
      <Form {...form}>
        <form
          onSubmit={(event) => handleSubmit(event, session)}
          className="max-w-6xl w-full flex flex-col md:flex-row gap-8"
        >
          <div className="w-full md:w-1/2">
            <div>
              <h3 className="text-lg font-medium">Paciente</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Informe o CPF do paciente para acompanhar sua evolução. Esse campo é considerado apenas para usuários logados. Importante: o CPF não é armazenado em nosso sistema, garantindo a privacidade e segurança das informações.
              </p>
            </div>
            <Separator />
            <FormField
              key="CPF"
              control={form.control}
              name="cpf"
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>CPF (apenas números)</FormLabel>
                  <FormControl>
                    <Input placeholder="CPF" type="text" {...formField} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full md:w-1/2">
            <div>
              <h3 className="text-lg font-medium">Informações Laborais</h3>
              <p className="text-sm text-muted-foreground">
                Informações sobre os exames feitos pelo paciente.
              </p>
            </div>
            <Separator />
            {LoaboralMetricsFields.map((field) => renderField(field, form))}
          </div>
          <div className="w-full md:w-1/2">
            <div>
              <h3 className="text-lg font-medium">Informações Demográficas e Físicas</h3>
              <p className="text-sm text-muted-foreground">
                Informações gerais das características físicas do paciente.
              </p>
            </div>
            <Separator />
            {bodyMetricsFields.map((field) => renderField(field, form))}
            <ButtonForms isSubmitting={isSubmitting} />
          </div>
        </form>
      </Form>
    </div>
  );
}
