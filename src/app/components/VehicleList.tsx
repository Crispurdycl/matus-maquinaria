"use client";

import { useState, useMemo } from "react";
import { Truck, History, Search } from "lucide-react";
import Link from "next/link";

export default function VehicleList({ initialVehicles }: { initialVehicles: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const displayedVehicles = useMemo(() => {
        if (!searchTerm.trim()) return initialVehicles;

        const lowerSearch = searchTerm.toLowerCase().trim();
        return initialVehicles.filter(v => {
            const matchableStr = [
                v.patente,
                v.modelo,
                v.chasis,
                v.motor,
                v.anio
            ].join(" ").toLowerCase();

            return matchableStr.includes(lowerSearch);
        });
    }, [searchTerm, initialVehicles]);

    return (
        <div className="space-y-6">
            {/* Buscador Rápido (Indexador Frontal) */}
            <div className="bg-slate-800/40 p-2 rounded-2xl border border-slate-700/50 flex items-center shadow-inner relative max-w-xl">
                <div className="pl-4 pr-3 text-slate-400">
                    <Search className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar por patente, modelo, motor, chasis..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none py-3 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                    autoComplete="off"
                />
                {searchTerm && (
                    <div className="absolute right-4 text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                        {displayedVehicles.length} result(s)
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVehicles.length === 0 ? (
                    <div className="col-span-full glass-card p-12 text-center rounded-2xl">
                        <Truck className="w-16 h-16 mx-auto text-slate-500 mb-4" />
                        <h3 className="text-xl font-semibold text-slate-300">
                            {searchTerm ? "No se encontraron coincidencias" : "No hay vehículos registrados"}
                        </h3>
                        <p className="text-slate-500 mt-2">
                            {searchTerm ? `Intenta buscar con otros términos o palabras más cortas.` : `Añade tu primera maquinaria para comenzar.`}
                        </p>
                    </div>
                ) : (
                    displayedVehicles.map((v: any) => (
                        <div key={v.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between group">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="bg-slate-800/80 p-3 rounded-xl ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-colors">
                                        <Truck className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <span className="bg-blue-500/10 text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-500/20">
                                        {v.anio && v.anio !== "N/A" ? v.anio : "S/A"}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">{v.modelo}</h3>

                                <div className="space-y-1 mb-6 text-sm">
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <span className="w-16 inline-block font-medium">Patente:</span>
                                        <span className="text-white bg-slate-800 px-2 py-0.5 rounded text-xs tracking-wider">{v.patente}</span>
                                    </p>
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <span className="w-16 inline-block font-medium">Motor:</span>
                                        <span className="text-slate-200 truncate" title={v.motor}>{v.motor}</span>
                                    </p>
                                    <p className="text-slate-400 flex items-center gap-2">
                                        <span className="w-16 inline-block font-medium">Chasis:</span>
                                        <span className="text-slate-200 truncate" title={v.chasis}>{v.chasis}</span>
                                    </p>
                                </div>
                            </div>

                            <Link
                                href={`/vehiculo/${v.id}`}
                                className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-700/50 hover:bg-blue-600 rounded-xl text-slate-300 hover:text-white transition-all font-medium border border-slate-600/50 hover:border-blue-500/50 mt-4"
                            >
                                <History className="w-4 h-4" />
                                Ver Hoja de Vida
                            </Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
