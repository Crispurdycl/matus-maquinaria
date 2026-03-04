"use client";

import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";
import Link from "next/link";
import InactivityTimer from "./InactivityTimer";
import LogoutButton from "./LogoutButton";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLogin = pathname === "/login";

    // Ocultar sidebar y timer en la página de login
    if (isLogin) {
        return (
            <main className="min-h-screen bg-slate-900 flex flex-col">
                {children}
            </main>
        );
    }

    return (
        <div className="flex flex-col md:flex-row pb-16 md:pb-0 w-full min-h-screen">
            {/* Sidebar Desktop / Navbar Mobile */}
            <aside className="glass-panel w-full md:w-64 md:h-screen sticky top-0 md:fixed left-0 z-50 flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-slate-700/50" style={{ backgroundColor: "#1e2433" }}>
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Truck className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                        Maquinaria Online
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
                <nav className="flex md:hidden w-full h-16 fixed bottom-0 left-0 z-50 justify-around items-center border-t border-slate-700/50 bg-[#1e2433]">
                    <Link
                        href="/"
                        className="flex flex-col items-center justify-center w-full h-full text-blue-400 hover:bg-slate-800/50"
                    >
                        <Truck className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-medium">Inventario</span>
                    </Link>
                    <div className="w-px h-8 bg-slate-700/50 mx-2"></div>
                    <div className="flex flex-col items-center justify-center w-full h-full">
                        <LogoutButton isMobile={true} />
                    </div>
                </nav>

                {/* Desktop Logout */}
                <div className="p-4 border-t border-slate-700/50 hidden md:block">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 overflow-x-hidden min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <InactivityTimer />
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
