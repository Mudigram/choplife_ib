// example: src/hooks/usePlaces.ts (pseudo)
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Place } from "@/types/place.ts";

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("places")
        .select("*")
        .order("is_featured", { ascending: false });
      if (error) return console.error(error);
      setPlaces(data ?? []);
    };
    fetch();
  }, []);
  return places;
}
