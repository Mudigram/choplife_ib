// src/hooks/useMenuItems.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type MenuItem = {
  id: string;
  place_id: string;
  name: string;
  description?: string | null;
  price?: string | null;
  category?: string | null;
  photo_url?: string | null;
  website_url?: string | null;
};

export default function useMenuItems(placeId?: string, category?: string) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMenu = useCallback(async () => {
    if (!placeId) return;
    setLoading(true);

    let query = supabase
      .from("menu_items")
      .select("*")
      .eq("place_id", placeId)
      .order("created_at", { ascending: false });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (!error) setItems(data as MenuItem[]);
    setLoading(false);
  }, [placeId, category]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return { items, loading, refresh: fetchMenu };
}
