import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { FeaturedSpotlight } from "@/types/spotlights";

export function useSpotlight() {
  const [spotlight, setSpotlight] = useState<FeaturedSpotlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpotlight = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("featured_spotlights")
          .select("*")
          .order("priority", { ascending: true }); // FIXED

        if (fetchError) {
          console.error("Error fetching spotlights:", fetchError);
          setError(fetchError.message);
          setSpotlight([]);
          return;
        }

        setSpotlight(data || []);
      } catch (err) {
        console.error("Failed to fetch spotlights:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch spotlights"
        );
        setSpotlight([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpotlight();
  }, []);

  return { spotlight, loading, error };
}
