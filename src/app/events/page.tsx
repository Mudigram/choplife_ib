"use client";

import React, { useMemo, useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import MasonryGrid from "@/components/browse/MasonryGrid";
import BrowseCard from "@/components/browse/BrowseCard";
import Spinner from "@/components/ui/Spinner";
import BrowseCardSkeleton from "@/components/ui/BrowseCardSkeleton";
import { Search, SlidersHorizontal, Calendar as CalendarIcon } from "lucide-react";

const SORT_OPTIONS = [
    { label: "Date (Soonest)", value: "date_asc" },
    { label: "Date (Latest)", value: "date_desc" },
    { label: "Popularity", value: "popular" },
];

export default function EventsPage() {
    /** 🔥 Fetch all events */
    const {
        events: allEvents,
        loading,
        error,
    } = useEvents();

    /** 🔥 UI State */
    const [category, setCategory] = useState<string>("all");
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("date_asc");

    /** 🔥 Dynamic Categories */
    const categories = useMemo(() => {
        const uniqueCategories = new Set(allEvents.map(e => e.category).filter(Boolean));
        return ["all", ...Array.from(uniqueCategories)];
    }, [allEvents]);

    /** 🔥 Filtered & Sorted Events */
    const filteredEvents = useMemo(() => {
        let result = allEvents.filter(event => {
            const matchesCategory =
                category === "all" ? true : event.category === category;

            const matchesSearch =
                search.trim() === "" ||
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                (event.venue && event.venue.toLowerCase().includes(search.toLowerCase()));

            return matchesCategory && matchesSearch;
        });

        // Sort
        result.sort((a, b) => {
            switch (sortBy) {
                case "date_asc":
                    return new Date(a.start_date_time).getTime() - new Date(b.start_date_time).getTime();
                case "date_desc":
                    return new Date(b.start_date_time).getTime() - new Date(a.start_date_time).getTime();
                case "popular":
                    // Assuming we might have a popularity metric later, for now fallback to date
                    return 0;
                default:
                    return 0;
            }
        });

        return result;
    }, [allEvents, category, search, sortBy]);

    /** 🔥 Loading & Error */
    if (loading) {
        return (
            <main className="w-full min-h-screen bg-chop-bg-dark text-white pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    {/* HEADER SKELETON */}
                    <div className="mb-8 space-y-4">
                        <div className="h-10 bg-white/10 rounded-lg w-64 animate-pulse" />
                        <div className="h-5 bg-white/10 rounded-lg w-96 animate-pulse" />
                    </div>

                    {/* CONTROLS SKELETON */}
                    <div className="sticky top-0 z-40 bg-chop-bg-dark/95 backdrop-blur-md py-4 mb-6 border-b border-white/10 space-y-4">
                        <div className="flex flex-col md:flex-row gap-4 justify-between">
                            <div className="w-full md:w-96 h-10 bg-white/10 rounded-full animate-pulse" />
                            <div className="flex gap-2">
                                <div className="w-24 h-8 bg-white/10 rounded-full animate-pulse" />
                                <div className="w-24 h-8 bg-white/10 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>

                    {/* GRID SKELETON */}
                    <MasonryGrid>
                        {[...Array(8)].map((_, i) => (
                            <BrowseCardSkeleton key={i} />
                        ))}
                    </MasonryGrid>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-chop-bg-dark flex items-center justify-center text-chop-accent-error p-6">
                Error loading events: {error}
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-chop-bg-dark text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* HEADER */}
                <div className="mb-8 space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        ChopLife Pulse
                    </h1>
                    <p className="text-gray-400 max-w-2xl">
                        Find the hottest events, parties, and gatherings happening in Ibadan.
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
                                placeholder="Search events..."
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
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider shrink-0">Category</span>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat as string)}
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
                    </div>
                </div>

                {/* GRID CONTENT */}
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-lg">No events found</p>
                        <p className="text-sm">Try adjusting your filters</p>
                    </div>
                ) : (
                    <MasonryGrid>
                        {filteredEvents.map((event) => (
                            <BrowseCard
                                key={event.id}
                                id={event.id}
                                type="event"
                                title={event.title}
                                subtitle={event.venue || undefined}
                                imageUrl={event.thumbnail}
                                category={event.category || undefined}
                                date={new Date(event.start_date_time).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                                price={event.price_ngn > 0 ? `₦${event.price_ngn.toLocaleString()}` : "Free"}
                            />
                        ))}
                    </MasonryGrid>
                )}
            </div>
        </main>
    );
}
