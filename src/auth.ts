import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import authConfig from "./auth.config";
import { cryptId } from "./utils/functions";

export const LOGINPAGE_PATH: string = "/enter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt", maxAge: 60 * 60 * 7 }, //Сессия на 4 часа

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
    //Передать данные access_token & userа в token, а потом в session
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          user: { ...user },
        };
      }

      return token;
    },

    session: async ({ session, token }) => {
      // console.log(session.user);
      // console.log(token.user);

      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          role: (token.user as User).role,
          userId: (token.user as User).userId,
          //userkey: (token.user as User).userkey,
        },
      };
    },
  },
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        email: { label: "Email", type: "email" },
        role: { label: "Role", type: "text" },
        userId: { label: "UserId", type: "text" },
        userkey: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { name, email, role, userId, userkey } = credentials;

        const myUser: User = {
          name: name as string,
          email: email as string,
          role: role as string,
          userId: cryptId(userId as string),
          userkey: userkey as string,
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
  //console.log(session);
  if (session !== null) {
    return true;
  }
  return false;
}
