import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Place } from "@/types/place";
import { IbadanEvent } from "@/types/events";

type SearchResults = {
    places: Place[];
    events: IbadanEvent[];
};

export function useSearch(query: string) {
    const [results, setResults] = useState<SearchResults>({ places: [], events: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const search = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults({ places: [], events: [] });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const searchTerm = `%${searchQuery}%`;

            // Search Places
            const { data: placesData, error: placesError } = await supabase
                .from("places")
                .select("*")
                .or(`name.ilike.${searchTerm},description.ilike.${searchTerm},tags.cs.{${searchQuery}}`)
                .limit(20);

            if (placesError) throw placesError;

            // Search Events
            const { data: eventsData, error: eventsError } = await supabase
                .from("ibadan_events")
                .select("*")
                .or(`title.ilike.${searchTerm},description.ilike.${searchTerm}`)
                .limit(20);

            if (eventsError) throw eventsError;

            setResults({
                places: placesData || [],
                events: eventsData || [],
            });
        } catch (err: any) {
            console.error("Search error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) {
                search(query);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, search]);

    return { results, loading, error };
}
