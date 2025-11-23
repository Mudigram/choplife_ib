"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";

export function useCollectionPlaces(collectionId: string | null) {
  const [items, setItems] = useState<ScrollItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!collectionId) {
      setItems([]);
      return;
    }

    const fetchCollection = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("places")
          .select("id, name, image_url, area, rating, price_rating, tags, latitude, longitude")
          .limit(20);

        // Logic for specific collections
        if (collectionId === "budget") {
            // Logic: Price rating is low OR has 'budget' tag
            query = query.or("price_rating.eq.$,price_rating.eq.##,tags.cs.{budget}");
        } else {
            // Default: Filter by tag containment
            // "cs" means "contains" for array columns
            query = query.contains("tags", [collectionId]);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) {
          console.error("Error fetching collection:", fetchError);
          setError(fetchError.message);
          setItems([]);
        } else {
          const formatted: ScrollItem[] = (data ?? []).map((p: any) => ({
            id: p.id,
            title: p.name,
            image_url: p.image_url,
            subtitle: p.area,
            rating: p.rating,
            price: p.price_rating,
            lat: p.latitude,
            lng: p.longitude,
          }));
          setItems(formatted);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  return { items, loading, error };
}
