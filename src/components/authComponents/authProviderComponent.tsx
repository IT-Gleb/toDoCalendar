import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function AuthProvider({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  const currentSession = await auth();
  return <SessionProvider session={currentSession}>{children}</SessionProvider>;
}
