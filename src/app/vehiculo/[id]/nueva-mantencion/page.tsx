"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Save, Calendar, FileText, DollarSign, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function NuevaMantencionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const router = useRouter();

    const today = new Date();
    const [formData, setFormData] = useState({
        dia: today.getDate(),
        mes: today.getMonth() + 1,
        anio: today.getFullYear(),
        detalle: "",
        monto: 0,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        if (!formData.detalle.trim()) {
            setError("El detalle de la mantención es obligatorio.");
            setIsSubmitting(false);
            return;
        }

        const { error: insertError } = await supabase
            .from("mantenciones")
            .insert([
                {
                    vehiculo_id: id,
                    dia: formData.dia,
                    mes: formData.mes,
                    anio: formData.anio,
                    detalle: formData.detalle.trim(),
                    monto: formData.monto,
                },
            ]);

        if (insertError) {
            console.error(insertError);
            setError("Hubo un error al guardar la mantención. Inténtalo de nuevo.");
            setIsSubmitting(false);
        } else {
            router.push(`/vehiculo/${id}`);
            router.refresh();
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Navigation Header */}
            <div className="flex items-center gap-4">
                <Link
                    href={`/vehiculo/${id}`}
                    className="p-2 h-10 w-10 flex items-center justify-center glass-panel rounded-full hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-300" />
                </Link>
                <h2 className="text-2xl font-bold text-white">
                    Registrar Nueva Mantención
                </h2>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                    <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 space-y-4">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                            <Calendar className="w-4 h-4" /> Fecha
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm text-slate-300 font-medium ml-1">Día</label>
                                <input
                                    type="number"
                                    min="1" max="31"
                                    required
                                    value={formData.dia}
                                    onChange={(e) => setFormData({ ...formData, dia: parseInt(e.target.value) || 1 })}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm text-slate-300 font-medium ml-1">Mes</label>
                                <input
                                    type="number"
                                    min="1" max="12"
                                    required
                                    value={formData.mes}
                                    onChange={(e) => setFormData({ ...formData, mes: parseInt(e.target.value) || 1 })}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm text-slate-300 font-medium ml-1">Año</label>
                                <input
                                    type="number"
                                    min="2000" max="2100"
                                    required
                                    value={formData.anio}
                                    onChange={(e) => setFormData({ ...formData, anio: parseInt(e.target.value) || 2024 })}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm text-slate-300 font-medium ml-1 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Detalle Realizado
                        </label>
                        <textarea
                            required
                            rows={4}
                            placeholder="Ej. Cambio de aceite, filtros, neumáticos..."
                            value={formData.detalle}
                            onChange={(e) => setFormData({ ...formData, detalle: e.target.value })}
                            className="w-full bg-slate-800/40 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm text-slate-300 font-medium ml-1 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" /> Monto Total ($)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                            <input
                                type="number"
                                min="0"
                                value={formData.monto}
                                onChange={(e) => setFormData({ ...formData, monto: parseInt(e.target.value) || 0 })}
                                className="w-full bg-slate-800/40 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-lg"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-lg mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-6 h-6" />
                                Guardar Registro
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
