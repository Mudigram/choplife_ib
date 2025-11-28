"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type TicketTier = {
    id: string;
    tier_name: string;
    price_ngn: number;
    description?: string | null;
    quantity_total?: number | null;
    quantity_sold: number;
    benefits?: string[] | null;
    is_available: boolean;
    sort_order: number;
};

export function useEventTickets(eventId?: string | number) {
    const [tickets, setTickets] = useState<TicketTier[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        async function fetchTickets() {
            setLoading(true);
            setError(null);

            try {
                const { data, error: fetchError } = await supabase
                    .from("event_tickets")
                    .select("*")
                    .eq("event_id", eventId)
                    .order("sort_order", { ascending: true });

                if (fetchError) throw fetchError;

                setTickets(data || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch tickets");
            } finally {
                setLoading(false);
            }
        }

        fetchTickets();
    }, [eventId]);

    return {
        tickets,
        loading,
        error,
    };
}
