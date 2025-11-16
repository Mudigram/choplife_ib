"use client";

import { useState } from "react";
import { EventTab } from "@/types/events";

export default function EventTabs() {
    const [activeTab, setActiveTab] = useState<EventTab>(EventTab.UPCOMING);

    const tabs = [
        { id: EventTab.UPCOMING, label: "Upcoming" },
        { id: EventTab.SAVED, label: "Saved" },
        { id: EventTab.PAST, label: "Past" },
    ];

    return (
        <div className="relative w-full flex justify-between bg-transparent py-2">
            {/* Sliding Highlight */}
            <div
                className="
          absolute bottom-0 h-[3px] w-1/3 
          bg-chop-accent-cta transition-transform duration-300 rounded-full
        "
                style={{
                    transform: `translateX(${tabs.findIndex(t => t.id === activeTab) * 100}%)`,
                }}
            />

            {/* Tabs */}
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
              flex-1 text-center py-2 text-sm font-semibold transition
              ${isActive ? "text-white" : "text-gray-400 hover:text-gray-200"}
            `}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
