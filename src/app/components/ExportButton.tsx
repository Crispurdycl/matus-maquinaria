"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import * as XLSX from "xlsx";

export default function ExportButton() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        try {
            setIsExporting(true);

            // 1. Fetch all vehicles and all maintenances
            const { data: vehiculos, error: vError } = await supabase.from("vehiculos").select("*");
            const { data: mantenciones, error: mError } = await supabase.from("mantenciones").select("*");

            if (vError) throw vError;
            if (mError) throw mError;

            // 2. Create Workbook
            const wb = XLSX.utils.book_new();

            // 3. Prepare one sheet per vehicle
            if (vehiculos && vehiculos.length > 0) {
                vehiculos.forEach(v => {
                    // Get specific maintenances for this vehicle
                    const vehMantenciones = mantenciones?.filter(m => m.vehiculo_id === v.id) || [];

                    // Sort them by descending date
                    vehMantenciones.sort((a, b) => {
                        if (b.anio !== a.anio) return b.anio - a.anio;
                        if (b.mes !== a.mes) return b.mes - a.mes;
                        return b.dia - a.dia;
                    });

                    // Build Sheet Data structure
                    // Emulating the old format:
                    // Row 1: Header (Metadata)
                    // Row 2: Metadata Values
                    // Row 3: Empty
                    // Row 4: Column Headers
                    // Row 5+: Data

                    const sheetData = [
                        ["Nº MOTOR", "Nº CHASIS", "MODELO", "AÑO", "PATENTE"],
                        [v.motor, v.chasis, v.modelo, v.anio, v.patente],
                        [],
                        ["DIA", "MES", "AÑO", "DETALLE REALIZADO", "MONTO"]
                    ];

                    vehMantenciones.forEach(m => {
                        sheetData.push([
                            m.dia,
                            m.mes,
                            m.anio,
                            m.detalle,
                            m.monto || 0
                        ]);
                    });

                    const ws = XLSX.utils.aoa_to_sheet(sheetData);

                    // Name the sheet using the patente
                    // Excel limits sheet names to 31 chars
                    let sheetName = v.patente ? v.patente.substring(0, 31) : "Vehiculo Sin Nombre";

                    XLSX.utils.book_append_sheet(wb, ws, sheetName);
                });
            } else {
                // Fallback if empty database
                const ws = XLSX.utils.aoa_to_sheet([["Sin datos en el sistema"]]);
                XLSX.utils.book_append_sheet(wb, ws, "Vacío");
            }

            // 4. Trigger download
            const dateStr = new Date().toISOString().split('T')[0];
            XLSX.writeFile(wb, `Respaldo_Matus_Maquinaria_${dateStr}.xlsx`);

        } catch (error) {
            console.error("Error al exportar:", error);
            alert("Hubo un error al exportar la base de datos.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <button
            onClick={handleExport}
            disabled={isExporting}
            className={`glass-panel border border-slate-700/50 hover:bg-slate-700/50 text-slate-300 hover:text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all font-medium ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <Download className={`w-5 h-5 ${isExporting ? 'animate-bounce text-blue-400' : ''}`} />
            <span className="hidden md:inline">{isExporting ? 'Generando Excel...' : 'Exportar Backup (Excel)'}</span>
            <span className="md:hidden">Exportar Excel</span>
        </button>
    );
}
