"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { IbadanEvent } from "@/types/events";

async function fetchEventDetail(eventId: string): Promise<IbadanEvent> {
    const { data, error } = await supabase
        .from("ibadan_events")
        .select("*")
        .eq("id", eventId)
        .single();

    if (error) throw new Error(error.message);
    return data;
}

export function useEventDetail(eventId?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["events", "detail", eventId],
        queryFn: () => fetchEventDetail(eventId!),
        enabled: !!eventId, // Only run query if eventId exists
    });

    return {
        event: data ?? null,
        loading: isLoading,
        error: error?.message ?? null,
    };
}
