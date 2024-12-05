"use client";

import { useState } from "react";
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
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido").nonempty("O email é obrigatório"),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: data.email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setEmailSent(true);
      } else {
        form.setError("email", { message: "Erro ao enviar o email. Tente novamente." });
      }
    } catch (error) {
      form.setError("email", { message: "Ocorreu um erro inesperado." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full p-6 rounded-lg shadow-2xl flex flex-col justify-self-center items-center bg-grey-900 h-4/5">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {emailSent ? "Email enviado!" : "Esqueceu a senha"}
      </h2>

      {!emailSent ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Digite seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-cyan-600" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar email de recuperação"}
            </Button>
            <Button onClick={() => router.push("/auth/login")} className="w-full bg-gray-500">
              Voltar para login
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center">
          <p className="mb-4">Um email de recuperação foi enviado para o endereço informado.</p>
          <Button onClick={() => router.push("/auth/login")} className="w-full bg-cyan-600">
            Voltar para login
          </Button>
        </div>
      )}
    </div>
  );
}
