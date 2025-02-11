import AuthProvider from "@/components/authComponents/authProviderComponent";
import React from "react";

export default async function Template({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
