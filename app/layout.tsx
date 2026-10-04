import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Chocaliye — Full Stack Developer & Tech Lead",
  description:
    "Portfolio de David Chocaliye: SaaS, infraestrutura, IA aplicada, produtos digitais e liderança técnica.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
