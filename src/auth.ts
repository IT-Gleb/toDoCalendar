import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import authConfig from "./auth.config";

export const LOGINPAGE_PATH: string = "/enter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },

  pages: {
    signIn: LOGINPAGE_PATH,
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      if (!auth && request.nextUrl.pathname !== LOGINPAGE_PATH) {
        const enterUrl = new URL(LOGINPAGE_PATH, request.nextUrl.origin);

        return redirect(enterUrl.pathname);
      } else {
        return !!auth;
      }
    },
    //Передать данные userа в token, а потом в session
    jwt: async ({ token, user }) => {
      if (user) {
        return { ...token, user: { ...user } };
      }
      return token;
    },

    session: async ({ session, token }) => {
      // console.log(session.user);
      // console.log(token.user);

      return {
        ...session,
        user: {
          ...session.user,
          role: (token.user as User).role,
          userId: (token.user as User).userId,
        },
      };
    },
  },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "name" },
        email: { label: "Email", type: "email" },
        role: { label: "Role", type: "text" },
        id: { label: "Id", type: "text" },
      },
      async authorize(credentials) {
        const { name, email, role, id } = credentials;

        const myUser: User = {
          name: name as string,
          email: email as string,
          role: role as string,
          userId: id as string,
        };

        if (myUser) {
          //console.log(myUser);
          return myUser;
        }
        return null;
      },
    }),
  ],
});

export async function CheckAuth(): Promise<boolean> {
  const session = await auth();
  console.log(session);
  if (session !== null) {
    return true;
  }
  return false;
}
