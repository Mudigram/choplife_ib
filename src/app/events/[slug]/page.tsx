import React from "react";
import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";
import EventCardSmall from "@/components/events/FeaturedEvents";
import EventsSkeleton from "@/components/events/EventsSkeleton";
import { SampleEvents } from "@/data/sampleEvents";

const SECTIONS = {

    "trending-around-you": {
        title: "Trending Around You",
        text: "Top events happening nearby",
        data: SampleEvents.aroundYou,
    },
    "hot-this-week": {
        title: "Hot This Week",
        text: "Most anticipated events this week",
        data: SampleEvents.hot,
    },
    "top-favorites": {
        title: "Top Favorites",
        text: "Events people love the most",
        data: SampleEvents.favorites,
    },
    "trending": {
        title: "Trending",
        text: "Currently blowing up everywhere",
        data: SampleEvents.trending,
    }
};

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params; // <-- unwrap

    const section = SECTIONS[slug];

    if (!section) {
        return <div>Invalid section</div>;
    }

    const events = [1];

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
                    {section.title}
                </h1>

                <p className="text-sm text-chop-text-subtle">
                    {section.text}
                </p>
            </div>

            {events.length === 0 && <EventsSkeleton />}

            {/* CONTENT */}
            <div className="mt-4 space-y-3">
                {section.data.map((event: any) => (
                    <EventCardSmall key={event.id} event={event} />
                ))}
            </div>

            {/* 🔙 FLOATING BACK BUTTON (bottom-left) */}
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


