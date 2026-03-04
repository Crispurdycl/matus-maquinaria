import type { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./components/LayoutClient";

export const metadata: Metadata = {
  title: "Maquinaria Online",
  description: "Sistema de gestión de mantenciones de maquinaria y vehículos Matus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning className="antialiased font-sans bg-slate-900 text-slate-100">
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
