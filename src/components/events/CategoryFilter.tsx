"use client";

import { EVENT_CATEGORIES } from "@/data/eventCategories";
import { useEventsByCategory } from "@/hooks/useEventsByCategory";
import { EventCategory } from "@/types/events";

interface Props {
    selected: string;
    onSelect: (cat: string) => void;
}

export default function EventCategoryBar({ selected, onSelect }: Props) {
    return (
        <div
            className="
        w-full overflow-x-auto scrollbar-none py-3 
        flex space-x-3 sticky top-[104px] z-[40] 
        bg-chop-bg-dark/90 backdrop-blur-md
      "
        >
            {EVENT_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = selected === cat.id;

                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`
              flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium
              transition-all border
              ${isActive
                                ? "bg-chop-accent-cta text-white border-chop-accent-cta shadow-[var(--shadow-neon-cta)]"
                                : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                            }
            `}
                    >
                        <Icon size={16} />
                        {cat.label}
                    </button>
                );
            })}
        </div>
    );
}
