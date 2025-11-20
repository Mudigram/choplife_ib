// /hooks/useGallery.ts
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type GalleryItem = {
  id: string;
  file_url: string;
  file_type: "image" | "video";
  width: number | null;
  height: number | null;
};

export function useGallery(placeId: string | undefined) {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) {
      console.log("❌ No placeId — stopping fetch.");

      return;
    }

    const fetchGallery = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("place_gallery")
        .select("id, place_id, file_url, file_type, width, height")
        .eq("place_id", placeId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gallery fetch error:", error);
        setError(error.message);
      } else {
        setGallery(data ?? []);
      }

      setLoading(false);
    };

    fetchGallery();
  }, [placeId]);

  return { gallery, loading, error };
}
