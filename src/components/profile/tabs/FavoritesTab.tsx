"use client";
import { useFavorites } from "@/hooks/useFavorites";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";

type FavoritesTabProps = {
    userId: string;
};

export default function FavoritesTab({ userId }: FavoritesTabProps) {
    const { favorites, loading, error } = useFavorites(userId);

    if (loading) {
        return (
            <div className="text-center text-chop-text-subtle p-6">
                Loading favorites...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-chop-accent-error p-6">
                Error loading favorites: {error}
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

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold text-chop-text-light mb-4">
                Your Saved Places ({favorites.length})
            </h3>
            {favorites.map((favorite) => (
                <div
                    key={favorite.id}
                    className="bg-chop-bg-card p-4 rounded-xl shadow-sm border border-white/10 hover:border-chop-accent-point/30 transition"
                >
                    {favorite.place ? (
                        <>
                            {favorite.place.image_url && (
                                <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden">
                                    <Image
                                        src={favorite.place.image_url}
                                        alt={favorite.place.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <h4 className="text-chop-text-light font-semibold mb-1">
                                {favorite.place.name}
                            </h4>
                            {favorite.place.description && (
                                <p className="text-chop-text-subtle text-sm mb-2 line-clamp-2">
                                    {favorite.place.description}
                                </p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-chop-text-subtle">
                                {favorite.place.address && (
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        <span>{favorite.place.address}</span>
                                    </div>
                                )}
                                {favorite.place.category && (
                                    <span className="bg-chop-accent-status/20 text-chop-accent-status px-2 py-1 rounded">
                                        {favorite.place.category}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-chop-text-subtle">
                            <p>Place ID: {favorite.place_id}</p>
                            <p className="text-xs mt-1">Place details not available</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}