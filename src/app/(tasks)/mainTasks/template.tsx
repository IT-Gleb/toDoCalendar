import AuthProvider from "@/components/authComponents/authProviderComponent";

export default async function TemplateMainTask({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
