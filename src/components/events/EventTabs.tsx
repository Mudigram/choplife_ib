"use client";

import { useState } from "react";
import EventDetailsTab from "./tabs/EventDetailsTab";
import EventLocationTab from "./tabs/EventLocationTab";
import EventGalleryTab from "./tabs/EventGalleryTab";
import TicketsTab from "./tabs/TicketsTab";
import type { IbadanEvent } from "@/types/events";

const tabs = ["Details", "Location", "Gallery", "Tickets"];

export default function EventTabs({
    eventId,
    event
}: {
    eventId?: string;
    event: IbadanEvent;
}) {
    const [active, setActive] = useState(0);

    return (
        <div className="sticky relative w-full max-w-lg mx-auto mt-4 px-2 z-30">
            {/* Glass Bar */}
            <div
                className="
          backdrop-blur-2xl bg-white/10 border border-white/20
          rounded-xl shadow-lg flex items-center justify-between
          px-4 py-3 relative sticky top-0 z-70
        "
            >
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        onClick={() => setActive(index)}
                        className={`
              relative px-2 py-1 text-sm transition-all duration-300
              ${active === index
                                ? "text-white font-semibold"
                                : "text-white/60 hover:text-white"
                            }
            `}
                    >
                        {tab}
                    </button>
                ))}

                {/* Sliding neon indicator */}
                <div
                    className="
            absolute bottom-0 h-[3px] rounded-full
            bg-[var(--color-chop-accent-point)]
            shadow-[0_0_10px_rgba(255,215,0,0.7)]
            transition-all duration-300 ease-out
          "
                    style={{
                        width: `${100 / tabs.length}%`,
                        left: `${(100 / tabs.length) * active}%`,
                    }}
                />
            </div>

            {/* CONTENT AREA */}
            <div className="mt-6">
                {active === 0 && <EventDetailsTab event={event} />}
                {active === 1 && <EventLocationTab event={event} />}
                {active === 2 && <EventGalleryTab eventId={eventId || event.id} />}
                {active === 3 && <TicketsTab eventId={eventId || event.id} ticketLink={event.ticket_link} />}
            </div>
        </div>
    );
}
