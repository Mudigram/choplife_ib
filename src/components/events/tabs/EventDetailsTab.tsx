import React from "react";
import type { IbadanEvent } from "@/types/events";
import { Calendar, MapPin, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";
import AttendeesSection from "../AttendeesSection";
import OrganizerCard from "../OrganizerCard";
import FAQSection from "../FAQSection";
import WhatToExpect from "../WhatToExpect";
import ContactSection from "../ContactSection";

type Props = {
    event?: Partial<IbadanEvent> | null;
};

export default function EventDetailsTab({ event }: Props) {
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
                Event Details
            </motion.h1>

            {/* DESCRIPTION */}
            {event?.description && (
                <section className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm space-y-3">
                    <h2 className="text-lg font-semibold text-white">About</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {event.description}
                    </p>
                </section>
            )}

            {/* ATTENDEES SECTION */}
            {event?.id && <AttendeesSection eventId={event.id} />}

            {/* WHAT TO EXPECT */}
            {event && <WhatToExpect event={event} />}

            {/* ORGANIZER CARD */}
            {event?.organizer_id && <OrganizerCard organizerId={event.organizer_id} />}

            {/* FAQ SECTION */}
            {event?.id && <FAQSection eventId={event.id} />}

            {/* CONTACT SECTION */}
            <ContactSection organizerId={event?.organizer_id} />

            {/* EVENT INFO */}
            <section className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md shadow-sm space-y-3">
                <h2 className="text-lg font-semibold text-white">Information</h2>
                <div className="space-y-3 text-gray-300">
                    {event?.start_date_time && (
                        <div className="flex items-start gap-3">
                            <Calendar size={18} className="text-[var(--color-chop-accent-point)] mt-0.5" />
                            <div>
                                <p className="font-medium text-white">Date & Time</p>
                                <p className="text-sm">
                                    {new Date(event.start_date_time).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="text-sm">
                                    {new Date(event.start_date_time).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    })}
                                </p>
                            </div>
                        </div>
                    )}

                    {event?.venue && (
                        <div className="flex items-start gap-3">
                            <MapPin size={18} className="text-[var(--color-chop-accent-point)] mt-0.5" />
                            <div>
                                <p className="font-medium text-white">Venue</p>
                                <p className="text-sm">{event.venue}</p>
                                {event.location && <p className="text-xs text-gray-400">{event.location}</p>}
                            </div>
                        </div>
                    )}

                    {event?.price_ngn && (
                        <div className="flex items-start gap-3">
                            <DollarSign size={18} className="text-[var(--color-chop-accent-point)] mt-0.5" />
                            <div>
                                <p className="font-medium text-white">Price</p>
                                <p className="text-sm">{event.price_ngn}</p>
                            </div>
                        </div>
                    )}

                    {event?.organizer_id && (
                        <div className="flex items-start gap-3">
                            <Users size={18} className="text-[var(--color-chop-accent-point)] mt-0.5" />
                            <div>
                                <p className="font-medium text-white">Organizer</p>
                                <p className="text-sm">{event.organizer_id}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

        </motion.div>
    );
}
