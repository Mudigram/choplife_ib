import React from "react";
import type { IbadanEvent } from "@/types/events";

type EventInfoSectionProps = {
    event: Partial<IbadanEvent>;
};

export default function EventInfoSection({ event }: EventInfoSectionProps) {
    return (
        <div className="px-4 py-4 max-w-lg mx-auto">
            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                {event?.price_range && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-1">Price</p>
                        <p className="text-white font-semibold">{event.price_range}</p>
                    </div>
                )}
                {event?.location && (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                        <p className="text-gray-400 text-xs mb-1">Location</p>
                        <p className="text-white font-semibold text-sm">{event.location}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
