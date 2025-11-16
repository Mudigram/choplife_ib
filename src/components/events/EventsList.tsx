"use client";

import React from "react";
import EventListSection from "./EventListSection";
import { SampleEvents } from "@/data/sampleEvents";

export default function EventList() {
    return (
        <div className="space-y-10">

            <EventListSection
                title="🔥 Trending"
                events={SampleEvents.trending}
            />
        </div>
    );
}
