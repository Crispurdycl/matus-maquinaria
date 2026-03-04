import { createClient } from "@/utils/supabase/server";
import { Plus } from "lucide-react";
import Link from "next/link";
import VehicleList from "./components/VehicleList";
import ExportButton from "./components/ExportButton";

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();
  // Fetch vehicles sorted by creation date (newest first)
  const { data: vehiculos, error } = await supabase
    .from("vehiculos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching vehicles:", error);
    return <div className="p-8 text-red-500">Error loading vehicles. Please check database connection.</div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Inventario de Maquinaria</h1>
          <p className="text-slate-400 mt-1">
            Gestiona y revisa el historial de mantenciones de tu flota.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ExportButton />
          <Link
            href="/nuevo-vehiculo"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 font-medium whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden md:inline">Nuevo Vehículo</span>
            <span className="md:hidden">Nuevo</span>
          </Link>
        </div>
      </header>

      {/* Vehicle List with instant filter */}
      <VehicleList initialVehicles={vehiculos} />
    </div>
  );
}
