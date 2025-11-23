"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";

type Opts = {
  category?: string | null; // e.g. "food"
  area?: string | null;     // e.g. "Bodija"
  limit?: number;
};

export function usePlacesByCategoryArea({ category, area, limit = 10 }: Opts) {
  const [itemscat, setItems] = useState<ScrollItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // don't run until category is set (category+area flow)
    const fetch = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("places")
          .select("id, name, image_url, area, rating, price_rating, latitude, longitude")
          .limit(limit)
          .order("is_featured", { ascending: false });

        if (category && category !== "all") query = query.eq("category", category);
        if (area) query = query.eq("area", area);

        const { data, error: fetchError } = await query;

        if (fetchError) {
          setError(fetchError.message);
          setItems([]);
        } else {
          const formatted: ScrollItem[] = (data ?? []).map((p: any) => ({
            id: p.id,
            title: p.name ?? "Untitled",
            image_url: p.image_url ?? null,
            subtitle: p.area ?? "",
            rating: p.rating ?? null,
            price: p.price_rating ?? null, // optional extra field
            lat: p.latitude,
            lng: p.longitude,
          }));
          setItems(formatted);
        }
      } catch (err: any) {
        setError(err?.message ?? "Unknown error");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [category, area, limit]);

  return { itemscat, loading, error };
}
