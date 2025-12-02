"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";

export default function ViewAll() {
    return (
        <div className="grid grid-cols-2 gap-4 mb-8">

            {/* PLACES */}
            <Link
                href="/places"
                className="group relative overflow-hidden rounded-2xl p-[2px]"
            >
                {/* 🔥 Shimmer Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-chop-accent-cta via-transparent to-chop-accent-cta bg-[length:200%_200%] animate-shimmer pointer-events-none" />

                {/* Main card */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: `url('/assets/places.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-32 sm:h-40 p-4 text-white">
                        <MapPin className="w-6 h-6 opacity-90 mb-2 group-hover:scale-110 transition-transform" />

                        <h3 className="font-semibold text-sm sm:text-base">
                            Explore Places
                        </h3>
                        <p className="text-xs text-white/70 mt-1">
                            Discover hidden gems
                        </p>
                    </div>
                </div>
            </Link>

            {/* EVENTS */}
            <Link
                href="/events"
                className="group relative overflow-hidden rounded-2xl p-[2px]"
            >
                {/* 🔥 Shimmer Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-chop-accent-point via-transparent to-chop-accent-point bg-[length:200%_200%] animate-shimmer pointer-events-none" />

                {/* Main card */}
                <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: `url('/assets/events.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center h-32 sm:h-40 p-4 text-white">
                        <Calendar className="w-6 h-6 opacity-90 mb-2 group-hover:scale-110 transition-transform" />

                        <h3 className="font-semibold text-sm sm:text-base">
                            Upcoming Events
                        </h3>
                        <p className="text-xs text-white/70 mt-1">
                            Don't miss out
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
}
