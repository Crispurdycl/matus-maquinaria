import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import VehicleView from "./VehicleView";

export const revalidate = 0;

async function getVehiculoYMantenciones(id: string) {
    const supabase = await createClient();
    const { data: vehiculo, error: vError } = await supabase
        .from("vehiculos")
        .select("*")
        .eq("id", id)
        .single();

    if (vError || !vehiculo) return { vehiculo: null, mantenciones: [] };

    const { data: mantenciones, error: mError } = await supabase
        .from("mantenciones")
        .select("*")
        .eq("vehiculo_id", id)
        .order("anio", { ascending: false })
        .order("mes", { ascending: false })
        .order("dia", { ascending: false });

    return { vehiculo, mantenciones: mantenciones || [] };
}

export default async function VehiculoPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { vehiculo, mantenciones } = await getVehiculoYMantenciones(id);

    if (!vehiculo) {
        notFound();
    }

    return <VehicleView vehiculo={vehiculo} mantenciones={mantenciones} />;
}
