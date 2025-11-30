import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/supabaseClient";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
    id: string;
    user_id: string;
    place_id: string | null;
    event_id: number | null;
    rating: number;
    comment: string;
    status: ReviewStatus;
    created_at: string;
    // Joined data
    user?: {
        username: string;
        avatar_url: string | null;
    };
    place?: {
        name: string;
        image_url: string | null;
    };
    event?: {
        title: string;
        thumbnail: string | null;
    };
};

type UseAdminReviewsParams = {
    status?: ReviewStatus | "all";
    search?: string;
    limit?: number;
};

export function useAdminReviews({ status = "all", search = "", limit = 50 }: UseAdminReviewsParams = {}) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchReviews();
    }, [status, search]);

    async function fetchReviews() {
        try {
            setLoading(true);
            setError(null);

            let query = supabase
                .from("reviews")
                .select("*")
                .order("created_at", { ascending: false })
                .limit(limit);

            // Filter by status
            if (status !== "all") {
                query = query.eq("status", status);
            }

            // Search in comment
            if (search.trim()) {
                query = query.ilike("comment", `%${search}%`);
            }

            const { data: reviewsData, error: fetchError } = await query;

            if (fetchError) throw fetchError;

            if (!reviewsData || reviewsData.length === 0) {
                setReviews([]);
                return;
            }

            // Manually fetch related data to avoid FK constraint naming issues
            const userIds = [...new Set(reviewsData.map(r => r.user_id).filter(Boolean))];
            const placeIds = [...new Set(reviewsData.map(r => r.place_id).filter(Boolean))];
            const eventIds = [...new Set(reviewsData.map(r => r.event_id).filter(Boolean))];

            const [usersRes, placesRes, eventsRes] = await Promise.all([
                userIds.length > 0 ? supabase.from("users").select("id, username, avatar_url").in("id", userIds) : { data: [] },
                placeIds.length > 0 ? supabase.from("places").select("id, name, image_url").in("id", placeIds) : { data: [] },
                eventIds.length > 0 ? supabase.from("ibadan_events").select("id, title, thumbnail").in("id", eventIds) : { data: [] }
            ]);

            // Create lookup maps
            const userMap = new Map(usersRes.data?.map(u => [u.id, u]));
            const placeMap = new Map(placesRes.data?.map(p => [p.id, p]));
            const eventMap = new Map(eventsRes.data?.map(e => [e.id, e]));

            // Combine data
            const enrichedReviews = reviewsData.map(review => ({
                ...review,
                user: userMap.get(review.user_id),
                place: review.place_id ? placeMap.get(review.place_id) : undefined,
                event: review.event_id ? eventMap.get(review.event_id) : undefined,
            }));

            setReviews(enrichedReviews);
        } catch (err: any) {
            console.error("Error fetching reviews:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function updateReviewStatus(reviewId: string, newStatus: ReviewStatus) {
        try {
            const { error: updateError } = await supabase
                .from("reviews")
                .update({ status: newStatus })
                .eq("id", reviewId);

            if (updateError) throw updateError;

            // Update local state
            setReviews((prev) =>
                prev.map((review) =>
                    review.id === reviewId ? { ...review, status: newStatus } : review
                )
            );

            return { success: true };
        } catch (err: any) {
            console.error("Error updating review status:", err);
            return { success: false, error: err.message };
        }
    }

    async function bulkUpdateStatus(reviewIds: string[], newStatus: ReviewStatus) {
        try {
            const { error: updateError } = await supabase
                .from("reviews")
                .update({ status: newStatus })
                .in("id", reviewIds);

            if (updateError) throw updateError;

            // Refresh reviews
            await fetchReviews();

            return { success: true };
        } catch (err: any) {
            console.error("Error bulk updating reviews:", err);
            return { success: false, error: err.message };
        }
    }

    return {
        reviews,
        loading,
        error,
        updateReviewStatus,
        bulkUpdateStatus,
        refetch: fetchReviews,
    };
}
