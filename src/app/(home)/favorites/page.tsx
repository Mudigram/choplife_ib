"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFavorites } from "@/hooks/useFavorites";
import FilterTabs from "@/components/favorites/FilterTabs";
import FavoriteCard from "@/components/favorites/FavoriteCard";
import Spinner from "@/components/ui/Spinner";
import { ArrowLeft } from "lucide-react";

export default function FavoritesPage() {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.auth.user);
    const { favoritesWithDetails, loading, toggleFavorite } = useFavorites(user?.id);
    const [activeFilter, setActiveFilter] = useState<"all" | "places" | "events">("all");

    // Filter favorites based on active filter
    const filteredFavorites = favoritesWithDetails.filter((fav) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "places") return !!fav.place;
        if (activeFilter === "events") return !!fav.event;
        return true;
    });

    const handleUnfavorite = (favorite: any) => {
        const id = favorite.place_id || favorite.event_id;
        const type = favorite.place_id ? "place" : "event";
        toggleFavorite({ id, type });
    };

    const handleCardClick = (favorite: any) => {
        if (favorite.place_id) {
            router.push(`/places/${favorite.place_id}`);
        } else if (favorite.event_id) {
            router.push(`/events/${favorite.event_id}`);
        }
    };

    if (loading) {
        return <Spinner size="lg" message="Loading favorites..." full />;
    }

    return (
        <div className="min-h-screen bg-chop-bg-dark">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-chop-bg-dark/95 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center gap-3 p-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft size={20} className="text-white" />
                    </button>
                    <h1 className="text-xl font-bold text-white">My Favorites</h1>
                </div>

                {/* Filter Tabs */}
                <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </div>

            {/* Content */}
            <div className="p-4">
                {filteredFavorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <div className="text-6xl mb-4">💔</div>
                        <h2 className="text-xl font-semibold text-white mb-2">No favorites yet</h2>
                        <p className="text-gray-400 mb-6">
                            {activeFilter === "all"
                                ? "Start exploring and save your favorite places and events!"
                                : `No ${activeFilter} in your favorites yet.`}
                        </p>
                        <button
                            onClick={() => router.push("/home")}
                            className="px-6 py-3 bg-chop-accent-cta text-white rounded-full hover:opacity-90 transition-opacity"
                        >
                            Explore Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredFavorites.map((favorite) => (
                            <FavoriteCard
                                key={favorite.id}
                                favorite={favorite}
                                onUnfavorite={() => handleUnfavorite(favorite)}
                                onClick={() => handleCardClick(favorite)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
