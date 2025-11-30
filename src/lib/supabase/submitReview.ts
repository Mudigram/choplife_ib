import { supabase } from "./supabaseClient";
import { toast } from "sonner";

export type ReviewSubmissionData = {
    placeId: string;
    userId: string;
    rating: number;
    comment?: string;
    photo?: File | null;
    isAnonymous: boolean;
    isVerified: boolean;
};

export async function submitReview(data: ReviewSubmissionData) {
    try {
        let photoUrl: string | null = null;

        // Upload photo if provided
        if (data.photo) {
            console.log("📸 Starting photo upload...");
            console.log("Photo details:", {
                name: data.photo.name,
                size: data.photo.size,
                type: data.photo.type
            });
            
            const fileExt = data.photo.name.split(".").pop();
            const fileName = `${data.userId}-${Date.now()}.${fileExt}`;
            const filePath = `${data.placeId}/${fileName}`;
            
            console.log("Upload path:", filePath);

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from("review-photos")
                .upload(filePath, data.photo, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) {
                console.error("❌ Upload error:", uploadError);
                throw new Error(`Photo upload failed: ${uploadError.message}`);
            }
            
            console.log("✅ Upload successful:", uploadData);

            // ✅ Get the public URL from the uploaded file
            const { data: urlData } = supabase.storage
                .from("review-photos")
                .getPublicUrl(filePath);

            photoUrl = urlData.publicUrl; // ✅ This URL is saved to the database
            console.log("🔗 Public URL:", photoUrl);
        }

        // Insert review
        const { data: reviewData, error: reviewError } = await supabase
            .from("reviews")
            .insert({
                place_id: data.placeId,
                user_id: data.userId,
                rating: data.rating,
                comment: data.comment || null,
                photo_url: photoUrl,
                is_anonymous: data.isAnonymous,
                is_verified: data.isVerified,
                status: "pending", // Reviews start as pending
                likes_count: 0,
                created_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (reviewError) {
            throw new Error(`Review submission failed: ${reviewError.message}`);
        }

        // Update place average rating and total reviews (only count approved reviews)
        const { data: allReviews } = await supabase
            .from("reviews")
            .select("rating")
            .eq("place_id", data.placeId)
            .eq("status", "approved"); // Only count approved reviews

        if (allReviews) {
            const totalReviews = allReviews.length;
            const averageRating =
                totalReviews > 0 
                    ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
                    : 0;

            await supabase
                .from("places")
                .update({
                    average_rating: Number(averageRating.toFixed(1)),
                    total_reviews: totalReviews,
                })
                .eq("id", data.placeId);
        }

        toast.success("Review submitted! It will appear after approval.");
        return { success: true, data: reviewData };
    } catch (error: any) {
        console.error("Error submitting review:", error);
        toast.error(error.message || "Failed to submit review");
        throw error;
    }
}
