"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, MapPin, Calendar, Star } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import Spinner from "@/components/ui/Spinner";
import Image from "next/image";
import Link from "next/link";
import { Place } from "@/types/place";
import { IbadanEvent } from "@/types/events";

function SearchContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get("q") || "";
    const [query, setQuery] = useState(initialQuery);
    const [activeTab, setActiveTab] = useState<"all" | "places" | "events">("all");

    const { results, loading, error } = useSearch(query);

    // Update URL when query changes
    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set("q", query);
        } else {
            params.delete("q");
        }
        router.replace(`/search?${params.toString()}`);
    }, [query, router, searchParams]);

    const tabs = [
        { id: "all", label: "All Results" },
        { id: "places", label: "Places" },
        { id: "events", label: "Events" },
    ];

    const hasResults = results.places.length > 0 || results.events.length > 0;

    return (
        <div className="min-h-screen bg-chop-bg-dark pb-24">
            {/* Search Header */}
            <div className="sticky top-0 z-20 bg-chop-bg-dark/80 backdrop-blur-md border-b border-white/10 p-4 pt-6">
                <div className="max-w-lg mx-auto space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chop-text-subtle w-5 h-5" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search places, events, vibes..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-chop-text-light placeholder:text-chop-text-subtle focus:outline-none focus:border-chop-accent-cta/50 transition-colors"
                            autoFocus
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`
                                    px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors
                                    ${activeTab === tab.id
                                        ? "bg-chop-accent-cta text-white"
                                        : "bg-white/5 text-chop-text-subtle hover:bg-white/10"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Area */}
            <div className="max-w-lg mx-auto p-4 space-y-6">
                {loading ? (
                    <div className="py-12 text-center">
                        <Spinner size="lg" />
                        <p className="text-chop-text-subtle mt-4">Searching...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-12 text-red-400">
                        <p>Something went wrong: {error}</p>
                    </div>
                ) : !query ? (
                    <div className="text-center py-20 text-chop-text-subtle/50">
                        <Search className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p className="text-lg">Type to start searching</p>
                    </div>
                ) : !hasResults ? (
                    <div className="text-center py-20 text-chop-text-subtle">
                        <p className="text-lg">No results found for "{query}"</p>
                        <p className="text-sm mt-2">Try checking your spelling or using different keywords.</p>
                    </div>
                ) : (
                    <>
                        {/* Places Section */}
                        {(activeTab === "all" || activeTab === "places") && results.places.length > 0 && (
                            <section>
                                {activeTab === "all" && (
                                    <h2 className="text-lg font-semibold text-chop-text-light mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-chop-accent-cta" />
                                        Places
                                    </h2>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    {results.places.map((place) => (
                                        <PlaceCard key={place.id} place={place} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Events Section */}
                        {(activeTab === "all" || activeTab === "events") && results.events.length > 0 && (
                            <section>
                                {activeTab === "all" && (
                                    <h2 className="text-lg font-semibold text-chop-text-light mb-4 mt-2 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-chop-accent-cta" />
                                        Events
                                    </h2>
                                )}
                                <div className="space-y-3">
                                    {results.events.map((event) => (
                                        <EventCard key={event.id} event={event} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

function PlaceCard({ place }: { place: Place }) {
    return (
        <Link href={`/places/${place.id}`} className="group block relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-800">
            <Image
                src={place.image_url || "/assets/placeholders/place-placeholder.jpg"}
                alt={place.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-semibold text-white truncate">{place.name}</h3>
                <p className="text-xs text-gray-300 truncate">{place.area}</p>
                <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-white font-medium">New</span>
                </div>
            </div>
        </Link>
    );
}

function EventCard({ event }: { event: IbadanEvent }) {
    return (
        <Link href={`/events/${event.id}`} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-800 shrink-0">
                <Image
                    src={event.thumbnail}
                    alt={event.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex-1 min-w-0 py-1">
                <h3 className="font-semibold text-white truncate">{event.title}</h3>
                <p className="text-sm text-chop-accent-cta mt-0.5">
                    {event.start_date_time ? new Date(event.start_date_time).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Upcoming'}
                </p>
                <p className="text-xs text-gray-400 truncate mt-1">{event.venue}</p>
            </div>
        </Link>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-chop-bg-dark flex items-center justify-center"><Spinner /></div>}>
            <SearchContent />
        </Suspense>
    );
}
