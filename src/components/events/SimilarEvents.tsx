"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ExternalLink, Loader2 } from "lucide-react";
import { useSimilarEvents } from "@/hooks/useSimilarEvents";

type SimilarEventsProps = {
    eventId: number;
    category?: string | null;
    organizerId?: string | null;
};

export default function SimilarEvents({ eventId, category, organizerId }: SimilarEventsProps) {
    const { events, loading } = useSimilarEvents(eventId, category, organizerId);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-6">
                <Loader2 className="w-6 h-6 animate-spin text-chop-accent-point" />
            </div>
        );
    }

    if (events.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-lg mx-auto px-4 py-6">
            <h3 className="text-xl font-bold text-white mb-4">Similar Events</h3>

            {/* Horizontal Scroll */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex-shrink-0 w-64"
                    >
                        <Link href={`/events/${event.id}`} className="block group">
                            <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-chop-accent-point/50 transition">
                                {/* Image */}
                                <div className="relative h-36 overflow-hidden">
                                    <Image
                                        src={event.thumbnail || "/assets/header/header1.jpg"}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {event.category && (
                                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                                            {event.category}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-chop-accent-point transition">
                                        {event.title}
                                    </h4>

                                    <div className="space-y-1 text-xs text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>
                                                {new Date(event.start_date_time).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        {event.venue && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                <span className="line-clamp-1">{event.venue}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-chop-accent-point font-bold">
                                            {event.price_ngn === 0 ? "Free" : `₦${event.price_ngn.toLocaleString()}`}
                                        </span>
                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-chop-accent-point transition" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
