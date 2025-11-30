import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";
import { Place } from "@/types/place";
import { uploadPlaceImage } from "@/lib/supabase/uploadPlaceImage";

type UseAdminPlacesParams = {
    search?: string;
    category?: string;
    limit?: number;
};

export function useAdminPlaces({ search = "", category = "all", limit = 50 }: UseAdminPlacesParams = {}) {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchPlaces();
    }, [search, category]);

    async function fetchPlaces() {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from("places")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(limit);

            if (category !== "all") {
                query = query.eq("category", category);
            }

            if (search.trim()) {
                query = query.ilike("name", `%${search}%`);
            }

            const { data, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            setPlaces(data || []);
        } catch (err: any) {
            console.error("Error fetching places:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function createPlace(placeData: Partial<Place>, imageFile?: File) {
        try {
            setLoading(true);
            console.log("📝 Creating place...", { placeData, hasImage: !!imageFile });
            
            let imageUrl = placeData.image_url;

            if (imageFile && placeData.name) {
                console.log("📸 Uploading image...");
                imageUrl = await uploadPlaceImage(imageFile, placeData.name);
                console.log("✅ Image uploaded:", imageUrl);
            }

            const payload = { ...placeData, image_url: imageUrl };
            console.log("💾 Inserting into DB:", payload);

            const { data, error: createError } = await supabase
                .from("places")
                .insert([payload])
                .select()
                .single();

            if (createError) {
                console.error("❌ DB Insert Error:", createError);
                throw createError;
            }

            console.log("✨ Place created:", data);
            setPlaces((prev) => [data, ...prev]);
            return { success: true, data };
        } catch (err: any) {
            console.error("🚨 Error creating place:", err);
            return { success: false, error: err.message || JSON.stringify(err) };
        } finally {
            setLoading(false);
        }
    }

    async function updatePlace(id: string, updates: Partial<Place>, imageFile?: File) {
        try {
            setLoading(true);
            let imageUrl = updates.image_url;

            if (imageFile && updates.name) {
                imageUrl = await uploadPlaceImage(imageFile, updates.name);
            }

            const { data, error: updateError } = await supabase
                .from("places")
                .update({ ...updates, image_url: imageUrl })
                .eq("id", id)
                .select()
                .single();

            if (updateError) throw updateError;

            setPlaces((prev) => prev.map((p) => (p.id === id ? data : p)));
            return { success: true, data };
        } catch (err: any) {
            console.error("Error updating place:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    async function deletePlace(id: string) {
        try {
            setLoading(true);
            const { error: deleteError } = await supabase
                .from("places")
                .delete()
                .eq("id", id);

            if (deleteError) throw deleteError;

            setPlaces((prev) => prev.filter((p) => p.id !== id));
            return { success: true };
        } catch (err: any) {
            console.error("Error deleting place:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    }

    return {
        places,
        loading,
        error,
        fetchPlaces,
        createPlace,
        updatePlace,
        deletePlace,
    };
}
