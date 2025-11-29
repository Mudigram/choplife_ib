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

    // Real-time subscription
    const channel = supabase
      .channel("realtime-events")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "ibadan_events" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setEvents((prev) => [payload.new as IbadanEvent, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setEvents((prev) =>
              prev.map((event) =>
                event.id === payload.new.id ? (payload.new as IbadanEvent) : event
              )
            );
          } else if (payload.eventType === "DELETE") {
            setEvents((prev) =>
              prev.filter((event) => event.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { events, loading, error };
}
