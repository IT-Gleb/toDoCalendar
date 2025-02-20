import AuthProvider from "@/components/authComponents/authProviderComponent";

export default async function TemplateTasksId({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
