import { NextResponse } from "next/server";
import { Resend } from "resend";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Email não encontrado" }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString("hex");

  // Salve o token no banco com validade de 1 hora
  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      token,
      expiresAt: new Date(Date.now() + 600 * 1000), // 10 min
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
  try {
    await resend.emails.send({
      from: "noreply@resend.dev",
      to: email,
      subject: "[Peritoneai] - Redefinição de senha ",
      html: `<p>Para redefinir sua senha, clique no link abaixo (link válido por 10 min):</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });
    return NextResponse.json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return NextResponse.json({ error: "Erro ao enviar email" }, { status: 500 });
  }
}
