import { supabase } from "../supabase/supabaseClient";

export type ReviewStatus = "pending" | "approved" | "rejected";

/**
 * Approve a review
 */
export async function approveReview(reviewId: number): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from("reviews")
            .update({ status: "approved", updated_at: new Date().toISOString() })
            .eq("id", reviewId);

        if (error) {
            console.error("Error approving review:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error("Error in approveReview:", error);
        return { success: false, error: "Failed to approve review" };
    }
}

/**
 * Reject a review
 */
export async function rejectReview(reviewId: number, reason?: string): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await supabase
            .from("reviews")
            .update({ 
                status: "rejected", 
                updated_at: new Date().toISOString(),
                // You could add a rejection_reason field to store the reason
            })
            .eq("id", reviewId);

        if (error) {
            console.error("Error rejecting review:", error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error("Error in rejectReview:", error);
        return { success: false, error: "Failed to reject review" };
    }
}

/**
 * Get all pending reviews (for admin moderation queue)
 */
export async function getPendingReviews(): Promise<{ reviews: any[]; error?: string }> {
    try {
        const { data, error } = await supabase
            .from("reviews")
            .select(`
                *,
                user_profiles!reviews_user_id_fkey (
                    id,
                    username,
                    avatar_url
                ),
                ibadan_places!reviews_place_id_fkey (
                    id,
                    name,
                    image_url
                )
            `)
            .eq("status", "pending")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching pending reviews:", error);
            return { reviews: [], error: error.message };
        }

        return { reviews: data || [] };
    } catch (error) {
        console.error("Error in getPendingReviews:", error);
        return { reviews: [], error: "Failed to fetch pending reviews" };
    }
}

/**
 * Get review count by status
 */
export async function getReviewCountByStatus(): Promise<{ 
    pending: number; 
    approved: number; 
    rejected: number; 
    error?: string 
}> {
    try {
        const { data, error } = await supabase
            .from("reviews")
            .select("status");

        if (error) {
            console.error("Error fetching review counts:", error);
            return { pending: 0, approved: 0, rejected: 0, error: error.message };
        }

        const counts = {
            pending: 0,
            approved: 0,
            rejected: 0,
        };

        data?.forEach((review) => {
            if (review.status === "pending") counts.pending++;
            else if (review.status === "approved") counts.approved++;
            else if (review.status === "rejected") counts.rejected++;
        });

        return counts;
    } catch (error) {
        console.error("Error in getReviewCountByStatus:", error);
        return { pending: 0, approved: 0, rejected: 0, error: "Failed to fetch review counts" };
    }
}
