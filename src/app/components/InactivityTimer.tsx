"use client";

import { useEffect, useRef, useCallback } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes

export default function InactivityTimer() {
    const router = useRouter();
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut();
        router.push("/login");
    }, [supabase, router]);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(handleLogout, INACTIVITY_LIMIT_MS);
    }, [handleLogout]);

    useEffect(() => {
        // Events that count as user activity
        const events = ["mousemove", "keydown", "click", "touchstart", "scroll"];

        events.forEach((e) => window.addEventListener(e, resetTimer));
        resetTimer(); // start the timer immediately on mount

        return () => {
            events.forEach((e) => window.removeEventListener(e, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [resetTimer]);

    // This component renders nothing visible
    return null;
}
