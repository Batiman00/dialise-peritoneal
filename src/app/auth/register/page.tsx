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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue , SelectGroup, SelectLabel} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("Email inválido").min(1,"O email é obrigatório"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres"),
  crm: z.string().min(1,"CRM é obrigatório"),
  state: z.string().min(2,"Estado é obrigatório"),
});

type FormData = z.infer<typeof formSchema>;


const Register = () => {
  const router = useRouter(); 
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      crm: "",
      state: "",
    },
  });

  const { handleSubmit, formState: { errors, isSubmitting }, control } = form;

  const states = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Usuário registrado com sucesso");
        router.push("/auth/login")
      } else {
        alert(`Erro: ${result.error.join(", ")}`);
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Erro ao registrar usuário");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <Form {...form}>
        <h1 className="text-xl font-bold mb-4">Registrar</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Digite seu email"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.email?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="crm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRM</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Digite seu CRM"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.crm?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage>{errors.password?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select value={field.value}  onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                      <SelectLabel>Estado</SelectLabel>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{errors.state?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-cyan-600" disabled={isSubmitting}>
            {isSubmitting ? "Registrando..." : "Registrar"}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Register;
