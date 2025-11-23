"use client";

import React from "react";
import Image from "next/image";
import { Clock, Calendar, Heart } from "lucide-react";

type Category =
    | "music"
    | "food"
    | "art"
    | "networking"
    | "wellness"
    | "default";

interface EventCardProps {
    event: Record<string, unknown>;
}

const CATEGORY_COLORS: Record<Category, string> = {
    music: "from-pink-500 to-purple-500",
    food: "from-orange-400 to-yellow-500",
    art: "from-blue-400 to-indigo-500",
    networking: "from-green-400 to-emerald-500",
    wellness: "from-teal-400 to-cyan-500",
    default: "from-gray-500 to-gray-700",
};

export default function EventCard({ event }: EventCardProps) {
    /** Map Supabase field names to display values */
    const imageUrl = (event.thumbnail as string) || "/assets/events/food2.jpg";
    const title = (event.title as string) || "Untitled Event";

    // Parse start_date_time from Supabase (ISO format)
    let eventDate = "TBD";
    let eventTime = "TBD";
    if (event.start_date_time && typeof event.start_date_time === "string") {
        try {
            const dateObj = new Date(event.start_date_time);
            eventDate = dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });
            eventTime = dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch {
            console.error("Failed to parse date:", event.start_date_time);
        }
    }

    /** Pick category glow */
    const glowColor =
        CATEGORY_COLORS[event.category as Category] ||
        CATEGORY_COLORS["default"];

    return (
        <div
            className="relative group cursor-pointer transition-transform duration-300"

        >
            {/* SHIMMER BORDER + CATEGORY COLOR */}
            <div
                className={`
          absolute inset-0 rounded-2xl pointer-events-none
          before:content-[''] before:absolute before:inset-0 before:rounded-2xl
          before:border-[1.5px] before:border-transparent
          before:bg-[conic-gradient(from_0deg,transparent,rgba(255,117,24,0.7),transparent)]
          before:animate-spin-slow before:opacity-0 group-hover:opacity-100
          transition-all duration-700
        `}
            />

            {/* CATEGORY GRADIENT BORDER */}
            <div
                className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 blur-md 
          bg-linear-to-r ${glowColor} transition duration-500
        `}
            ></div>

            {/* INNER GLOW ON HOVER */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white/10 blur-xl transition-all"></div>

            {/* CARD */}
            <div
                className="relative min-w-[220px] snap-start rounded-2xl overflow-hidden bg-chop-bg-card backdrop-blur-xl 
        shadow-lg transition-all duration-500"
            >
                {/* IMAGE */}
                <div className="relative h-40 w-full overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* LIKE BUTTON */}
                    <button className="absolute top-2 right-2 bg-black/40 p-1.5 rounded-lg">
                        <Heart size={16} className="text-white" />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-3">
                    <h3 className="text-base font-bold">{title}</h3>

                    {/* Date */}
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                        <Calendar size={12} className="mr-1" />
                        {eventDate},
                        <Clock size={12} className="ml-1" />
                        {eventTime}
                    </div>

                </div>
            </div>
        </div>
    );
}
