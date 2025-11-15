"use client";

import React from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { MapPin, Clock } from "lucide-react";
import type { FeaturedSpotlight } from "@/types/spotlights";
import Link from "next/link";
import Image from "next/image";

export default function IBSpotlight({
    userName,
    userLocation,
}: {
    userName?: string;
    userLocation?: string;
}) {
    const { spotlight, loading, error } = useSpotlight();

    if (loading) return null; // or skeleton
    if (error) return null;   // optional: show fallback UI
    if (!spotlight || spotlight.length === 0) return null;

    return (
        <section className="w-full px-4 mt-4">
            <h2 className="text-lg text-white font-semibold mb-2">
                Featured For You
            </h2>

            <div className="flex space-x-4 overflow-x-auto scrollbar-none pb-2 snap-x snap-mandatory">
                {spotlight.map((item) => (
                    <SpotlightCard
                        key={item.id}
                        item={item}
                        userName={userName}
                        userLocation={userLocation}
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
}: {
    item: FeaturedSpotlight;
    userName?: string;
    userLocation?: string;
}) {
    /* Personalized hook logic */
    let personalizedHook = item.headline;

    if (userName) {
        personalizedHook = `Welcome Back, ${userName}! ${item.headline}`;
    }

    return (
        <div className="min-w-[260px] rounded-2xl snap-center bg-chop-bg-card backdrop-blur-md border border-white/10 shadow-xl overflow-hidden relative">
            {/* Image */}
            <div className="h-40 w-full relative">
                <Image
                    src={item.image_url}
                    fill
                    alt={item.partner_name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="text-white font-bold text-lg leading-tight">
                    {item.partner_name}
                </h3>

                <p className="text-chop-accent-cta font-medium text-sm">
                    {personalizedHook}
                </p>

                {item.sub_text && (
                    <p className="text-chop-text-subtle text-xs">{item.sub_text}</p>
                )}

                {/* Location/Time Cues */}
                <div className="flex items-center text-xs text-gray-400 mt-1">
                    <MapPin size={14} className="mr-1 text-chop-accent-point" />
                    {userLocation || "Lagos"}
                </div>

                {item.target_type === "party" && (
                    <div className="flex items-center text-xs text-gray-400">
                        <Clock size={14} className="mr-1 text-chop-accent-status" />
                        Tonight @ 9PM
                    </div>
                )}

                {/* CTA */}
                <Link
                    href={`/${item.target_type}/${item.target_slug_id}`}
                    className="block w-full text-center bg-chop-accent-cta hover:bg-chop-accent-cta/80 text-white font-semibold py-2 mt-3 rounded-lg shadow-[var(--shadow-neon-cta)] transition"
                >
                    {item.cta_text}
                </Link>
            </div>
        </div>
    );
}
