import { Metadata } from "next";
import { HeaderComponent } from "@/components/layouts/headerComponent";
import { FooterComponent } from "@/components/layouts/footerComponent";

export const metadata: Metadata = {
  description: "Задачи и еще многое другое...",
  authors: [{ name: "Gleb Torgashin", url: "https://it-gleb.github.io/Paper" }],
};

export default async function MainLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <HeaderComponent />
      <main>{children}</main>
      <FooterComponent />
    </>
  );
}
