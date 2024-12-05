import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient, State } from "@prisma/client";
import {Resend} from "resend"; 
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY); 

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, state, crm } = body;
    const validationErrors = validateUserData({ email, password, state, crm });
    
    const user = await prisma.user.findUnique({
    where: { email },
    });
    if(user){
      return NextResponse.json({ error: "Usuário já cadastrado." }, { status: 400 });
    }
    if (validationErrors.length > 0) {
      return NextResponse.json({ error: validationErrors }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex");
    await prisma.$transaction(async (prisma) => {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        state,
        crm: parseInt(crm, 10),
        verificationToken,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`;
    await resend.emails.send({
      from: "noreply@resend.dev", 
      to: email,
      subject: "[Peritoneai] - Verifique seu email",
      html: `<p>Obrigado por se registrar! Clique no link abaixo para verificar seu endereço de email:</p><a href="${verificationUrl}">${verificationUrl}</a>`,
    });
  });

    return NextResponse.json({ message: "Usuário criado com sucesso, verifique seu email para ativar sua conta" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Método não permitido" }, { status: 405 });
}
