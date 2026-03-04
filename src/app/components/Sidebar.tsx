import { supabase } from "@/lib/supabase";
import SidebarClient from "./SidebarClient";

export const revalidate = 0; // Disable caching

export default async function Sidebar() {
    const { data: vehiculos, error } = await supabase
        .from("vehiculos")
        .select("id, patente, modelo, anio")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching vehicles:", error);
    }

    return <SidebarClient initialVehicles={vehiculos || []} />;
}
