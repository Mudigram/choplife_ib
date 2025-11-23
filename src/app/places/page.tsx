"use client";

import React, { useEffect, useRef } from "react";
import { useBrowsePlaces, SortOption } from "@/hooks/useBrowsePlaces";
import MasonryGrid from "@/components/browse/MasonryGrid";
import BrowseCard from "@/components/browse/BrowseCard";
import Spinner from "@/components/ui/Spinner";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

// Filter Options
const CATEGORIES = ["all", "Restaurant", "Cafe", "Lounge", "Bar", "Activity"];
const AREAS = ["all", "Bodija", "Ring Road", "Ikolaba", "Jericho", "Oluyole"];
const SORT_OPTIONS: { label: string; value: SortOption }[] = [
    { label: "Most Popular", value: "popular" },
    { label: "Top Rated", value: "rating" },
    { label: "Newest", value: "newest" },
];

export default function PlacesPage() {
    const {
        places,
        loading,
        error,
        hasMore,
        loadMore,
        filters
    } = useBrowsePlaces();

    const {
        category, setCategory,
        area, setArea,
        search, setSearch,
        sortBy, setSortBy
    } = filters;

    // Infinite Scroll Observer
    const observerTarget = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    return (
        <main className="min-h-screen bg-chop-bg-dark text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* HEADER */}
                <div className="mb-8 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Discover Places
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        Explore the best restaurants, lounges, and activities in Ibadan.
                        Curated just for you.
                    </p>
                </div>

                {/* CONTROLS BAR */}
                <div className="sticky top-0 z-40 bg-chop-bg-dark/95 backdrop-blur-md py-4 mb-6 border-b border-white/10 space-y-4">

                    {/* Search & Sort Row */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search places..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[var(--color-chop-accent-point)] transition-colors"
                            />
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                            <SlidersHorizontal size={16} className="text-gray-400 shrink-0" />
                            {SORT_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setSortBy(option.value)}
                                    className={`
                                        px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
                                        ${sortBy === option.value
                                            ? "bg-[var(--color-chop-accent-point)] text-black"
                                            : "bg-white/5 text-gray-400 hover:bg-white/10"}
                                    `}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Categories */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider shrink-0">Type</span>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={`
                                        px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all border
                                        ${category === cat
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"}
                                    `}
                                >
                                    {cat === "all" ? "All" : cat}
                                </button>
                            ))}
                        </div>

                        {/* Areas */}
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar sm:border-l sm:border-white/10 sm:pl-4">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider shrink-0">Area</span>
                            {AREAS.map((a) => (
                                <button
                                    key={a}
                                    onClick={() => setArea(a)}
                                    className={`
                                        px-3 py-1 rounded-full text-xs whitespace-nowrap transition-all border
                                        ${area === a
                                            ? "bg-white text-black border-white"
                                            : "bg-transparent text-gray-400 border-white/10 hover:border-white/30"}
                                    `}
                                >
                                    {a === "all" ? "Anywhere" : a}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* GRID CONTENT */}
                {error ? (
                    <div className="text-center py-20 text-red-400">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()} className="mt-4 text-white underline">Retry</button>
                    </div>
                ) : (
                    <>
                        <MasonryGrid>
                            {places.map((place) => (
                                <BrowseCard
                                    key={place.id}
                                    id={place.id}
                                    type="place"
                                    title={place.name}
                                    subtitle={place.area || undefined}
                                    imageUrl={place.image_url || undefined}
                                    rating={place.average_rating || undefined}
                                    category={place.category || undefined}
                                    price={place.price_range || undefined}
                                />
                            ))}
                        </MasonryGrid>

                        {/* Loading State & Infinite Scroll Target */}
                        <div ref={observerTarget} className="py-10 flex justify-center w-full">
                            {loading && <Spinner size="md" message="Loading more places..." />}
                            {!loading && !hasMore && places.length > 0 && (
                                <p className="text-gray-500 text-sm">You've reached the end of the list.</p>
                            )}
                            {!loading && places.length === 0 && (
                                <div className="text-center text-gray-400">
                                    <p className="text-lg">No places found</p>
                                    <p className="text-sm">Try adjusting your filters</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
