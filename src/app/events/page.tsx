"use client";

import React from "react";
import EventTabs from "@/components/events/EventsTab";
import EventCategoryBar from "@/components/events/CategoryFilter";
import SearchBar from "@/components/events/SearchBar";
import EventList from "@/components/events/EventsList";
import FeaturedListSection from "@/components/events/FeaturedListSection";
import { useEvents } from "@/hooks/useEvents";
import { useEventSection } from "@/hooks/useEventSections";
import Spinner from "@/components/ui/Spinner";
// types: Event shapes are flexible (from useEvents hook)

export default function EventsPage() {
    /** 🔥 Fetch all events */
    const {
        events: allEvents,
        loading,
        error,
    } = useEvents();

    /** 🔥 UI State */
    const [category, setCategory] = React.useState<string>("all");
    const [search, setSearch] = React.useState<string>("");

    /** 🔥 Filtered Events */
    const filteredEvents = React.useMemo(() => {
        return allEvents.filter(event => {
            const matchesCategory =
                category === "all" ? true : event.category === category;

            const matchesSearch =
                search.trim() === "" ||
                event.title.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [allEvents, category, search]);

    /** 🔥 Fetch Supabase featured sections */
    const trending = useEventSection("trending-around-you");
    const hotWeek = useEventSection("hot-this-week");
    const favorites = useEventSection("top-favorites");

    /** 🔥 Filter featured section events by category */
    const filteredTrending = React.useMemo(() => {
        if (!trending.data?.events) return [];
        return trending.data.events.filter(event => {
            const matchesCategory = category === "all" ? true : event.category === category;
            const matchesSearch =
                search.trim() === "" ||
                event.title.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [trending.data, category, search]);


    const filteredHotWeek = React.useMemo(() => {
        if (!hotWeek.data?.events) return [];
        return hotWeek.data.events.filter(event => {
            const matchesCategory = category === "all" ? true : event.category === category;
            const matchesSearch =
                search.trim() === "" ||
                event.title.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [hotWeek.data, category, search]);


    const filteredFavorites = React.useMemo(() => {
        if (!favorites.data?.events) return [];
        return favorites.data.events.filter(event => {
            const matchesCategory = category === "all" ? true : event.category === category;
            const matchesSearch =
                search.trim() === "" ||
                event.title.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [favorites.data, category, search]);


    /** 🔥 Loading & Error */
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-chop-bg-dark text-center p-6">
                <Spinner size="lg" message="Loading Events" full />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-chop-accent-error p-6">
                Error loading events: {error}
            </div>
        );
    }

    if (allEvents.length === 0) {
        return (
            <div className="text-center text-chop-text-subtle p-6">
                <p>No events currently available yet.</p>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-chop-bg-dark text-white pb-20">
            <div className="max-w-lg mx-auto px-4">

                {/* PAGE TITLE */}
                <header className="py-4">
                    <h1 className="text-3xl font-extrabold">ChopLife Pulse</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Find what is happening near you.
                    </p>
                </header>

                {/* SEARCH BAR */}
                <div className="mt-2 mb-3">
                    <SearchBar value={search} onChange={setSearch} />
                </div>

                {/* FILTER ZONE */}
                <div className="sticky top-0 z-50 bg-chop-bg-dark/95 backdrop-blur-md pb-3 pt-2">

                    <EventTabs />

                    <div className="mt-2">
                        <EventCategoryBar
                            selected={category}
                            onSelect={(cat) => setCategory(cat)}
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <section className="mt-4">

                    {/* MAIN EVENT LIST (FILTERED) */}
                    <EventList events={filteredEvents} />

                    <FeaturedListSection
                        title="Trending Around You"
                        text="Best Rec and promoted events"
                        slug="trending-around-you"
                        loading={trending.loading}
                        error={trending.error}
                        events={filteredTrending}
                    />

                    <FeaturedListSection
                        title="Hot this Week"
                        text="Most active events this week"
                        slug="hot-this-week"
                        loading={hotWeek.loading}
                        error={hotWeek.error}
                        events={filteredHotWeek}
                    />

                    <FeaturedListSection
                        title="Top Favorites"
                        text="Most saved and trending"
                        slug="top-favorites"
                        loading={favorites.loading}
                        error={favorites.error}
                        events={filteredFavorites}
                    />

                    <EventList events={filteredEvents} />
                </section>
            </div>
        </main>
    );
}
