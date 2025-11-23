"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { ScrollItem } from "@/components/home/HorizontalScrollSection";

export function useNearbyPlaces(lat?: number, long?: number, radiusKm = 10) {
  const [items, setItems] = useState<ScrollItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !long) {
      setItems([]);
      return;
    }

    const fetchNearby = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.rpc("nearby_places", {
          user_lat: lat,
          user_lon: long,
          radius_km: radiusKm,
        });

        if (error) {
          console.error("Error fetching nearby places:", error);
          setError(error.message);
          setItems([]);
        } else {
          const formatted: ScrollItem[] = (data ?? []).map((p: any) => ({
            id: p.id,
            title: p.name,
            image_url: p.image_url,
            subtitle: `${p.dist_km.toFixed(1)} km away`, // Show distance!
            rating: p.rating,
            description: p.area,
            lat: p.lat, // RPC usually returns 'lat'/'long' or 'latitude'/'longitude'. Checking schema...
            lng: p.long, // If RPC is simple select *, it's latitude/longitude. If it's custom, it might be lat/long.
            // Let's assume latitude/longitude based on table schema, but RPC might alias.
            // Actually, typical geospatial RPCs return lat/long or lat/lng.
            // I'll try p.latitude ?? p.lat, p.longitude ?? p.long ?? p.lng
          }));
          setItems(formatted);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNearby();
  }, [lat, long, radiusKm]);

  return { items, loading, error };
}
