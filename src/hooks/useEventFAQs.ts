"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type FAQ = {
    id: string;
    question: string;
    answer: string;
    sort_order: number;
};

export function useEventFAQs(eventId?: string | number) {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        async function fetchFAQs() {
            setLoading(true);
            setError(null);

            try {
                const { data, error: fetchError } = await supabase
                    .from("event_faqs")
                    .select("*")
                    .eq("event_id", eventId)
                    .order("sort_order", { ascending: true });

                if (fetchError) throw fetchError;

                setFaqs(data || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch FAQs");
            } finally {
                setLoading(false);
            }
        }

        fetchFAQs();
    }, [eventId]);

    return {
        faqs,
        loading,
        error,
    };
}
