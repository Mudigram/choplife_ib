"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/store";
import { supabase } from "@/lib/supabase/supabaseClient";

export default function DebugPage() {
    const { user, role } = useAppSelector((state) => state.auth);
    const [dbRole, setDbRole] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            supabase
                .from("users")
                .select("role")
                .eq("id", user.id)
                .single()
                .then(({ data, error }) => {
                    if (error) {
                        console.error("Error fetching role:", error);
                    } else {
                        setDbRole(data?.role || null);
                    }
                });
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-chop-bg-dark p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                <h1 className="text-3xl font-bold text-chop-text-light">Debug Info</h1>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-chop-text-light mb-2">
                            User Info
                        </h2>
                        <pre className="text-sm text-chop-text-subtle overflow-auto">
                            {JSON.stringify(
                                {
                                    id: user?.id,
                                    email: user?.email,
                                    username: user?.user_metadata?.username,
                                },
                                null,
                                2
                            )}
                        </pre>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-chop-text-light mb-2">
                            Role from Redux
                        </h2>
                        <p className="text-chop-text-subtle">
                            {role || "null"}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-chop-text-light mb-2">
                            Role from Database
                        </h2>
                        <p className="text-chop-text-subtle">
                            {dbRole || "loading..."}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-chop-text-light mb-2">
                            Can Access Admin?
                        </h2>
                        <p className={`text-lg font-semibold ${role === "admin" ? "text-green-400" : "text-red-400"
                            }`}>
                            {role === "admin" ? "✅ YES" : "❌ NO"}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <a
                        href="/admin"
                        className="px-6 py-3 bg-chop-accent-cta text-black font-semibold rounded-lg hover:opacity-90 transition"
                    >
                        Try /admin
                    </a>
                    <a
                        href="/home"
                        className="px-6 py-3 bg-white/10 text-chop-text-light font-semibold rounded-lg hover:bg-white/20 transition"
                    >
                        Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}
