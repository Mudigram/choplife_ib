"use client";

import Image from "next/image";
import { Review } from "@/hooks/admin/useAdminReviews";
import StatusBadge from "./StatusBadge";
import { Star, MapPin, Calendar, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type ReviewCardProps = {
    review: Review;
    onApprove: (id: string) => void;
    onReject: (id: string) => void;
    isSelected?: boolean;
    onSelect?: (id: string) => void;
};

export default function ReviewCard({ review, onApprove, onReject, isSelected, onSelect }: ReviewCardProps) {
    const targetName = review.place?.name || review.event?.title || "Unknown";
    const targetImage = review.place?.image_url || review.event?.thumbnail;
    const targetType = review.place_id ? "place" : "event";

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
            <div className="flex gap-4">
                {/* Checkbox for bulk selection */}
                {onSelect && (
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelect(review.id)}
                        className="mt-1"
                    />
                )}

                {/* Target Image */}
                <div className="flex-shrink-0">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white/5">
                        {targetImage ? (
                            <Image
                                src={targetImage}
                                alt={targetName}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                {targetType === "place" ? (
                                    <MapPin className="text-gray-500" size={24} />
                                ) : (
                                    <Calendar className="text-gray-500" size={24} />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate">{targetName}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <User size={14} />
                                <span>{review.user?.username || "Anonymous"}</span>
                                <span>•</span>
                                <span>{formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}</span>
                            </div>
                        </div>
                        <StatusBadge status={review.status} />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                            />
                        ))}
                        <span className="text-sm text-gray-400 ml-1">({review.rating}/5)</span>
                    </div>

                    {/* Comment */}
                    <p className="text-gray-300 text-sm line-clamp-2 mb-3">{review.comment}</p>

                    {/* Actions */}
                    {review.status === "pending" && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => onApprove(review.id)}
                                className="px-4 py-1.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors border border-green-500/30"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => onReject(review.id)}
                                className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors border border-red-500/30"
                            >
                                Reject
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
