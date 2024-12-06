import AuthProvider from "@/components/authComponents/authProviderComponent";
import FooterMemberComponent from "@/components/member/footerMemberComponent";
import HeaderMemberComponent from "@/components/member/headerMemberComponent";

export default async function MemberTemplate({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <AuthProvider>
      <div className="flex flex-col">
        <HeaderMemberComponent />
        <section className="min-h-[80vh] flex-auto">{children}</section>
        <FooterMemberComponent />
      </div>
    </AuthProvider>
  );
}
