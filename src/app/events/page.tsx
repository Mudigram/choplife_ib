"use client";

import React from "react";
import EventTabs from "@/components/events/EventsTab";
import EventCategoryBar from "@/components/events/CategoryFilter";
import SearchBar from "@/components/events/SearchBar";
import EventList from "@/components/events/EventsList";
import FeaturedListSection from "@/components/events/FeaturedListSection";
import { SampleEvents } from "@/data/sampleEvents";

export default function EventsPage() {
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

                {/* SEARCH BAR (NOT sticky) */}
                <div className="mt-2 mb-3">
                    <SearchBar />
                </div>

                {/* STICKY FILTER ZONE */}
                <div className="sticky top-0 z-[50] bg-chop-bg-dark/95 backdrop-blur-md pb-3 pt-2">

                    {/* EVENT TABS */}
                    <EventTabs />

                    {/* CATEGORY FILTER SCROLLER */}
                    <div className="mt-2">
                        <EventCategoryBar />
                    </div>
                </div>

                {/* CONTENT FEED */}
                <section className="mt-4">
                    <EventList />
                    <FeaturedListSection title="Trending Around You"
                        text='Best Recc and Promoted events'
                        events={SampleEvents.aroundYou} />
                    <FeaturedListSection title="Trending Around You"
                        text='Best Recc and Promoted events'
                        events={SampleEvents.trending} />
                    <FeaturedListSection title="Trending Around You"
                        text='Best Recc and Promoted events'
                        events={SampleEvents.hot} />
                    <EventList />
                </section>

            </div>
        </main>
    );
}
