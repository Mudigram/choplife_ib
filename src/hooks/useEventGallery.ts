"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type GalleryImage = {
    id: string;
    image_url: string;
    caption?: string | null;
    type: "photo" | "venue" | "highlight" | "past_edition";
    sort_order: number;
};

export function useEventGallery(eventId?: string | number) {
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!eventId) return;

        async function fetchGallery() {
            setLoading(true);
            setError(null);

            try {
                const { data, error: fetchError } = await supabase
                    .from("event_gallery")
                    .select("*")
                    .eq("event_id", eventId)
                    .order("sort_order", { ascending: true });

                if (fetchError) throw fetchError;

                setGallery(data || []);
            } catch (err: any) {
                setError(err.message || "Failed to fetch gallery");
            } finally {
                setLoading(false);
            }
        }

        fetchGallery();
    }, [eventId]);

    const getByType = (type: GalleryImage["type"]) => {
        return gallery.filter((img) => img.type === type);
    };

    return {
        gallery,
        loading,
        error,
        getByType,
    };
}
