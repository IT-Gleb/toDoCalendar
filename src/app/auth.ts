import { Base_URL } from "@/utils/functions";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const LOGINPAGE_PATH: string = "/enter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        let user = null;
        return user;
      },
    }),
  ],
  pages: {
    signIn: LOGINPAGE_PATH,
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      if (request.nextUrl.pathname !== Base_URL) return true;
      if (
        !auth &&
        request.nextUrl.pathname !== LOGINPAGE_PATH &&
        request.nextUrl.pathname !== "/"
      ) {
        const enterUrl = new URL(LOGINPAGE_PATH, request.nextUrl.origin);
        // console.log(LOGINPAGE_PATH);
        redirect(enterUrl.pathname);
        //return false;
      } else {
        return !!auth;
      }
    },
  },
});

export async function CheckAuth(): Promise<boolean> {
  const session = await auth();
  //console.log(session);
  if (session !== null) {
    return true;
  }
  return false;
}
