import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (user && (await bcrypt.compare(password, user.password))) {
            return { id: user.id, email: user.email, name: user.name };
          }
        } catch (error) {
          console.error("Authorization error:", error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/register", // Custom sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT strategy instead of database strategy
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;  // Include user id in JWT
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
