"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { ArrowLeft, Save, Truck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NuevoVehiculoPage() {
    const router = useRouter();
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [formData, setFormData] = useState({
        patente: "",
        modelo: "",
        motor: "",
        chasis: "",
        anio: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.patente.trim()) {
            setError("La patente o código es obligatorio.");
            return;
        }

        setIsSubmitting(true);

        const { data, error: insertError } = await supabase
            .from("vehiculos")
            .insert([{
                patente: formData.patente.trim().toUpperCase(),
                modelo: formData.modelo.trim() || "Sin especificar",
                motor: formData.motor.trim() || "N/A",
                chasis: formData.chasis.trim() || "N/A",
                anio: formData.anio.trim() || "N/A",
            }])
            .select()
            .single();

        if (insertError || !data) {
            console.error(insertError);
            setError("Error al guardar el vehículo. Revisa que la patente no esté duplicada e intenta de nuevo.");
            setIsSubmitting(false);
        } else {
            // Redirect directly to the new vehicle's page
            router.push(`/vehiculo/${data.id}`);
            router.refresh();
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/"
                    className="p-2 h-10 w-10 flex items-center justify-center glass-panel rounded-full hover:bg-slate-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-300" />
                </Link>
                <h2 className="text-2xl font-bold text-white">
                    Registrar Nuevo Vehículo / Maquinaria
                </h2>
            </div>

            <div className="glass-card p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                    {/* Identificación */}
                    <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Truck className="w-4 h-4" /> Identificación
                        </h3>

                        <div className="space-y-1.5">
                            <label className="text-sm text-slate-300 font-medium ml-1">
                                Patente / Código <span className="text-red-400">*</span>
                            </label>
                            <input
                                name="patente"
                                type="text"
                                required
                                placeholder="Ej: RF-5050 ó EXC-001"
                                value={formData.patente}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono tracking-wider"
                            />
                            <p className="text-xs text-slate-500 ml-1">Para maquinaria sin patente, usa un código interno (ej: EXCAV-001)</p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm text-slate-300 font-medium ml-1">Modelo / Descripción</label>
                            <input
                                name="modelo"
                                type="text"
                                placeholder="Ej: Mercedes-Benz Actros 1845 ó Komatsu PC200"
                                value={formData.modelo}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm text-slate-300 font-medium ml-1">Año</label>
                            <input
                                name="anio"
                                type="text"
                                placeholder="Ej: 2019"
                                value={formData.anio}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Datos Técnicos */}
                    <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50 space-y-4">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Datos Técnicos</h3>

                        <div className="space-y-1.5">
                            <label className="text-sm text-slate-300 font-medium ml-1">Nº de Motor</label>
                            <input
                                name="motor"
                                type="text"
                                placeholder="Ej: OM501LA123456"
                                value={formData.motor}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm text-slate-300 font-medium ml-1">Nº de Chasis</label>
                            <input
                                name="chasis"
                                type="text"
                                placeholder="Ej: WDB93004017123456"
                                value={formData.chasis}
                                onChange={handleChange}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 text-lg mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="w-6 h-6" />
                                Registrar en el Sistema
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
