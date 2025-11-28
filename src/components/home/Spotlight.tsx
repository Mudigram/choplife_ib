"use client";

import React from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import { MapPin } from "lucide-react";
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
}: {
    item: FeaturedSpotlight;
    userName?: string;
    userLocation?: string;
    index?: number;
}) {
    const personalizedHook = userName
        ? `Welcome Back, ${userName}! ${item.headline}`
        : item.headline;

    return (
        <div
            className="
          group relative min-w-[340px] h-[170px] rounded-2xl overflow-hidden snap-center 
          bg-chop-bg-card backdrop-blur-xl border border-white/10 shadow-xl
          transition-all duration-500 ease-out
          hover:rotate-[1.3deg] hover:scale-[1.02]
        "
        >
            {/* Parallax Image */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src={item.image_url}
                    alt={item.partner_name}
                    fill
                    className="
              object-cover transition-transform duration-700
              group-hover:scale-110 group-hover:translate-x-2
            "
                    sizes="340px"
                    priority={index < 2}
                    quality={85}
                />
            </div>

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* CONTENT LAYER */}
            <div className="absolute inset-0 flex flex-col justify-between p-4">

                {/* Top-left Location */}
                <div className="flex items-center text-white/80 text-xs">
                    <MapPin size={14} className="text-chop-accent-point mr-1" />
                    {userLocation || "Lagos"}
                </div>

                {/* Middle section */}
                <div>
                    <h3 className="text-white font-bold text-xl drop-shadow">
                        {item.partner_name}
                    </h3>

                    <p className="text-chop-accent-cta text-sm mt-1 drop-shadow">
                        {personalizedHook}
                    </p>
                </div>

                {/* Bottom Row (CTA & Subtext) */}
                <div className="flex items-end justify-between w-full">
                    {/* CTA Button */}
                    <Link
                        href={`/${item.target_type}/${item.target_slug_id}`}
                        className="
                bg-chop-accent-cta text-white text-sm font-semibold
                py-1.5 px-3 rounded-md shadow-[var(--shadow-neon-cta)]
                hover:bg-chop-accent-cta/80 transition
              "
                    >
                        {item.cta_text}
                    </Link>

                    {item.sub_text && (
                        <p className="text-white/70 text-[11px] max-w-[120px] text-right">
                            {item.sub_text}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

