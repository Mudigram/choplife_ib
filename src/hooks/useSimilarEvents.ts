"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { IbadanEvent } from "@/types/events";

export function useSimilarEvents(eventId?: number, category?: string | null, organizerId?: string | null) {
    const [events, setEvents] = useState<IbadanEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        async function fetchSimilarEvents() {
            setLoading(true);
            setError(null);

            try {
                let query = supabase
                    .from("ibadan_events")
                    .select("*")
                    .neq("id", eventId) // Exclude current event
                    .gte("start_date_time", new Date().toISOString()) // Only future events
                    .limit(6);

                // Prefer same category or same organizer
                if (category) {
                    query = query.or(`category.eq.${category},organizer_id.eq.${organizerId || ""}`);
                } else if (organizerId) {
                    query = query.eq("organizer_id", organizerId);
                }

                const { data, error: fetchError } = await query.order("start_date_time", { ascending: true });

                if (fetchError) throw fetchError;

                setEvents(data || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch similar events");
            } finally {
                setLoading(false);
            }
        }

        fetchSimilarEvents();
    }, [eventId, category, organizerId]);

    return {
        events,
        loading,
        error,
    };
}
