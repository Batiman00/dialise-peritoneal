import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Configuração da chave secreta do NextAuth
export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Verificar se a URL contém "/protected"
  if (req.nextUrl.pathname.includes("/protected")) {
    if (!token) {
      const loginUrl = new URL("/auth/login", req.url); // Substitua "/login" pela sua rota de login
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", 
};
