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
import { Button } from "@/components/ui/button";
import { getRecommendation } from "@/lib/actions";
import { useFormStatus } from "react-dom";

const formSchema = z
  .object({
    idade: z.coerce.number().int().gt(0),
    peso: z.coerce.number().gt(0),
    altura: z.coerce.number().int().gt(0),
  })

function ButtonForms(){
  const {pending} = useFormStatus();
  return(
    <Button type="submit" className="w-full bg-cyan-600">
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
        action={getRecommendation}
          className="max-w-md w-full flex flex-col gap-4"
        >
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
          <ButtonForms/>
        </form>
      </Form>
    </main>
  );
}