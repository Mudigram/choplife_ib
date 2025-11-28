"use client";

import { motion } from "framer-motion";

export default function EventDetailSkeleton() {
    return (
        <div className="min-h-screen bg-black text-white pb-10">
            {/* Header Skeleton */}
            <div className="relative w-full max-w-lg mx-auto">
                {/* Image Skeleton */}
                <div className="relative w-full h-72 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
                </div>

                {/* Top Buttons */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
                    </div>
                </div>

                {/* Event Info Skeleton */}
                <div className="px-4 py-4 max-w-lg mx-auto relative -mt-20 z-10">
                    {/* Title */}
                    <div className="h-8 bg-white/10 rounded-lg mb-3 animate-pulse w-3/4" />

                    {/* Date & Time */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 bg-yellow-400/20 rounded-lg animate-pulse w-40" />
                        <div className="h-5 bg-white/10 rounded-lg animate-pulse w-20" />
                    </div>

                    {/* Category */}
                    <div className="h-8 bg-white/10 rounded-full w-24 mb-3 animate-pulse" />

                    {/* Venue */}
                    <div className="h-4 bg-white/10 rounded-lg w-48 animate-pulse" />
                </div>
            </div>

            {/* Info Cards Skeleton */}
            <div className="px-4 py-4 max-w-lg mx-auto">
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-pulse">
                        <div className="h-3 bg-white/10 rounded w-12 mb-2" />
                        <div className="h-5 bg-white/10 rounded w-20" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 animate-pulse">
                        <div className="h-3 bg-white/10 rounded w-16 mb-2" />
                        <div className="h-5 bg-white/10 rounded w-24" />
                    </div>
                </div>
            </div>

            {/* Tabs Skeleton */}
            <div className="sticky relative w-full max-w-lg mx-auto mt-4 px-2 z-30">
                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-xl shadow-lg px-4 py-3">
                    <div className="flex items-center justify-around gap-4">
                        <div className="h-6 bg-white/10 rounded w-16 animate-pulse" />
                        <div className="h-6 bg-white/10 rounded w-16 animate-pulse" />
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="mt-6">
                    <div className="w-full max-w-lg mx-auto rounded-2xl p-6 space-y-6 backdrop-blur-xl bg-white/5 border border-white/10">
                        <div className="h-8 bg-white/10 rounded-lg w-40 animate-pulse mb-4" />

                        {/* Description Block */}
                        <div className="space-y-3">
                            <div className="h-4 bg-white/10 rounded-lg w-full animate-pulse" />
                            <div className="h-4 bg-white/10 rounded-lg w-5/6 animate-pulse" />
                            <div className="h-4 bg-white/10 rounded-lg w-4/5 animate-pulse" />
                            <div className="h-4 bg-white/10 rounded-lg w-full animate-pulse" />
                            <div className="h-4 bg-white/10 rounded-lg w-3/4 animate-pulse" />
                        </div>

                        {/* Info Items */}
                        <div className="space-y-4 mt-6">
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-white/10 rounded w-20 animate-pulse" />
                                    <div className="h-3 bg-white/10 rounded w-32 animate-pulse" />
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-white/10 rounded w-20 animate-pulse" />
                                    <div className="h-3 bg-white/10 rounded w-40 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
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
