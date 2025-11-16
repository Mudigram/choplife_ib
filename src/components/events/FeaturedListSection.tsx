import React from "react";
import FeaturedEvents from "./FeaturedEvents";
import { CircleArrowRight } from "lucide-react";

type Props = {
    title: string;
    text: string;
    events: any[];
};

export default function FeaturedListSection({ title, text, events }: Props) {
    if (!events || events.length === 0) return null;

    // Group events into pairs (2 per vertical column)
    const grouped = [];
    for (let i = 0; i < events.length; i += 2) {
        grouped.push(events.slice(i, i + 2));
    }

    return (
        <section className="mt-6">
            {/* SECTION HEADER */}
            <div className="flex items-center">
                <h2 className="text-lg font-bold mr-6">{title}</h2>
                <button className="text-chop-accent-point text-sm">
                    <CircleArrowRight />
                </button>
            </div>

            <p className="text-sm font-light mb-3">{text}</p>

            {/* HORIZONTAL GRID SCROLLER */}
            <div className="
                flex 
                overflow-x-auto 
                gap-4 
                scrollbar-none 
                snap-x snap-mandatory 
                pb-2
            ">
                {grouped.map((pair, idx) => (
                    <div
                        key={idx}
                        className="
                            min-w-[350px]        /* controls card width like Spotify playlist blocks */
                            flex flex-col 
                            gap-3 
                            snap-start
                        "
                    >
                        {pair.map((event) => (
                            <FeaturedEvents key={event.id} event={event} />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
