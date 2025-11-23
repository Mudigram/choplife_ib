"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import type { FavoriteWithDetails } from "@/hooks/useFavorites";

type FavoriteCardProps = {
    favorite: FavoriteWithDetails;
    onUnfavorite: () => void;
    onClick: () => void;
};

export default function FavoriteCard({ favorite, onUnfavorite, onClick }: FavoriteCardProps) {
    const isPlace = !!favorite.place;
    const item = isPlace ? favorite.place : favorite.event;

    if (!item) return null;

    const title = isPlace ? favorite.place!.name : favorite.event!.title;
    const imageUrl = isPlace ? favorite.place!.image_url : favorite.event!.thumbnail;
    const subtitle = isPlace
        ? favorite.place!.area || "Unknown area"
        : new Date(favorite.event!.start_date_time).toLocaleDateString();

    return (
        <div
            onClick={onClick}
            className="relative bg-white/5 rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all group"
        >
            {/* Image */}
            <div className="relative w-full h-40 bg-zinc-800/40">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800/60 to-zinc-900/60">
                        <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                )}

                {/* Unfavorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onUnfavorite();
                    }}
                    className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
                >
                    <Heart size={16} className="fill-red-500 text-red-500" />
                </button>

                {/* Type Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-white">
                    {isPlace ? "Place" : "Event"}
                </div>
            </div>

            {/* Content */}
            <div className="p-3">
                <h3 className="text-sm font-semibold text-white line-clamp-1">{title}</h3>
                <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                {isPlace && favorite.place!.average_rating && (
                    <p className="text-xs text-yellow-500 mt-1">⭐ {favorite.place!.average_rating}</p>
                )}
            </div>
        </div>
    );
}
