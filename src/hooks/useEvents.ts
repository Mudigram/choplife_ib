import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { IbadanEvent } from "@/types/events";

export function useEvents() {
  const [events, setEvents] = useState<IbadanEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("ibadan_events")
          .select("*")
          .order("id", { ascending: false });

        if (fetchError) {
          console.error("Error fetching places:", fetchError);
          setError(fetchError.message);
          setEvents([]);
        } else {
          setEvents(data || []);
        }
      } catch (err) {
        console.error("Failed to fetch places:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch places");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []); // Empty dependency array - fetch once on mount

  return { events, loading, error };
}
