"use client";

import { LogOut } from "lucide-react";
import { logout } from "../login/actions";

export default function LogoutButton() {
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
