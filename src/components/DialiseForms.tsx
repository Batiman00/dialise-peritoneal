"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
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

const formSchema = z
  .object({
    idade: z.coerce.number().int().gt(0),
    peso: z.coerce.number().gt(0),
    altura: z.coerce.number().int().gt(0),
    genero: z.enum(["Masculino", "Feminino", "Outro"]),
    diabetes: z.coerce.boolean(),
    hipertensao: z.coerce.boolean(),
    creatina: z.coerce.number().gt(0),
    ureia: z.coerce.number().gt(0),
    potassio: z.coerce.number().gt(0),
  })

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ph-24 pt-10">

      <Form {...form}>
        <form
          action={getRecommendation}
          className="max-w-6xl w-full flex flex-row gap-8"
        >
          <div className="w-1/2">
          <div>
            <h3 className="text-lg font-medium">Informações Demográficas e Físicas</h3>
            <p className="text-sm text-muted-foreground">
              Informações gerais das características físicas do paciente.
            </p>
          </div>
            <Separator />
            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Gênero</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o gênero" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="peso"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Peso (Kg)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Peso (Kg)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="idade"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Idade</FormLabel>
                    <FormControl>
                      <Input placeholder="Idade (anos)" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="altura"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Altura (cm)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Altura (cm)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="diabetes"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-end space-x-2">
                    <FormLabel >Paciente tem diabetes?</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="hipertensao"
              render={({ field }) => {
                return (
                  <FormItem className="flex items-end space-x-2">
                    <FormLabel>Paciente é hipertenso ?</FormLabel>
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Segunda Seção */}
          <div className="w-1/2">
          <div>
            <h3 className="text-lg font-medium">Resultados laborais</h3>
            <p className="text-sm text-muted-foreground">
              Informe se o paciente apresenta as seguintes condições.
            </p>
          </div>
            <Separator />
            <FormField
              control={form.control}
              name="creatina"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Creatina (mg/dL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nível de creatina (mg/dL)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="ureia"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Ureia (mg/dL)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ureia (mg/dL)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="potassio"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Potassio (mEq/L)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Potassio (mEq/L)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <ButtonForms/>
          </div>
        </form>
      </Form>
    </main >
  );
}