"use client";

import { useState, useEffect } from "react";

type CountdownProps = {
    targetDate: string; // ISO date string
};

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isLive: boolean;
    isPast: boolean;
};

export default function EventCountdown({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    function calculateTimeLeft(target: string): TimeLeft {
        const difference = +new Date(target) - +new Date();

        if (difference < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: false, isPast: true };
        }

        if (difference < 3600000) { // Less than 1 hour
            return {
                days: 0,
                hours: 0,
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                isLive: true,
                isPast: false
            };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isLive: false,
            isPast: false
        };
    }

    // Past event
    if (timeLeft.isPast) {
        return (
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gray-600/20 border border-gray-500/30">
                <span className="text-gray-400 text-sm font-medium">Event Ended</span>
            </div>
        );
    }

    // Live event
    if (timeLeft.isLive) {
        return (
            <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-red-400 text-sm font-bold">LIVE NOW</span>
            </div>
        );
    }

    // Upcoming event
    return (
        <div className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-chop-accent-cta/10 to-chop-accent-point/10 border border-chop-accent-point/30">
            <div className="flex items-center gap-1 text-center">
                {timeLeft.days > 0 && (
                    <div className="flex flex-col items-center min-w-[40px]">
                        <span className="text-xl font-bold text-chop-accent-point">{timeLeft.days}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wide">
                            {timeLeft.days === 1 ? 'Day' : 'Days'}
                        </span>
                    </div>
                )}
                {timeLeft.days > 0 && <span className="text-gray-500 mx-1">:</span>}

                <div className="flex flex-col items-center min-w-[40px]">
                    <span className="text-xl font-bold text-chop-accent-point">
                        {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">Hrs</span>
                </div>
                <span className="text-gray-500 mx-1">:</span>

                <div className="flex flex-col items-center min-w-[40px]">
                    <span className="text-xl font-bold text-chop-accent-point">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">Min</span>
                </div>
                {timeLeft.days === 0 && (
                    <>
                        <span className="text-gray-500 mx-1">:</span>
                        <div className="flex flex-col items-center min-w-[40px]">
                            <span className="text-xl font-bold text-chop-accent-point">
                                {timeLeft.seconds.toString().padStart(2, '0')}
                            </span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-wide">Sec</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
