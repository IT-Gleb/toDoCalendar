import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Изображения::[Загрузить изображения]",
  description: "Загрузка изображений",
  authors: [{ name: "Gleb Torgashin", url: "https://it-gleb.github.io/Paper" }],

  //   <link
  //   rel="preload"
  //   href="/assets/fonts/mso/webfonts/material-symbols-outlined-latin-400-normal.woff"
  //   as="font"
  //   type="font/woff"
  //   crossOrigin="use-credentials"
  // />
  // <link
  //   rel="preload"
  //   href="/assets/fonts/mso/webfonts/material-symbols-outlined-latin-400-normal.woff2"
  //   as="font"
  //   type="font/woff2"
  //   crossOrigin="use-credentials"
  // />
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
