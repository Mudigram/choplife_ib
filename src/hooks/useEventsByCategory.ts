import { useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { IbadanEvent } from "@/types/events";

/**
 * Imperative helper — returns a function you call to fetch events for a category.
 * This avoids the hook auto-running on mount and fits being called from the UI.
 */
export function useEventsByCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByCategory = async (category: string): Promise<IbadanEvent[]> => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("ibadan_events")
        .select("*")
        .eq("category", category)
        .order("start_date_time", { ascending: true });

      if (error) throw error;
      return (data as IbadanEvent[]) || [];
    } catch (err: any) {
      setError(err.message || "Failed to load events for category");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { fetchByCategory, loading, error };
}
