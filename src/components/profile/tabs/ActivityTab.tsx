"use client";

import React, { useEffect } from "react";
import useReviews from "@/hooks/useReviews";
import { Star, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/ui/Spinner";

type ActivityTabProps = {
    userId: string;
};

export default function ActivityTab({ userId }: ActivityTabProps) {
    const { reviews, loading, error, fetchNext, hasMore } = useReviews({ userId });

    useEffect(() => {
        fetchNext();
    }, []);

    if (loading && reviews.length === 0) {
        return <div className="p-6 text-center"><Spinner size="md" /></div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-400">Error loading activity: {error}</div>;
    }

    if (reviews.length === 0) {
        return (
            <div className="p-8 text-center text-gray-400">
                <p>No recent activity.</p>
                <p className="text-sm mt-1">Reviews you write will appear here.</p>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-2">Recent Reviews</h3>

            {reviews.map((review: any) => (
                <div key={review.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    {/* Place Info Header */}
                    <Link href={`/places/${review.place_id}`} className="flex items-center gap-3 mb-3 group">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-800">
                            {review.place_image ? (
                                <Image
                                    src={review.place_image}
                                    alt={review.place_name || "Place"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <MapPin className="p-2 text-gray-400" />
                            )}
                        </div>
                        <div>
                            <h4 className="font-medium text-white group-hover:text-[var(--color-chop-accent-point)] transition-colors">
                                {review.place_name || "Unknown Place"}
                            </h4>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <span>{new Date(review.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={`${i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-600"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Comment */}
                    {review.comment && (
                        <p className="text-sm text-gray-300 leading-relaxed">
                            {review.comment}
                        </p>
                    )}
                </div>
            ))}

            {hasMore && (
                <button
                    onClick={() => fetchNext()}
                    disabled={loading}
                    className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            )}
        </div>
    );
}
