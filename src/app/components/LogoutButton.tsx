"use client";

import { LogOut } from "lucide-react";
import { logout } from "../login/actions";

export default function LogoutButton({ isMobile = false }: { isMobile?: boolean }) {
    if (isMobile) {
        return (
            <button
                onClick={() => logout()}
                className="flex flex-col items-center justify-center w-full h-full text-red-400 hover:bg-slate-800/50 transition-colors"
            >
                <LogOut className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-medium">Salir</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm text-red-400 hover:text-white hover:bg-red-500/20 mt-4 w-full"
        >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
        </button>
    );
}
