import { createClient } from "@/utils/supabase/server";
import SidebarClient from "./SidebarClient";

// Cache for 60 seconds — sidebar doesn't need real-time freshness
export const revalidate = 60;

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: vehiculos, error } = await supabase
        .from("vehiculos")
        .select("id, patente, modelo, anio")
        .order("patente", { ascending: true }); // alphabetical is faster to scan than created_at

    if (error) {
        console.error("Error fetching vehicles for sidebar:", error);
    }

    return <SidebarClient initialVehicles={vehiculos || []} />;
}
