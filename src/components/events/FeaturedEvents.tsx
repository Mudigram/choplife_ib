import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import dayjs from "dayjs";

interface EventProps {
    event: {
        id: number;
        title: string;
        thumbnail: string;
        start_date_time: string;
        venue?: string;
    };
}

export default function EventCardSmall({ event }: EventProps) {
    const date = dayjs(event.start_date_time).format("DD MMM");
    const time = dayjs(event.start_date_time).format("h:mm A");

    return (
        <Link href={`/event/${event.id}`}>
            <div
                className="
                    w-full
                    flex items-center gap-2       /* tight like Spotify */
                    p-2                            /* low padding */
                    rounded-xl
                    backdrop-blur-md
                    border border-white/10
                    bg-[rgba(255,255,255,0.04)]
                    shadow-[0_0_6px_rgba(255,215,0,0.05)]
                    hover:bg-[rgba(255,255,255,0.07)]
                    hover:shadow-[0_0_10px_rgba(255,215,0,0.15)]
                    transition-all
                "
            >
                {/* Thumbnail - small like Spotify */}
                <div className="relative w-12 h-12 min-w-[3rem]">
                    <Image
                        src={event.thumbnail || "/assets/default-avatar.png"}
                        alt={event.title}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>

                {/* TEXT: pulled closer to image (Spotify style) */}
                <div className="flex flex-col flex-1 text-left">
                    <p className="text-[0.93rem] font-semibold text-chop-text-light leading-tight line-clamp-1">
                        {event.title}
                    </p>

                    <p className="text-xs text-chop-text-subtle leading-tight mt-0.5">
                        {date} • {time}
                    </p>

                    {event.venue && (
                        <p className="text-[11px] text-chop-text-subtle line-clamp-1 mt-0.5">
                            {event.venue}
                        </p>
                    )}
                </div>

                {/* Arrow CTA (Spotify uses right-side icons pressed against edge) */}
                <CircleArrowRight
                    size={20}
                    className="
                        text-[var(--color-chop-accent-point)]
                        drop-shadow-[0_0_4px_rgba(255,215,0,0.4)]
                        shrink-0
                    "
                />
            </div>
        </Link>
    );
}
