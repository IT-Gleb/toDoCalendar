import AuthProvider from "@/components/authComponents/authProviderComponent";
import HeaderMemberComponent from "@/components/member/headerMemberComponent";

export default async function MemberTemplate({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <AuthProvider>
      <HeaderMemberComponent />
      {children}
    </AuthProvider>
  );
}
