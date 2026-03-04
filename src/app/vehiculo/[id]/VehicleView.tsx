"use client";

import { useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function VehicleView({ vehiculo, mantenciones }: { vehiculo: any, mantenciones: any[] }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMantenciones = mantenciones.filter((m) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
            (m.detalle && m.detalle.toLowerCase().includes(term)) ||
            (m.anio && m.anio.toString().includes(term)) ||
            (m.mes && m.mes.toString().includes(term)) ||
            (m.dia && m.dia.toString().includes(term))
        );
    });

    return (
        <div className="max-w-6xl space-y-8 text-white">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        {vehiculo.patente} {vehiculo.anio && vehiculo.anio !== "N/A" ? `- ${vehiculo.anio}` : ""}
                    </h1>
                    <p className="text-sm text-slate-400 font-medium">
                        Hoja de Vida de Maquinaria | Año de registro: {vehiculo.anio}
                    </p>
                </div>

                <Link
                    href={`/vehiculo/${vehiculo.id}/nueva-mantencion`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
                >
                    ➕ Añadir Nueva Mantención
                </Link>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Nº MOTOR", value: vehiculo.motor },
                    { label: "Nº CHASIS", value: vehiculo.chasis },
                    { label: "MODELO", value: vehiculo.modelo },
                    { label: "AÑO", value: vehiculo.anio }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-slate-800/80 p-5 rounded-xl border border-slate-600 shadow-md shadow-black/20 flex flex-col justify-center">
                        <span className="text-xs font-bold text-slate-400 mb-1">{stat.label}</span>
                        <span className="text-xl text-white font-bold truncate" title={stat.value}>{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* Buscador */}
            <div className="pt-4">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                    <Search className="w-5 h-5 text-blue-400 font-bold" />
                    Buscador Rápido
                </h2>
                <p className="text-sm text-slate-400 mb-3">Escribe para filtrar el historial de mantenciones...</p>
                <input
                    type="text"
                    placeholder="Ej: Neumático, Aceite, Filtro..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 px-5 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow shadow-md shadow-black/20 text-white placeholder-slate-500 font-medium text-lg"
                />
            </div>

            {/* Tabla de Información */}
            <div>
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                    <ClipboardList className="w-5 h-5 text-amber-500" />
                    Hoja con la Información
                </h2>

                <div className="bg-slate-800/80 border border-slate-600 rounded-xl overflow-hidden shadow-md shadow-black/20">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-slate-900/50 border-b border-slate-600 text-slate-300 text-xs font-bold uppercase tracking-wider">
                                    <th className="p-4 w-24">DIA</th>
                                    <th className="p-4 w-24">MES</th>
                                    <th className="p-4 w-32">AÑO</th>
                                    <th className="p-4">DETALLE REALIZADO</th>
                                    <th className="p-4 w-36 text-right">MONTO ($)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {filteredMantenciones.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                                            No se encontraron mantenciones.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMantenciones.map((m) => (
                                        <tr key={m.id} className="hover:bg-slate-700/50 transition-colors">
                                            <td className="p-4 text-slate-100 font-bold text-lg">{m.dia}</td>
                                            <td className="p-4 text-slate-300 font-medium">{String(m.mes).padStart(2, '0')}</td>
                                            <td className="p-4 text-slate-300 font-medium">{m.anio}</td>
                                            <td className="p-4 text-white">{m.detalle}</td>
                                            <td className="p-4 text-right font-mono font-bold text-emerald-400">
                                                {m.monto ? `$${Number(m.monto).toLocaleString('es-CL')}` : '—'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <p className="text-sm text-slate-400 mt-4 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>
                    Mostrando {filteredMantenciones.length} registros
                </p>
            </div>

        </div>
    );
}
