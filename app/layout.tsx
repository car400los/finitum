import "./globals.css";
import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
