import db from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

const config = {
  adapter: DrizzleAdapter(db),
  providers: [Google],
  callbacks: {
    async session({ session, user, token }) {
      return session;
    },
  },
  pages: { signIn: "/sign-in" },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
