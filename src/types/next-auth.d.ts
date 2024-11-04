import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string | null;
      userId?: string | null;
    } & DefaultSession["user"];
  }
  interface User {
    userId?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
  }
}
