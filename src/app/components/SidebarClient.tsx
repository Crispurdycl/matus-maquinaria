"use client";

import { useState } from "react";
import { Truck, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarClient({ initialVehicles }: { initialVehicles: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    const filteredVehicles = initialVehicles.filter(v =>
        v.patente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (v.modelo && v.modelo.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <aside className="w-full md:w-[320px] md:h-screen sticky top-0 md:fixed left-0 z-50 flex flex-col shrink-0" style={{ backgroundColor: "#1a1c23" }}>
            {/* Sidebar Header */}
            <div className="p-6 pb-4">
                <Link href="/" className="flex items-center gap-3 mb-6 transition-opacity hover:opacity-80">
                    <Truck className="w-8 h-8 text-white" />
                    <h1 className="text-2xl font-bold text-white leading-tight">
                        Gestión de<br />Maquinaria
                    </h1>
                </Link>

                {/* Search */}
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar vehículo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ backgroundColor: "#2d3748", color: "white" }}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none text-sm placeholder-slate-400 transition-colors"
                    />
                </div>

                <h2 className="text-white font-semibold text-sm mb-2">
                    Lista de Modelos ({filteredVehicles.length})
                </h2>
            </div>

            {/* Vehicle List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-1">
                {filteredVehicles.map(v => {
                    // If patentes match, highlight it
                    const isActive = pathname === `/vehiculo/${v.id}`;

                    return (
                        <Link
                            key={v.id}
                            href={`/vehiculo/${v.id}`}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-slate-700/50 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'}`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-slate-100'}`} />
                            <span className="truncate">
                                {v.patente} {v.anio && v.anio !== "N/A" ? `- ${v.anio}` : ""}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
