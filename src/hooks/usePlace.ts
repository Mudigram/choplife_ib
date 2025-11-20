import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Place } from "@/types/place.ts";

export function usePlace(placeId: string | undefined) {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) {
      console.warn("usePlace: placeId is empty");
      setLoading(false);
      return;
    }

    const fetchPlace = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(
          "usePlace: Fetching place with ID:",
          placeId,
          "Type:",
          typeof placeId
        );

        // ID is UUID string, query directly
        const { data, error: fetchError } = await supabase
          .from("places")
          .select("*")
          .eq("id", placeId)
          .single(); // Use .single() for one result

        console.log("usePlace: Query result data:", data);
        console.log("usePlace: Query result error:", fetchError);

        if (fetchError) {
          console.error("Error fetching place:", fetchError);
          setError(`Failed to fetch place: ${fetchError.message}`);
          setPlace(null);
        } else if (data) {
          console.log("usePlace: Successfully fetched place:", data);
          setPlace(data);
        } else {
          console.warn("usePlace: No data returned from query");
          setError("Place not found");
          setPlace(null);
        }
      } catch (err) {
        console.error("Failed to fetch place:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch place");
        setPlace(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [placeId]);

  return { place, loading, error };
}
