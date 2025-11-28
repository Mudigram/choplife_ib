"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { IbadanEvent } from "@/types/events";

export type Organizer = {
    id: string;
    name: string;
    bio?: string | null;
    avatar_url?: string | null;
    email?: string | null;
    phone?: string | null;
    social_links?: {
        instagram?: string;
        twitter?: string;
        facebook?: string;
        website?: string;
    } | null;
    is_verified: boolean;
};

export function useOrganizer(organizerId?: string | null) {
    const [organizer, setOrganizer] = useState<Organizer | null>(null);
    const [events, setEvents] = useState<IbadanEvent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!organizerId) return;

        async function fetchOrganizer() {
            setLoading(true);
            setError(null);

            try {
                // Fetch organizer profile
                const { data: organizerData, error: orgError } = await supabase
                    .from("event_organizers")
                    .select("*")
                    .eq("id", organizerId)
                    .single();

                if (orgError) throw orgError;

                setOrganizer(organizerData);

                // Fetch other events by this organizer
                const { data: eventsData, error: eventsError } = await supabase
                    .from("ibadan_events")
                    .select("*")
                    .eq("organizer_id", organizerId)
                    .gte("end_date_time", new Date().toISOString()) // Only future/ongoing events
                    .order("start_date_time", { ascending: true })
                    .limit(5);

                if (eventsError) throw eventsError;

                setEvents(eventsData || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch organizer");
            } finally {
                setLoading(false);
            }
        }

        fetchOrganizer();
    }, [organizerId]);

    return {
        organizer,
        events,
        loading,
        error,
    };
}
