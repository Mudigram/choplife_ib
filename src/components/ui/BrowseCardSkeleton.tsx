"use client";

import React from "react";

export default function BrowseCardSkeleton() {
    return (
        <div className="break-inside-avoid mb-4 relative rounded-xl overflow-hidden bg-white/5 border border-white/10 shadow-lg">
            {/* Image Skeleton */}
            <div className="relative w-full aspect-[4/5] bg-gray-800 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
            </div>

            {/* Content Skeleton */}
            <div className="p-3 space-y-2">
                <div className="flex justify-between items-start gap-2">
                    {/* Title */}
                    <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                    {/* Rating */}
                    <div className="h-4 bg-white/10 rounded w-8 animate-pulse" />
                </div>

                {/* Subtitle */}
                <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />

                {/* Date/Price */}
                <div className="flex justify-between items-center pt-1">
                    <div className="h-3 bg-white/10 rounded w-1/3 animate-pulse" />
                    <div className="h-3 bg-white/10 rounded w-1/4 animate-pulse" />
                </div>
            </div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}
