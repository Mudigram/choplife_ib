"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CircleArrowRight } from "lucide-react";
import dayjs from "dayjs";

interface EventProps {
    event: {
        id: number;
        title: string;
        image: string;
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
          flex items-center gap-2
          p-2
          rounded-xl
          backdrop-blur-md
          border border-white/10
          bg-[rgba(255,255,255,0.03)]
          hover:bg-[rgba(255,255,255,0.07)]
          transition-all
        "
            >
                {/* Thumbnail */}
                <div className="relative w-12 h-12 min-w-[3rem]">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 text-left">
                    <p className="text-sm font-semibold text-chop-text-light leading-tight line-clamp-1">
                        {event.title}
                    </p>

                    <p className="text-xs text-chop-text-subtle leading-tight">
                        {date} • {time}
                    </p>

                    {event.venue && (
                        <p className="text-[11px] text-chop-text-subtle line-clamp-1">
                            {event.venue}
                        </p>
                    )}
                </div>

                {/* Arrow */}
                <CircleArrowRight
                    size={20}
                    className="text-[var(--color-chop-accent-point)] shrink-0"
                />
            </div>
        </Link>
    );
}
