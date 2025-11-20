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

    return (
        <header className="relative w-full max-w-lg mx-auto">

            {/* IMAGE */}
            <div className="relative w-full h-72">
                <Image
                    src={place.image_url || defaultHeader}
                    alt={place.name || "Place image"}
                    fill
                    className="object-cover "
                    priority
                />

                {/* DARK GRADIENT FOR READABILITY */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
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

        </header>
    );
}
