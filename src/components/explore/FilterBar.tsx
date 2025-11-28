"use client";

import { cn } from "@/lib/utils";

export type FilterOption = {
    id: string;
    label: string;
    icon?: string;
};

const FILTERS: FilterOption[] = [
    { id: "all", label: "All", icon: "🌍" },
    { id: "restaurants", label: "Restaurants", icon: "🍽️" },
    { id: "events", label: "Events", icon: "🎉" },
    { id: "cafes", label: "Cafes", icon: "☕" },
    { id: "nightlife", label: "Nightlife", icon: "🍸" },
    { id: "nature", label: "Nature", icon: "🌳" },
];

type Props = {
    activeFilter: string;
    onFilterChange: (id: string) => void;
    className?: string;
};

export default function FilterBar({ activeFilter, onFilterChange, className }: Props) {
    return (
        <div className={cn("w-full overflow-x-auto no-scrollbar py-2", className)}>
            <div className="flex gap-2 px-4 min-w-max">
                {FILTERS.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => onFilterChange(filter.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                            activeFilter === filter.id
                                ? "bg-chop-accent-cta text-white shadow-lg shadow-chop-accent-cta/20 scale-105"
                                : "bg-chop-bg-card/40 text-chop-text-subtle border border-chop-text-subtle/20 hover:bg-chop-bg-card hover:text-chop-text-light"
                        )}
                    >
                        <span>{filter.icon}</span>
                        <span>{filter.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
