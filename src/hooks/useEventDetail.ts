"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { IbadanEvent } from "@/types/events";

export function useEventDetail(eventId?: string) {
    const [event, setEvent] = useState<IbadanEvent | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) {
            setLoading(false);
            return;
        }

        const fetchEvent = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from("ibadan_events")
                    .select("*")
                    .eq("id", eventId)
                    .single();

                if (fetchError) throw fetchError;
                setEvent(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load event");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    return { event, loading, error };
}
