import type { Metadata } from "next";
import "./globals.css";
import { Truck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Matus Maquinaria",
  description: "Sistema de gestión de mantenciones de maquinaria y vehículos Matus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body suppressHydrationWarning className="antialiased min-h-screen flex flex-col md:flex-row pb-20 md:pb-0 font-sans bg-slate-900 text-slate-100">

        {/* Sidebar Desktop / Navbar Mobile */}
        <aside className="glass-panel w-full md:w-64 md:h-screen sticky top-0 md:fixed left-0 z-50 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-slate-700/50" style={{ backgroundColor: "#1e2433" }}>
          <div className="p-6 flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Matus Maquinaria
            </h1>
          </div>

          <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto hidden md:block">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-xl transition-all"
            >
              <Truck className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Inventario</span>
            </Link>
          </nav>

          {/* Mobile Bottom Nav */}
          <nav className="flex md:hidden w-full h-16 fixed bottom-0 left-0 glass-panel z-50 justify-around items-center border-t border-slate-700/50 bg-[#1e2433]">
            <Link
              href="/"
              className="flex flex-col items-center justify-center w-full h-full text-blue-400"
            >
              <Truck className="w-6 h-6" />
              <span className="text-[10px] mt-1 font-medium">Inventario</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-x-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}
