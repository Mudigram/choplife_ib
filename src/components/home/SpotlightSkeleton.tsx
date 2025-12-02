"use client";

import React from "react";

export default function SpotlightSkeleton() {
    return (
        <section className="w-full px-4 mt-4">
            <div className="h-7 w-32 bg-white/10 rounded-lg mb-2 animate-pulse" />

            <div className="flex space-x-4 overflow-x-auto scrollbar-none pb-2">
                {[1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className="min-w-[340px] h-[170px] rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 overflow-hidden relative"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* Content placeholders */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            {/* Top badge placeholder */}
                            <div className="h-5 w-20 bg-white/20 rounded-full" />

                            {/* Middle content */}
                            <div className="space-y-2">
                                <div className="h-6 w-3/4 bg-white/20 rounded" />
                                <div className="h-4 w-1/2 bg-white/20 rounded" />
                            </div>

                            {/* Bottom CTA */}
                            <div className="flex justify-between items-end">
                                <div className="h-8 w-24 bg-white/20 rounded-md" />
                                <div className="h-3 w-20 bg-white/20 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
