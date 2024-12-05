import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient, State } from "@prisma/client";
import { Resend } from "resend";
import crypto from "crypto";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

function validateUserData({
  email,
  password,
  state,
  crm,
}: {
  email: string;
  password: string;
  state: string;
  crm: string;
}) {
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

async function getDoctorName(uf: string, crm: string): Promise<string | null> {
  const response = await fetch("https://portal.cfm.org.br/api_rest_php/api/v1/medicos/buscar_medicos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://portal.cfm.org.br",
      "X-Requested-With": "XMLHttpRequest",
      Referer: "https://portal.cfm.org.br/busca-medicos",
    },
    body: JSON.stringify([
      {
        useCaptchav2: true,
        medico: {
          nome: "",
          ufMedico: uf,
          crmMedico: crm,
          municipioMedico: "",
          tipoInscricaoMedico: "",
          situacaoMedico: "",
          detalheSituacaoMedico: "",
          especialidadeMedico: "",
          areaAtuacaoMedico: "",
        },
        page: 1,
        pageNumber: 1,
        pageSize: 10,
      },
    ]),
  });

  if (!response.ok) {
    console.error("Erro ao consultar API do CFM", await response.text());
    throw new Error("Erro ao validar CRM");
  }

  const data = await response.json();

  if (data.status === "sucesso" && data.dados.length > 0) {
    const medico = data.dados.find((d: any) => d.COD_SITUACAO === "A");
    return medico ? medico.NM_MEDICO : null;
  }

  return null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, state, crm } = body;

    const validationErrors = validateUserData({ email, password, state, crm });
    if (validationErrors.length > 0) {
      return NextResponse.json({ error: validationErrors }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já cadastrado." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctorName = await getDoctorName(state, crm);

    if (!doctorName) {
      return NextResponse.json({ error: "CRM inválido ou médico não encontrado." }, { status: 400 });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        state,
        crm: parseInt(crm, 10),
        name: doctorName,
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

    return NextResponse.json({ message: "Usuário criado com sucesso, verifique seu email para ativar sua conta" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
