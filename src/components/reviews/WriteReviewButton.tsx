"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenSquare } from "lucide-react";
import { useAppSelector } from "@/redux/store";
import { supabase } from "@/lib/supabase/supabaseClient";
import ReviewModal, { ReviewFormData } from "./ReviewModal";
import { submitReview } from "@/lib/supabase/submitReview";

type WriteReviewButtonProps = {
    placeId: string;
    placeName?: string;
    onReviewSubmitted?: () => void;
};

export default function WriteReviewButton({
    placeId,
    placeName,
    onReviewSubmitted,
}: WriteReviewButtonProps) {
    const user = useAppSelector((state) => state.auth.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    // Fetch user's verification status from database
    useEffect(() => {
        async function fetchUserVerification() {
            if (!user?.id) {
                setIsVerified(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from("users")
                    .select("is_verified")
                    .eq("id", user.id)
                    .single();

                if (!error && data) {
                    setIsVerified(data.is_verified || false);
                }
            } catch (err) {
                console.error("Error fetching user verification:", err);
                setIsVerified(false);
            }
        }

        fetchUserVerification();
    }, [user?.id]);

    const handleReviewSubmit = async (formData: ReviewFormData) => {
        console.log("🚀 Starting review submission...");
        console.log("Form data:", {
            rating: formData.rating,
            hasComment: !!formData.comment,
            hasPhoto: !!formData.photo,
            photoSize: formData.photo?.size,
            isAnonymous: formData.isAnonymous
        });
        console.log("User info:", {
            userId: user?.id,
            isVerified: isVerified
        });
        console.log("Place ID:", placeId);

        if (!user) {
            throw new Error("You must be logged in to submit a review");
        }

        await submitReview({
            placeId,
            userId: user.id,
            rating: formData.rating,
            comment: formData.comment,
            photo: formData.photo,
            isAnonymous: formData.isAnonymous,
            isVerified: isVerified,
        });


        // Close modal and notify parent
        setIsModalOpen(false);
        onReviewSubmitted?.();
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point rounded-full shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:shadow-[0_0_40px_rgba(248,175,47,0.8)] hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                title="Write a Review"
            >
                <PenSquare className="w-6 h-6 text-white" />
            </motion.button>

            {/* Review Modal */}
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleReviewSubmit}
                isVerified={isVerified}
                placeName={placeName}
            />
        </>
    );
}
