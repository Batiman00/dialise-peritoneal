// app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient, State } from "@prisma/client";

const prisma = new PrismaClient();

function validateUserData({ email, password, state, crm }: { email: string; password: string; state: string; crm: string }) {
  const errors: string[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Formato de email inválido.");
  }

  if (password.length <= 8) {
    errors.push("A senha deve ter mais de 8 caracteres.");
  }

  if (!Object.values(State).includes(state as State)) {
    errors.push("Estado inválido.");
  }

  if (!/^\d+$/.test(crm)) {
    errors.push("O CRM deve ser um número válido.");
  }

  return errors;
}

// POST handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, state, crm } = body;

    // Validar dados
    const validationErrors = validateUserData({ email, password, state, crm });
    if (validationErrors.length > 0) {
      return NextResponse.json({ error: validationErrors }, { status: 400 });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        state,
        crm: parseInt(crm, 10),
      },
    });

    return NextResponse.json({ message: "Usuário criado com sucesso", user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

// Handle non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Método não permitido" }, { status: 405 });
}
