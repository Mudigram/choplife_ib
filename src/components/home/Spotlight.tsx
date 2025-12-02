"use client";

import React, { useState } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { Heart, Share2, TrendingUp, Sparkles, RefreshCw } from "lucide-react";
import type { FeaturedSpotlight } from "@/types/spotlights";
import Link from "next/link";
import Image from "next/image";
import SpotlightSkeleton from "./SpotlightSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

export default function IBSpotlight({
    userName,
    userLocation,
}: {
    userName?: string;
    userLocation?: string;
}) {
    const { spotlight, loading, error, refetch, toggleSave } = useSpotlight();
    const user = useSelector((state: RootState) => state.auth.user);

    // Show skeleton while loading
    if (loading) return <SpotlightSkeleton />;

    // Show error state with retry
    if (error) {
        return (
            <section className="w-full px-4 mt-4">
                <div className="min-h-[170px] rounded-2xl bg-red-500/10 border border-red-500/20 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-red-400 mb-4">Failed to load spotlights</p>
                    <button
                        onClick={() => refetch()}
                        className="flex items-center gap-2 px-4 py-2 bg-chop-accent-cta text-white rounded-lg hover:bg-chop-accent-cta/80 transition"
                    >
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    // Don't render if no spotlights
    if (!spotlight || spotlight.length === 0) return null;

    return (
        <section className="w-full px-4 mt-4">
            <h2 className="text-lg text-white font-bold mb-3">
                IB Spotlights
            </h2>

            <div className="flex space-x-4 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory">
                {spotlight.map((item, index) => (
                    <SpotlightCard
                        key={item.id}
                        item={item}
                        userName={userName}
                        userLocation={userLocation}
                        index={index}
                        userId={user?.id}
                        onToggleSave={toggleSave}
                    />
                ))}
            </div>
        </section>
    );
}

function SpotlightCard({
    item,
    userName,
    userLocation,
    index = 0,
    userId,
    onToggleSave,
}: {
    item: FeaturedSpotlight;
    userName?: string;
    userLocation?: string;
    index?: number;
    userId?: string;
    onToggleSave: (params: { spotlightId: number; userId: string | undefined }) => void;
}) {
    const [isSaved, setIsSaved] = useState(false);
    const [saveCount, setSaveCount] = useState(item.save_count || 0);

    const personalizedHook = userName
        ? `Welcome Back, ${userName}! ${item.headline}`
        : item.headline;

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userId) {
            toast.error("Please login to save spotlights");
            return;
        }

        setIsSaved(!isSaved);
        setSaveCount(isSaved ? saveCount - 1 : saveCount + 1);
        onToggleSave({ spotlightId: item.id, userId });
        toast.success(isSaved ? "Removed from saved" : "Saved!");
    };

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const shareData = {
            title: item.partner_name,
            text: item.headline,
            url: `${window.location.origin}/${item.target_type}/${item.target_slug_id}`,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                toast.success("Shared successfully!");
            } catch (err) {
                console.log("Share cancelled");
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareData.url);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <Link
            href={`/${item.target_type}/${item.target_slug_id}`}
            className="
                group relative min-w-[340px] h-[170px] rounded-2xl overflow-hidden snap-center 
                bg-chop-bg-card backdrop-blur-xl border border-white/10 shadow-xl
                transition-all duration-500 ease-out
                hover:scale-[1.02] hover:shadow-2xl hover:shadow-chop-accent-cta/20
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chop-accent-cta focus-visible:ring-offset-2 focus-visible:ring-offset-chop-bg-dark
            "
            prefetch={true}
        >
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            {/* Optimized Image with lazy loading */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={item.image_url}
                    alt={`${item.partner_name} spotlight`}
                    fill
                    className="
                        object-cover transition-transform duration-700
                        group-hover:scale-110
                    "
                    sizes="340px"
                    priority={index < 2}
                    quality={85}
                    loading={index < 2 ? "eager" : "lazy"}
                />
            </div>

            {/* Enhanced gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>

            {/* CONTENT LAYER */}
            <div className="absolute inset-0 flex flex-col justify-between p-4">

                {/* Top row: Badges + Actions */}
                <div className="flex items-start justify-between">
                    {/* Badges */}
                    <div className="flex gap-2">
                        {item.is_new && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-chop-accent-cta/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                <Sparkles size={12} />
                                New
                            </span>
                        )}
                        {item.is_trending && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-chop-accent-point/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                                <TrendingUp size={12} />
                                Trending
                            </span>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            aria-label={isSaved ? "Unsave spotlight" : "Save spotlight"}
                        >
                            <Heart
                                size={16}
                                className={isSaved ? "fill-red-500 text-red-500" : "text-white"}
                            />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full hover:bg-black/60 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            aria-label="Share spotlight"
                        >
                            <Share2 size={16} className="text-white" />
                        </button>
                    </div>
                </div>

                {/* Middle section - Partner name and headline */}
                <div>
                    <h3 className="text-white font-bold text-xl drop-shadow-lg leading-tight">
                        {item.partner_name}
                    </h3>

                    <p className="text-chop-accent-cta text-sm mt-1 drop-shadow-md font-medium">
                        {personalizedHook}
                    </p>
                </div>

                {/* Bottom Row (CTA & Social Proof) */}
                <div className="flex items-end justify-between w-full">
                    {/* CTA Button */}
                    <button
                        className="
                            bg-gradient-to-r from-chop-accent-cta to-chop-accent-point 
                            text-white text-sm font-semibold
                            py-2 px-4 rounded-lg shadow-lg
                            hover:shadow-xl hover:scale-105 transition-all
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                        "
                    >
                        {item.cta_text}
                    </button>

                    {/* Social Proof */}
                    <div className="flex flex-col items-end gap-1">
                        {saveCount > 0 && (
                            <p className="text-white/90 text-xs font-medium flex items-center gap-1">
                                <Heart size={12} className="fill-red-500 text-red-500" />
                                {saveCount} {saveCount === 1 ? "save" : "saves"}
                            </p>
                        )}
                        {item.sub_text && (
                            <p className="text-white/70 text-[11px] max-w-[120px] text-right">
                                {item.sub_text}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
