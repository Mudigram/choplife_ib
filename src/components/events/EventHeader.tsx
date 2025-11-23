"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import type { IbadanEvent } from '@/types/events';
import { CircleArrowLeft, Share, Heart, Check } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFavorites } from "@/hooks/useFavorites";

type EventHeaderProps = {
    event: Partial<IbadanEvent>;
};

export default function EventHeader({ event }: EventHeaderProps) {
    const user = useSelector((state: RootState) => state.auth.user);
    const { isFavorite, toggleFavorite } = useFavorites(user?.id);
    const [showCopied, setShowCopied] = useState(false);

    const defaultHeader = "/assets/header/header1.jpg";
    const imageUrl = event?.thumbnail || defaultHeader;
    const title = event?.title || "Event";
    const eventId = event?.id;

    const handleFavorite = () => {
        if (eventId) {
            toggleFavorite({ id: eventId, type: "event" });
        }
    };

    const handleShare = async () => {
        const url = window.location.href;

        // Try native share API first (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out ${title} on ChopLife!`,
                    url: url,
                });
                return;
            } catch (err) {
                // User cancelled or error, fall back to copy
            }
        }

        // Fallback: copy to clipboard
        try {
            await navigator.clipboard.writeText(url);
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const isFav = eventId ? isFavorite(eventId) : false;

    // Format date
    const eventDate = event?.start_date_time
        ? new Date(event.start_date_time).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : null;

    const eventTime = event?.start_date_time
        ? new Date(event.start_date_time).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
        : null;

    return (
        <header className="relative w-full max-w-lg mx-auto">

            {/* IMAGE */}
            <div className="relative w-full h-72">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* DARK GRADIENT FOR READABILITY */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/10" />
            </div>

            {/* TOP BUTTONS */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">

                {/* Back Button */}
                <Link
                    href="/home"
                    className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition"
                >
                    <CircleArrowLeft size={22} className="text-white" />
                </Link>

                {/* Right Buttons */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={handleFavorite}
                        className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition"
                    >
                        <Heart
                            size={22}
                            className={isFav ? "text-red-500 fill-red-500" : "text-white"}
                        />
                    </button>

                    <button
                        onClick={handleShare}
                        className="relative p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition"
                    >
                        {showCopied ? (
                            <Check size={22} className="text-green-400" />
                        ) : (
                            <Share size={22} className="text-white" />
                        )}
                    </button>

                </div>
            </div>

            {/* EVENT INFO SECTION */}
            <div className="px-4 py-4 max-w-lg mx-auto bg-linear-to-b from-black/50 to-transparent relative -mt-20 z-10">
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>

                {/* DATE & TIME */}
                {eventDate && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 font-semibold">📅 {eventDate}</span>
                        {eventTime && <span className="text-gray-300 text-sm">• {eventTime}</span>}
                    </div>
                )}

                {/* CATEGORY */}
                {event?.category && (
                    <div className="inline-block bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm text-white/80 mb-3">
                        {event.category}
                    </div>
                )}

                {/* VENUE */}
                {event?.venue && (
                    <p className="text-gray-300 text-sm flex items-start gap-2">
                        <span>📍</span>
                        <span>{event.venue}</span>
                    </p>
                )}
            </div>

        </header>
    );
}
