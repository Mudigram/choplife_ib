"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function AuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const code = searchParams.get("code");

        if (code) {
            supabase.auth.exchangeCodeForSession(code).then(() => {
                router.replace("/auth/login"); // redirect to login
            });
        }
    }, [router, searchParams]);

    return (
        <div className="flex items-center justify-center h-screen text-white">
            Completing sign-in...
        </div>
    );
}
