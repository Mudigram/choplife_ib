// src/components/places/tabs/ReviewsTab.tsx
"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import useReviews, { Review } from "@/hooks/useReviews";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star,
    Image as ImageIcon,
    BadgeCheck,
    Loader2,
} from "lucide-react";
import Image from "next/image";
import WriteReviewButton from "@/components/reviews/WriteReviewButton";
import { refresh } from "next/cache";

type Props = {
    placeId: string;
    avgRating?: number | null;
    totalReviews?: number | null;
    placeName?: string;
};

export default function ReviewsTab({ placeId, avgRating = null, totalReviews = null, placeName }: Props) {
    const { reviews, loading, error, fetchNext, hasMore } = useReviews({
        placeId,
        pageSize: 8,
    });

    const [filter, setFilter] = useState<
        "newest" | "highest" | "lowest" | "photos" | "verified"
    >("newest");

    const [galleryOpen, setGalleryOpen] = useState<{
        open: boolean;
        photos: string[];
        index: number;
    }>({ open: false, photos: [], index: 0 });

    /* ---------------- Summary ---------------- */
    const summary = useMemo(() => {
        const arr = reviews ?? [];
        const avg =
            avgRating ??
            (arr.length
                ? arr.reduce((s, r) => s + (r.rating ?? 0), 0) / arr.length
                : 0);
        const total = totalReviews ?? arr.length;

        const counts = [5, 4, 3, 2, 1].map((star) =>
            arr.filter((r) => Math.round(r.rating) === star).length,
        );

        const breakdown = counts.map((c) =>
            Math.round((c / Math.max(1, total)) * 100),
        );

        return {
            avg: Number((avg || 0).toFixed(1)),
            total,
            breakdown,
        };
    }, [reviews, avgRating, totalReviews]);

    /* ---------------- Filter ---------------- */
    const filtered = useMemo(() => {
        const arr = [...(reviews ?? [])];

        switch (filter) {
            case "newest":
                return arr.sort((a, b) =>
                    (b.created_at || "").localeCompare(a.created_at || ""),
                );
            case "highest":
                return arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
            case "lowest":
                return arr.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
            case "photos":
                return arr.filter((r) => !!r.photo_url);
            case "verified":
                return arr.filter((r) => !!r.is_verified);
            default:
                return arr;
        }
    }, [reviews, filter]);

    /* ---------------- Infinite Scroll ---------------- */
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!hasMore || loading) return;

        const el = loadMoreRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) fetchNext();
                });
            },
            { rootMargin: "200px" },
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, [fetchNext, hasMore, loading]);

    /* ---------------- Lightbox ---------------- */
    const openGallery = useCallback(
        (photos: string[] = [], index = 0) => {
            setGalleryOpen({ open: true, photos, index });
        },
        [],
    );

    const closeGallery = useCallback(
        () => setGalleryOpen({ open: false, photos: [], index: 0 }),
        [],
    );

    return (
        <div className="w-full max-w-lg mx-auto space-y-6">
            <RatingSummary
                avg={summary.avg}
                total={summary.total}
                breakdown={summary.breakdown}
            />

            <FilterBar active={filter} onChange={setFilter} />

            {/* Reviews List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {filtered.map((r) => (
                        <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.28 }}
                        >
                            <ReviewCard
                                review={r}
                                onOpenGallery={openGallery}

                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {loading && (
                    <div className="flex items-center justify-center py-6 text-gray-400">
                        <Loader2 className="animate-spin mr-2" />
                        Loading reviews…
                    </div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="py-6 text-center text-gray-400">
                        No reviews yet — be the first to write one.
                    </div>
                )}
            </div>

            <div ref={loadMoreRef} />

            {hasMore && !loading && (
                <div className="text-center">
                    <button className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white">
                        Load more reviews
                    </button>
                </div>
            )}

            {error && <div className="text-red-400">{error}</div>}

            <PhotoLightbox
                open={galleryOpen.open}
                photos={galleryOpen.photos}
                initialIndex={galleryOpen.index}
                onClose={closeGallery}
            />

            <WriteReviewButton
                placeId={placeId}
                placeName={placeName}
                onReviewSubmitted={refresh}
            />

        </div>
    );
}

/* ======================================================================= */
/* =======================   SUPPORTING COMPONENTS   ====================== */
/* ======================================================================= */

function RatingSummary({
    avg,
    total,
    breakdown,
}: {
    avg: number;
    total: number;
    breakdown: number[];
}) {
    return (
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Star className="text-[var(--color-chop-accent-point)]" />
                    <div>
                        <div className="text-xl text-gray-300 font-semibold">{avg}</div>
                        <div className="text-xs text-gray-300">{total} reviews</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {[5, 4, 3, 2, 1].map((star, i) => (
                    <div key={star} className="flex items-center gap-3">
                        <div className="text-xs w-8 text-gray-300">{star}★</div>
                        <div className="flex-1 h-2 bg-white/3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[var(--color-chop-accent-point)]"
                                style={{ width: `${breakdown[i] ?? 0}%` }}
                            />
                        </div>
                        <div className="text-xs w-8 text-gray-300 text-right">
                            {breakdown[i] ?? 0}%
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FilterBar({
    active,
    onChange,
}: {
    active: string;
    onChange: (val: any) => void;
}) {
    const options = [
        { key: "newest", label: "Newest" },
        { key: "highest", label: "Highest" },
        { key: "lowest", label: "Lowest" },
        { key: "photos", label: "With photos", icon: <ImageIcon size={14} /> },
        { key: "verified", label: "Verified", icon: <BadgeCheck size={14} /> },
    ];

    return (
        <div className="flex sticky z-10 top-8 gap-2 overflow-x-auto scrollbar-none pb-1">
            {options.map((o) => (
                <button
                    key={o.key}
                    onClick={() => onChange(o.key)}
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm whitespace-nowrap ${active === o.key
                        ? "bg-white/6 border border-white/10 text-white"
                        : "text-gray-300"
                        }`}
                >
                    {o.icon}
                    <span>{o.label}</span>
                </button>
            ))}
        </div>
    );
}

function ReviewCard({
    review,
    onOpenGallery,
}: {
    review: Review;
    onOpenGallery: (photos: string[], index?: number) => void;
}) {
    const avatar =
        review.avatar_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
            review.username ?? "User",
        )}&background=random`;

    return (
        <article className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-white/8">
                    <Image
                        src={avatar}
                        alt={review.username ?? "User"}
                        width={48}
                        height={48}
                        className="object-cover"
                    />
                </div>

                <div className="flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="font-semibold text-white">
                                {review.is_anonymous
                                    ? "Anonymous"
                                    : review.username ?? "User"}
                            </div>

                            {review.is_verified && (
                                <BadgeCheck
                                    className="text-[var(--color-chop-accent-status)]"
                                    size={14}
                                />
                            )}

                            <div className="ml-2 text-xs text-gray-400">
                                {review.created_at
                                    ? new Date(
                                        review.created_at,
                                    ).toLocaleDateString()
                                    : ""}
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <Star className="text-[var(--color-chop-accent-point)]" />
                            <span className="font-semibold text-white">
                                {review.rating ?? 0}
                            </span>
                        </div>
                    </div>

                    {/* Comment */}
                    {review.comment && (
                        <p className="text-gray-300 mt-2 leading-relaxed">
                            {review.comment}
                        </p>
                    )}

                    {/* Photo */}
                    {review.photo_url && (
                        <div className="mt-3 grid grid-cols-1">
                            <button
                                // onClick={() =>
                                //     onOpenGallery([review.photo_url], 0)
                                // }
                                className="w-full h-40 overflow-hidden rounded-md"
                            >
                                <Image
                                    src={review.photo_url}
                                    alt="review-photo"
                                    width={400}
                                    height={300}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        </div>
                    )}


                </div>
            </div>
        </article>
    );
}

/* ---------------- Lightbox ---------------- */

function PhotoLightbox({
    open,
    photos = [],
    initialIndex = 0,
    onClose,
}: {
    open: boolean;
    photos?: string[];
    initialIndex?: number;
    onClose: () => void;
}) {
    const [index, setIndex] = React.useState(initialIndex);

    React.useEffect(() => setIndex(initialIndex), [initialIndex, open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 max-w-4xl w-full"
            >
                <div className="bg-black rounded-xl overflow-hidden">
                    <div className="relative w-full h-[60vh]">
                        <Image
                            src={photos[index]}
                            alt={`photo-${index}`}
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-black/60">
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    setIndex((i) => Math.max(0, i - 1))
                                }
                                className="px-3 py-1 rounded bg-white/5"
                            >
                                Prev
                            </button>
                            <button
                                onClick={() =>
                                    setIndex((i) =>
                                        Math.min(photos.length - 1, i + 1),
                                    )
                                }
                                className="px-3 py-1 rounded bg-white/5"
                            >
                                Next
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="px-3 py-1 rounded bg-white/5"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
