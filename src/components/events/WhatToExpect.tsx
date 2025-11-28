"use client";

import { motion } from "framer-motion";
import { Clock, Users as UsersIcon, Utensils, Music, Sparkles } from "lucide-react";
import type { IbadanEvent } from "@/types/events";

type WhatToExpectProps = {
    event: Partial<IbadanEvent>;
};

export default function WhatToExpect({ event }: WhatToExpectProps) {
    // Check if event has what_to_expect data (from database column)
    const expectations = event.what_to_expect || [];

    // Default expectations if none provided
    const defaultExpectations = [
        "Exciting entertainment and activities",
        "Food and beverage options available",
        "Great atmosphere with music",
        "Opportunity to meet new people"
    ];

    const displayExpectations = expectations.length > 0 ? expectations : defaultExpectations;

    if (displayExpectations.length === 0) return null;

    const icons = [
        <Sparkles key="1" className="w-5 h-5" />,
        <Utensils key="2" className="w-5 h-5" />,
        <Music key="3" className="w-5 h-5" />,
        <UsersIcon key="4" className="w-5 h-5" />,
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4"
        >
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-chop-accent-point" />
                What to Expect
            </h3>

            <div className="space-y-3">
                {displayExpectations.map((item: string, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-chop-accent-point/20 flex items-center justify-center flex-shrink-0 text-chop-accent-point">
                            {icons[index % icons.length]}
                        </div>
                        <p className="text-gray-300 text-sm flex-1">{item}</p>
                    </motion.div>
                ))}
            </div>

            {/* Additional Info */}
            {event.dress_code && (
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30">
                    <p className="text-sm">
                        <span className="font-semibold text-purple-400">Dress Code:</span>
                        <span className="text-gray-300 ml-2">{event.dress_code}</span>
                    </p>
                </div>
            )}
        </motion.div>
    );
}
