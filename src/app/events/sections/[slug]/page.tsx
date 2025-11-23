"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import EventCardSmall from "@/components/events/FeaturedEvents";
import EventsSkeleton from "@/components/events/EventsSkeleton";
import { useEventSection } from "@/hooks/useEventSections";

const SECTION_META = {
    "trending-around-you": {
        title: "Trending Around You",
        text: "Top events happening nearby",
    },
    "hot-this-week": {
        title: "Hot This Week",
        text: "Most anticipated events this week",
    },
    "top-favorites": {
        title: "Top Favorites",
        text: "Events people love the most",
    },
    "trending": {
        title: "Trending",
        text: "Currently blowing up everywhere",
    },
} as const;

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    console.log("SLUG:", slug);
    const meta = SECTION_META[slug as keyof typeof SECTION_META];
    const { data, loading, error } = useEventSection(slug);

    if (!meta) return <div>Invalid section</div>;

    // 🔥 Fetch Supabase section data using your hook


    const events = data?.events || [];

    return (
        <div className="min-h-screen w-full bg-black text-white px-4 pb-2 ">

            {/* 🔥 STICKY HEADER */}
            <div
                className="
                sticky top-0 z-20
                backdrop-blur-md
                border-b border-white/10
                px-2 py-4
                "
            >
                <h1 className="text-xl font-bold text-chop-text-light">
                    {meta.title}
                </h1>

                <p className="text-sm text-chop-text-subtle">
                    {meta.text}
                </p>
            </div>

            {/* LOADING STATE */}
            {loading && <EventsSkeleton />}

            {/* ERROR STATE */}
            {error && (
                <p className="text-red-400 text-sm mt-4">
                    Failed to load events: {error}
                </p>
            )}

            {/* CONTENT */}
            <div className="mt-4 space-y-3">
                {events.map((event: any) => (
                    <EventCardSmall key={event.id} event={event} />
                ))}
            </div>

            {/* 🔙 BACK BUTTON */}
            <Link
                href="/events"
                className="
                fixed bottom-25 left-5 z-30
                flex items-center gap-2
                px-4 py-2
                rounded-full
                backdrop-blur-lg
                bg-[rgba(255,255,255,0.07)]
                border border-white/15
                shadow-[0_0_12px_rgba(255,215,0,0.15)]
                hover:shadow-[0_0_18px_rgba(255,215,0,0.25)]
                transition-all
                "
            >
                <ArrowLeftCircle className="text-[var(--color-chop-accent-point)]" size={20} />
                <span className="text-sm font-medium text-chop-text-light">Back to Events</span>
            </Link>
        </div>
    );
}
