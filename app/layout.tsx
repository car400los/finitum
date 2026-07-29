import "./globals.css";
import type { Metadata } from "next";
import { PageTransition } from "../components/PageTransition";

export const metadata: Metadata = {
  title: "Finitum",
  description:
    "Finitum es la plataforma empresarial de comunicación con proyectos, chats y datos inmutables.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-bg text-text antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
