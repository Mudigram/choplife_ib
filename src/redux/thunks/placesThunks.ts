import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabase/supabaseClient";
import type { Place } from "@/types/place";

export const fetchPlaces = createAsyncThunk<Place[]>(
  "places/fetchPlaces",
  async (_, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("places")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error fetching places:", error);
      return rejectWithValue(error.message);
    }

    return data as Place[];
  }
);
