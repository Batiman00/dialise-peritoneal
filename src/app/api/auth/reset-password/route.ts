import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  const resetRequest = await prisma.passwordReset.findUnique({
    where: { token },
    include: { user: true },
  });

  if (!resetRequest || resetRequest.expiresAt < new Date()) {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: resetRequest.userId },
    data: { password: hashedPassword },
  });
  
  await prisma.passwordReset.delete({ where: { token } });

  return NextResponse.json({ message: "Senha redefinida com sucesso!" });
}
