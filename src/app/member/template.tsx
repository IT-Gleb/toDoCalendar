import AuthProvider from "@/components/authComponents/authProviderComponent";
import FooterMemberComponent from "@/components/member/footerMemberComponent";
import HeaderMemberComponent from "@/components/member/headerMemberComponent";
import { SubMenu } from "@/components/templates/menu/subMenu";

export default async function MemberTemplate({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <AuthProvider>
      <div className="flex flex-col">
        <HeaderMemberComponent />

        <section className="min-h-[80vh] flex-auto flex flex-col lg:grid lg:grid-cols-[12%_1fr]">
          <SubMenu />
          {children}
        </section>
        <FooterMemberComponent />
      </div>
    </AuthProvider>
  );
}
