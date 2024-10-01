"use client";
import * as z from "zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { getRecommendation } from "@/lib/actions";
import { useFormStatus } from "react-dom";
import { Separator } from "@radix-ui/react-separator";
import { Checkbox } from "./ui/checkbox";
import { bodyMetricsFields, LoaboralMetricsFields } from "@/lib/utils";
import { DPFormsFields } from "@/types";

const formSchema = z
  .object({
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
    pressao: z.coerce.number().gt(0),
    batimento: z.coerce.number().gt(0),
  });

function ButtonForms() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-cyan-600 mt-8">
      {pending ? "Gerando..." : "Gerar"}
    </Button>
  )
}

export default function DialiseForms() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idade: 0,
      peso: 0,
      altura: 0,
    },
  });
  function renderField(field: DPFormsFields, form: UseFormReturn<any>) {
    switch (field.type) {
      case 'input':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => {
              return (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={field.placeholder}
                      type={field.inputType || 'text'}
                      {...formField}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );
      case 'select':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => {
              return (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || "Selecione"} />
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
              );
            }}
          />
        );
      case 'checkbox':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => {
              return (
                <FormItem className="flex items-end space-x-2">
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Checkbox checked={formField.value} onCheckedChange={formField.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );
      default:
        return null;
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ph-24 pt-10">

      <Form {...form}>
        <form
          action={getRecommendation}
          className="max-w-6xl w-full flex flex-col md:flex-row  gap-8"
        >
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
            <ButtonForms/>
          </div>
        </form>
      </Form>
    </main >
  );

  
}