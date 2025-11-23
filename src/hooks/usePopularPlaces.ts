import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";

export function usePopularPlaces(limit = 12) {
  const [items, setItems] = useState<ScrollItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from("places")
          .select(`
            id,
            name,
            image_url,
            area,
            area,
            rating,
            latitude,
            longitude
          `)
          .order("rating", { ascending: false })
          .limit(limit);

        if (fetchError) {
          setError(fetchError.message);
          setItems([]);
          return;
        }

        // Normalize for HorizontalScroll
        const formatted: ScrollItem[] = (data ?? []).map((p) => ({
          id: p.id,
          title: p.name,
          subtitle: p.area || "",
          image_url: p.image_url || "",    // prevents missing src error
          rating: p.rating,
          lat: p.latitude,
          lng: p.longitude,
        }));

        setItems(formatted);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [limit]);

  return { items, loading, error };
}
