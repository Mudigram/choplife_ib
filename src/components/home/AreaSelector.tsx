"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

type Props = {
    value?: string | null;
    onSelect: (area: string | null) => void;
    placeholder?: string;
};

export default function AreaSelector({ value, onSelect, placeholder = "Select area" }: Props) {
    const [areas, setAreas] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchAreas = async () => {
            setLoading(true);
            try {
                // fetch distinct areas (non-null, non-empty)
                const { data, error } = await supabase
                    .from("places")
                    .select("area")
                    .neq("area", "")
                    .not("area", "is", null)
                    .limit(1000);

                if (error) {
                    console.error("fetch areas error", error);
                    setAreas([]);
                } else {
                    // dedupe
                    const dedup = Array.from(new Set((data ?? []).map((r: any) => r.area)));
                    setAreas(dedup);
                }
            } catch (err) {
                console.error(err);
                setAreas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAreas();
    }, []);

    return (
        <div className="relative max-w-lg mx-auto px-4">
            <button
                onClick={() => setOpen((s) => !s)}
                className="w-full flex items-center justify-between gap-2 px-4 py-2 rounded-full bg-white/6 border border-white/10 text-left"
            >
                <span className="text-sm">{value || placeholder}</span>
                <span className="text-xs text-gray-300">{loading ? "..." : "▼"}</span>
            </button>

            {open && (
                <div className="mt-2 bg-chop-bg-card border border-white/10 rounded-xl shadow-md max-h-56 overflow-y-auto">
                    <button
                        className="w-full text-left px-4 py-2 hover:bg-white/6"
                        onClick={() => {
                            onSelect(null);
                            setOpen(false);
                        }}
                    >
                        All areas
                    </button>

                    {areas.map((a) => (
                        <button
                            key={a}
                            className="w-full text-left px-4 py-2 hover:bg-white/6"
                            onClick={() => {
                                onSelect(a);
                                setOpen(false);
                            }}
                        >
                            {a}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
