import React from 'react';
import Image from 'next/image';
import type { Place } from '@/types/place';
import { CircleArrowLeft, Share, Heart, BadgeCheck } from "lucide-react";
import Link from "next/link";

type PlaceHeaderProps = {
    place: Partial<Place>;
};

export default function Header({ place }: PlaceHeaderProps) {
    const defaultHeader = "/assets/header/header1.jpg";
    const imageUrl = place?.image_url || defaultHeader;
    const name = place?.name || "Place";

    return (
        <header className="relative w-full max-w-lg mx-auto">

            {/* IMAGE */}
            <div className="relative w-full h-72">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover "
                    priority
                />

                {/* DARK GRADIENT FOR READABILITY */}
                <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/10" />
            </div>

            {/* TOP BUTTONS */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">

                {/* Back Button */}
                <Link
                    href="/places"
                    className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition"
                >
                    <CircleArrowLeft size={22} className="text-white" />
                </Link>

                {/* Right Buttons */}
                <div className="flex items-center gap-3">

                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition">
                        <Heart size={22} className="text-white" />
                    </button>

                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition">
                        <Share size={22} className="text-white" />
                    </button>

                </div>
            </div>

            {/* PLACE INFO SECTION */}
            <div className="px-4 py-4 max-w-lg mx-auto bg-linear-to-b from-black/50 to-transparent relative -mt-20 z-10">
                <h1 className="text-2xl font-bold text-white mb-2">{name}</h1>

                {/* RATING */}
                {place?.average_rating ? (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 font-semibold">{place.average_rating.toFixed(1)} ★</span>
                        <span className="text-gray-300 text-sm">({place.total_reviews || 0} reviews)</span>
                    </div>
                ) : null}

                {/* CATEGORY */}
                {place?.category && (
                    <div className="inline-block bg-white/10 border border-white/20 rounded-full px-3 py-1 text-sm text-white/80 mb-3">
                        {place.category}
                    </div>
                )}

                {/* ADDRESS */}
                {place?.address && (
                    <p className="text-gray-300 text-sm flex items-start gap-2">
                        <span>📍</span>
                        <span>{place.address}</span>
                    </p>
                )}
            </div>

        </header>
    );
}
