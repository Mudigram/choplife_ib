"use client";

import React from "react";
import EventListSection from "./EventListSection";

interface Props {
    events: any[];
}

export default function EventList({ events }: Props) {
    if (!events || events.length === 0) {
        return (
            <div className="text-center text-chop-text-subtle p-6">
                <p>No events match your filters.</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <EventListSection title="Events" events={events} />
        </div>
    );
}
