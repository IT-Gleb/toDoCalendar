import NextAuth, { type DefaultSession } from "next-auth";
//import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string | null;
      userId?: string | null;
      userkey?: string | null;
    } & DefaultSession["user"];

    accessToken: string;
  }
  interface User {
    userId?: string | null;
    name?: string | null;
    email?: string | null;
    role?: string | null;
    userkey?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at?: number | null;
    refresh_token?: string | null;
  }
}
