// This file creates a session-aware Supabase client for use in Client Components.
// It reads the browser cookie automatically so RLS policies work correctly.
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
