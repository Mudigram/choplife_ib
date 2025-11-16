import React from "react";
import EventCard from "./EventCard";

type Props = {
    title: string;
    events: any[];
};

export default function EventListSection({ title, events }: Props) {
    if (!events || events.length === 0) return null;

    return (
        <section>

            {/* SECTION HEADER */}
            <div className="flex items-center justify-between mb-2 px-1">
                <h2 className="text-lg font-bold">{title}</h2>
                <button className="text-chop-accent-cta text-sm">
                    See all
                </button>
            </div>

            {/* HORIZONTAL SCROLL */}
            <div className="flex gap-4 overflow-x-auto scrollbar-none pb-1 snap-x snap-mandatory">
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

        </section>
    );
}
