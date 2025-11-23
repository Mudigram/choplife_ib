import React from "react";
import type { IbadanEvent } from "@/types/events";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import SingleLocationMap from "@/components/map/SingleLocationMap";

type Props = {
    event?: Partial<IbadanEvent> | null;
};

export default function EventLocationTab({ event }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="
                w-full max-w-lg mx-auto
                rounded-2xl p-6 space-y-6
                backdrop-blur-xl bg-white/5
                border border-white/10
                shadow-[0_0_30px_rgba(255,255,255,0.05)]
                text-chop-text-light
            "
        >

            {/* TITLE */}
            <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-2xl font-bold tracking-tight text-white"
            >
                Location
            </motion.h1>

            {/* VENUE INFO */}
            {event?.venue && (
                <section className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm space-y-2">
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-[var(--color-chop-accent-point)]" />
                        <h2 className="text-lg font-semibold text-white">Venue</h2>
                    </div>
                    <p className="text-gray-300">{event.venue}</p>
                    {event.location && <p className="text-sm text-gray-400">{event.location}</p>}
                </section>
            )}

            {/* MAP */}
            {event?.lat && event?.lng && (
                <section className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm">
                    <SingleLocationMap
                        lat={event.lat}
                        lng={event.lng}
                        title={event.venue || event.title || "Event Location"}
                    />
                </section>
            )}

            {!event?.lat && !event?.lng && (
                <div className="text-center py-8 text-gray-400">
                    <MapPin size={48} className="mx-auto mb-2 opacity-30" />
                    <p>Location coordinates not available</p>
                </div>
            )}

        </motion.div>
    );
}
