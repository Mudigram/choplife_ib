"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { MapPin, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type FavoritesTabProps = {
    userId: string;
};

export default function FavoritesTab({ userId }: FavoritesTabProps) {
    const { favoritesWithDetails: favorites, loading, toggleFavorite } = useFavorites(userId);

    if (loading) {
        return (
            <div className="text-center text-chop-text-subtle p-6">
                Loading favorites...
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="text-center text-chop-text-subtle p-6">
                <Star className="mx-auto mb-2 text-chop-text-subtle/50" size={48} />
                <p>You have no favorites yet.</p>
                <p className="text-sm mt-2">Start exploring places and save your favorites!</p>
            </div>
        );
    }

    const handleRemove = (e: React.MouseEvent, id: string | number, type: "place" | "event") => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite({ id, type });
    };

    return (
        <div className="space-y-2 p-2">
            <h3 className="text-lg font-semibold text-chop-text-light mb-4 px-2">
                Your Saved Items ({favorites.length})
            </h3>

            {favorites.map((favorite) => {
                let image, title, subtitle, dateDisplay, href, id, type: "place" | "event";

                if (favorite.event) {
                    const item = favorite.event;
                    id = item.id;
                    type = "event";
                    href = `/events/${item.id}`;
                    image = item.thumbnail;
                    title = item.title;
                    subtitle = item.venue;
                    dateDisplay = new Date(item.start_date_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                } else if (favorite.place) {
                    const item = favorite.place;
                    id = item.id;
                    type = "place";
                    href = `/places/${item.id}`;
                    image = item.image_url;
                    title = item.name;
                    subtitle = item.area;
                    dateDisplay = null;
                } else {
                    return null;
                }

                return (
                    <Link href={href} key={favorite.id} className="block">
                        <div
                            className="
                                w-full
                                flex items-center gap-3
                                p-2
                                rounded-xl
                                backdrop-blur-md
                                border border-white/5
                                bg-[rgba(255,255,255,0.03)]
                                hover:bg-[rgba(255,255,255,0.08)]
                                transition-all
                                group
                            "
                        >
                            {/* Thumbnail */}
                            <div className="relative w-12 h-12 min-w-[3rem] rounded-lg overflow-hidden bg-gray-800">
                                {image ? (
                                    <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Star size={16} className="text-gray-500" />
                                    </div>
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-[0.95rem] font-medium text-chop-text-light truncate pr-2">
                                        {title}
                                    </p>
                                    {dateDisplay && (
                                        <span className="text-xs text-[var(--color-chop-accent-point)] shrink-0">
                                            {dateDisplay}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-0.5">
                                    <p className="text-xs text-chop-text-subtle truncate flex items-center gap-1">
                                        {subtitle || (type === "event" ? "Event" : "Place")}
                                    </p>
                                </div>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={(e) => handleRemove(e, id, type)}
                                className="
                                    p-2
                                    rounded-full
                                    text-gray-500
                                    hover:text-red-500
                                    hover:bg-white/10
                                    transition-colors
                                    shrink-0
                                "
                                title="Remove from favorites"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}