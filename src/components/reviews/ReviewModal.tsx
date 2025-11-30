"use client";

import { useState, useRef } from "react";
import { X, Upload, ShieldCheck, Loader2, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StarRating from "./StarRating";
import Image from "next/image";

type ReviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reviewData: ReviewFormData) => Promise<void>;
    isVerified: boolean;
    placeName?: string;
};

export type ReviewFormData = {
    rating: number;
    comment: string;
    photo?: File | null;
    isAnonymous: boolean;
};

export default function ReviewModal({
    isOpen,
    onClose,
    onSubmit,
    isVerified,
    placeName,
}: ReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                setError("Image size must be less than 5MB");
                return;
            }

            // Validate file type
            if (!file.type.startsWith("image/")) {
                setError("Please upload an image file");
                return;
            }

            setPhoto(file);
            setError(null);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        console.log("📝 Form submitted");
        console.log("Rating:", rating);
        console.log("Photo:", photo ? `${photo.name} (${photo.size} bytes)` : "No photo");

        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setIsSubmitting(true);

        try {
            console.log("Calling onSubmit...");
            await onSubmit({
                rating,
                comment,
                photo,
                isAnonymous,
            });

            console.log("✅ onSubmit completed");

            // Reset form
            setRating(0);
            setComment("");
            setPhoto(null);
            setPhotoPreview(null);
            setIsAnonymous(false);
            onClose();
        } catch (err: any) {
            setError(err.message || "Failed to submit review");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-chop-bg-card/95 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_8px_32px_0_rgba(248,175,47,0.2)] overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative p-6 border-b border-white/10">
                        <h2 className="text-2xl font-bold text-chop-text-light">
                            Write a Review
                        </h2>
                        {placeName && (
                            <p className="text-sm text-chop-text-subtle mt-1">
                                for {placeName}
                            </p>
                        )}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-chop-text-subtle hover:text-chop-text-light transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 max-h-[70vh] overflow-y-auto">
                        {!isVerified ? (
                            // Unverified User Screen
                            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                                <div className="w-20 h-20 rounded-full bg-chop-accent-cta/10 flex items-center justify-center">
                                    <ShieldCheck className="w-10 h-10 text-chop-accent-cta" />
                                </div>
                                <h3 className="text-xl font-semibold text-chop-text-light">
                                    Verification Required
                                </h3>
                                <p className="text-chop-text-subtle max-w-sm">
                                    Only verified users can submit reviews to maintain quality
                                    and trust in our community.
                                </p>
                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-chop-text-light hover:bg-white/10 transition-colors"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href="/verification"
                                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-semibold hover:shadow-[0_0_20px_rgba(248,175,47,0.4)] transition-all inline-block"
                                    >
                                        How to Get Verified
                                    </a>
                                </div>
                            </div>
                        ) : (
                            // Verified User Form
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-medium text-chop-text-light mb-3">
                                        Your Rating *
                                    </label>
                                    <StarRating
                                        rating={rating}
                                        onRatingChange={setRating}
                                        size={40}
                                    />
                                </div>

                                {/* Comment */}
                                <div>
                                    <label className="block text-sm font-medium text-chop-text-light mb-2">
                                        Your Review (Optional)
                                    </label>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        maxLength={500}
                                        rows={4}
                                        placeholder="Share your experience..."
                                        className="w-full px-4 py-3 bg-chop-bg-dark/50 border border-chop-text-subtle/20 rounded-xl text-chop-text-light placeholder-chop-text-subtle/50 focus:border-chop-accent-cta focus:ring-2 focus:ring-chop-accent-cta/20 transition-all outline-none resize-none"
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-xs text-chop-text-subtle">
                                            {comment.length}/500 characters
                                        </span>
                                    </div>
                                </div>

                                {/* Photo Upload */}
                                <div>
                                    <label className="block text-sm font-medium text-chop-text-light mb-2">
                                        Add Photo (Optional)
                                    </label>
                                    {photoPreview ? (
                                        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-white/10">
                                            <Image
                                                src={photoPreview}
                                                alt="Review photo preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemovePhoto}
                                                className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="w-full h-32 border-2 border-dashed border-chop-text-subtle/30 rounded-xl flex flex-col items-center justify-center gap-2 text-chop-text-subtle hover:border-chop-accent-cta/50 hover:text-chop-accent-cta transition-all"
                                        >
                                            <Camera size={32} />
                                            <span className="text-sm">Click to upload photo</span>
                                            <span className="text-xs">Max 5MB</span>
                                        </button>
                                    )}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />
                                </div>

                                {/* Anonymous Toggle */}
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div>
                                        <label className="text-sm font-medium text-chop-text-light">
                                            Post Anonymously
                                        </label>
                                        <p className="text-xs text-chop-text-subtle mt-1">
                                            Your name won't be shown
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsAnonymous(!isAnonymous)}
                                        className={`relative w-12 h-6 rounded-full transition-colors ${isAnonymous
                                            ? "bg-chop-accent-cta"
                                            : "bg-chop-text-subtle/30"
                                            }`}
                                    >
                                        <div
                                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isAnonymous ? "translate-x-6" : "translate-x-0"
                                                }`}
                                        />
                                    </button>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-chop-accent-error/10 border border-chop-accent-error/30 rounded-xl p-3 text-chop-accent-error text-sm">
                                        {error}
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || rating === 0}
                                    className="w-full h-14 bg-gradient-to-r from-chop-accent-cta to-chop-accent-point text-white font-bold rounded-xl shadow-[0_0_20px_rgba(248,175,47,0.4)] hover:shadow-[0_0_30px_rgba(248,175,47,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Submitting...
                                        </span>
                                    ) : (
                                        "Submit Review"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
