import AuthProvider from "@/components/authComponents/authProviderComponent";

export default async function EnterTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
