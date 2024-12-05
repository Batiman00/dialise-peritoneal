"use client";

import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

// Validação com zod
const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("O email é obrigatório"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres"),
});

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/protected/pesquisas",
    });

    setIsLoading(false);

    if (res?.error) {
      form.setError("email", { message: "Email ou senha inválidos" });
    } else if (res?.ok) {
      router.push(res.url || "/protected/pesquisas");
    }
  };

  return (
    <div className="max-w-sm w-full p-6 rounded-lg shadow-2xl flex flex-col justify-self-center items-center bg-grey-900 h-4/5">
      <h2 className="text-2xl font-semibold text-center mb-4 ">Login</h2>

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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Digite sua senha" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-cyan-600" disabled={isLoading}>
            {isLoading ? "Carregando..." : "Entrar"}
          </Button>
          <Link key="Register" href="/auth/register"><Button className="w-full bg-cyan-600 my-3"> Registrar</Button></Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">
              <a
                className="text-cyan-600 hover:underline"
                onClick={() => router.push("/auth/forgot-password")}
              >
                Esqueceu a senha?
              </a>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
